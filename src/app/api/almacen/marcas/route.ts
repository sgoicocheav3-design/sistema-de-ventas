import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const marcas = await prisma.producto.findMany({
      where: { marca: { not: null }, activo: true },
      select: { marca: true },
      distinct: ['marca'],
      orderBy: { marca: 'asc' },
    })
    const result = marcas.map((p) => p.marca).filter(Boolean) as string[]
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
