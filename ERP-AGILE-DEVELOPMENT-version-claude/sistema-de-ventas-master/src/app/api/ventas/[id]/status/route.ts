import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'
import { MercadoPagoConfig, Payment } from 'mercadopago'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = withAuth(req)
  if (auth instanceof NextResponse) return auth

  const { id } = params

  try {
    const venta = await prisma.venta.findUnique({
      where: { id: parseInt(id) },
      select: { id: true, estado: true, numero: true, total: true, pagoId: true, qrData: true, creadoEn: true },
    })

    if (!venta) {
      return NextResponse.json({ message: 'Venta no encontrada' }, { status: 404 })
    }

    let estado: string = venta.estado
    let statusDetail: string | null = null
    let paymentId: string | null = venta.pagoId

    if (estado === 'PENDIENTE' && venta.pagoId) {
      try {
        const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '' })
        const paymentClient = new Payment(client)
        const paymentInfo = await paymentClient.get({ id: venta.pagoId })

        if (paymentInfo) {
          const mpStatus = paymentInfo.status as string
          statusDetail = (paymentInfo.status_detail as string) || null
          paymentId = String(paymentInfo.id ?? '') || venta.pagoId

          if (mpStatus === 'approved' && (estado as string) !== 'COMPLETADA') {
            await prisma.venta.update({
              where: { id: venta.id },
              data: { estado: 'COMPLETADA' },
            })
            estado = 'COMPLETADA'
            console.log(`[MercadoPago] Conciliación: Venta #${venta.id} actualizada a COMPLETADA`)
          } else if (mpStatus === 'rejected' && estado === 'PENDIENTE') {
            await prisma.venta.update({
              where: { id: venta.id },
              data: { estado: 'RECHAZADO' },
            })
            estado = 'RECHAZADO'
          } else if (mpStatus === 'cancelled' && estado === 'PENDIENTE') {
            await prisma.venta.update({
              where: { id: venta.id },
              data: { estado: 'CANCELADO' },
            })
            estado = 'CANCELADO'
          } else if (mpStatus === 'in_process') {
            estado = 'PROCESANDO'
          }
        }
      } catch {
        console.warn(`[MercadoPago] Error consultando pago ${venta.pagoId} para venta #${venta.id}`)
      }
    }

    const response = NextResponse.json({
      id: venta.id,
      estado,
      numero: venta.numero,
      paymentId,
      statusDetail,
      actualizadoEn: venta.creadoEn,
    })
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    return response
  } catch (error) {
    console.error('[Estado] Error:', error instanceof Error ? error.message : error)
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
