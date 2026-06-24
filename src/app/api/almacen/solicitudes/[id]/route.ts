import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

// PATCH /api/almacen/solicitudes/:id/aprobar
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = withAuth(req, ['GERENTE', 'ADMIN'])
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    const body = await req.json()

    if (body.accion === 'aprobar') {
      const { proveedorId } = body
      if (!proveedorId) {
        return NextResponse.json({ message: 'Debe seleccionar un proveedor' }, { status: 400 })
      }

      const solicitud = await prisma.solicitudReposicion.findUnique({
        where: { id: parseInt(id) },
        include: { solicitante: { select: { id: true, nombre: true } } },
      })
      if (!solicitud) {
        return NextResponse.json({ message: 'Solicitud no encontrada' }, { status: 404 })
      }
      if (solicitud.estado !== 'PENDIENTE') {
        return NextResponse.json({ message: 'La solicitud ya fue procesada' }, { status: 400 })
      }

      const actualizada = await prisma.solicitudReposicion.update({
        where: { id: parseInt(id) },
        data: {
          estado: 'APROBADA',
          proveedorId: parseInt(proveedorId),
          revisorId: auth.id,
          revisadoEn: new Date(),
        },
        include: {
          producto: { select: { id: true, nombre: true } },
          solicitante: { select: { id: true, nombre: true } },
          revisor: { select: { id: true, nombre: true } },
          proveedor: { select: { id: true, nombre: true } },
        },
      })

      await prisma.notificacion.create({
        data: {
          usuarioId: solicitud.solicitanteId,
          titulo: 'Solicitud aprobada',
          mensaje: `Tu solicitud de reposición para "${actualizada.producto.nombre}" fue aprobada por ${auth.nombre}.`,
        },
      })

      return NextResponse.json(actualizada)
    }

    if (body.accion === 'rechazar') {
      const { notaRechazo } = body
      if (!notaRechazo?.trim() || notaRechazo.trim().length < 10) {
        return NextResponse.json({ message: 'El motivo de rechazo debe tener al menos 10 caracteres' }, { status: 400 })
      }

      const solicitud = await prisma.solicitudReposicion.findUnique({
        where: { id: parseInt(id) },
        include: { solicitante: { select: { id: true, nombre: true } } },
      })
      if (!solicitud) {
        return NextResponse.json({ message: 'Solicitud no encontrada' }, { status: 404 })
      }
      if (solicitud.estado !== 'PENDIENTE') {
        return NextResponse.json({ message: 'La solicitud ya fue procesada' }, { status: 400 })
      }

      const actualizada = await prisma.solicitudReposicion.update({
        where: { id: parseInt(id) },
        data: {
          estado: 'RECHAZADA',
          notaRechazo: notaRechazo.trim(),
          revisorId: auth.id,
          revisadoEn: new Date(),
        },
        include: {
          producto: { select: { id: true, nombre: true } },
          solicitante: { select: { id: true, nombre: true } },
        },
      })

      await prisma.notificacion.create({
        data: {
          usuarioId: solicitud.solicitanteId,
          titulo: 'Solicitud rechazada',
          mensaje: `Tu solicitud de reposición para "${actualizada.producto.nombre}" fue rechazada. Motivo: ${notaRechazo.trim()}`,
        },
      })

      return NextResponse.json(actualizada)
    }

    return NextResponse.json({ message: 'Acción inválida. Use "aprobar" o "rechazar"' }, { status: 400 })
  } catch (err: unknown) {
    if (err instanceof Error && 'code' in err && (err as { code: string }).code === 'P2025') {
      return NextResponse.json({ message: 'Solicitud no encontrada' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}

// Mantener PUT para retrocompatibilidad
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = withAuth(req, ['GERENTE', 'ADMIN'])
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    const { estado } = await req.json()

    if (!['APROBADA', 'RECHAZADA'].includes(estado)) {
      return NextResponse.json({ message: 'Estado inválido' }, { status: 400 })
    }

    const solicitud = await prisma.solicitudReposicion.findUnique({ where: { id: parseInt(id) } })
    if (!solicitud) return NextResponse.json({ message: 'Solicitud no encontrada' }, { status: 404 })
    if (solicitud.estado !== 'PENDIENTE') {
      return NextResponse.json({ message: 'La solicitud ya fue revisada' }, { status: 400 })
    }

    const actualizada = await prisma.solicitudReposicion.update({
      where: { id: parseInt(id) },
      data: { estado, revisadoEn: new Date(), revisorId: auth.id },
      include: {
        producto: { select: { id: true, nombre: true } },
        solicitante: { select: { id: true, nombre: true } },
      },
    })

    await prisma.notificacion.create({
      data: {
        usuarioId: solicitud.solicitanteId,
        titulo: `Solicitud ${estado === 'APROBADA' ? 'aprobada' : 'rechazada'}`,
        mensaje: `Tu solicitud de "${actualizada.producto.nombre}" fue ${estado === 'APROBADA' ? 'aprobada' : 'rechazada'}.`,
      },
    })

    return NextResponse.json(actualizada)
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
