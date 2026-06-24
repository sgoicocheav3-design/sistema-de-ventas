'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/AuthContext'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import {
  ShoppingCart, TrendingUp, Package, Truck, DollarSign, Users,
  AlertTriangle, BarChart3, Wallet, Smartphone,
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface DashboardData {
  ventasHoy: number
  ventasMes: number
  comprasMes: number
  utilidadMes: number
  igvMes: number
  efectivoCaja: number
  mercadoPago: number
  productosStockBajo: number
  totalProductos: number
  totalProveedores: number
  totalUsuarios: number
}

const Card = ({ title, value, icon: Icon, color, currency }: {
  title: string; value: number; icon: React.ElementType; color: string; currency?: boolean
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm font-medium text-gray-500">{title}</span>
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
    <p className="text-2xl font-bold text-gray-800">
      {currency ? `S/ ${value.toFixed(2)}` : value}
    </p>
  </div>
)

export default function DashboardPage() {
  const { user } = useAuth()
  const isVendedor = user?.rol === 'VENDEDOR'
  const isAlmacenero = user?.rol === 'ALMACENERO'
  const isAdminOrGerente = user?.rol === 'ADMIN' || user?.rol === 'GERENTE'
  const [data, setData] = useState<DashboardData | null>(null)
  const [chartData, setChartData] = useState<Array<{ mes: string; ventas: number; compras: number }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch('/api/dashboard'),
          fetch('/api/dashboard?type=chart'),
        ])
        if (res1.ok) setData(await res1.json())
        if (res2.ok) {
          const chart = await res2.json()
          setChartData(chart.meses || [])
        }
        if (!res1.ok && !res2.ok) setError('Error al cargar datos del dashboard')
      } catch {
        setError('Error de conexión al cargar datos')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          {user && (
            <span className="ml-auto text-sm text-gray-500 capitalize">
              {user.rol.toLowerCase()} — {user.nombre}
            </span>
          )}
        </header>

        <main className="flex-1 p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-200">{error}</div>
          ) : (
            <div className="space-y-6">
              {data ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {(isAdminOrGerente || isVendedor) && <Card title="Ventas Hoy" value={data.ventasHoy} icon={ShoppingCart} color="bg-blue-600" currency />}
                    {(isAdminOrGerente || isVendedor) && <Card title="Ventas del Mes" value={data.ventasMes} icon={TrendingUp} color="bg-green-600" currency />}
                    {(isAdminOrGerente || isAlmacenero) && <Card title="Compras del Mes" value={data.comprasMes} icon={Package} color="bg-orange-600" />}
                    {isAdminOrGerente && <Card title="Utilidad del Mes" value={data.utilidadMes} icon={BarChart3} color="bg-purple-600" currency />}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {isAdminOrGerente && <Card title="IGV del Mes" value={data.igvMes} icon={DollarSign} color="bg-red-600" currency />}
                    {(isAdminOrGerente || isVendedor) && <Card title="Efectivo en Caja" value={data.efectivoCaja} icon={Wallet} color="bg-teal-600" currency />}
                    {(isAdminOrGerente || isVendedor) && <Card title="Mercado Pago (Yape)" value={data.mercadoPago} icon={Smartphone} color="bg-indigo-600" currency />}
                    <Card title="Productos Stock Bajo"
                      value={data.productosStockBajo}
                      icon={AlertTriangle}
                      color={data.productosStockBajo > 0 ? 'bg-red-600' : 'bg-green-600'}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card title="Total Productos" value={data.totalProductos} icon={Package} color="bg-cyan-600" />
                    {(isAdminOrGerente || isAlmacenero) && <Card title="Total Proveedores" value={data.totalProveedores} icon={Truck} color="bg-pink-600" />}
                    {isAdminOrGerente && <Card title="Total Usuarios" value={data.totalUsuarios} icon={Users} color="bg-amber-600" />}
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-gray-500">No se pudieron cargar los datos</div>
              )}

              {isAdminOrGerente && chartData.length > 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Ventas del Año</h3>
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip formatter={(value) => `S/ ${Number(value).toFixed(2)}`} />
                      <Legend />
                      <Bar dataKey="ventas" fill="#2563eb" name="Ventas" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="compras" fill="#f97316" name="Compras" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                isAdminOrGerente && !loading && !error && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center text-gray-500">
                    No hay datos de ventas disponibles
                  </div>
                )
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
