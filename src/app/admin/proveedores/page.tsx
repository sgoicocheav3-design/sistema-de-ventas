'use client'

import { useState, useEffect } from 'react'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import { Plus, Edit2, Trash2, Building, X } from 'lucide-react'

interface Proveedor {
  id: number; nombre: string; ruc: string; contacto: string; activo: boolean
}

export default function ProveedoresPage() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState({ nombre: '', ruc: '', contacto: '' })
  const [error, setError] = useState('')

  const fetchData = async () => {
    const res = await fetch('/api/admin/proveedores')
    if (res.ok) { const d = await res.json(); setProveedores(Array.isArray(d) ? d : []) }
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const url = editId ? `/api/admin/proveedores/${editId}` : '/api/admin/proveedores'
    const method = editId ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    const data = await res.json()
    if (!res.ok) { setError(data.message); return }
    setShowForm(false); setEditId(null); setForm({ nombre: '', ruc: '', contacto: '' })
    fetchData()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Desactivar este proveedor?')) return
    const res = await fetch(`/api/admin/proveedores/${id}`, { method: 'DELETE' })
    if (!res.ok) { const d = await res.json(); alert(d.message); return }
    fetchData()
  }

  const openEdit = (p: Proveedor) => {
    setForm({ nombre: p.nombre, ruc: p.ruc, contacto: p.contacto })
    setEditId(p.id)
    setShowForm(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Proveedores</h1>
          <button onClick={() => { setShowForm(true); setEditId(null); setForm({ nombre: '', ruc: '', contacto: '' }) }}
            className="ml-auto flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
            <Plus size={18} /> Nuevo Proveedor
          </button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">{editId ? 'Editar' : 'Nuevo'} Proveedor</h2>
                  <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded cursor-pointer"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Nombre" required />
                  <input value={form.ruc} onChange={(e) => setForm({ ...form, ruc: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="RUC (11 dígitos)" maxLength={11} required />
                  <input value={form.contacto} onChange={(e) => setForm({ ...form, contacto: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Contacto" required />
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
                    <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {proveedores.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-12 text-center text-gray-500">No hay proveedores registrados</td>
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
                      <td className="px-4 py-3 text-gray-600">{p.contacto}</td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button onClick={() => openEdit(p)} className="p-1.5 hover:bg-gray-100 rounded cursor-pointer"><Edit2 size={16} /></button>
                        <button onClick={() => handleDelete(p.id)} className="p-1.5 hover:bg-red-50 text-red-500 rounded cursor-pointer"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  )                  ))}
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
