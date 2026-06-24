'use client'

import { useState, useEffect } from 'react'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import Pagination from '@/components/Pagination'
import { UserCheck, CheckCircle, XCircle, FileText, AlertTriangle } from 'lucide-react'

interface Solicitud {
  id: number; cantidad: number; estado: string; creadoEn: string
  producto: { id: number; nombre: string; codigo: string; stock: number }
  solicitante: { id: number; nombre: string }
  revisor: { id: number; nombre: string } | null
}

interface Proveedor {
  id: number; nombre: string; ruc: string
}

export default function GerenciaSolicitudesPage() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [estado, setEstado] = useState('PENDIENTE')
  const [error, setError] = useState('')
  const [proveedores, setProveedores] = useState<Proveedor[]>([])
  const [accionando, setAccionando] = useState<number | null>(null)
  const [showAprobar, setShowAprobar] = useState<{ id: number } | null>(null)
  const [showRechazar, setShowRechazar] = useState<{ id: number } | null>(null)
  const [approveForm, setApproveForm] = useState({ proveedorId: '' })
  const [rejectForm, setRejectForm] = useState({ motivo: '' })
  const [confirmOverwrite, setConfirmOverwrite] = useState(false)

  useEffect(() => {
    fetch('/api/admin/proveedores').then((r) => r.ok && r.json())
      .then((d) => setProveedores(d.proveedores || d || []))
  }, [])

  const fetchData = async (p: number, l: number) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/gerencia/solicitudes?estado=${estado}&page=${p}&limit=${l}`)
      if (res.ok) {
        const d = await res.json()
        setSolicitudes(d.solicitudes || [])
        setTotal(d.total); setPage(d.page); setTotalPages(d.totalPages)
      } else setError('Error al cargar solicitudes')
    } catch { setError('Error de conexión')
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchData(1, limit) }, [estado, limit])

  const handlePageChange = (p: number) => fetchData(p, limit)
  const handleLimitChange = (l: number) => { setLimit(l); fetchData(1, l) }

  const handleAprobar = async () => {
    if (!showAprobar) return
    if (!approveForm.proveedorId) { setError('Debe seleccionar un proveedor'); return }
    if (rejectForm.motivo.trim() && !confirmOverwrite) {
      setConfirmOverwrite(true)
      return
    }
    setAccionando(showAprobar.id); setError('')
    const res = await fetch(`/api/almacen/solicitudes/${showAprobar.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accion: 'aprobar', proveedorId: approveForm.proveedorId }),
    })
    if (res.ok) {
      setShowAprobar(null); setApproveForm({ proveedorId: '' })
      setConfirmOverwrite(false)
      setSolicitudes((prev) => prev.filter((s) => s.id !== showAprobar.id))
      setTotal((prev) => prev - 1)
    } else {
      const data = await res.json()
      setError(data.message)
    }
    setAccionando(null)
  }

  const handleRechazar = async () => {
    if (!showRechazar) return
    if (!rejectForm.motivo.trim()) { setError('Debe escribir un motivo de rechazo'); return }
    if (rejectForm.motivo.trim().length < 10) { setError('El motivo debe tener al menos 10 caracteres'); return }
    setAccionando(showRechazar.id); setError('')
    const res = await fetch(`/api/almacen/solicitudes/${showRechazar.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accion: 'rechazar', notaRechazo: rejectForm.motivo }),
    })
    if (res.ok) {
      setShowRechazar(null); setRejectForm({ motivo: '' })
      setSolicitudes((prev) => prev.filter((s) => s.id !== showRechazar.id))
      setTotal((prev) => prev - 1)
    } else {
      const data = await res.json()
      setError(data.message)
    }
    setAccionando(null)
  }

  const estados = ['PENDIENTE', 'APROBADA', 'RECHAZADA']

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Gestión de Solicitudes</h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex gap-2 mb-4">
            {estados.map((e) => (
              <button key={e} onClick={() => setEstado(e)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                  estado === e ? 'bg-blue-600 text-white' : 'bg-white border text-gray-600 hover:bg-gray-50'
                }`}>{e}</button>
            ))}
          </div>

          {/* Modal Aprobar */}
          {showAprobar && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <h3 className="text-lg font-bold mb-4">Aprobar Solicitud #{showAprobar.id}</h3>
                {confirmOverwrite ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <AlertTriangle className="text-yellow-600 mt-0.5" size={20} />
                      <p className="text-sm text-yellow-800">Hay una nota de rechazo escrita. ¿Confirmar aprobación?</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={handleAprobar} disabled={accionando === showAprobar.id}
                        className="flex-1 bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 cursor-pointer">Sí, aprobar</button>
                      <button onClick={() => setConfirmOverwrite(false)}
                        className="px-4 py-2.5 border rounded-lg hover:bg-gray-50 cursor-pointer">Volver</button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Proveedor</label>
                      <select value={approveForm.proveedorId} onChange={(e) => setApproveForm({ ...approveForm, proveedorId: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition" required>
                        <option value="">Seleccionar proveedor</option>
                        {proveedores.map((p) => <option key={p.id} value={p.id}>{p.nombre} - {p.ruc}</option>)}
                      </select>
                    </div>
                    {error && <div className="text-red-600 text-sm">{error}</div>}
                    <div className="flex gap-3">
                      <button onClick={handleAprobar} disabled={accionando === showAprobar.id}
                        className="flex-1 bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 cursor-pointer flex items-center justify-center gap-2">
                        <CheckCircle size={16} /> Aprobar
                      </button>
                      <button onClick={() => { setShowAprobar(null); setError(''); setConfirmOverwrite(false) }}
                        className="px-4 py-2.5 border rounded-lg hover:bg-gray-50 cursor-pointer">Cancelar</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Modal Rechazar */}
          {showRechazar && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <h3 className="text-lg font-bold mb-4">Rechazar Solicitud #{showRechazar.id}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Motivo de rechazo</label>
                    <textarea value={rejectForm.motivo} onChange={(e) => setRejectForm({ motivo: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="Escriba el motivo del rechazo (mín. 10 caracteres)" rows={3} required />
                  </div>
                  {error && <div className="text-red-600 text-sm">{error}</div>}
                  <div className="flex gap-3">
                    <button onClick={handleRechazar} disabled={accionando === showRechazar.id}
                      className="flex-1 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 cursor-pointer flex items-center justify-center gap-2">
                      <XCircle size={16} /> Rechazar
                    </button>
                    <button onClick={() => { setShowRechazar(null); setError('') }}
                      className="px-4 py-2.5 border rounded-lg hover:bg-gray-50 cursor-pointer">Cancelar</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-200">{error}</div>
          ) : solicitudes.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <UserCheck className="mx-auto mb-2" size={48} />
              <p>No hay solicitudes {estado.toLowerCase()}</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">ID</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Producto</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Stock</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Solicitado</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Almacenero</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Fecha</th>
                    {estado === 'PENDIENTE' && <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Acciones</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {solicitudes.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-500 text-sm">#{s.id}</td>
                      <td className="px-4 py-3 font-medium">{s.producto.nombre}</td>
                      <td className="px-4 py-3 text-right">{s.producto.stock}</td>
                      <td className="px-4 py-3 text-right font-medium">{Number(s.cantidad)}</td>
                      <td className="px-4 py-3 text-gray-600">{s.solicitante.nombre}</td>
                      <td className="px-4 py-3 text-gray-500 text-sm">{new Date(s.creadoEn).toLocaleString()}</td>
                      {estado === 'PENDIENTE' && (
                        <td className="px-4 py-3 text-right">
                          <div className="flex gap-2 justify-end">
                            <button onClick={() => { setShowAprobar({ id: s.id }); setError(''); setConfirmOverwrite(false); setRejectForm({ motivo: '' }) }}
                              className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 text-sm cursor-pointer">
                              <CheckCircle size={14} /> Aprobar
                            </button>
                            <button onClick={() => { setShowRechazar({ id: s.id }); setError(''); setApproveForm({ proveedorId: '' }) }}
                              className="flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 text-sm cursor-pointer">
                              <XCircle size={14} /> Rechazar
                            </button>
                          </div>
                        </td>
                      )}
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
