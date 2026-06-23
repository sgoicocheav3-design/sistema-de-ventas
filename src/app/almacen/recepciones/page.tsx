'use client'

import { useState, useEffect } from 'react'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import { Warehouse, CheckCircle } from 'lucide-react'

interface Solicitud {
  id: number; cantidad: number; creadoEn: string
  producto: { id: number; nombre: string; codigo: string }
  solicitante: { id: number; nombre: string }
}

export default function RecepcionesPage() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [proveedores, setProveedores] = useState<Array<{ id: number; nombre: string }>>([])
  const [recepcionando, setRecepcionando] = useState<{ solicitudId: number; proveedorId: string; cantidad: string } | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      fetch('/api/almacen/solicitudes?estado=APROBADA').then((r) => r.ok && r.json())
        .then((d) => setSolicitudes(d.solicitudes || [])),
      fetch('/api/admin/proveedores').then((r) => r.ok && r.json()).then(setProveedores),
    ]).catch(() => setLoadError('Error al cargar datos')).finally(() => setLoading(false))
  }, [])

  const handleRecepcionar = async (solicitudId: number) => {
    if (!recepcionando || !recepcionando.proveedorId || !recepcionando.cantidad) return
    setError('')
    const res = await fetch('/api/almacen/recepciones', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        solicitudId,
        proveedorId: parseInt(recepcionando.proveedorId),
        cantidad: parseInt(recepcionando.cantidad),
      }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.message); return }
    setRecepcionando(null)
    setSolicitudes((prev) => prev.filter((s) => s.id !== solicitudId))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Recepciones</h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
          ) : loadError ? (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-200">{loadError}</div>
          ) : solicitudes.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Warehouse className="mx-auto mb-2" size={48} />
              <p>No hay solicitudes aprobadas pendientes de recepción</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {solicitudes.map((s) => (
                <div key={s.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">{s.producto.nombre}</h3>
                      <p className="text-sm text-gray-500">Código: {s.producto.codigo}</p>
                    </div>
                    <span className="text-lg font-bold text-blue-600">x{Number(s.cantidad)}</span>
                  </div>

                  {recepcionando?.solicitudId === s.id ? (
                    <div className="space-y-3">
                      <select value={recepcionando.proveedorId}
                        onChange={(e) => setRecepcionando({ ...recepcionando, proveedorId: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg outline-none">
                        <option value="">Seleccionar proveedor</option>
                        {proveedores.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                      </select>
                      <input type="number" value={recepcionando.cantidad}
                        onChange={(e) => setRecepcionando({ ...recepcionando, cantidad: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg outline-none" placeholder="Cantidad recibida" min={1} />
                      {error && <div className="text-red-600 text-sm">{error}</div>}
                      <div className="flex gap-2">
                        <button onClick={() => handleRecepcionar(s.id)}
                          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer">
                          <CheckCircle size={16} /> Confirmar Recepción
                        </button>
                        <button onClick={() => setRecepcionando(null)}
                          className="px-4 py-2 border rounded-lg hover:bg-gray-50 cursor-pointer">Cancelar</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setRecepcionando({ solicitudId: s.id, proveedorId: '', cantidad: String(s.cantidad) })}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                      Recepcionar
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
