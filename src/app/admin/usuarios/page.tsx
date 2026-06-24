'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/AuthContext'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import Pagination from '@/components/Pagination'
import { Plus, Edit2, Trash2, User, X, AlertTriangle } from 'lucide-react'

interface Usuario {
  id: number; nombre: string; email: string; rol: string; activo: boolean; creadoEn: string
}

const ROLES = ['ADMIN', 'VENDEDOR', 'ALMACENERO', 'GERENTE']

const roleBadge = (rol: string) => {
  const map: Record<string, string> = {
    ADMIN: 'bg-red-100 text-red-700',
    ALMACENERO: 'bg-blue-100 text-blue-700',
    GERENTE: 'bg-purple-100 text-purple-700',
    VENDEDOR: 'bg-green-100 text-green-700',
  }
  return map[rol] || 'bg-gray-100 text-gray-700'
}

export default function UsuariosPage() {
  const { user } = useAuth()
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmPassword: '', rol: 'VENDEDOR' })
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Usuario | null>(null)

  const fetchUsuarios = async (p: number, l: number) => {
    setLoading(true)
    const res = await fetch(`/api/admin/usuarios?page=${p}&limit=${l}`)
    if (res.ok) { const d = await res.json(); setUsuarios(d.usuarios || []); setTotal(d.total); setPage(d.page); setTotalPages(d.totalPages) }
    setLoading(false)
  }

  useEffect(() => { fetchUsuarios(1, limit) }, [limit])

  const handlePageChange = (p: number) => fetchUsuarios(p, limit)
  const handleLimitChange = (l: number) => { setLimit(l); fetchUsuarios(1, l) }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!form.nombre.trim()) errors.nombre = 'El nombre es requerido'
    if (!form.email.trim()) errors.email = 'El email es requerido'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Email inválido'
    if (!editId) {
      if (!form.password) errors.password = 'La contraseña es requerida'
      else if (form.password.length < 6) errors.password = 'Mínimo 6 caracteres'
      if (form.password !== form.confirmPassword) errors.confirmPassword = 'Las contraseñas no coinciden'
    } else {
      if (form.password && form.password.length > 0) {
        if (form.password.length < 6) errors.password = 'Mínimo 6 caracteres'
        if (form.password !== form.confirmPassword) errors.confirmPassword = 'Las contraseñas no coinciden'
      }
    }
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!validateForm()) return

    const url = editId ? `/api/admin/usuarios/${editId}` : '/api/admin/usuarios'
    const method = editId ? 'PUT' : 'POST'
    const body: Record<string, unknown> = { nombre: form.nombre.trim(), email: form.email.trim(), rol: form.rol }
    if (!editId) body.password = form.password
    else if (form.password) body.password = form.password

    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const data = await res.json()
    if (!res.ok) { setError(data.message); return }
    setShowForm(false); setEditId(null); setForm({ nombre: '', email: '', password: '', confirmPassword: '', rol: 'VENDEDOR' }); setFieldErrors({})
    fetchUsuarios(1, limit)
  }

  const confirmDelete = (u: Usuario) => {
    setDeleteTarget(u)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    const res = await fetch(`/api/admin/usuarios/${deleteTarget.id}`, { method: 'DELETE' })
    const data = await res.json()
    if (!res.ok) { setError(data.message); setShowDeleteModal(false); setDeleteTarget(null); return }
    setShowDeleteModal(false); setDeleteTarget(null)
    fetchUsuarios(1, limit)
  }

  const openEdit = (u: Usuario) => {
    setForm({ nombre: u.nombre, email: u.email, password: '', confirmPassword: '', rol: u.rol })
    setEditId(u.id)
    setShowForm(true)
  }

  const openCreate = () => {
    setEditId(null)
    setForm({ nombre: '', email: '', password: '', confirmPassword: '', rol: 'VENDEDOR' })
    setFieldErrors({})
    setError('')
    setShowForm(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Usuarios</h1>
          <button onClick={openCreate}
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
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <input value={form.nombre} onChange={(e) => { setForm({ ...form, nombre: e.target.value }); setFieldErrors({ ...fieldErrors, nombre: '' }) }}
                      className={`w-full px-3 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition ${fieldErrors.nombre ? 'border-red-400' : 'border-gray-300'}`} placeholder="Nombre" />
                    {fieldErrors.nombre && <p className="text-red-500 text-xs mt-1">{fieldErrors.nombre}</p>}
                  </div>
                  <div>
                    <input type="email" value={form.email} onChange={(e) => { setForm({ ...form, email: e.target.value }); setFieldErrors({ ...fieldErrors, email: '' }) }}
                      className={`w-full px-3 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition ${fieldErrors.email ? 'border-red-400' : 'border-gray-300'}`} placeholder="Email" />
                    {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
                  </div>
                  <div>
                    <input type="password" value={form.password} onChange={(e) => { setForm({ ...form, password: e.target.value }); setFieldErrors({ ...fieldErrors, password: '' }) }}
                      className={`w-full px-3 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition ${fieldErrors.password ? 'border-red-400' : 'border-gray-300'}`} placeholder={editId ? 'Nueva contraseña (dejar vacío = no cambiar)' : 'Contraseña'} />
                    {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}
                  </div>
                  <div>
                    <input type="password" value={form.confirmPassword} onChange={(e) => { setForm({ ...form, confirmPassword: e.target.value }); setFieldErrors({ ...fieldErrors, confirmPassword: '' }) }}
                      className={`w-full px-3 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition ${fieldErrors.confirmPassword ? 'border-red-400' : 'border-gray-300'}`} placeholder="Confirmar contraseña" />
                    {fieldErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{fieldErrors.confirmPassword}</p>}
                  </div>
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

          {showDeleteModal && deleteTarget && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                    <AlertTriangle size={24} className="text-red-600" />
                  </div>
                  <h2 className="text-lg font-bold">Desactivar usuario</h2>
                  <p className="text-gray-600 text-sm mt-2">
                    ¿Seguro que deseas desactivar a <strong>{deleteTarget.nombre}</strong>? No podrá iniciar sesión.
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
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Estado</th>
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
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${roleBadge(u.rol)}`}>{u.rol}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${u.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {u.activo ? 'Activo' : 'Inactivo'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right whitespace-nowrap">
                            <button onClick={() => openEdit(u)} className="p-1.5 hover:bg-gray-100 rounded cursor-pointer"><Edit2 size={16} /></button>
                            <button onClick={() => confirmDelete(u)} className="p-1.5 hover:bg-red-50 text-red-500 rounded cursor-pointer"><Trash2 size={16} /></button>
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
