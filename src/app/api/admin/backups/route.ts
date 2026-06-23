import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const auth = withAuth(req, ['ADMIN'])
  if (auth instanceof NextResponse) return auth

  const projectRef = process.env.SUPABASE_PROJECT_REF
  const dashboardUrl = projectRef
    ? `https://supabase.com/dashboard/project/${projectRef}`
    : 'https://supabase.com/dashboard'

  return NextResponse.json({
    message: 'Los datos se almacenan en Supabase. Los respaldos se gestionan desde el panel de Supabase.',
    proveedor: 'supabase',
    dashboardUrl,
  })
}
