import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/login', '/recuperar-password', '/reset-password']
const publicApiRoutes = ['/api/auth/login', '/api/auth/forgot-password', '/api/auth/reset-password', '/api/auth/logout', '/api/webhooks/']

const routePermissions: Array<{ prefix: string; roles: string[] }> = [
  { prefix: '/admin/usuarios', roles: ['ADMIN'] },
  { prefix: '/admin/proveedores', roles: ['ADMIN'] },
  { prefix: '/admin', roles: ['ADMIN'] },
  { prefix: '/pos', roles: ['VENDEDOR', 'ADMIN'] },
  { prefix: '/ventas', roles: ['VENDEDOR', 'ADMIN', 'GERENTE', 'ALMACENERO'] },
  { prefix: '/almacen/solicitudes', roles: ['ALMACENERO', 'ADMIN', 'GERENTE'] },
  { prefix: '/almacen', roles: ['ALMACENERO', 'ADMIN'] },
  { prefix: '/gerencia', roles: ['GERENTE', 'ADMIN'] },
]

function decodeToken(token: string): { id: number; rol: string } | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = JSON.parse(atob(parts[1]))
    if (!payload.id || !payload.rol) return null
    if (payload.exp && Date.now() >= payload.exp * 1000) return null
    return { id: payload.id, rol: payload.rol }
  } catch {
    return null
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
  const decoded = authRaw ? decodeToken(authRaw) : null

  if (!decoded) {
    const response = pathname.startsWith('/api/')
      ? NextResponse.json({ message: 'Token requerido' }, { status: 401 })
      : NextResponse.redirect(new URL('/login', req.url))
    if (authRaw) {
      response.cookies.set('auth', '', { path: '/', maxAge: 0 })
    }
    return response
  }

  for (const { prefix, roles } of routePermissions) {
    if (pathname === prefix || pathname.startsWith(prefix + '/')) {
      if (!roles.includes(decoded.rol)) {
        if (pathname.startsWith('/api/')) {
          return NextResponse.json({ message: 'Acceso no autorizado' }, { status: 403 })
        }
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
      break
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
