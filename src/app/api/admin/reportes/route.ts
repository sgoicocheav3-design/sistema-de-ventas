import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const auth = withAuth(req, ['ADMIN'])
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(req.url)
  const desde = searchParams.get('desde')
  const hasta = searchParams.get('hasta')
  const proveedorId = searchParams.get('proveedorId')

  try {
    const dateFilter: Record<string, Date> = {}
    if (desde) dateFilter.gte = new Date(desde + 'T00:00:00.000')
    if (hasta) dateFilter.lte = new Date(hasta + 'T23:59:59.999')

    const where = Object.keys(dateFilter).length ? { creadoEn: dateFilter } : {}

    if (proveedorId) {
      const entradas = await prisma.entradaMercaderia.findMany({
        where: { ...where, proveedorId: parseInt(proveedorId) },
        include: {
          producto: { select: { nombre: true } },
          proveedor: { select: { nombre: true, ruc: true } },
          usuario: { select: { nombre: true } },
        },
        orderBy: { creadoEn: 'desc' },
      })
      return NextResponse.json(entradas)
    }

    const [ventas, entradas] = await Promise.all([
      prisma.venta.findMany({
        where,
        include: {
          usuario: { select: { nombre: true } },
          detalles: {
            include: { producto: { select: { nombre: true, marca: true } } },
          },
        },
        orderBy: { creadoEn: 'desc' },
      }),
      prisma.entradaMercaderia.findMany({
        where,
        include: {
          producto: { select: { nombre: true } },
          proveedor: { select: { nombre: true } },
          usuario: { select: { nombre: true } },
        },
        orderBy: { creadoEn: 'desc' },
      }),
    ])

    return NextResponse.json({ ventas, entradas })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
