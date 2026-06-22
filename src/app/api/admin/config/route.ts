import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

const ALLOWED_KEYS: Record<string, number> = {
  umbral_alerta_visual: 5,
  umbral_solicitud_reposicion: 5,
}

export async function GET(req: NextRequest) {
  const auth = withAuth(req, ['ADMIN'])
  if (auth instanceof NextResponse) return auth

  try {
    const configs = await prisma.configSistema.findMany({
      where: { clave: { in: Object.keys(ALLOWED_KEYS) } },
    })
    const result: Record<string, number> = {}
    for (const [clave, defaultVal] of Object.entries(ALLOWED_KEYS)) {
      const found = configs.find((c) => c.clave === clave)
      result[clave] = found ? parseInt(found.valor) : defaultVal
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
    const updates: Record<string, string> = {}

    for (const clave of Object.keys(ALLOWED_KEYS)) {
      if (body[clave] !== undefined) {
        const val = parseInt(body[clave])
        if (isNaN(val) || val < 0) {
          return NextResponse.json({ message: `"${clave}" debe ser un número entero no negativo` }, { status: 400 })
        }
        updates[clave] = String(val)
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({
        message: 'Debe enviar al menos un campo: umbral_alerta_visual, umbral_solicitud_reposicion',
      }, { status: 400 })
    }

    for (const [clave, valor] of Object.entries(updates)) {
      await prisma.configSistema.upsert({ where: { clave }, update: { valor }, create: { clave, valor } })
    }

    const result: Record<string, number> = {}
    for (const [clave, defaultVal] of Object.entries(ALLOWED_KEYS)) {
      const cfg = await prisma.configSistema.findUnique({ where: { clave } })
      result[clave] = cfg ? parseInt(cfg.valor) : defaultVal
    }

    return NextResponse.json({ message: 'Configuración actualizada', config: result })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
