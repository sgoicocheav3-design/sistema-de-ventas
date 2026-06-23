import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']

async function getConfig(clave: string, defaultVal: number): Promise<number> {
  const cfg = await prisma.configSistema.findUnique({ where: { clave } })
  return cfg ? parseInt(cfg.valor) : defaultVal
}

export async function GET(req: NextRequest) {
  const auth = withAuth(req)
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')

  try {
    if (type === 'chart') {
      const anio = new Date().getFullYear()
      const meses = MESES.map((mes) => ({ mes, ventas: 0, compras: 0 }))

      try {
        const ventasRaw = await prisma.$queryRaw<Array<{ mes: bigint; total: number }>>`
          SELECT EXTRACT(MONTH FROM "creadoEn") AS mes, SUM("total") AS total
          FROM "ventas"
          WHERE EXTRACT(YEAR FROM "creadoEn") = ${anio}
          GROUP BY mes
        `
        ventasRaw.forEach(({ mes, total }) => {
          meses[Number(mes) - 1].ventas = Number(total)
        })
      } catch {
        // Return empty data
      }

      return NextResponse.json({ anio, meses })
    }

    const umbral = await getConfig('umbral_alerta_visual', 5)
    const ahora = new Date()
    const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1)
    const inicioDia = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate())

    const [
      totalProductos, productosStockBajo, totalProveedores, totalUsuarios,
      ventasHoyAgg, ventasMesAgg, entradasMesAgg, igvMesAgg,
      efectivoAgg, yapePlinAgg,
    ] = await Promise.all([
      prisma.producto.count({ where: { activo: true } }),
      prisma.producto.count({ where: { activo: true, stock: { lte: umbral } } }),
      prisma.proveedor.count({ where: { activo: true } }),
      prisma.usuario.count({ where: { activo: true } }),
      prisma.venta.aggregate({ _sum: { total: true }, where: { creadoEn: { gte: inicioDia } } }),
      prisma.venta.aggregate({ _sum: { total: true }, where: { creadoEn: { gte: inicioMes } } }),
      prisma.entradaMercaderia.aggregate({ _sum: { cantidad: true }, where: { creadoEn: { gte: inicioMes } } }),
      prisma.venta.aggregate({ _sum: { igv: true }, where: { creadoEn: { gte: inicioMes } } }),
      prisma.venta.aggregate({ _sum: { total: true }, where: { creadoEn: { gte: inicioMes }, metodoPago: 'EFECTIVO' } }),
      prisma.venta.aggregate({ _sum: { total: true }, where: { creadoEn: { gte: inicioMes }, metodoPago: { in: ['YAPE', 'PLIN'] } } }),
    ])

    const ventasMes = Number(ventasMesAgg._sum.total || 0)
    const igvMes = Number(igvMesAgg._sum.igv || 0)
    const utilidadMes = ventasMes - igvMes

    return NextResponse.json({
      ventasHoy: Number(ventasHoyAgg._sum.total || 0),
      ventasMes,
      comprasMes: Number(entradasMesAgg._sum.cantidad || 0),
      utilidadMes: utilidadMes > 0 ? utilidadMes : 0,
      igvMes,
      efectivoCaja: Number(efectivoAgg._sum.total || 0),
      yapePlin: Number(yapePlinAgg._sum.total || 0),
      productosStockBajo,
      totalProductos,
      totalProveedores,
      totalUsuarios,
    })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
