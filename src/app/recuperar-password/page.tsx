'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, ArrowLeft, CheckCircle, ChevronRight, Loader2 } from 'lucide-react'

export default function RecuperarPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
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
      setEnviado(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar solicitud')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        <button onClick={() => router.push('/login')}
          className="flex items-center text-gray-400 hover:text-gray-600 mb-8 transition cursor-pointer text-sm">
          <ArrowLeft size={16} className="mr-1.5" /> Volver
        </button>

        <div className="text-center mb-8">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg ${enviado ? 'bg-green-600 shadow-green-200' : 'bg-blue-600 shadow-blue-200'}`}>
            {enviado ? <CheckCircle className="text-white" size={26} /> : <Mail className="text-white" size={26} />}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Recuperar Contraseña</h1>
        </div>

        {enviado ? (
          <div className="text-center space-y-5">
            <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl border border-green-100">
              Si el correo está registrado, recibirás un enlace de recuperación en los próximos minutos.
            </div>
            <p className="text-gray-400 text-xs">
              Revisa también tu carpeta de spam. El enlace expira en 30 minutos.
            </p>
            <button onClick={() => { setEnviado(false); setEmail('') }}
              className="text-sm text-gray-500 hover:text-blue-600 transition cursor-pointer">
              Enviar de nuevo
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-gray-500 text-sm text-center">
              Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
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
                <><span>Enviar Enlace</span><ChevronRight size={16} /></>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
