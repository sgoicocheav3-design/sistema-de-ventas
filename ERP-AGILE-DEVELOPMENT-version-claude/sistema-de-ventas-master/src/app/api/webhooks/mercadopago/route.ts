import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import crypto from 'crypto'

const MP_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN || ''
const MP_WEBHOOK_SECRET = process.env.MERCADOPAGO_WEBHOOK_SECRET || ''

const ESTADOS_MP: Record<string, string> = {
  approved: 'COMPLETADA',
  pending: 'PENDIENTE',
  in_process: 'PROCESANDO',
  rejected: 'RECHAZADO',
  cancelled: 'CANCELADO',
  refunded: 'REEMBOLSADO',
  charged_back: 'CONTRACARGO',
}

function validarFirma(bodyRaw: string, signatureHeader: string | null, requestId: string | null): boolean {
  if (!MP_WEBHOOK_SECRET || !signatureHeader) return false

  const parts = signatureHeader.split(',').reduce<Record<string, string>>((acc, p) => {
    const [k, v] = p.trim().split('=')
    if (k && v) acc[k] = v
    return acc
  }, {})

  const ts = parts['ts']
  const v1 = parts['v1']
  if (!ts || !v1) return false

  let dataId = ''
  try {
    const body = JSON.parse(bodyRaw)
    dataId = body.data?.id?.toString() || ''
  } catch { return false }
  if (!dataId) return false

  const template = `id:${dataId};request-id:${requestId || ''};ts:${ts};`
  const hmac = crypto.createHmac('sha256', MP_WEBHOOK_SECRET).update(template).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(v1))
}

export async function POST(req: NextRequest) {
  try {
    const bodyRaw = await req.text()
    const signatureHeader = req.headers.get('x-signature')
    const requestId = req.headers.get('x-request-id')

    if (MP_WEBHOOK_SECRET && signatureHeader) {
      const firmaValida = validarFirma(bodyRaw, signatureHeader, requestId)
      if (!firmaValida) {
        console.warn('[MercadoPago] Firma inválida')
        return NextResponse.json({ message: 'Firma inválida' }, { status: 401 })
      }
    }

    let body: any = {}
    try { body = JSON.parse(bodyRaw) } catch { }

    const paymentId = body.data?.id?.toString()
    if (!paymentId) {
      console.warn('[MercadoPago] Payment ID ausente en el body')
      return NextResponse.json({ received: true }, { status: 200 })
    }

    console.log(`[MercadoPago] Webhook recibido - Payment ID: ${paymentId}`)

    const client = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN })
    const paymentClient = new Payment(client)
    const paymentInfo = await paymentClient.get({ id: paymentId })

    if (!paymentInfo) {
      console.warn(`[MercadoPago] Pago #${paymentId} no encontrado en API`)
      return NextResponse.json({ received: true }, { status: 200 })
    }

    const estadoMP = paymentInfo.status as string
    const externalRef = paymentInfo.external_reference as string | undefined
    const monto = Number(paymentInfo.transaction_amount || 0)
    const moneda = paymentInfo.currency_id as string | undefined

    console.log(`[MercadoPago] Payment ID: ${paymentId}, Estado: ${estadoMP}, External Ref: ${externalRef}, Monto: ${monto}`)

    if (!externalRef) {
      console.warn(`[MercadoPago] Pago #${paymentId} sin external_reference`)
      return NextResponse.json({ received: true }, { status: 200 })
    }

    const ventaId = parseInt(externalRef)
    if (isNaN(ventaId)) {
      console.warn(`[MercadoPago] external_reference inválido: ${externalRef}`)
      return NextResponse.json({ received: true }, { status: 200 })
    }

    const venta = await prisma.venta.findUnique({ where: { id: ventaId } })
    if (!venta) {
      console.warn(`[MercadoPago] Venta #${ventaId} no encontrada en BD`)
      return NextResponse.json({ received: true }, { status: 200 })
    }

    if (venta.pagoId && venta.pagoId !== paymentId) {
      console.warn(`[MercadoPago] Payment ID no coincide para venta #${ventaId}. Esperado: ${venta.pagoId}, Recibido: ${paymentId}`)
    }

    if (Math.abs(Number(venta.total) - monto) > 0.01) {
      console.warn(`[MercadoPago] Monto no coincide para venta #${ventaId}. Esperado: ${venta.total}, Recibido: ${monto}`)
    }

    if (moneda && moneda !== 'PEN') {
      console.warn(`[MercadoPago] Moneda no esperada para venta #${ventaId}: ${moneda}`)
    }

    if (venta.estado === 'COMPLETADA') {
      console.log(`[MercadoPago] Venta #${ventaId} ya estaba completada, ignorando duplicado`)
      return NextResponse.json({ received: true }, { status: 200 })
    }

    const estadoLocal = ESTADOS_MP[estadoMP] || 'PENDIENTE'

    await prisma.venta.update({
      where: { id: ventaId },
      data: {
        estado: estadoLocal,
        pagoId: venta.pagoId || paymentId,
      },
    })

    console.log(`[MercadoPago] Venta #${ventaId} actualizada a: ${estadoLocal}`)
    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error('[MercadoPago] Error en webhook:', error instanceof Error ? error.message : error)
    return NextResponse.json({ message: 'Error interno' }, { status: 500 })
  }
}
