import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'
import { parsePagination } from '@/lib/utils'

const validarRUC = (ruc: string) => /^\d{11}$/.test(ruc)

export async function GET(req: NextRequest) {
  const auth = withAuth(req, ['ADMIN', 'ALMACENERO'])
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(req.url)
  const { page, limit, skip } = parsePagination(searchParams)
  const activoParam = searchParams.get('activo')

  try {
    const where = activoParam ? { activo: activoParam === 'true' } : { activo: true }
    const [proveedores, total] = await Promise.all([
      prisma.proveedor.findMany({
        where,
        orderBy: { nombre: 'asc' },
        skip,
        take: limit,
        include: { _count: { select: { productos: true } } },
      }),
      prisma.proveedor.count({ where }),
    ])
    const result = proveedores.map(({ _count, ...p }) => ({ ...p, productosCount: _count.productos }))
    return NextResponse.json({ proveedores: result, total, page, totalPages: Math.ceil(total / limit) })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = withAuth(req, ['ADMIN'])
  if (auth instanceof NextResponse) return auth

  try {
    const { nombre, ruc, contacto, email, telefono } = await req.json()
    if (!nombre || !ruc) {
      return NextResponse.json({ message: 'nombre y ruc son requeridos' }, { status: 400 })
    }
    if (!validarRUC(ruc)) {
      return NextResponse.json({ message: 'El RUC debe tener exactamente 11 dígitos numéricos' }, { status: 400 })
    }

    const existe = await prisma.proveedor.findUnique({ where: { ruc } })
    if (existe) {
      return NextResponse.json({ message: `Ya existe un proveedor con el RUC ${ruc}` }, { status: 409 })
    }

    const nuevo = await prisma.proveedor.create({ data: { nombre, ruc, contacto: contacto || null, email: email || null, telefono: telefono || null } })
    return NextResponse.json(nuevo, { status: 201 })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
