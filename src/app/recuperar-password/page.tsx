'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, ArrowLeft, CheckCircle, Lock, ChevronRight, Loader2, Eye, EyeOff, KeyRound } from 'lucide-react'

type Paso = 'email' | 'codigo' | 'completado'

export default function RecuperarPasswordPage() {
  const [paso, setPaso] = useState<Paso>('email')
  const [email, setEmail] = useState('')
  const [codigo, setCodigo] = useState(['', '', '', ''])
  const [nuevaPassword, setNuevaPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleEmailSubmit = async (e: React.FormEvent) => {
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
      if (!res.ok) throw new Error(data.message || 'Error al enviar solicitud')
      setPaso('codigo')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar solicitud')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCodeChange = (i: number, value: string) => {
    if (value && !/^\d$/.test(value)) return
    const newCode = [...codigo]
    newCode[i] = value
    setCodigo(newCode)
    if (value && i < 3) {
      inputRefs.current[i + 1]?.focus()
    }
  }

  const handleCodeKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !codigo[i] && i > 0) {
      inputRefs.current[i - 1]?.focus()
    }
  }

  const getCodigoCompleto = () => codigo.join('')

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (getCodigoCompleto().length !== 4) {
      setError('Ingresa el código completo de 4 dígitos')
      return
    }
    if (nuevaPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    if (nuevaPassword.length < 7) {
      setError('La contraseña debe tener al menos 7 caracteres')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo: getCodigoCompleto(), nueva_password: nuevaPassword }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Error al restablecer')
      setPaso('completado')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al restablecer')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        <button onClick={() => paso === 'email' ? router.push('/login') : setPaso('email')}
          className="flex items-center text-gray-400 hover:text-gray-600 mb-8 transition cursor-pointer text-sm">
          <ArrowLeft size={16} className="mr-1.5" /> Volver
        </button>

        <div className="text-center mb-8">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg ${
            paso === 'completado' ? 'bg-green-600 shadow-green-200' : 'bg-blue-600 shadow-blue-200'
          }`}>
            {paso === 'completado' ? <CheckCircle className="text-white" size={26} /> :
             paso === 'codigo' ? <KeyRound className="text-white" size={26} /> :
             <Mail className="text-white" size={26} />}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {paso === 'completado' ? 'Contraseña actualizada' :
             paso === 'codigo' ? 'Ingresa tu código' :
             'Recuperar Contraseña'}
          </h1>
        </div>

        {paso === 'email' && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <p className="text-gray-500 text-sm text-center">
              Ingresa tu email y te enviaremos un código de 4 dígitos
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                <input type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-gray-50/50 focus:bg-white text-sm"
                  required />
              </div>
            </div>
            {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-xl border border-red-100">{error}</div>}
            <button type="submit" disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 text-sm">
              {submitting ? (
                <><Loader2 className="animate-spin" size={16} /> Enviando...</>
              ) : (
                <><span>Enviar Código</span><ChevronRight size={16} /></>
              )}
            </button>
          </form>
        )}

        {paso === 'codigo' && (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <p className="text-gray-500 text-sm text-center">
              Ingresa el código de 4 dígitos enviado a <strong className="text-gray-700">{email}</strong>
            </p>
            <div className="flex justify-center gap-3">
              {codigo.map((d, i) => (
                <input key={i} ref={(el) => { inputRefs.current[i] = el }}
                  type="text" inputMode="numeric" maxLength={1} value={d}
                  onChange={(e) => handleCodeChange(i, e.target.value)}
                  onKeyDown={(e) => handleCodeKeyDown(i, e)}
                  className="w-14 h-14 text-center text-2xl font-bold border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-gray-50/50 focus:bg-white"
                  required />
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 mt-2 space-y-4">
              <p className="text-gray-500 text-sm text-center">Ahora ingresa tu nueva contraseña</p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nueva Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                  <input type={showPassword ? 'text' : 'password'} value={nuevaPassword}
                    onChange={(e) => setNuevaPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-gray-50/50 focus:bg-white text-sm"
                    placeholder="Mínimo 7 caracteres" minLength={7} required />
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
            </div>
            {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-xl border border-red-100">{error}</div>}
            <button type="submit" disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 text-sm">
              {submitting ? (
                <><Loader2 className="animate-spin" size={16} /> Restableciendo...</>
              ) : (
                <><span>Restablecer Contraseña</span><ChevronRight size={16} /></>
              )}
            </button>
          </form>
        )}

        {paso === 'completado' && (
          <div className="text-center space-y-5">
            <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl border border-green-100">
              Tu contraseña ha sido restablecida exitosamente
            </div>
            <button onClick={() => router.push('/login')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 text-sm">
              Iniciar Sesión <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
