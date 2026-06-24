'use client'

import { useState, useCallback } from 'react'

interface ToastState {
  visible: boolean
  mensaje: string
  tipo: 'exito' | 'error'
}

export default function useToast() {
  const [toast, setToast] = useState<ToastState>({ visible: false, mensaje: '', tipo: 'exito' })

  const mostrarExito = useCallback((mensaje: string) => {
    setToast({ visible: true, mensaje, tipo: 'exito' })
  }, [])

  const mostrarError = useCallback((mensaje: string) => {
    setToast({ visible: true, mensaje, tipo: 'error' })
  }, [])

  const cerrar = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }))
  }, [])

  return { toast, mostrarExito, mostrarError, cerrar }
}
