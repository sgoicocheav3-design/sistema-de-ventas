import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'
import { parsePagination } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const auth = withAuth(req)
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ''
  const categoria = searchParams.get('categoria')
  const marca = searchParams.get('marca') || ''
  const stockBajo = searchParams.get('stockBajo') === 'true'
  const activo = searchParams.get('activo') !== 'false'
  const { page, limit, skip } = parsePagination(searchParams)

  try {
    const where: Record<string, unknown> = { activo }
    if (q.trim()) {
      where.OR = [
        { nombre: { contains: q.trim(), mode: 'insensitive' } },
        { marca: { contains: q.trim(), mode: 'insensitive' } },
      ]
    }
    if (categoria) where.categoriaId = parseInt(categoria)
    if (marca) where.marca = marca
    if (stockBajo) {
      const cfg = await prisma.configSistema.findUnique({ where: { clave: 'umbral_alerta_visual' } })
      const umbral = cfg ? parseInt(cfg.valor) : 5
      where.stock = { lte: umbral }
    }

    const [productos, total] = await Promise.all([
      prisma.producto.findMany({
        where,
        include: { categoria: { select: { id: true, nombre: true } } },
        orderBy: { nombre: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.producto.count({ where }),
    ])

    const cfgUmbral = await prisma.configSistema.findUnique({ where: { clave: 'umbral_alerta_visual' } })
    const umbral = cfgUmbral ? parseInt(cfgUmbral.valor) : 5

    const result = productos.map((p) => ({
      ...p,
      precio: Number(p.precio),
      alerta_stock: p.stock <= umbral,
    }))

    return NextResponse.json({ productos: result, total, page, totalPages: Math.ceil(total / limit) })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}

function validateStock(value: unknown): { valid: false; message: string } | { valid: true; value: number } {
  if (value === undefined || value === null || value === '') {
    return { valid: false, message: 'El stock es requerido' }
  }
  const num = Number(value)
  if (!Number.isInteger(num)) {
    return { valid: false, message: 'El stock debe ser un número entero' }
  }
  if (num < 0) {
    return { valid: false, message: 'El stock no puede ser negativo' }
  }
  return { valid: true, value: num }
}

export async function POST(req: NextRequest) {
  const auth = withAuth(req, ['ADMIN', 'ALMACENERO'])
  if (auth instanceof NextResponse) return auth

  try {
    const { codigo, nombre, marca, categoriaId, precio, stock } = await req.json()

    if (!codigo || !nombre || !precio) {
      return NextResponse.json({ message: 'Código, nombre y precio son requeridos' }, { status: 400 })
    }
    if (isNaN(Number(precio)) || Number(precio) <= 0) {
      return NextResponse.json({ message: 'El precio debe ser un número positivo' }, { status: 400 })
    }

    const stockResult = validateStock(stock)
    if (!stockResult.valid) {
      return NextResponse.json({ message: stockResult.message }, { status: 400 })
    }

    const existeCodigo = await prisma.producto.findUnique({ where: { codigo } })
    if (existeCodigo) {
      return NextResponse.json({ message: `Ya existe un producto con código "${codigo}"` }, { status: 409 })
    }

    const nombreNorm = nombre.trim().replace(/\s+/g, ' ')
    const existeNombre = await prisma.producto.findFirst({
      where: { nombre: { equals: nombreNorm, mode: 'insensitive' }, activo: true },
    })
    if (existeNombre) {
      return NextResponse.json({ message: `Ya existe un producto con el nombre "${nombreNorm}"` }, { status: 409 })
    }

    const producto = await prisma.producto.create({
      data: {
        codigo,
        nombre: nombreNorm,
        marca: marca || null,
        categoriaId: categoriaId ? parseInt(categoriaId) : null,
        precio: Number(precio),
        stock: stockResult.value,
      },
      include: { categoria: { select: { id: true, nombre: true } } },
    })

    const codigoBarras = String(producto.id).padStart(12, '0')
    await prisma.producto.update({
      where: { id: producto.id },
      data: { codigoBarras },
    })

    return NextResponse.json({ ...producto, codigoBarras, precio: Number(producto.precio) }, { status: 201 })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
