'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'

export interface Usuario {
  id: number
  nombre: string
  email: string
  rol: string
}

interface AuthContextType {
  user: Usuario | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const saved = sessionStorage.getItem('auth')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setToken(parsed.token)
        setUser(parsed.user)
        fetch('/api/auth/me', { headers: { Authorization: `Bearer ${parsed.token}` } })
          .then((r) => {
            if (!r.ok) { throw new Error('Token inválido') }
            return r.json()
          })
          .then((d) => {
            setUser(d.user)
            setToken(d.token)
            sessionStorage.setItem('auth', JSON.stringify({ user: d.user, token: d.token }))
          })
          .catch(() => {
            sessionStorage.removeItem('auth')
            setUser(null)
            setToken(null)
          })
          .finally(() => setLoading(false))
      } catch {
        sessionStorage.removeItem('auth')
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Error al iniciar sesión')

    setUser(data.user)
    setToken(data.token)
    sessionStorage.setItem('auth', JSON.stringify({ user: data.user, token: data.token }))
  }, [])

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {
      // Ignorar errores de red en logout
    }
    setUser(null)
    setToken(null)
    sessionStorage.removeItem('auth')
    document.cookie = 'auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/login')
  }, [router])

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
