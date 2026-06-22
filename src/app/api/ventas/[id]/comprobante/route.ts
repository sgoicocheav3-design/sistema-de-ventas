import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

const CONFIG_KEYS_EMPRESA = [
  'nombre_comercial', 'razon_social', 'ruc', 'direccion_fiscal',
  'direccion_establecimiento', 'telefono', 'correo',
]

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = withAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    const venta = await prisma.venta.findUnique({
      where: { id: parseInt(id) },
      include: {
        detalles: {
          include: { producto: { select: { id: true, nombre: true, marca: true, codigo: true } } },
        },
        usuario: { select: { id: true, nombre: true } },
        cliente: { select: { id: true, dni: true, nombre: true, email: true, telefono: true } },
      },
    })

    if (!venta) {
      return NextResponse.json({ message: 'Venta no encontrada' }, { status: 404 })
    }

    const configs = await prisma.configSistema.findMany({
      where: { clave: { in: CONFIG_KEYS_EMPRESA } },
    })
    const empresa: Record<string, string> = {}
    for (const clave of CONFIG_KEYS_EMPRESA) {
      const found = configs.find((c) => c.clave === clave)
      empresa[clave] = found?.valor || ''
    }

    return NextResponse.json({ venta, empresa })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
