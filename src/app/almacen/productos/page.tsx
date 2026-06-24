'use client'

import { useState, useEffect, useCallback } from 'react'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import Pagination from '@/components/Pagination'
import { Package, Plus, Edit2, Search, Filter, X } from 'lucide-react'

interface Categoria {
  id: number; nombre: string
}

interface Producto {
  id: number; codigo: string; codigoBarras: string | null; nombre: string; marca: string | null
  precio: number; stock: number; activo: boolean
  categoria: { id: number; nombre: string } | null
  alerta_stock?: boolean
}

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [catFilter, setCatFilter] = useState('')
  const [marcaFilter, setMarcaFilter] = useState('')
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [marcas, setMarcas] = useState<string[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState({ codigo: '', nombre: '', marca: '', categoriaId: '', precio: '', stock: '' })
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [loadError, setLoadError] = useState('')
  const [stockBajo, setStockBajo] = useState(false)
  const [tab, setTab] = useState<'activos' | 'inactivos'>('activos')
  const [reactivando, setReactivando] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/categorias').then((r) => r.ok && r.json()).then(setCategorias).catch(() => setLoadError('Error al cargar categorías'))
    fetch('/api/almacen/marcas').then((r) => r.ok && r.json()).then(setMarcas).catch(() => {})
  }, [])

  const fetchProductos = useCallback(async (p: number, l: number) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(p), limit: String(l) })
      if (q.trim()) params.set('q', q)
      if (catFilter) params.set('categoria', catFilter)
      if (marcaFilter) params.set('marca', marcaFilter)
      if (stockBajo) params.set('stockBajo', 'true')
      const res = await fetch(`/api/almacen/productos?${params}`)
      if (res.ok) {
        const data = await res.json()
        setProductos(data.productos || [])
        setTotal(data.total)
        setPage(data.page)
        setTotalPages(data.totalPages)
      }
    } catch {
      setLoadError('Error al cargar productos')
    } finally {
      setLoading(false)
    }
  }, [q, catFilter, marcaFilter])

  const fetchInactivos = useCallback(async (p: number, l: number) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(p), limit: String(l) })
      const res = await fetch(`/api/almacen/productos/inactivos?${params}`)
      if (res.ok) {
        const data = await res.json()
        setProductos(data.productos || [])
        setTotal(data.total)
        setPage(data.page)
        setTotalPages(data.totalPages)
      }
    } catch {
      setLoadError('Error al cargar productos inactivos')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleReactivar = async (id: number) => {
    setReactivando(id)
    try {
      const res = await fetch(`/api/almacen/productos/${id}/reactivar`, { method: 'PATCH' })
      if (res.ok) {
        fetchInactivos(page, limit)
      } else {
        const data = await res.json()
        setLoadError(data.message || 'Error al reactivar')
      }
    } catch {
      setLoadError('Error de conexión')
    } finally {
      setReactivando(null)
    }
  }

  useEffect(() => {
    const t = setTimeout(() => {
      if (tab === 'activos') fetchProductos(1, limit)
      else fetchInactivos(1, limit)
    }, 300)
    return () => clearTimeout(t)
  }, [q, catFilter, marcaFilter, stockBajo, tab, limit, fetchProductos, fetchInactivos])

  const handlePageChange = (p: number) => {
    if (tab === 'activos') fetchProductos(p, limit)
    else fetchInactivos(p, limit)
  }
  const handleLimitChange = (l: number) => {
    setLimit(l)
    if (tab === 'activos') fetchProductos(1, l)
    else fetchInactivos(1, l)
  }

  const validateForm = (): boolean => {
    const errs: Record<string, string> = {}
    const stockVal = form.stock.trim()
    if (stockVal === '') {
      errs.stock = 'El stock es requerido'
    } else {
      const stockNum = Number(stockVal)
      if (!Number.isInteger(stockNum)) errs.stock = 'El stock debe ser un número entero'
      else if (stockNum < 0) errs.stock = 'El stock no puede ser negativo'
    }
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    if (!validateForm()) return
    if (editId !== null && typeof editId !== 'number') {
      setError('Error interno: ID de producto inválido'); return
    }
    const url = editId ? `/api/almacen/productos/${editId}` : '/api/almacen/productos'
    const method = editId ? 'PUT' : 'POST'
    const body: Record<string, string> = { ...form }
    if (body.stock === '') body.stock = '0'
    console.log('[Productos] handleSubmit →', { url, method, editId, body })
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const data = await res.json()
    if (!res.ok) { setError(data.message); return }
    setShowForm(false); setEditId(null)
    setForm({ codigo: '', nombre: '', marca: '', categoriaId: '', precio: '', stock: '' })
    setFieldErrors({})
    fetchProductos(1, limit)
  }

  const openNew = () => {
    setShowForm(true); setEditId(null)
    setForm({ codigo: '', nombre: '', marca: '', categoriaId: '', precio: '', stock: '' })
    setError(''); setFieldErrors({})
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
          <button onClick={openNew}
            className="ml-auto flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
            <Plus size={18} /> Nuevo Producto
          </button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex gap-1 mb-4 border-b border-gray-200">
            <button onClick={() => { setTab('activos'); setQ(''); setCatFilter(''); setMarcaFilter(''); setStockBajo(false) }}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition cursor-pointer ${tab === 'activos' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              Activos
            </button>
            <button onClick={() => setTab('inactivos')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition cursor-pointer ${tab === 'inactivos' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              Inactivos
            </button>
          </div>

          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">{editId ? 'Editar' : 'Nuevo'} Producto</h2>
                  <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded cursor-pointer"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
                    <input value={form.codigo} onChange={(e) => setForm({ ...form, codigo: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                    <input value={form.marca} onChange={(e) => setForm({ ...form, marca: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <select value={form.categoriaId} onChange={(e) => setForm({ ...form, categoriaId: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                      <option value="">Sin categoría</option>
                      {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                    <input type="number" step="0.01" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{editId ? 'Stock' : 'Stock inicial'}</label>
                    <input type="number" value={form.stock} onChange={(e) => {
                      setForm({ ...form, stock: e.target.value })
                      if (fieldErrors.stock) setFieldErrors({ ...fieldErrors, stock: '' })
                    }}
                      className={`w-full px-3 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${fieldErrors.stock ? 'border-red-500' : 'border-gray-300'}`} />
                    {fieldErrors.stock && <p className="text-red-600 text-sm mt-1">{fieldErrors.stock}</p>}
                  </div>
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

          <div className="flex flex-wrap gap-2 mb-4 items-center">
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
            <select value={marcaFilter} onChange={(e) => setMarcaFilter(e.target.value)}
              className="px-3 py-2.5 border rounded-lg outline-none">
              <option value="">Todas las marcas</option>
              {marcas.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <button onClick={() => setStockBajo(!stockBajo)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition cursor-pointer ${
                stockBajo ? 'bg-yellow-100 border-yellow-400 text-yellow-800' : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}>
              <span>⚠️</span> Solo stock bajo
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
          ) : loadError ? (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-200">{loadError}</div>
          ) : tab === 'activos' ? (
            <>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Código</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Cód. Barras</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Nombre</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Marca</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Categoría</th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Precio</th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Stock</th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {productos.length === 0 ? (
                      <tr><td colSpan={8} className="px-4 py-12 text-center text-gray-500">No hay productos activos</td></tr>
                    ) : productos.map((p) => (
                      <tr key={p.id} className={`hover:bg-gray-50 ${p.alerta_stock ? 'bg-yellow-50' : ''}`}>
                        <td className="px-4 py-3 text-gray-600 text-sm">{p.codigo}</td>
                        <td className="px-4 py-3 text-gray-600 text-sm font-mono">{p.codigoBarras || '-'}</td>
                        <td className="px-4 py-3 font-medium">
                          {p.alerta_stock && <span className="mr-1">⚠️</span>}
                          {p.nombre}
                        </td>
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
              </div>

              <Pagination page={page} totalPages={totalPages} total={total} limit={limit}
                onPageChange={handlePageChange} onLimitChange={handleLimitChange} />
            </>
          ) : (
            <>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Código</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Cód. Barras</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Nombre</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Marca</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Categoría</th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Precio</th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Stock</th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {productos.length === 0 ? (
                      <tr><td colSpan={8} className="px-4 py-12 text-center text-gray-500">No hay productos inactivos</td></tr>
                    ) : productos.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-600 text-sm">{p.codigo}</td>
                        <td className="px-4 py-3 text-gray-600 text-sm font-mono">{p.codigoBarras || '-'}</td>
                        <td className="px-4 py-3 font-medium">{p.nombre}</td>
                        <td className="px-4 py-3 text-gray-600">{p.marca || '-'}</td>
                        <td className="px-4 py-3">
                          {p.categoria && <span className="text-xs px-2 py-0.5 rounded bg-gray-100">{p.categoria.nombre}</span>}
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-blue-600">S/ {Number(p.precio).toFixed(2)}</td>
                        <td className="px-4 py-3 text-right">{p.stock}</td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => handleReactivar(p.id)} disabled={reactivando === p.id}
                            className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:bg-green-400 transition cursor-pointer">
                            {reactivando === p.id ? '...' : 'Reactivar'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>

              <Pagination page={page} totalPages={totalPages} total={total} limit={limit}
                onPageChange={handlePageChange} onLimitChange={handleLimitChange} />
            </>
          )}
        </main>
      </div>
    </div>
  )
}
