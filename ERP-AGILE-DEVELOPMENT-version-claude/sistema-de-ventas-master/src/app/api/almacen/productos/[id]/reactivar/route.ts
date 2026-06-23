import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = withAuth(req, ['ADMIN', 'ALMACENERO'])
  if (auth instanceof NextResponse) return auth

  try {
    const { id: idStr } = await params
    const id = parseInt(idStr)
    if (isNaN(id) || id <= 0) {
      return NextResponse.json({ message: 'ID de producto inválido' }, { status: 400 })
    }

    const producto = await prisma.producto.findUnique({ where: { id } })
    if (!producto) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 })
    }
    if (producto.activo) {
      return NextResponse.json({ message: 'El producto ya está activo' }, { status: 400 })
    }

    await prisma.producto.update({
      where: { id },
      data: { activo: true },
    })

    await prisma.auditoria.create({
      data: {
        usuarioId: auth.id,
        productoId: id,
        accion: 'REACTIVACION',
        detalles: `Producto "${producto.nombre}" (${producto.codigo}) reactivado`,
      },
    })

    return NextResponse.json({ message: 'Producto reactivado exitosamente' })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
