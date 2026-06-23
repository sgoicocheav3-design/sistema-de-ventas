'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/AuthContext'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import { ClipboardCheck, Plus, Search, X } from 'lucide-react'

interface Solicitud {
  id: number; cantidad: number; estado: string; creadoEn: string
  producto: { id: number; nombre: string; codigo: string; stock: number }
  solicitante: { id: number; nombre: string }
  revisor: { id: number; nombre: string } | null
}

export default function SolicitudesPage() {
  const { user } = useAuth()
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [estado, setEstado] = useState('PENDIENTE')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ productoId: '', cantidad: '' })
  const [error, setError] = useState('')
  const [loadError, setLoadError] = useState('')
  const [productos, setProductos] = useState<Array<{ id: number; nombre: string; stock: number }>>([])

  useEffect(() => {
    fetch('/api/almacen/productos?limit=500').then((r) => r.ok && r.json())
      .then((d) => setProductos(d.productos || [])).catch(() => setLoadError('Error al cargar datos'))
  }, [])

  const fetchData = async (p: number) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(p), limit: '30', estado })
      const res = await fetch(`/api/almacen/solicitudes?${params}`)
      if (res.ok) {
        const d = await res.json()
        setSolicitudes(d.solicitudes); setTotal(d.total); setPage(d.page); setTotalPages(d.totalPages)
      }
      } catch { setLoadError('Error al cargar solicitudes')
      } finally { setLoading(false) }
  }

  useEffect(() => { fetchData(1) }, [estado])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    const res = await fetch('/api/almacen/solicitudes', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.message); return }
    setShowForm(false); setForm({ productoId: '', cantidad: '' }); fetchData(1)
  }

  const estados = ['PENDIENTE', 'APROBADA', 'RECHAZADA', 'RECIBIDA']

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Solicitudes de Reposición</h1>
          <button onClick={() => setShowForm(true)}
            className="ml-auto flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
            <Plus size={18} /> Nueva Solicitud
          </button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Nueva Solicitud</h2>
                  <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded cursor-pointer"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <select value={form.productoId} onChange={(e) => setForm({ ...form, productoId: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" required>
                    <option value="">Seleccionar producto</option>
                    {productos.map((p) => <option key={p.id} value={p.id}>{p.nombre} (Stock: {p.stock})</option>)}
                  </select>
                  <input type="number" value={form.cantidad} onChange={(e) => setForm({ ...form, cantidad: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Cantidad solicitada" min={1} required />
                  {error && <div className="text-red-600 text-sm">{error}</div>}
                  <div className="flex gap-3">
                    <button type="submit" className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 cursor-pointer">Solicitar</button>
                    <button type="button" onClick={() => setShowForm(false)}
                      className="px-4 py-2.5 border rounded-lg hover:bg-gray-50 cursor-pointer">Cancelar</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="flex gap-2 mb-4">
            {estados.map((e) => (
              <button key={e} onClick={() => setEstado(e)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                  estado === e ? 'bg-blue-600 text-white' : 'bg-white border text-gray-600 hover:bg-gray-50'
                }`}>{e}</button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
          ) : loadError ? (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-200">{loadError}</div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Producto</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Cantidad</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Solicitante</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Estado</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {solicitudes.length === 0 ? (
                    <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-500">No hay solicitudes {estado.toLowerCase()}</td></tr>
                  ) : solicitudes.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{s.producto.nombre}</td>
                      <td className="px-4 py-3 text-right font-medium">{Number(s.cantidad)}</td>
                      <td className="px-4 py-3 text-gray-600">{s.solicitante.nombre}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          s.estado === 'APROBADA' ? 'bg-green-100 text-green-700' :
                          s.estado === 'RECHAZADA' ? 'bg-red-100 text-red-700' :
                          s.estado === 'RECIBIDA' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>{s.estado}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-sm">{new Date(s.creadoEn).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
