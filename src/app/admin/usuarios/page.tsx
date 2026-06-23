'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/AuthContext'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import { Plus, Edit2, Trash2, User, X } from 'lucide-react'

interface Usuario {
  id: number; nombre: string; email: string; rol: string; creadoEn: string
}

const ROLES = ['ADMIN', 'VENDEDOR', 'ALMACENERO', 'GERENTE']

export default function UsuariosPage() {
  const { user } = useAuth()
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState({ nombre: '', email: '', password: '', rol: 'VENDEDOR' })
  const [error, setError] = useState('')

  const fetchUsuarios = async () => {
    const res = await fetch('/api/admin/usuarios')
    if (res.ok) setUsuarios(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchUsuarios() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const url = editId ? `/api/admin/usuarios/${editId}` : '/api/admin/usuarios'
    const method = editId ? 'PUT' : 'POST'
    const body: Record<string, string> = { nombre: form.nombre, email: form.email, rol: form.rol }
    if (!editId) body.password = form.password

    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const data = await res.json()
    if (!res.ok) { setError(data.message); return }
    setShowForm(false); setEditId(null); setForm({ nombre: '', email: '', password: '', rol: 'VENDEDOR' })
    fetchUsuarios()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Desactivar este usuario?')) return
    const res = await fetch(`/api/admin/usuarios/${id}`, { method: 'DELETE' })
    const data = await res.json()
    if (!res.ok) { alert(data.message); return }
    fetchUsuarios()
  }

  const openEdit = (u: Usuario) => {
    setForm({ nombre: u.nombre, email: u.email, password: '', rol: u.rol })
    setEditId(u.id)
    setShowForm(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Usuarios</h1>
          <button onClick={() => { setShowForm(true); setEditId(null); setForm({ nombre: '', email: '', password: '', rol: 'VENDEDOR' }) }}
            className="ml-auto flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
            <Plus size={18} /> Nuevo Usuario
          </button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">{editId ? 'Editar' : 'Nuevo'} Usuario</h2>
                  <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded cursor-pointer"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Nombre" required />
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Email" required />
                  {!editId && (
                    <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Contraseña" required />
                  )}
                  <select value={form.rol} onChange={(e) => setForm({ ...form, rol: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                    {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
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
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Email</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Rol</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Creado</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {usuarios.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center text-gray-500">No hay usuarios registrados</td>
                    </tr>
                  ) : (
                  usuarios.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                            <User size={16} className="text-blue-600" />
                          </div>
                          <span className="font-medium">{u.nombre}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">{u.rol}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-sm">{new Date(u.creadoEn).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button onClick={() => openEdit(u)} className="p-1.5 hover:bg-gray-100 rounded cursor-pointer"><Edit2 size={16} /></button>
                        <button onClick={() => handleDelete(u.id)} className="p-1.5 hover:bg-red-50 text-red-500 rounded cursor-pointer"><Trash2 size={16} /></button>
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
