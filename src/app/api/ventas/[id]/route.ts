import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = withAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    const venta = await prisma.venta.findUnique({
      where: { id: parseInt(id) },
      include: {
        detalles: {
          include: { producto: { select: { id: true, nombre: true, marca: true, precio: true } } },
        },
        usuario: { select: { id: true, nombre: true } },
      },
    })
    if (!venta) {
      return NextResponse.json({ message: 'Venta no encontrada' }, { status: 404 })
    }
    return NextResponse.json(venta)
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
