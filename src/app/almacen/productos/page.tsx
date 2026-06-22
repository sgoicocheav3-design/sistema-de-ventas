'use client'

import { useState, useEffect, useCallback } from 'react'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import { Package, Plus, Edit2, Search, Filter } from 'lucide-react'

interface Categoria {
  id: number; nombre: string
}

interface Producto {
  id: number; codigo: string; nombre: string; marca: string | null
  precio: number; stock: number; activo: boolean
  categoria: { id: number; nombre: string } | null
}

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [catFilter, setCatFilter] = useState('')
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState({ codigo: '', nombre: '', marca: '', categoriaId: '', precio: '', stock: '0' })
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/categorias').then((r) => r.ok && r.json()).then(setCategorias).catch(() => {})
  }, [])

  const fetchProductos = useCallback(async (p: number) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(p), limit: '20' })
      if (q.trim()) params.set('q', q)
      if (catFilter) params.set('categoria', catFilter)
      const res = await fetch(`/api/almacen/productos?${params}`)
      if (res.ok) {
        const data = await res.json()
        setProductos(data.productos)
        setTotal(data.total)
        setPage(data.page)
        setTotalPages(data.totalPages)
      }
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }, [q, catFilter])

  useEffect(() => {
    const t = setTimeout(() => fetchProductos(1), 300)
    return () => clearTimeout(t)
  }, [q, catFilter, fetchProductos])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    const url = editId ? `/api/almacen/productos/${editId}` : '/api/almacen/productos'
    const method = editId ? 'PUT' : 'POST'
    const body: Record<string, string> = { ...form }
    if (!editId && body.stock === '') body.stock = '0'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const data = await res.json()
    if (!res.ok) { setError(data.message); return }
    setShowForm(false); setEditId(null)
    setForm({ codigo: '', nombre: '', marca: '', categoriaId: '', precio: '', stock: '0' })
    fetchProductos(1)
  }

  const openEdit = (p: Producto) => {
    setForm({
      codigo: p.codigo, nombre: p.nombre, marca: p.marca || '',
      categoriaId: String(p.categoria?.id || ''), precio: String(p.precio), stock: String(p.stock),
    })
    setEditId(p.id); setShowForm(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Productos</h1>
          <button onClick={() => { setShowForm(true); setEditId(null); setForm({ codigo: '', nombre: '', marca: '', categoriaId: '', precio: '', stock: '0' }) }}
            className="ml-auto flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
            <Plus size={18} /> Nuevo Producto
          </button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">{editId ? 'Editar' : 'Nuevo'} Producto</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input value={form.codigo} onChange={(e) => setForm({ ...form, codigo: e.target.value })}
                    className="w-full px-3 py-2.5 border rounded-lg outline-none" placeholder="Código" required />
                  <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    className="w-full px-3 py-2.5 border rounded-lg outline-none" placeholder="Nombre" required />
                  <input value={form.marca} onChange={(e) => setForm({ ...form, marca: e.target.value })}
                    className="w-full px-3 py-2.5 border rounded-lg outline-none" placeholder="Marca" />
                  <select value={form.categoriaId} onChange={(e) => setForm({ ...form, categoriaId: e.target.value })}
                    className="w-full px-3 py-2.5 border rounded-lg outline-none">
                    <option value="">Sin categoría</option>
                    {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                  </select>
                  <input type="number" step="0.01" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })}
                    className="w-full px-3 py-2.5 border rounded-lg outline-none" placeholder="Precio" required />
                  {editId && (
                    <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })}
                      className="w-full px-3 py-2.5 border rounded-lg outline-none" placeholder="Stock" />
                  )}
                  {error && <div className="text-red-600 text-sm">{error}</div>}
                  <div className="flex gap-3">
                    <button type="submit" className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 cursor-pointer">
                      {editId ? 'Guardar' : 'Crear'}
                    </button>
                    <button type="button" onClick={() => setShowForm(false)}
                      className="px-4 py-2.5 border rounded-lg hover:bg-gray-50 cursor-pointer">Cancelar</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="flex gap-2 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input value={q} onChange={(e) => setQ(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg outline-none" placeholder="Buscar productos..." />
            </div>
            <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}
              className="px-3 py-2.5 border rounded-lg outline-none">
              <option value="">Todas las categorías</option>
              {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
          ) : (
            <>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Código</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Nombre</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Marca</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Categoría</th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Precio</th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Stock</th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {productos.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-600 text-sm">{p.codigo}</td>
                        <td className="px-4 py-3 font-medium">{p.nombre}</td>
                        <td className="px-4 py-3 text-gray-600">{p.marca || '-'}</td>
                        <td className="px-4 py-3">
                          {p.categoria && <span className="text-xs px-2 py-0.5 rounded bg-gray-100">{p.categoria.nombre}</span>}
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-blue-600">S/ {Number(p.precio).toFixed(2)}</td>
                        <td className="px-4 py-3 text-right">
                          <span className={`font-medium ${p.stock <= 5 ? 'text-red-600' : 'text-green-600'}`}>{p.stock}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => openEdit(p)} className="p-1.5 hover:bg-gray-100 rounded cursor-pointer"><Edit2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                <span>{total} productos en total</span>
                {totalPages > 1 && (
                  <div className="flex gap-2">
                    <button onClick={() => fetchProductos(page - 1)} disabled={page <= 1}
                      className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 cursor-pointer">Anterior</button>
                    <span className="px-2 py-1">Pág {page} de {totalPages}</span>
                    <button onClick={() => fetchProductos(page + 1)} disabled={page >= totalPages}
                      className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 cursor-pointer">Siguiente</button>
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
