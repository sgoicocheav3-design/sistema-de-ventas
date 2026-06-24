'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/AuthContext'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import Pagination from '@/components/Pagination'
import { ClipboardCheck, Send, ShoppingCart, X, Download } from 'lucide-react'

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
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [estado, setEstado] = useState('PENDIENTE')
  const [soloCritico, setSoloCritico] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selected, setSelected] = useState<Record<number, number>>({})
  const [error, setError] = useState('')
  const [loadError, setLoadError] = useState('')
  const [productos, setProductos] = useState<Array<{ id: number; nombre: string; stock: number }>>([])
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')

  useEffect(() => {
    const params = new URLSearchParams({ limit: '500', stockBajo: 'true' })
    fetch(`/api/almacen/productos?${params}`).then((r) => r.ok && r.json())
      .then((d) => {
        const crit = (d.productos || []).filter((p: any) => p.stock <= 15)
        setProductos(crit)
      })
      .catch(() => setLoadError('Error al cargar datos'))
  }, [])

  const fetchData = async (p: number, l: number) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(p), limit: String(l), estado })
      if (soloCritico) params.set('solo_critico', 'true')
      if (desde) params.set('desde', desde)
      if (hasta) params.set('hasta', hasta)
      const res = await fetch(`/api/almacen/solicitudes?${params}`)
      if (res.ok) {
        const d = await res.json()
        setSolicitudes(d.solicitudes || []); setTotal(d.total); setPage(d.page); setTotalPages(d.totalPages)
      }
    } catch { setLoadError('Error al cargar solicitudes')
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchData(1, limit) }, [estado, soloCritico, desde, hasta, limit])

  const exportCSV = () => {
    const headers = ['Producto', 'Cantidad', 'Stock', 'Solicitante', 'Estado', 'Fecha']
    const rows = solicitudes.map((s) => [
      s.producto.nombre, s.cantidad, s.producto.stock, s.solicitante.nombre, s.estado,
      new Date(s.creadoEn).toLocaleString('es-PE'),
    ])
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `solicitudes_${estado}_${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  const handlePageChange = (p: number) => fetchData(p, limit)
  const handleLimitChange = (l: number) => { setLimit(l); fetchData(1, l) }

  const toggleSelect = (id: number) => {
    setSelected((prev) => {
      const next = { ...prev }
      if (next[id]) delete next[id]
      else next[id] = 1
      return next
    })
  }

  const updateCantidad = (id: number, cant: number) => {
    setSelected((prev) => ({ ...prev, [id]: Math.max(1, cant) }))
  }

  const handleSubmit = async () => {
    const items = Object.entries(selected).map(([productoId, cantidad]) => ({
      productoId: parseInt(productoId),
      cantidad_solicitada: cantidad,
    }))
    if (items.length === 0) { setError('Debe seleccionar al menos un producto'); return }
    setError('')
    const res = await fetch('/api/almacen/solicitudes', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.message); return }
    setShowForm(false); setSelected({})
    setProductos((prev) => prev.filter((p) => !selected[p.id]))
    fetchData(1, limit)
  }

  const estados = ['PENDIENTE', 'APROBADA', 'RECHAZADA']

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Solicitudes de Reposición</h1>
          <button onClick={() => setShowForm(true)}
            className="ml-auto flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
            <ShoppingCart size={18} /> Nueva Solicitud
          </button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Nueva Solicitud de Reposición</h2>
                  <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded cursor-pointer"><X size={20} /></button>
                </div>

                {productos.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No hay productos con stock crítico (≤ 15 unidades)</p>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto mb-4">
                    {productos.map((p) => (
                      <div key={p.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${selected[p.id] ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
                        onClick={() => toggleSelect(p.id)}>
                        <input type="checkbox" checked={!!selected[p.id]} readOnly className="w-4 h-4 accent-blue-600" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{p.nombre}</p>
                          <p className="text-sm text-gray-500">Stock actual: {p.stock} unidades</p>
                        </div>
                        {selected[p.id] && (
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <span className="text-sm text-gray-600">Cant:</span>
                            <input type="number" value={selected[p.id]} min={1}
                              onChange={(e) => updateCantidad(p.id, parseInt(e.target.value) || 1)}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-center outline-none" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {error && <div className="text-red-600 text-sm mb-3">{error}</div>}
                <div className="flex gap-3">
                  <button onClick={handleSubmit} disabled={Object.keys(selected).length === 0}
                    className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 cursor-pointer flex items-center justify-center gap-2">
                    <Send size={16} /> Enviar Solicitud ({Object.keys(selected).length} productos)
                  </button>
                  <button onClick={() => setShowForm(false)}
                    className="px-4 py-2.5 border rounded-lg hover:bg-gray-50 cursor-pointer">Cancelar</button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 mb-4">
            {estados.map((e) => (
              <button key={e} onClick={() => setEstado(e)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                  estado === e ? 'bg-blue-600 text-white' : 'bg-white border text-gray-600 hover:bg-gray-50'
                }`}>{e}</button>
            ))}
            <div className="flex items-center gap-2 ml-auto">
              <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)}
                className="px-2 py-2 border rounded-lg text-sm outline-none" />
              <span className="text-gray-400 text-sm">a</span>
              <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)}
                className="px-2 py-2 border rounded-lg text-sm outline-none" />
            </div>
            <button onClick={exportCSV} disabled={solicitudes.length === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white text-gray-600 hover:bg-gray-50 transition cursor-pointer disabled:opacity-50">
              <Download size={16} /> Exportar
            </button>
            <button onClick={() => setSoloCritico(!soloCritico)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition cursor-pointer ${
                soloCritico ? 'bg-orange-100 border-orange-400 text-orange-800' : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}>
              Solo críticos (≤ 15)
            </button>
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
                    <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Stock</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Solicitante</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Estado</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {solicitudes.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-500">No hay solicitudes {estado.toLowerCase()}</td></tr>
                  ) : solicitudes.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{s.producto.nombre}</td>
                      <td className="px-4 py-3 text-right font-medium">{Number(s.cantidad)}</td>
                      <td className="px-4 py-3 text-right text-gray-500">{s.producto.stock}</td>
                      <td className="px-4 py-3 text-gray-600">{s.solicitante.nombre}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          s.estado === 'APROBADA' ? 'bg-green-100 text-green-700' :
                          s.estado === 'RECHAZADA' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>{s.estado}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-sm">{new Date(s.creadoEn).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <Pagination page={page} totalPages={totalPages} total={total} limit={limit}
                onPageChange={handlePageChange} onLimitChange={handleLimitChange} />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
