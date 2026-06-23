'use client'

import { useState, useEffect } from 'react'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import { Settings, Save, Building2, CheckCircle, AlertCircle } from 'lucide-react'

interface ConfigData {
  umbral_alerta_visual: number
  umbral_solicitud_reposicion: number
  nombre_comercial: string
  razon_social: string
  ruc: string
  direccion_fiscal: string
  direccion_establecimiento: string
  telefono: string
  correo: string
}

export default function ConfigPage() {
  const [config, setConfig] = useState<ConfigData>({
    umbral_alerta_visual: 5,
    umbral_solicitud_reposicion: 5,
    nombre_comercial: '',
    razon_social: '',
    ruc: '',
    direccion_fiscal: '',
    direccion_establecimiento: '',
    telefono: '',
    correo: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    fetch('/api/admin/config')
      .then((r) => r.ok ? r.json() : Promise.reject('Error al cargar'))
      .then((d) => { if (d) setConfig((prev) => ({ ...prev, ...d })) })
      .catch(() => setLoadError('Error al cargar la configuración'))
      .finally(() => setLoading(false))
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

  const update = (key: string, value: string | number) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Configuración del Sistema</h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto max-w-3xl">
          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
          ) : loadError ? (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-200">{loadError}</div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="text-blue-600" size={24} />
                  <h2 className="text-lg font-semibold">Datos de la Empresa</h2>
                </div>
                <p className="text-xs text-gray-500 -mt-4 mb-4">Estos datos aparecerán en el comprobante de venta.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Comercial</label>
                    <input type="text" value={config.nombre_comercial}
                      onChange={(e) => update('nombre_comercial', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ej: Mi Minimarket" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Razón Social</label>
                    <input type="text" value={config.razon_social}
                      onChange={(e) => update('razon_social', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ej: Mi Empresa SAC" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">RUC</label>
                    <input type="text" value={config.ruc}
                      onChange={(e) => update('ruc', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="20XXXXXXXXX" maxLength={11} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección Fiscal</label>
                    <input type="text" value={config.direccion_fiscal}
                      onChange={(e) => update('direccion_fiscal', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Dirección registrada en SUNAT" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección del Establecimiento</label>
                    <input type="text" value={config.direccion_establecimiento}
                      onChange={(e) => update('direccion_establecimiento', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Dirección del local" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input type="text" value={config.telefono}
                      onChange={(e) => update('telefono', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ej: 987654321" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                    <input type="email" value={config.correo}
                      onChange={(e) => update('correo', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ej: contacto@minimarket.com" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="text-blue-600" size={24} />
                  <h2 className="text-lg font-semibold">Parámetros del Sistema</h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Umbral de alerta visual de stock</label>
                  <input type="number" value={config.umbral_alerta_visual}
                    onChange={(e) => update('umbral_alerta_visual', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" min={0} />
                  <p className="text-xs text-gray-500 mt-1">Productos con stock menor o igual a este valor se mostrarán en alerta</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Umbral de solicitud de reposición</label>
                  <input type="number" value={config.umbral_solicitud_reposicion}
                    onChange={(e) => update('umbral_solicitud_reposicion', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" min={0} />
                  <p className="text-xs text-gray-500 mt-1">Stock mínimo para sugerir reposición automática</p>
                </div>
              </div>

              {message && (
                <div className={`flex items-center gap-2 text-sm px-4 py-2.5 rounded-lg border ${message.includes('actualizada') ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                  {message.includes('actualizada') ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
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
