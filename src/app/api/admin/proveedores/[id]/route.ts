import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

const validarRUC = (ruc: string) => /^\d{11}$/.test(ruc)

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = withAuth(req, ['ADMIN'])
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    const { nombre, ruc, contacto } = await req.json()

    if (!nombre && !ruc && !contacto) {
      return NextResponse.json({ message: 'Debe enviar al menos un campo a editar' }, { status: 400 })
    }
    if (ruc && !validarRUC(ruc)) {
      return NextResponse.json({ message: 'El RUC debe tener exactamente 11 dígitos numéricos' }, { status: 400 })
    }
    if (ruc) {
      const otro = await prisma.proveedor.findFirst({ where: { ruc, NOT: { id: parseInt(id) } } })
      if (otro) {
        return NextResponse.json({ message: `El RUC ${ruc} ya está registrado en otro proveedor` }, { status: 409 })
      }
    }

    const actualizado = await prisma.proveedor.update({
      where: { id: parseInt(id) },
      data: { ...(nombre && { nombre }), ...(ruc && { ruc }), ...(contacto && { contacto }) },
    })
    return NextResponse.json(actualizado)
  } catch (err: unknown) {
    if (err instanceof Error && 'code' in err && (err as { code: string }).code === 'P2025') {
      return NextResponse.json({ message: 'Proveedor no encontrado' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = withAuth(req, ['ADMIN'])
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    await prisma.proveedor.update({ where: { id: parseInt(id) }, data: { activo: false } })
    return NextResponse.json({ message: 'Proveedor desactivado correctamente' })
  } catch (err: unknown) {
    if (err instanceof Error && 'code' in err && (err as { code: string }).code === 'P2025') {
      return NextResponse.json({ message: 'Proveedor no encontrado' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
