import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/login', '/recuperar-password']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (publicRoutes.includes(pathname) || pathname.startsWith('/api/auth/')) {
    return NextResponse.next()
  }

  const authRaw = req.cookies.get('auth')?.value
  if (!authRaw) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
    }
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
