import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

const validarRUC = (ruc: string) => /^\d{11}$/.test(ruc)

export async function GET(req: NextRequest) {
  const auth = withAuth(req, ['ADMIN'])
  if (auth instanceof NextResponse) return auth

  try {
    const proveedores = await prisma.proveedor.findMany({
      where: { activo: true },
      orderBy: { nombre: 'asc' },
    })
    return NextResponse.json(proveedores)
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = withAuth(req, ['ADMIN'])
  if (auth instanceof NextResponse) return auth

  try {
    const { nombre, ruc, contacto } = await req.json()
    if (!nombre || !ruc || !contacto) {
      return NextResponse.json({ message: 'nombre, ruc y contacto son requeridos' }, { status: 400 })
    }
    if (!validarRUC(ruc)) {
      return NextResponse.json({ message: 'El RUC debe tener exactamente 11 dígitos numéricos' }, { status: 400 })
    }

    const existe = await prisma.proveedor.findUnique({ where: { ruc } })
    if (existe) {
      return NextResponse.json({ message: `Ya existe un proveedor con el RUC ${ruc}` }, { status: 409 })
    }

    const nuevo = await prisma.proveedor.create({ data: { nombre, ruc, contacto } })
    return NextResponse.json(nuevo, { status: 201 })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
