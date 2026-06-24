'use client'

import { Loader2 } from 'lucide-react'

interface SpinnerProps {
  texto?: string
}

export default function Spinner({ texto = 'Cargando...' }: SpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Loader2 className="h-8 w-8 animate-spin text-[#6366f1]" />
      <p className="text-sm text-gray-500">{texto}</p>
    </div>
  )
}
