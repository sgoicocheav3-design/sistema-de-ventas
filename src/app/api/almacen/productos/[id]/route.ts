import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = withAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    const producto = await prisma.producto.findUnique({
      where: { id: parseInt(id) },
      include: { categoria: { select: { id: true, nombre: true } } },
    })
    if (!producto) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 })
    }
    return NextResponse.json({ ...producto, precio: Number(producto.precio) })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = withAuth(req, ['ADMIN', 'ALMACENERO'])
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    const body = await req.json()
    const data: Record<string, unknown> = {}

    if (body.nombre !== undefined) data.nombre = body.nombre
    if (body.marca !== undefined) data.marca = body.marca
    if (body.stock !== undefined) data.stock = parseInt(body.stock)
    if (body.activo !== undefined) data.activo = body.activo
    if (body.categoriaId !== undefined) data.categoriaId = parseInt(body.categoriaId)
    if (body.precio !== undefined) {
      if (isNaN(Number(body.precio)) || Number(body.precio) <= 0) {
        return NextResponse.json({ message: 'El precio debe ser un número positivo' }, { status: 400 })
      }
      data.precio = Number(body.precio)
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ message: 'No hay campos para actualizar' }, { status: 400 })
    }

    const producto = await prisma.producto.update({
      where: { id: parseInt(id) },
      data,
      include: { categoria: { select: { id: true, nombre: true } } },
    })

    return NextResponse.json({ ...producto, precio: Number(producto.precio) })
  } catch (err: unknown) {
    if (err instanceof Error && 'code' in err && (err as { code: string }).code === 'P2025') {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
