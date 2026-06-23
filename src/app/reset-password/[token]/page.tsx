'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Lock, ArrowLeft, CheckCircle, AlertCircle, Loader2, ChevronRight, Eye, EyeOff } from 'lucide-react'

type Estado = 'validando' | 'valido' | 'invalido' | 'expirado' | 'usado' | 'guardando' | 'completado'

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>()
  const router = useRouter()
  const [estado, setEstado] = useState<Estado>('validando')
  const [nombre, setNombre] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-blue-600" size={28} />
          <p className="text-gray-400 text-sm">Validando enlace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        <button onClick={() => router.push('/login')}
          className="flex items-center text-gray-400 hover:text-gray-600 mb-8 transition cursor-pointer text-sm">
          <ArrowLeft size={16} className="mr-1.5" /> Volver al inicio
        </button>

        <div className="text-center mb-8">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg ${
            estado === 'completado' ? 'bg-green-600 shadow-green-200' : 'bg-blue-600 shadow-blue-200'
          }`}>
            {estado === 'completado' ? <CheckCircle className="text-white" size={26} /> : <Lock className="text-white" size={26} />}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {estado === 'completado' ? 'Contraseña actualizada' : 'Restablecer contraseña'}
          </h1>
          {nombre && <p className="text-gray-500 text-sm mt-1.5">Hola, {nombre}</p>}
        </div>

        {estado === 'invalido' || estado === 'expirado' || estado === 'usado' ? (
          <div className="text-center space-y-5">
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-100 flex items-center gap-2">
              <AlertCircle size={16} /> {mensaje || 'Enlace inválido'}
            </div>
            <button onClick={() => router.push('/recuperar-password')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 text-sm">
              Solicitar nuevo enlace <ChevronRight size={16} />
            </button>
          </div>
        ) : estado === 'completado' ? (
          <div className="text-center space-y-5">
            <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl border border-green-100">
              Tu contraseña ha sido restablecida exitosamente
            </div>
            <button onClick={() => router.push('/login')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 text-sm">
              Iniciar Sesión <ChevronRight size={16} />
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-gray-500 text-sm text-center">Ingresa tu nueva contraseña</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nueva Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                <input type={showPassword ? 'text' : 'password'} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-gray-50/50 focus:bg-white text-sm"
                  placeholder="Mínimo 6 caracteres" minLength={6} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirmar Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                <input type={showPassword ? 'text' : 'password'} value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-gray-50/50 focus:bg-white text-sm"
                  placeholder="Repite la contraseña" required />
              </div>
            </div>
            {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-xl border border-red-100">{error}</div>}
            <button type="submit" disabled={estado === 'guardando'}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 text-sm">
              {estado === 'guardando' ? (
                <><Loader2 className="animate-spin" size={16} /> Guardando...</>
              ) : (
                <><span>Restablecer Contraseña</span><ChevronRight size={16} /></>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
