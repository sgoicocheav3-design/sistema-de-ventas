'use client'

import { useState, useEffect } from 'react'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import { DollarSign, Printer, Wallet, Smartphone, CreditCard, Banknote, Landmark } from 'lucide-react'

interface Venta {
  id: number; numero: string; total: number; metodoPago: string; creadoEn: string
  usuario: { nombre: string }
}

interface CierreData {
  fecha: string
  ventas: Venta[]
  totalVentasDia: number
  totalVentasMes: number
  totalComprasMes: number
  ventasPorMetodo: Record<string, number>
  totalEfectivo: number
  totalDigital: number
  usuarios: Array<{ id: number; nombre: string; rol: string }>
}

export default function CierreCajaPage() {
  const [data, setData] = useState<CierreData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/gerencia/cierre-caja')
      .then((r) => r.ok ? r.json() : Promise.reject('Error al cargar'))
      .then((d) => { if (d) setData(d) })
      .catch(() => setError('Error al cargar datos de cierre de caja'))
      .finally(() => setLoading(false))
  }, [])

  const metodoIcon: Record<string, React.ElementType> = {
    EFECTIVO: Wallet, YAPE: Smartphone, PLIN: Smartphone,
    TARJETA: CreditCard, CHEQUE: Banknote, TRANSFERENCIA: Landmark,
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Cierre de Caja</h1>
          <button onClick={() => window.print()}
            className="ml-auto flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <Printer size={18} /> Imprimir
          </button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-200">{error}</div>
          ) : data ? (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <DollarSign className="text-blue-600" size={28} />
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Resumen del Día</h2>
                    <p className="text-sm text-gray-500">{new Date(data.fecha).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-blue-600 font-medium">Ventas del Día</p>
                    <p className="text-2xl font-bold text-blue-700">S/ {data.totalVentasDia.toFixed(2)}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <p className="text-sm text-green-600 font-medium">Ventas del Mes</p>
                    <p className="text-2xl font-bold text-green-700">S/ {data.totalVentasMes.toFixed(2)}</p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4">
                    <p className="text-sm text-orange-600 font-medium">Compras del Mes</p>
                    <p className="text-2xl font-bold text-orange-700">{data.totalComprasMes}</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <p className="text-sm text-purple-600 font-medium">Total Ventas</p>
                    <p className="text-2xl font-bold text-purple-700">{data.ventas.length}</p>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-700 mb-3">Desglose por Método de Pago</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                  {Object.entries(data.ventasPorMetodo).map(([metodo, total]) => {
                    const Icon = metodoIcon[metodo] || DollarSign
                    return (
                      <div key={metodo} className="bg-gray-50 rounded-xl p-3 text-center">
                        <Icon size={20} className="mx-auto mb-1 text-gray-600" />
                        <p className="text-xs text-gray-500">{metodo}</p>
                        <p className="font-semibold text-gray-800">S/ {total.toFixed(2)}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-xl p-4">
                    <p className="text-sm text-green-600 font-medium">Total Efectivo</p>
                    <p className="text-xl font-bold text-green-700">S/ {data.totalEfectivo.toFixed(2)}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-blue-600 font-medium">Total Digital</p>
                    <p className="text-xl font-bold text-blue-700">S/ {data.totalDigital.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b font-semibold">Ventas del Día ({data.ventas.length})</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-2 text-gray-500">N°</th>
                        <th className="text-left px-4 py-2 text-gray-500">Hora</th>
                        <th className="text-left px-4 py-2 text-gray-500">Usuario</th>
                        <th className="text-left px-4 py-2 text-gray-500">Método</th>
                        <th className="text-right px-4 py-2 text-gray-500">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {data.ventas.map((v) => (
                        <tr key={v.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2 font-medium">{v.numero}</td>
                          <td className="px-4 py-2 text-gray-600">{new Date(v.creadoEn).toLocaleTimeString()}</td>
                          <td className="px-4 py-2">{v.usuario.nombre}</td>
                          <td className="px-4 py-2">{v.metodoPago}</td>
                          <td className="px-4 py-2 text-right font-medium">S/ {Number(v.total).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">No se pudieron cargar los datos</div>
          )}
        </main>
      </div>
    </div>
  )
}
