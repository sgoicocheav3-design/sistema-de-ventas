import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get('q') || ''
    const categoria = searchParams.get('categoria') || ''
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200)

    const where: Record<string, unknown> = { activo: true }
    if (q.trim()) {
      where.OR = [
        { nombre: { contains: q.trim(), mode: 'insensitive' } },
        { marca: { contains: q.trim(), mode: 'insensitive' } },
        { codigo: { contains: q.trim(), mode: 'insensitive' } },
      ]
    }
    if (categoria) where.categoriaId = parseInt(categoria)

    const productos = await prisma.producto.findMany({
      where,
      select: { id: true, nombre: true, marca: true, precio: true, stock: true, categoriaId: true },
      orderBy: { nombre: 'asc' },
      take: limit,
    })

    const result = productos.map((p) => ({
      ...p,
      precio: Number(p.precio),
    }))

    return NextResponse.json({ productos: result })
  } catch {
    return NextResponse.json({ productos: [] })
  }
}
