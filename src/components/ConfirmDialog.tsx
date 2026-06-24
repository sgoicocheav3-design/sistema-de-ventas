'use client'

import { AlertTriangle, X } from 'lucide-react'

interface ConfirmDialogProps {
  abierto: boolean
  titulo: string
  mensaje: string
  onConfirmar: () => void
  onCancelar: () => void
  colorConfirmar?: string
  textoConfirmar?: string
  textoCancelar?: string
}

export default function ConfirmDialog({
  abierto,
  titulo,
  mensaje,
  onConfirmar,
  onCancelar,
  colorConfirmar = '#ef4444',
  textoConfirmar = 'Confirmar',
  textoCancelar = 'Cancelar',
}: ConfirmDialogProps) {
  if (!abierto) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onCancelar}>
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h2 className="text-lg font-bold text-gray-800">{titulo}</h2>
          </div>
          <button onClick={onCancelar} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mb-6 text-sm text-gray-600">{mensaje}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancelar}
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200"
          >
            {textoCancelar}
          </button>
          <button
            onClick={onConfirmar}
            className="rounded-lg px-4 py-2 text-sm text-white transition-colors"
            style={{ backgroundColor: colorConfirmar }}
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  )
}
