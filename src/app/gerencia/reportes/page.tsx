'use client'

import { useState } from 'react'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import { FileSpreadsheet, Search } from 'lucide-react'

export default function GerenciaReportesPage() {
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')
  const [proveedorId, setProveedorId] = useState('')
  const [proveedores, setProveedores] = useState<Array<{ id: number; nombre: string }>>([])
  const [data, setData] = useState<Record<string, Array<Record<string, unknown>>> | null>(null)
  const [loading, setLoading] = useState(false)

  const search = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (desde) params.set('desde', desde)
      if (hasta) params.set('hasta', hasta)
      if (proveedorId) params.set('proveedorId', proveedorId)
      const res = await fetch(`/api/gerencia/reportes?${params}`)
      if (res.ok) {
        const d = await res.json()
        setData(d)
        if (d.proveedores) setProveedores(d.proveedores)
      }
    } catch { /* ignore */
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Reportes Gerencia</h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-wrap items-end gap-3">
            <div><label className="block text-xs font-medium text-gray-500">Desde</label>
              <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)}
                className="px-3 py-2 border rounded-lg outline-none" /></div>
            <div><label className="block text-xs font-medium text-gray-500">Hasta</label>
              <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)}
                className="px-3 py-2 border rounded-lg outline-none" /></div>
            <button onClick={search} disabled={loading}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition cursor-pointer">
              <Search size={16} /> {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>

          {data && (
            <div className="space-y-6">
              {data.ventas?.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="px-4 py-3 border-b font-semibold flex items-center gap-2">
                    <FileSpreadsheet size={18} className="text-blue-600" /> Ventas ({data.ventas.length})
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
                      <tbody className="divide-y">
                        {data.ventas.map((v: Record<string, unknown>) => (
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
                </div>
              )}

              {data.entradas?.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="px-4 py-3 border-b font-semibold flex items-center gap-2">
                    <FileSpreadsheet size={18} className="text-orange-600" /> Compras ({data.entradas.length})
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left px-4 py-2 text-gray-500">Producto</th>
                          <th className="text-left px-4 py-2 text-gray-500">Proveedor</th>
                          <th className="text-right px-4 py-2 text-gray-500">Cantidad</th>
                          <th className="text-left px-4 py-2 text-gray-500">Fecha</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {data.entradas.map((e: Record<string, unknown>) => (
                          <tr key={e.id as number} className="hover:bg-gray-50">
                            <td className="px-4 py-2">{(e.producto as Record<string, string>)?.nombre}</td>
                            <td className="px-4 py-2">{(e.proveedor as Record<string, string>)?.nombre}</td>
                            <td className="px-4 py-2 text-right">{Number(e.cantidad)}</td>
                            <td className="px-4 py-2 text-gray-600">{new Date(e.creadoEn as string).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {!data.ventas?.length && !data.entradas?.length && (
                <div className="text-center py-12 text-gray-500">No se encontraron registros</div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
