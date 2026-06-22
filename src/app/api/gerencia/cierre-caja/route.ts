import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const auth = withAuth(req, ['GERENTE', 'ADMIN'])
  if (auth instanceof NextResponse) return auth

  try {
    const ahora = new Date()
    const inicioDia = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate())

    const [ventasDelDia, totalVentasMes, totalComprasMes, usuarios] = await Promise.all([
      prisma.venta.findMany({
        where: { creadoEn: { gte: inicioDia } },
        include: {
          usuario: { select: { nombre: true } },
          detalles: {
            include: { producto: { select: { nombre: true, precio: true } } },
          },
        },
        orderBy: { creadoEn: 'desc' },
      }),
      prisma.venta.aggregate({ _sum: { total: true }, where: { creadoEn: { gte: new Date(ahora.getFullYear(), ahora.getMonth(), 1) } } }),
      prisma.entradaMercaderia.aggregate({ _sum: { cantidad: true }, where: { creadoEn: { gte: new Date(ahora.getFullYear(), ahora.getMonth(), 1) } } }),
      prisma.usuario.findMany({ where: { activo: true }, select: { id: true, nombre: true, rol: true } }),
    ])

    const ventasPorMetodo = {
      EFECTIVO: ventasDelDia.filter((v) => v.metodoPago === 'EFECTIVO').reduce((s, v) => s + Number(v.total), 0),
      YAPE: ventasDelDia.filter((v) => v.metodoPago === 'YAPE').reduce((s, v) => s + Number(v.total), 0),
      PLIN: ventasDelDia.filter((v) => v.metodoPago === 'PLIN').reduce((s, v) => s + Number(v.total), 0),
      TARJETA: ventasDelDia.filter((v) => v.metodoPago === 'TARJETA').reduce((s, v) => s + Number(v.total), 0),
      CHEQUE: ventasDelDia.filter((v) => v.metodoPago === 'CHEQUE').reduce((s, v) => s + Number(v.total), 0),
      TRANSFERENCIA: ventasDelDia.filter((v) => v.metodoPago === 'TRANSFERENCIA').reduce((s, v) => s + Number(v.total), 0),
    }

    const totalEfectivo = ventasPorMetodo.EFECTIVO
    const totalDigital = ventasPorMetodo.YAPE + ventasPorMetodo.PLIN + ventasPorMetodo.TARJETA + ventasPorMetodo.CHEQUE + ventasPorMetodo.TRANSFERENCIA

    return NextResponse.json({
      fecha: ahora.toISOString(),
      ventas: ventasDelDia,
      totalVentasDia: ventasDelDia.reduce((s, v) => s + Number(v.total), 0),
      totalVentasMes: Number(totalVentasMes._sum.total || 0),
      totalComprasMes: Number(totalComprasMes._sum.cantidad || 0),
      ventasPorMetodo,
      totalEfectivo,
      totalDigital,
      usuarios,
    })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
