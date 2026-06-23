'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Lock, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

type Estado = 'validando' | 'valido' | 'invalido' | 'expirado' | 'usado' | 'guardando' | 'completado'

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>()
  const router = useRouter()
  const [estado, setEstado] = useState<Estado>('validando')
  const [nombre, setNombre] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    if (!token) return
    fetch(`/api/auth/reset-password/validate?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.valido) { setEstado('valido'); setNombre(d.nombre || '') }
        else if (d.mensaje?.includes('expirado')) setEstado('expirado')
        else if (d.mensaje?.includes('utilizado')) setEstado('usado')
        else setEstado('invalido')
        setMensaje(d.mensaje || '')
      })
      .catch(() => { setEstado('invalido'); setMensaje('Error al validar el enlace') })
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    setEstado('guardando')
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || 'Error al restablecer')
        setEstado('valido')
        return
      }
      setEstado('completado')
    } catch {
      setError('Error de conexión')
      setEstado('valido')
    }
  }

  if (estado === 'validando') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-blue-600" size={32} />
          <p className="text-gray-500">Validando enlace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <button onClick={() => router.push('/login')}
          className="flex items-center text-gray-500 hover:text-gray-700 mb-6 cursor-pointer">
          <ArrowLeft size={18} className="mr-1" /> Volver al inicio
        </button>

        <div className="text-center mb-8">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${
            estado === 'completado' ? 'bg-green-600' : 'bg-blue-600'
          }`}>
            {estado === 'completado' ? <CheckCircle className="text-white" size={32} /> : <Lock className="text-white" size={32} />}
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {estado === 'completado' ? 'Contraseña actualizada' : 'Restablecer contraseña'}
          </h1>
          {nombre && <p className="text-gray-500 text-sm mt-1">Hola, {nombre}</p>}
        </div>

        {estado === 'invalido' || estado === 'expirado' || estado === 'usado' ? (
          <div className="text-center space-y-5">
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-200 flex items-center gap-2">
              <AlertCircle size={16} /> {mensaje || 'Enlace inválido'}
            </div>
            <button onClick={() => router.push('/recuperar-password')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition cursor-pointer">
              Solicitar nuevo enlace
            </button>
          </div>
        ) : estado === 'completado' ? (
          <div className="text-center space-y-5">
            <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-lg border border-green-200">
              Tu contraseña ha sido restablecida exitosamente
            </div>
            <button onClick={() => router.push('/login')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition cursor-pointer">
              Iniciar Sesión
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <p className="text-gray-500 text-sm text-center">Ingresa tu nueva contraseña</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
              <input type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Mínimo 6 caracteres" minLength={6} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
              <input type="password" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Repite la contraseña" required />
            </div>
            {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg border border-red-200">{error}</div>}
            <button type="submit" disabled={estado === 'guardando'}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-lg transition cursor-pointer">
              {estado === 'guardando' ? 'Guardando...' : 'Restablecer Contraseña'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
