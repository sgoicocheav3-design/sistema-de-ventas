import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = withAuth(req, ['ADMIN', 'ALMACENERO'])
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    const productos = await prisma.proveedorProducto.findMany({
      where: { proveedorId: parseInt(id) },
      include: {
        producto: {
          select: { id: true, nombre: true, marca: true, precio: true, stock: true, activo: true },
        },
      },
      orderBy: { producto: { nombre: 'asc' } },
    })
    const result = productos.map((pp) => pp.producto)
    return NextResponse.json({ productos: result })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = withAuth(req, ['ADMIN'])
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    const { producto_id } = await req.json()
    if (!producto_id) {
      return NextResponse.json({ message: 'producto_id es requerido' }, { status: 400 })
    }

    await prisma.proveedorProducto.upsert({
      where: { proveedorId_productoId: { proveedorId: parseInt(id), productoId: producto_id } },
      create: { proveedorId: parseInt(id), productoId: producto_id },
      update: {},
    })
    return NextResponse.json({ message: 'Producto vinculado al proveedor' })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
