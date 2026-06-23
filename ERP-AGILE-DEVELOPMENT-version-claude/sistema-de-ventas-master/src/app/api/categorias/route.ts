import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categorias = await prisma.categoria.findMany({
      orderBy: { nombre: 'asc' },
      select: { id: true, nombre: true },
    })
    return NextResponse.json(categorias)
  } catch (error) {
    console.error('Error fetching categorias:', error)
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
