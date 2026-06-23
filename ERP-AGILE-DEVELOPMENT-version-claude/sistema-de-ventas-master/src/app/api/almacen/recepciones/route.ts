import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

export async function PUT(req: NextRequest) {
  const auth = withAuth(req, ['ADMIN', 'ALMACENERO'])
  if (auth instanceof NextResponse) return auth

  try {
    const { solicitudId, proveedorId, cantidad } = await req.json()

    if (!solicitudId || !proveedorId || !cantidad) {
      return NextResponse.json({ message: 'solicitudId, proveedorId y cantidad son requeridos' }, { status: 400 })
    }
    const cant = parseInt(cantidad)
    if (isNaN(cant) || cant <= 0) {
      return NextResponse.json({ message: 'Cantidad inválida' }, { status: 400 })
    }

    const solicitud = await prisma.solicitudReposicion.findUnique({ where: { id: parseInt(solicitudId) } })
    if (!solicitud) {
      return NextResponse.json({ message: 'Solicitud no encontrada' }, { status: 404 })
    }
    if (solicitud.estado !== 'APROBADA') {
      return NextResponse.json({ message: 'La solicitud debe estar aprobada para recepcionar' }, { status: 400 })
    }

    const proveedor = await prisma.proveedor.findUnique({ where: { id: parseInt(proveedorId) } })
    if (!proveedor || !proveedor.activo) {
      return NextResponse.json({ message: 'Proveedor no disponible' }, { status: 400 })
    }

    await prisma.$transaction(async (tx) => {
      await tx.entradaMercaderia.create({
        data: {
          productoId: solicitud.productoId,
          proveedorId: parseInt(proveedorId),
          cantidad: cant,
          usuarioId: auth.id,
        },
      })

      await tx.recepcionMercaderia.create({
        data: {
          solicitudId: parseInt(solicitudId),
          productoId: solicitud.productoId,
          proveedorId: parseInt(proveedorId),
          cantidad: cant,
          usuarioId: auth.id,
        },
      })

      await tx.producto.update({
        where: { id: solicitud.productoId },
        data: { stock: { increment: cant } },
      })

      await tx.solicitudReposicion.update({
        where: { id: parseInt(solicitudId) },
        data: { estado: 'COMPLETADA' },
      })
    })

    return NextResponse.json({ message: 'Recepción procesada correctamente' })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
