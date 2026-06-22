'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, ArrowLeft } from 'lucide-react'

export default function RecuperarPasswordPage() {
  const [step, setStep] = useState<'email' | 'code' | 'reset' | 'done'>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Error al enviar código')
      setStep('code')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar código')
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = async (e: React.FormEvent) => {
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
    setSubmitting(true)
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword: password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Error al restablecer contraseña')
      setStep('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al restablecer contraseña')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <button
          onClick={() => step === 'email' ? router.push('/login') : setStep('email')}
          className="flex items-center text-gray-500 hover:text-gray-700 mb-6 cursor-pointer"
        >
          <ArrowLeft size={18} className="mr-1" /> Volver
        </button>

        <div className="text-center mb-8">
          <div className="bg-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Mail className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Recuperar Contraseña</h1>
        </div>

        {step === 'email' && (
          <form onSubmit={handleSendCode} className="space-y-5">
            <p className="text-gray-500 text-sm text-center">
              Ingresa tu email y te enviaremos un código de verificación
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            </div>
            {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg">{error}</div>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-lg transition cursor-pointer"
            >
              {submitting ? 'Enviando...' : 'Enviar Código'}
            </button>
          </form>
        )}

        {step === 'code' && (
          <form onSubmit={(e) => { e.preventDefault(); setStep('reset') }} className="space-y-5">
            <p className="text-gray-500 text-sm text-center">
              Se ha enviado un código a <strong>{email}</strong>
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Código de verificación</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-center text-lg tracking-widest"
                placeholder="000000"
                maxLength={6}
                required
              />
            </div>
            {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg">{error}</div>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition cursor-pointer"
            >
              Verificar Código
            </button>
          </form>
        )}

        {step === 'reset' && (
          <form onSubmit={handleReset} className="space-y-5">
            <p className="text-gray-500 text-sm text-center">Ingresa tu nueva contraseña</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg">{error}</div>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-lg transition cursor-pointer"
            >
              {submitting ? 'Guardando...' : 'Restablecer Contraseña'}
            </button>
          </form>
        )}

        {step === 'done' && (
          <div className="text-center space-y-5">
            <div className="bg-green-100 text-green-600 px-4 py-3 rounded-lg">
              Contraseña restablecida correctamente
            </div>
            <button
              onClick={() => router.push('/login')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition cursor-pointer"
            >
              Iniciar Sesión
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
