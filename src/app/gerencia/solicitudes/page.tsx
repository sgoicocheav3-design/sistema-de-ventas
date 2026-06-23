'use client'

import { useState, useEffect } from 'react'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import Pagination from '@/components/Pagination'
import { UserCheck, CheckCircle, XCircle } from 'lucide-react'

interface Solicitud {
  id: number; cantidad: number; estado: string; creadoEn: string
  producto: { id: number; nombre: string; codigo: string; stock: number }
  solicitante: { id: number; nombre: string }
  revisor: { id: number; nombre: string } | null
}

export default function GerenciaSolicitudesPage() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = async (p: number, l: number) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/gerencia/solicitudes?estado=PENDIENTE&page=${p}&limit=${l}`)
      if (res.ok) {
        const d = await res.json()
        setSolicitudes(d.solicitudes || [])
        setTotal(d.total); setPage(d.page); setTotalPages(d.totalPages)
      } else setError('Error al cargar solicitudes')
    } catch { setError('Error de conexión')
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchData(1, limit) }, [limit])

  const handlePageChange = (p: number) => fetchData(p, limit)
  const handleLimitChange = (l: number) => { setLimit(l); fetchData(1, l) }

  const handleReview = async (id: number, estado: string) => {
    const res = await fetch(`/api/almacen/solicitudes/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ estado }),
    })
    if (res.ok) {
      setSolicitudes((prev) => prev.filter((s) => s.id !== id))
      setTotal((prev) => prev - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Revisar Solicitudes</h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-200">{error}</div>
          ) : solicitudes.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <UserCheck className="mx-auto mb-2" size={48} />
              <p>No hay solicitudes pendientes de revisión</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 mb-4">
                {solicitudes.map((s) => (
                  <div key={s.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">{s.producto.nombre}</h3>
                        <p className="text-sm text-gray-500">Código: {s.producto.codigo} — Stock actual: {s.producto.stock}</p>
                        <p className="text-sm text-gray-500">Solicitante: {s.solicitante.nombre} — Cantidad: {Number(s.cantidad)}</p>
                        <p className="text-xs text-gray-400">{new Date(s.creadoEn).toLocaleString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleReview(s.id, 'APROBADA')}
                          className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer">
                          <CheckCircle size={16} /> Aprobar
                        </button>
                        <button onClick={() => handleReview(s.id, 'RECHAZADA')}
                          className="flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer">
                          <XCircle size={16} /> Rechazar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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
