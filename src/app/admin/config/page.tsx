'use client'

import { useState, useEffect } from 'react'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import { Settings, Save } from 'lucide-react'

export default function ConfigPage() {
  const [config, setConfig] = useState({ umbral_alerta_visual: 5, umbral_solicitud_reposicion: 5 })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/admin/config').then((r) => r.ok && r.json()).then((d) => {
      if (d) setConfig(d)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true); setMessage('')
    const res = await fetch('/api/admin/config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    })
    const data = await res.json()
    if (res.ok) setMessage('Configuración actualizada correctamente')
    else setMessage(data.message || 'Error al guardar')
    setSaving(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Configuración del Sistema</h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto max-w-2xl">
          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="text-blue-600" size={24} />
                <h2 className="text-lg font-semibold">Parámetros del Sistema</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Umbral de alerta visual de stock
                </label>
                <input type="number" value={config.umbral_alerta_visual}
                  onChange={(e) => setConfig({ ...config, umbral_alerta_visual: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2.5 border rounded-lg outline-none" min={0} />
                <p className="text-xs text-gray-500 mt-1">Productos con stock menor o igual a este valor se mostrarán en alerta</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Umbral de solicitud de reposición
                </label>
                <input type="number" value={config.umbral_solicitud_reposicion}
                  onChange={(e) => setConfig({ ...config, umbral_solicitud_reposicion: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2.5 border rounded-lg outline-none" min={0} />
                <p className="text-xs text-gray-500 mt-1">Stock mínimo para sugerir reposición automática</p>
              </div>

              {message && (
                <div className={`text-sm px-4 py-2.5 rounded-lg ${message.includes('actualizada') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {message}
                </div>
              )}

              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition cursor-pointer">
                <Save size={18} /> {saving ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
