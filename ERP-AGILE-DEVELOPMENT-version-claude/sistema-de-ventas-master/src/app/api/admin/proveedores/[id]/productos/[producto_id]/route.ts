import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string; producto_id: string }> }) {
  const auth = withAuth(req, ['ADMIN'])
  if (auth instanceof NextResponse) return auth

  try {
    const { id, producto_id } = await params
    await prisma.proveedorProducto.delete({
      where: { proveedorId_productoId: { proveedorId: parseInt(id), productoId: parseInt(producto_id) } },
    })
    return NextResponse.json({ message: 'Vínculo eliminado' })
  } catch (err: unknown) {
    if (err instanceof Error && 'code' in err && (err as { code: string }).code === 'P2025') {
      return NextResponse.json({ message: 'Vínculo no encontrado' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
