import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

const ALLOWED_KEYS: Record<string, string | number> = {
  umbral_alerta_visual: 5,
  umbral_solicitud_reposicion: 5,
}

const EMPRESA_KEYS = [
  'nombre_comercial', 'razon_social', 'ruc', 'direccion_fiscal',
  'direccion_establecimiento', 'telefono', 'correo',
]

export async function GET(req: NextRequest) {
  const auth = withAuth(req, ['ADMIN'])
  if (auth instanceof NextResponse) return auth

  try {
    const allKeys = [...Object.keys(ALLOWED_KEYS), ...EMPRESA_KEYS]
    const configs = await prisma.configSistema.findMany({
      where: { clave: { in: allKeys } },
    })
    const result: Record<string, string | number> = {}
    for (const clave of allKeys) {
      const found = configs.find((c) => c.clave === clave)
      if (EMPRESA_KEYS.includes(clave)) {
        result[clave] = found?.valor || ''
      } else {
        result[clave] = found ? parseInt(found.valor) : (ALLOWED_KEYS[clave] as number)
      }
    }
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const auth = withAuth(req, ['ADMIN'])
  if (auth instanceof NextResponse) return auth

  try {
    const body = await req.json()
    const allKeys = [...Object.keys(ALLOWED_KEYS), ...EMPRESA_KEYS]

    for (const clave of allKeys) {
      if (body[clave] !== undefined) {
        let valor: string
        if (EMPRESA_KEYS.includes(clave)) {
          valor = String(body[clave]).trim()
        } else {
          const val = parseInt(body[clave])
          if (isNaN(val) || val < 0) {
            return NextResponse.json({ message: `"${clave}" debe ser un número entero no negativo` }, { status: 400 })
          }
          valor = String(val)
        }
        await prisma.configSistema.upsert({
          where: { clave },
          update: { valor },
          create: { clave, valor },
        })
      }
    }

    const configs = await prisma.configSistema.findMany({
      where: { clave: { in: allKeys } },
    })
    const result: Record<string, string | number> = {}
    for (const clave of allKeys) {
      const found = configs.find((c) => c.clave === clave)
      if (EMPRESA_KEYS.includes(clave)) {
        result[clave] = found?.valor || ''
      } else {
        result[clave] = found ? parseInt(found.valor) : (ALLOWED_KEYS[clave] as number)
      }
    }

    return NextResponse.json({ message: 'Configuración actualizada', config: result })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
