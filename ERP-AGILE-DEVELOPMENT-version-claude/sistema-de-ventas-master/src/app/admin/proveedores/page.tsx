'use client'

import { useState, useEffect } from 'react'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import Pagination from '@/components/Pagination'
import { Plus, Edit2, Trash2, Building, X, Package, AlertTriangle, Search } from 'lucide-react'

interface Proveedor {
  id: number; nombre: string; ruc: string; contacto: string | null
  email: string | null; telefono: string | null; activo: boolean; productosCount: number
}

interface ProductoItem {
  id: number; nombre: string; marca: string | null; precio: number; stock: number; activo: boolean
}

export default function ProveedoresPage() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState({ nombre: '', ruc: '', contacto: '', email: '', telefono: '' })
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Proveedor | null>(null)
  const [showProductModal, setShowProductModal] = useState(false)
  const [productTarget, setProductTarget] = useState<Proveedor | null>(null)
  const [productos, setProductos] = useState<ProductoItem[]>([])
  const [productosLoading, setProductosLoading] = useState(false)
  const [searchProducto, setSearchProducto] = useState('')
  const [allProductos, setAllProductos] = useState<ProductoItem[]>([])
  const [vinculando, setVinculando] = useState(false)

  const allowedColumns = 7

  const fetchData = async (p: number, l: number) => {
    setLoading(true)
    const res = await fetch(`/api/admin/proveedores?page=${p}&limit=${l}`)
    if (res.ok) { const d = await res.json(); setProveedores(d.proveedores || []); setTotal(d.total); setPage(d.page); setTotalPages(d.totalPages) }
    setLoading(false)
  }

  useEffect(() => { fetchData(1, limit) }, [limit])

  const handlePageChange = (p: number) => fetchData(p, limit)
  const handleLimitChange = (l: number) => { setLimit(l); fetchData(1, l) }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!form.nombre.trim()) errors.nombre = 'El nombre es requerido'
    if (!form.ruc.trim()) errors.ruc = 'El RUC es requerido'
    else if (!/^\d{11}$/.test(form.ruc)) errors.ruc = 'El RUC debe tener exactamente 11 dígitos'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!validateForm()) return

    const url = editId ? `/api/admin/proveedores/${editId}` : '/api/admin/proveedores'
    const method = editId ? 'PUT' : 'POST'
    const body: Record<string, unknown> = { nombre: form.nombre.trim(), ruc: form.ruc.trim() }
    if (form.contacto) body.contacto = form.contacto.trim()
    if (form.email) body.email = form.email.trim()
    if (form.telefono) body.telefono = form.telefono.trim()

    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const data = await res.json()
    if (!res.ok) { setError(data.message); return }
    setShowForm(false); setEditId(null); setForm({ nombre: '', ruc: '', contacto: '', email: '', telefono: '' }); setFieldErrors({})
    fetchData(1, limit)
  }

  const confirmDelete = (p: Proveedor) => {
    setDeleteTarget(p)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    const res = await fetch(`/api/admin/proveedores/${deleteTarget.id}`, { method: 'DELETE' })
    if (!res.ok) { const d = await res.json(); setError(d.message); setShowDeleteModal(false); setDeleteTarget(null); return }
    setShowDeleteModal(false); setDeleteTarget(null)
    fetchData(1, limit)
  }

  const openEdit = (p: Proveedor) => {
    setForm({ nombre: p.nombre, ruc: p.ruc, contacto: p.contacto || '', email: p.email || '', telefono: p.telefono || '' })
    setEditId(p.id)
    setShowForm(true)
  }

  const openCreate = () => {
    setEditId(null)
    setForm({ nombre: '', ruc: '', contacto: '', email: '', telefono: '' })
    setFieldErrors({})
    setError('')
    setShowForm(true)
  }

  const openProductos = async (p: Proveedor) => {
    setProductTarget(p)
    setShowProductModal(true)
    setProductosLoading(true)
    try {
      const res = await fetch(`/api/admin/proveedores/${p.id}/productos`)
      if (res.ok) { const d = await res.json(); setProductos(d.productos || []) }
      const resAll = await fetch('/api/almacen/productos?limit=200')
      if (resAll.ok) { const d = await resAll.json(); setAllProductos(d.productos || []) }
    } catch { /* ignore */ }
    setProductosLoading(false)
  }

  const vincularProducto = async (productoId: number) => {
    if (!productTarget) return
    setVinculando(true)
    const res = await fetch(`/api/admin/proveedores/${productTarget.id}/productos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ producto_id: productoId }),
    })
    if (res.ok) {
      const resProd = await fetch(`/api/admin/proveedores/${productTarget.id}/productos`)
      if (resProd.ok) { const d = await resProd.json(); setProductos(d.productos || []) }
      fetchData(1, limit)
    }
    setVinculando(false)
  }

  const desvincularProducto = async (productoId: number) => {
    if (!productTarget) return
    const res = await fetch(`/api/admin/proveedores/${productTarget.id}/productos/${productoId}`, { method: 'DELETE' })
    if (res.ok) {
      setProductos(productos.filter((p) => p.id !== productoId))
      fetchData(1, limit)
    }
  }

  const productosDisponibles = allProductos.filter(
    (p) => p.activo && !productos.some((vp) => vp.id === p.id) &&
      (!searchProducto || p.nombre.toLowerCase().includes(searchProducto.toLowerCase()) || (p.marca && p.marca.toLowerCase().includes(searchProducto.toLowerCase())))
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Proveedores</h1>
          <button onClick={openCreate}
            className="ml-auto flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
            <Plus size={18} /> Nuevo Proveedor
          </button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">{editId ? 'Editar' : 'Nuevo'} Proveedor</h2>
                  <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded cursor-pointer"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <input value={form.nombre} onChange={(e) => { setForm({ ...form, nombre: e.target.value }); setFieldErrors({ ...fieldErrors, nombre: '' }) }}
                      className={`w-full px-3 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition ${fieldErrors.nombre ? 'border-red-400' : 'border-gray-300'}`} placeholder="Nombre *" />
                    {fieldErrors.nombre && <p className="text-red-500 text-xs mt-1">{fieldErrors.nombre}</p>}
                  </div>
                  <div>
                    <input value={form.ruc} onChange={(e) => { const v = e.target.value.replace(/\D/g, '').slice(0, 11); setForm({ ...form, ruc: v }); setFieldErrors({ ...fieldErrors, ruc: '' }) }}
                      className={`w-full px-3 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition ${fieldErrors.ruc ? 'border-red-400' : 'border-gray-300'}`} placeholder="RUC (11 dígitos) *" maxLength={11} />
                    {fieldErrors.ruc && <p className="text-red-500 text-xs mt-1">{fieldErrors.ruc}</p>}
                  </div>
                  <input value={form.contacto} onChange={(e) => setForm({ ...form, contacto: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="Persona de contacto (opcional)" />
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="Email (opcional)" />
                  <input value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="Teléfono (opcional)" />
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

          {/* Delete Modal */}
          {showDeleteModal && deleteTarget && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                    <AlertTriangle size={24} className="text-red-600" />
                  </div>
                  <h2 className="text-lg font-bold">Desactivar proveedor</h2>
                  <p className="text-gray-600 text-sm mt-2">
                    ¿Desactivar a <strong>{deleteTarget.nombre}</strong>? Los productos vinculados conservarán su historial.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => { setShowDeleteModal(false); setDeleteTarget(null) }}
                    className="flex-1 px-4 py-2.5 border rounded-lg hover:bg-gray-50 cursor-pointer">Cancelar</button>
                  <button onClick={handleDelete}
                    className="flex-1 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 cursor-pointer">Sí, desactivar</button>
                </div>
              </div>
            </div>
          )}

          {/* Productos Vinculados Modal */}
          {showProductModal && productTarget && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Productos de {productTarget.nombre}</h2>
                  <button onClick={() => { setShowProductModal(false); setProductTarget(null); setSearchProducto('') }} className="p-1 hover:bg-gray-100 rounded cursor-pointer"><X size={20} /></button>
                </div>

                {productosLoading ? (
                  <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
                ) : (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-600 mb-1">Vincular producto</label>
                      <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input value={searchProducto} onChange={(e) => setSearchProducto(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Buscar producto..." />
                      </div>
                      {searchProducto && (
                        <div className="mt-2 border border-gray-200 rounded-lg max-h-40 overflow-y-auto">
                          {productosDisponibles.length === 0 ? (
                            <p className="p-3 text-sm text-gray-500">No hay productos disponibles</p>
                          ) : (
                            productosDisponibles.slice(0, 10).map((p) => (
                              <button key={p.id} onClick={() => vincularProducto(p.id)} disabled={vinculando}
                                className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 text-sm cursor-pointer disabled:opacity-50">
                                <span>{p.nombre} {p.marca && <span className="text-gray-400">({p.marca})</span>}</span>
                                <span className="text-blue-600 font-medium">+ Vincular</span>
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>

                    <h3 className="text-sm font-medium text-gray-600 mb-2">Productos vinculados ({productos.length})</h3>
                    {productos.length === 0 ? (
                      <p className="text-gray-500 text-sm py-4 text-center">Ningún producto vinculado</p>
                    ) : (
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left px-3 py-2 text-xs font-medium text-gray-500">Producto</th>
                            <th className="text-left px-3 py-2 text-xs font-medium text-gray-500">Marca</th>
                            <th className="text-right px-3 py-2 text-xs font-medium text-gray-500">Stock</th>
                            <th className="text-right px-3 py-2 text-xs font-medium text-gray-500">Acción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {productos.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50">
                              <td className="px-3 py-2">{p.nombre}</td>
                              <td className="px-3 py-2 text-gray-500">{p.marca || '—'}</td>
                              <td className="px-3 py-2 text-right">{p.stock}</td>
                              <td className="px-3 py-2 text-right">
                                <button onClick={() => desvincularProducto(p.id)}
                                  className="text-red-500 hover:text-red-700 text-xs cursor-pointer">Desvincular</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Nombre</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">RUC</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Contacto</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Teléfono</th>
                      <th className="text-center px-4 py-3 text-sm font-medium text-gray-500">Productos</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Estado</th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {proveedores.length === 0 ? (
                      <tr>
                        <td colSpan={allowedColumns} className="px-4 py-12 text-center text-gray-500">No hay proveedores registrados</td>
                      </tr>
                    ) : (
                      proveedores.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                                <Building size={16} className="text-orange-600" />
                              </div>
                              <span className="font-medium">{p.nombre}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-600">{p.ruc}</td>
                          <td className="px-4 py-3 text-gray-600">{p.contacto || '—'}</td>
                          <td className="px-4 py-3 text-gray-600">{p.telefono || '—'}</td>
                          <td className="px-4 py-3 text-center">
                            <button onClick={() => openProductos(p)}
                              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm cursor-pointer">
                              <Package size={14} /> {p.productosCount}
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${p.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {p.activo ? 'Activo' : 'Inactivo'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right whitespace-nowrap">
                            <button onClick={() => openEdit(p)} className="p-1.5 hover:bg-gray-100 rounded cursor-pointer"><Edit2 size={16} /></button>
                            <button onClick={() => confirmDelete(p)} className="p-1.5 hover:bg-red-50 text-red-500 rounded cursor-pointer"><Trash2 size={16} /></button>
                          </td>
                        </tr>
                      ))
                    )}
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
