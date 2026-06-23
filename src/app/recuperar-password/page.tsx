'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <button onClick={() => router.push('/login')}
          className="flex items-center text-gray-500 hover:text-gray-700 mb-6 cursor-pointer">
          <ArrowLeft size={18} className="mr-1" /> Volver
        </button>

        <div className="text-center mb-8">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${enviado ? 'bg-green-600' : 'bg-blue-600'}`}>
            {enviado ? <CheckCircle className="text-white" size={32} /> : <Mail className="text-white" size={32} />}
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Recuperar Contraseña</h1>
        </div>

        {enviado ? (
          <div className="text-center space-y-5">
            <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-lg border border-green-200">
              Si el correo está registrado, recibirás un enlace de recuperación en los próximos minutos.
            </div>
            <p className="text-gray-500 text-xs">
              Revisa también tu carpeta de spam. El enlace expira en 30 minutos.
            </p>
            <button onClick={() => { setEnviado(false); setEmail('') }}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer">
              Enviar de nuevo
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <p className="text-gray-500 text-sm text-center">
              Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required />
              </div>
            </div>
            {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg">{error}</div>}
            <button type="submit" disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-lg transition cursor-pointer">
              {submitting ? 'Enviando...' : 'Enviar Enlace'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
