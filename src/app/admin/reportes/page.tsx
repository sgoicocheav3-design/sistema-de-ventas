'use client'

import { useState } from 'react'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import { BarChart3, Search, FileText } from 'lucide-react'

const ROWS_PER_PAGE = 10

export default function ReportesPage() {
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')
  const [data, setData] = useState<{ ventas: Array<Record<string, unknown>>; entradas: Array<Record<string, unknown>> } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ventasPage, setVentasPage] = useState(0)
  const [entradasPage, setEntradasPage] = useState(0)

  const ventasData = data?.ventas ?? []
  const entradasData = data?.entradas ?? []
  const ventasPages = Math.max(1, Math.ceil(ventasData.length / ROWS_PER_PAGE))
  const entradasPages = Math.max(1, Math.ceil(entradasData.length / ROWS_PER_PAGE))
  const paginatedVentas = ventasData.slice(ventasPage * ROWS_PER_PAGE, (ventasPage + 1) * ROWS_PER_PAGE)
  const paginatedEntradas = entradasData.slice(entradasPage * ROWS_PER_PAGE, (entradasPage + 1) * ROWS_PER_PAGE)

  const search = async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams()
      if (desde) params.set('desde', desde)
      if (hasta) params.set('hasta', hasta)
      const res = await fetch(`/api/admin/reportes?${params}`)
      if (res.ok) {
        const d = await res.json()
        setData({ ventas: d.ventas || [], entradas: d.entradas || [] })
        setVentasPage(0)
        setEntradasPage(0)
      } else setError('Error al obtener reportes')
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Reportes</h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-wrap items-end gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Desde</label>
              <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)}
                className="px-3 py-2 border rounded-lg outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Hasta</label>
              <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)}
                className="px-3 py-2 border rounded-lg outline-none" />
            </div>
            <button onClick={search} disabled={loading}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition cursor-pointer">
              <Search size={16} /> {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-200 mb-6">{error}</div>
          )}

          {data && (
            <div className="space-y-6">
              {data.ventas.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-200 font-semibold flex items-center gap-2">
                    <BarChart3 size={18} className="text-blue-600" /> Ventas ({data.ventas.length})
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left px-4 py-2 text-gray-500">N°</th>
                          <th className="text-left px-4 py-2 text-gray-500">Fecha</th>
                          <th className="text-left px-4 py-2 text-gray-500">Usuario</th>
                          <th className="text-left px-4 py-2 text-gray-500">Método</th>
                          <th className="text-right px-4 py-2 text-gray-500">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {paginatedVentas.map((v: Record<string, unknown>) => (
                          <tr key={v.id as number} className="hover:bg-gray-50">
                            <td className="px-4 py-2 font-medium">{v.numero as string}</td>
                            <td className="px-4 py-2 text-gray-600">{new Date(v.creadoEn as string).toLocaleString()}</td>
                            <td className="px-4 py-2">{(v.usuario as Record<string, string>)?.nombre}</td>
                            <td className="px-4 py-2">{v.metodoPago as string}</td>
                            <td className="px-4 py-2 text-right font-medium">S/ {Number(v.total).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {ventasPages > 1 && (
                    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
                      <span className="text-xs text-gray-500">
                        {ventasPage * ROWS_PER_PAGE + 1}–{Math.min((ventasPage + 1) * ROWS_PER_PAGE, ventasData.length)} de {ventasData.length}
                      </span>
                      <div className="flex gap-1">
                        <button onClick={() => setVentasPage((p) => Math.max(0, p - 1))} disabled={ventasPage === 0}
                          className="px-3 py-1 text-xs rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-40 transition cursor-pointer">Anterior</button>
                        <button onClick={() => setVentasPage((p) => Math.min(ventasPages - 1, p + 1))} disabled={ventasPage >= ventasPages - 1}
                          className="px-3 py-1 text-xs rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-40 transition cursor-pointer">Siguiente</button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {data.entradas.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-200 font-semibold flex items-center gap-2">
                    <FileText size={18} className="text-orange-600" /> Compras / Entradas ({data.entradas.length})
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left px-4 py-2 text-gray-500">Producto</th>
                          <th className="text-left px-4 py-2 text-gray-500">Proveedor</th>
                          <th className="text-left px-4 py-2 text-gray-500">Usuario</th>
                          <th className="text-right px-4 py-2 text-gray-500">Cantidad</th>
                          <th className="text-left px-4 py-2 text-gray-500">Fecha</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {paginatedEntradas.map((e: Record<string, unknown>) => (
                          <tr key={e.id as number} className="hover:bg-gray-50">
                            <td className="px-4 py-2">{(e.producto as Record<string, string>)?.nombre}</td>
                            <td className="px-4 py-2">{(e.proveedor as Record<string, string>)?.nombre}</td>
                            <td className="px-4 py-2">{(e.usuario as Record<string, string>)?.nombre}</td>
                            <td className="px-4 py-2 text-right">{Number(e.cantidad)}</td>
                            <td className="px-4 py-2 text-gray-600">{new Date(e.creadoEn as string).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {entradasPages > 1 && (
                    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
                      <span className="text-xs text-gray-500">
                        {entradasPage * ROWS_PER_PAGE + 1}–{Math.min((entradasPage + 1) * ROWS_PER_PAGE, entradasData.length)} de {entradasData.length}
                      </span>
                      <div className="flex gap-1">
                        <button onClick={() => setEntradasPage((p) => Math.max(0, p - 1))} disabled={entradasPage === 0}
                          className="px-3 py-1 text-xs rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-40 transition cursor-pointer">Anterior</button>
                        <button onClick={() => setEntradasPage((p) => Math.min(entradasPages - 1, p + 1))} disabled={entradasPage >= entradasPages - 1}
                          className="px-3 py-1 text-xs rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-40 transition cursor-pointer">Siguiente</button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {data.ventas.length === 0 && data.entradas.length === 0 && (
                <div className="text-center py-12 text-gray-500">No se encontraron registros en el rango seleccionado</div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
