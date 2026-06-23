'use client'

import { useState, useEffect } from 'react'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import Pagination from '@/components/Pagination'
import { ClipboardList, Plus, Search, X } from 'lucide-react'

interface Entrada {
  id: number; cantidad: number; creadoEn: string
  producto: { id: number; nombre: string; codigo: string }
  proveedor: { id: number; nombre: string; ruc: string }
  usuario: { id: number; nombre: string }
}

export default function EntradasPage() {
  const [entradas, setEntradas] = useState<Entrada[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ productoId: '', proveedorId: '', cantidad: '' })
  const [error, setError] = useState('')
  const [loadError, setLoadError] = useState('')
  const [productos, setProductos] = useState<Array<{ id: number; nombre: string }>>([])
  const [proveedores, setProveedores] = useState<Array<{ id: number; nombre: string }>>([])

  useEffect(() => {
    Promise.all([
      fetch('/api/almacen/productos?limit=500').then((r) => r.ok && r.json()).then((d) => setProductos(d.productos || [])),
      fetch('/api/admin/proveedores').then((r) => r.ok && r.json()).then((d) => setProveedores(d.proveedores || d || [])),
    ]).catch(() => setLoadError('Error al cargar datos iniciales'))
  }, [])

  const fetchData = async (p: number, l: number) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(p), limit: String(l) })
      if (desde) params.set('desde', desde)
      if (hasta) params.set('hasta', hasta)
      const res = await fetch(`/api/almacen/entradas?${params}`)
      if (res.ok) {
        const d = await res.json()
        setEntradas(d.entradas || []); setTotal(d.total); setPage(d.page); setTotalPages(d.totalPages)
      }
      } catch { setLoadError('Error al cargar entradas')
      } finally { setLoading(false) }
  }

  useEffect(() => { fetchData(1, limit) }, [desde, hasta, limit])

  const handlePageChange = (p: number) => fetchData(p, limit)
  const handleLimitChange = (l: number) => { setLimit(l); fetchData(1, l) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    const res = await fetch('/api/almacen/entradas', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.message); return }
    setShowForm(false); setForm({ productoId: '', proveedorId: '', cantidad: '' }); fetchData(1, limit)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Entradas de Mercadería</h1>
          <button onClick={() => setShowForm(true)}
            className="ml-auto flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
            <Plus size={18} /> Nueva Entrada
          </button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Nueva Entrada</h2>
                  <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded cursor-pointer"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <select value={form.productoId} onChange={(e) => setForm({ ...form, productoId: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" required>
                    <option value="">Seleccionar producto</option>
                    {productos.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                  </select>
                  <select value={form.proveedorId} onChange={(e) => setForm({ ...form, proveedorId: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" required>
                    <option value="">Seleccionar proveedor</option>
                    {proveedores.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                  </select>
                  <input type="number" value={form.cantidad} onChange={(e) => setForm({ ...form, cantidad: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Cantidad" min={1} required />
                  {error && <div className="text-red-600 text-sm">{error}</div>}
                  <div className="flex gap-3">
                    <button type="submit" className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 cursor-pointer">Registrar</button>
                    <button type="button" onClick={() => setShowForm(false)}
                      className="px-4 py-2.5 border rounded-lg hover:bg-gray-50 cursor-pointer">Cancelar</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-end gap-3 mb-4">
            <div><label className="block text-xs font-medium text-gray-500">Desde</label>
              <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)}
                className="px-3 py-2 border rounded-lg outline-none" /></div>
            <div><label className="block text-xs font-medium text-gray-500">Hasta</label>
              <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)}
                className="px-3 py-2 border rounded-lg outline-none" /></div>
            <button onClick={() => fetchData(1, limit)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
              <Search size={16} /> Filtrar
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
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Proveedor</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Cantidad</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Registró</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {entradas.length === 0 ? (
                    <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-500">No hay entradas registradas</td></tr>
                  ) : entradas.map((e) => (
                    <tr key={e.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{e.producto.nombre}</td>
                      <td className="px-4 py-3 text-gray-600">{e.proveedor.nombre}</td>
                      <td className="px-4 py-3 text-right font-medium text-green-600">+{Number(e.cantidad)}</td>
                      <td className="px-4 py-3 text-gray-600">{e.usuario.nombre}</td>
                      <td className="px-4 py-3 text-gray-500 text-sm">{new Date(e.creadoEn).toLocaleString()}</td>
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
