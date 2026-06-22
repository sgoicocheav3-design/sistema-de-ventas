import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

const validarDNI = (dni: string) => /^\d{8}$/.test(dni)

export async function GET(req: NextRequest) {
  const auth = withAuth(req)
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')
  const action = searchParams.get('action')

  try {
    if (action === 'exportar') {
      const clientes = await prisma.cliente.findMany({
        where: { activo: true },
        orderBy: { id: 'asc' },
        select: { id: true, dni: true, nombre: true, email: true },
      })
      const header = 'id,dni,nombre,email\n'
      const rows = clientes.map((c) => {
        const escapedNombre = `"${(c.nombre || '').replace(/"/g, '""')}"`
        const escapedEmail = `"${(c.email || '').replace(/"/g, '""')}"`
        return `${c.id},${c.dni},${escapedNombre},${escapedEmail}`
      }).join('\n')

      return new Response('\uFEFF' + header + rows, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename=clientes_${new Date().toISOString().split('T')[0]}.csv`,
        },
      })
    }

    const where: Record<string, unknown> = { activo: true }
    if (q?.trim()) {
      where.OR = [
        { dni: { contains: q.trim() } },
        { nombre: { contains: q.trim(), mode: 'insensitive' } },
      ]
    }

    const clientes = await prisma.cliente.findMany({ where, orderBy: { nombre: 'asc' }, take: 100 })
    return NextResponse.json(clientes)
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = withAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    const { dni, nombre, email, telefono } = await req.json()

    if (!dni || !nombre) {
      return NextResponse.json({ message: 'dni y nombre son requeridos' }, { status: 400 })
    }
    if (!validarDNI(dni)) {
      return NextResponse.json({ message: 'El DNI debe tener exactamente 8 dígitos numéricos' }, { status: 400 })
    }

    const existe = await prisma.cliente.findUnique({ where: { dni } })
    if (existe) {
      if (existe.activo) {
        return NextResponse.json({ message: `Ya existe un cliente con DNI ${dni}`, cliente: existe }, { status: 409 })
      }
      const reactivado = await prisma.cliente.update({
        where: { dni },
        data: { nombre, email: email || null, telefono: telefono || null, activo: true },
      })
      return NextResponse.json(reactivado)
    }

    const nuevo = await prisma.cliente.create({
      data: { dni, nombre, email: email || null, telefono: telefono || null },
    })
    return NextResponse.json(nuevo, { status: 201 })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
