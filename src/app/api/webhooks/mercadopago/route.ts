import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { MercadoPagoConfig, Payment } from 'mercadopago'

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const topic = url.searchParams.get('topic') || url.searchParams.get('type')
    const id = url.searchParams.get('data.id') || url.searchParams.get('id')

    const bodyText = await req.text()
    let body = {}
    if (bodyText) {
      try {
        body = JSON.parse(bodyText)
      } catch (e) {
        // ignore JSON parse error
      }
    }

    const eventType = (body as any).type || (body as any).action || topic
    const paymentId = (body as any).data?.id || id

    if (eventType === 'payment' || eventType === 'payment.created' || eventType === 'payment.updated') {
      if (paymentId) {
        const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '' })
        const payment = new Payment(client)
        
        const paymentInfo = await payment.get({ id: paymentId })
        
        if (paymentInfo.status === 'approved' && paymentInfo.external_reference) {
          const ventaId = parseInt(paymentInfo.external_reference)
          
          if (!isNaN(ventaId)) {
            await prisma.venta.update({
              where: { id: ventaId },
              data: { estado: 'COMPLETADA' }
            })
          }
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error('Webhook Error:', error)
    return NextResponse.json({ message: 'Webhook Error' }, { status: 500 })
  }
}
