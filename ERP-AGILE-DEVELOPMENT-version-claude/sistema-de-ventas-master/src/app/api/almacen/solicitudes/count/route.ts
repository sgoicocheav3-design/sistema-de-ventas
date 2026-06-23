import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const estado = searchParams.get('estado') || 'APROBADA'

    const count = await prisma.solicitudReposicion.count({
      where: { estado },
    })

    return NextResponse.json({ count })
  } catch {
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}
