import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = withAuth(req)
  if (auth instanceof NextResponse) return auth

  const { id } = params
  
  try {
    const venta = await prisma.venta.findUnique({
      where: { id: parseInt(id) },
      select: { id: true, estado: true, numero: true }
    })
    
    if (!venta) {
      return NextResponse.json({ message: 'Venta no encontrada' }, { status: 404 })
    }

    return NextResponse.json(venta, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
