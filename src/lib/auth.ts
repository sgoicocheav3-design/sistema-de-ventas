import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET no está configurado')
}

export interface JwtPayload {
  id: number
  rol: string
  nombre: string
}

export function signToken(payload: JwtPayload): string {
  const hours = parseInt(process.env.JWT_EXPIRES_IN || '8')
  return jwt.sign(payload, JWT_SECRET, { expiresIn: hours * 3600 })
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization')
  if (!authHeader) return null
  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null
  return parts[1]
}

export function getUserFromRequest(req: NextRequest): JwtPayload | null {
  const token = getTokenFromRequest(req)
  if (!token) return null
  try {
    return verifyToken(token)
  } catch {
    return null
  }
}

export function unauthorized() {
  return NextResponse.json({ message: 'Token requerido' }, { status: 401 })
}

export function forbidden(roles?: string[]) {
  const msg = roles
    ? `Acceso denegado. Se requiere uno de: ${roles.join(', ')}`
    : 'Token inválido o expirado'
  return NextResponse.json({ message: msg }, { status: 403 })
}

export function withAuth(req: NextRequest, allowedRoles?: string[]): JwtPayload | NextResponse {
  const user = getUserFromRequest(req)
  if (!user) return unauthorized()
  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    return forbidden(allowedRoles)
  }
  return user
}
