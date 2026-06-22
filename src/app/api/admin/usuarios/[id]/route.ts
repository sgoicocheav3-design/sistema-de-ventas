import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = withAuth(req, ['ADMIN'])
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    const { nombre, email, rol } = await req.json()

    if (!nombre && !email && !rol) {
      return NextResponse.json({ message: 'Debe enviar al menos un campo a editar' }, { status: 400 })
    }

    if (email) {
      const otro = await prisma.usuario.findFirst({ where: { email, NOT: { id: parseInt(id) } } })
      if (otro) {
        return NextResponse.json({ message: 'Ese email ya está en uso' }, { status: 409 })
      }
    }
    if (rol) {
      const rolesValidos = ['ADMIN', 'VENDEDOR', 'ALMACENERO', 'GERENTE']
      if (!rolesValidos.includes(rol)) {
        return NextResponse.json({ message: `Rol inválido. Valores: ${rolesValidos.join(', ')}` }, { status: 400 })
      }
    }

    const actualizado = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: { ...(nombre && { nombre }), ...(email && { email }), ...(rol && { rol }) },
      select: { id: true, nombre: true, email: true, rol: true },
    })
    return NextResponse.json(actualizado)
  } catch (err: unknown) {
    if (err instanceof Error && 'code' in err && (err as { code: string }).code === 'P2025') {
      return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = withAuth(req, ['ADMIN'])
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    if (parseInt(id) === auth.id) {
      return NextResponse.json({ message: 'No puedes desactivar tu propia cuenta' }, { status: 400 })
    }

    await prisma.usuario.update({ where: { id: parseInt(id) }, data: { activo: false } })
    return NextResponse.json({ message: 'Usuario desactivado correctamente' })
  } catch (err: unknown) {
    if (err instanceof Error && 'code' in err && (err as { code: string }).code === 'P2025') {
      return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
