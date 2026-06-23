'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/AuthContext'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import Pagination from '@/components/Pagination'
import ComprobantePago from '@/components/ComprobantePago'
import { Printer, Search, FileText } from 'lucide-react'
import type { VentaData } from '@/components/types'

export default function VentasPage() {
  const { user } = useAuth()
  const [ventas, setVentas] = useState<VentaData[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [q, setQ] = useState('')
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')
  const [showComprobante, setShowComprobante] = useState<VentaData | null>(null)
  const [empresaData, setEmpresaData] = useState<Record<string, string>>({})

  const fetchData = async (p: number, l: number) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(p), limit: String(l) })
      if (q.trim()) params.set('q', q)
      if (desde) params.set('desde', desde)
      if (hasta) params.set('hasta', hasta)
      const res = await fetch(`/api/ventas?${params}`)
      if (res.ok) {
        const d = await res.json()
        setVentas(d.ventas || []); setTotal(d.total); setPage(d.page); setTotalPages(d.totalPages)
      } else setError('Error al cargar ventas')
    } catch { setError('Error de conexión')
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchData(1, limit) }, [q, desde, hasta, limit])

  const handlePageChange = (p: number) => fetchData(p, limit)
  const handleLimitChange = (l: number) => { setLimit(l); fetchData(1, l) }

  const handleReprint = async (venta: VentaData) => {
    try {
      const res = await fetch(`/api/ventas/${venta.id}/comprobante`)
      if (res.ok) {
        const data = await res.json()
        setEmpresaData(data.empresa || {})
      }
    } catch {}
    setShowComprobante(venta)
  }

  if (showComprobante) {
    return (
      <ComprobantePago
        venta={showComprobante}
        empresa={empresaData}
        onVolver={() => setShowComprobante(null)}
        onNuevaVenta={() => setShowComprobante(null)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Historial de Ventas</h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex flex-wrap items-end gap-3 mb-4">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input value={q} onChange={(e) => setQ(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border rounded-lg outline-none text-sm" placeholder="Buscar por N° o cliente..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500">Desde</label>
              <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)}
                className="px-3 py-2 border rounded-lg outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500">Hasta</label>
              <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)}
                className="px-3 py-2 border rounded-lg outline-none" />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-200">{error}</div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">N°</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Cliente</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Vendedor</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Pago</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Total</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Estado</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Fecha</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {ventas.length === 0 ? (
                    <tr><td colSpan={8} className="px-4 py-12 text-center text-gray-500">No hay ventas registradas</td></tr>
                  ) : ventas.map((v) => (
                    <tr key={v.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-sm">{v.numero}</td>
                      <td className="px-4 py-3 text-gray-600">{v.cliente?.nombre || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{v.usuario.nombre}</td>
                      <td className="px-4 py-3 text-gray-600">{v.metodoPago}</td>
                      <td className="px-4 py-3 text-right font-medium">S/ {Number(v.total).toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          v.estado === 'COMPLETADA' ? 'bg-green-100 text-green-700' :
                          v.estado === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                        }`}>{v.estado}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-sm">{new Date(v.creadoEn).toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => handleReprint(v)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm cursor-pointer">
                          <Printer size={14} /> Reimprimir
                        </button>
                      </td>
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
