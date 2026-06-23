'use client'

import { useState, useEffect, useRef } from 'react'
import { Bell } from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'

interface Notificacion {
  id: number
  titulo: string
  mensaje: string | null
  leida: boolean
  creadoEn: string
}

export default function NotificationBell() {
  const { user } = useAuth()
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([])
  const [noLeidas, setNoLeidas] = useState(0)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!user) return
    fetch('/api/notificaciones')
      .then((r) => r.ok && r.json())
      .then((d) => {
        setNotificaciones(d.notificaciones || [])
        setNoLeidas(d.noLeidas || 0)
      })
      .catch(() => {})
    const interval = setInterval(() => {
      fetch('/api/notificaciones')
        .then((r) => r.ok && r.json())
        .then((d) => {
          setNotificaciones(d.notificaciones || [])
          setNoLeidas(d.noLeidas || 0)
        })
        .catch(() => {})
    }, 30000)
    return () => clearInterval(interval)
  }, [user])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const marcarLeidas = async () => {
    const ids = notificaciones.filter((n) => !n.leida).map((n) => n.id)
    if (ids.length === 0) return
    await fetch('/api/notificaciones', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    })
    setNotificaciones((prev) => prev.map((n) => ({ ...n, leida: true })))
    setNoLeidas(0)
  }

  if (!user) return null

  return (
    <div ref={ref} className="relative">
      <button onClick={() => { setOpen(!open); if (!open) marcarLeidas() }}
        className="relative p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
        <Bell size={20} className="text-gray-600" />
        {noLeidas > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            {noLeidas > 9 ? '9+' : noLeidas}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
          <div className="p-3 border-b border-gray-100">
            <p className="font-semibold text-sm text-gray-700">Notificaciones</p>
          </div>
          {notificaciones.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-6">Sin notificaciones</p>
          ) : notificaciones.slice(0, 20).map((n) => (
            <div key={n.id} className={`p-3 border-b border-gray-50 ${!n.leida ? 'bg-blue-50' : ''}`}>
              <p className="text-sm font-medium text-gray-800">{n.titulo}</p>
              {n.mensaje && <p className="text-xs text-gray-500 mt-0.5">{n.mensaje}</p>}
              <p className="text-[10px] text-gray-400 mt-1">{new Date(n.creadoEn).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
