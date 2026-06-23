import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/login', '/recuperar-password', '/reset-password']
const publicApiRoutes = ['/api/auth/login', '/api/auth/forgot-password', '/api/auth/reset-password', '/api/auth/logout', '/api/webhooks/']

function isJwtValid(token: string): boolean {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return false
    const payload = JSON.parse(atob(parts[1]))
    if (!payload.id || !payload.rol) return false
    if (payload.exp && Date.now() >= payload.exp * 1000) return false
    return true
  } catch {
    return false
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (
    publicRoutes.includes(pathname) ||
    pathname.startsWith('/reset-password') ||
    publicApiRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.next()
  }

  const authRaw = req.cookies.get('auth')?.value
  if (!authRaw || !isJwtValid(authRaw)) {
    const response = pathname.startsWith('/api/')
      ? NextResponse.json({ message: 'No autorizado' }, { status: 401 })
      : NextResponse.redirect(new URL('/login', req.url))
    if (authRaw) {
      response.cookies.set('auth', '', { path: '/', maxAge: 0 })
    }
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
