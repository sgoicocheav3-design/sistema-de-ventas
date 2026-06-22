import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const auth = withAuth(req, ['GERENTE', 'ADMIN'])
  if (auth instanceof NextResponse) return auth

  try {
    const ahora = new Date()
    const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1)

    const [
      totalVentas, totalIngresos, totalCompras,
      solicitudesPendientes, usuariosActivos, bajasMes,
    ] = await Promise.all([
      prisma.venta.count({ where: { creadoEn: { gte: inicioMes } } }),
      prisma.venta.aggregate({ _sum: { total: true }, where: { creadoEn: { gte: inicioMes } } }),
      prisma.entradaMercaderia.aggregate({ _sum: { cantidad: true }, where: { creadoEn: { gte: inicioMes } } }),
      prisma.solicitudReposicion.count({ where: { estado: 'PENDIENTE' } }),
      prisma.usuario.count({ where: { activo: true } }),
      prisma.bajaInventario.aggregate({ _sum: { cantidad: true }, where: { creadoEn: { gte: inicioMes } } }),
    ])

    const ingresos = Number(totalIngresos._sum.total || 0)
    const compras = Number(totalCompras._sum.cantidad || 0)
    const bajas = Number(bajasMes._sum.cantidad || 0)

    return NextResponse.json({
      totalVentas,
      ingresos,
      compras,
      igv: ingresos > 0 ? ingresos - Math.round(ingresos / 1.18 * 100) / 100 : 0,
      utilidad: ingresos > 0 ? ingresos - (ingresos - Math.round(ingresos / 1.18 * 100) / 100) : 0,
      solicitudesPendientes,
      usuariosActivos,
      bajasMes: bajas,
    })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
