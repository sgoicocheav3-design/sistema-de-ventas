'use client'

import { useEffect } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

interface ToastProps {
  mensaje: string
  tipo: 'exito' | 'error'
  visible: boolean
  onCerrar: () => void
}

export default function Toast({ mensaje, tipo, visible, onCerrar }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onCerrar, 4000)
      return () => clearTimeout(timer)
    }
  }, [visible, onCerrar])

  if (!visible) return null

  return (
    <div className="fixed right-4 top-4 z-[100] animate-slide-in">
      <div
        className={`flex items-center gap-3 rounded-xl px-5 py-3 shadow-lg ${
          tipo === 'exito' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}
      >
        {tipo === 'exito' ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <XCircle className="h-5 w-5 text-red-500" />
        )}
        <span className="text-sm font-medium">{mensaje}</span>
        <button onClick={onCerrar} className="ml-2 opacity-60 hover:opacity-100">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
