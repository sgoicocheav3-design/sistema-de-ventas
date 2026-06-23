import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'
import { parsePagination } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const auth = withAuth(req, ['ADMIN'])
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(req.url)
  const { page, limit, skip } = parsePagination(searchParams)

  try {
    const where = { activo: true }
    const [usuarios, total] = await Promise.all([
      prisma.usuario.findMany({
        where,
        select: { id: true, nombre: true, email: true, rol: true, creadoEn: true },
        orderBy: { creadoEn: 'desc' },
        skip,
        take: limit,
      }),
      prisma.usuario.count({ where }),
    ])
    return NextResponse.json({ usuarios, total, page, totalPages: Math.ceil(total / limit) })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = withAuth(req, ['ADMIN'])
  if (auth instanceof NextResponse) return auth

  try {
    const { nombre, email, password, rol } = await req.json()
    if (!nombre || !email || !password || !rol) {
      return NextResponse.json({ message: 'Todos los campos son requeridos' }, { status: 400 })
    }
    const rolesValidos = ['ADMIN', 'VENDEDOR', 'ALMACENERO', 'GERENTE']
    if (!rolesValidos.includes(rol)) {
      return NextResponse.json({ message: `Rol inválido. Valores: ${rolesValidos.join(', ')}` }, { status: 400 })
    }

    const existe = await prisma.usuario.findUnique({ where: { email } })
    if (existe) {
      return NextResponse.json({ message: 'Ya existe un usuario con ese email' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const nuevo = await prisma.usuario.create({
      data: { nombre, email, passwordHash, rol },
      select: { id: true, nombre: true, email: true, rol: true, creadoEn: true },
    })
    return NextResponse.json(nuevo, { status: 201 })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
