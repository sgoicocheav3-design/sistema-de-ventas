'use client'

import { useState, useEffect } from 'react'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import { BarChart3, TrendingUp, ShoppingCart, Package, AlertTriangle, Users, ClipboardList } from 'lucide-react'

const Card = ({ title, value, icon: Icon, color, currency }: {
  title: string; value: number; icon: React.ElementType; color: string; currency?: boolean
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm font-medium text-gray-500">{title}</span>
      <div className={`p-2 rounded-lg ${color}`}><Icon size={20} className="text-white" /></div>
    </div>
    <p className="text-2xl font-bold text-gray-800">{currency ? `S/ ${value.toFixed(2)}` : value}</p>
  </div>
)

export default function GerenciaDashboardPage() {
  const [data, setData] = useState<Record<string, number> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/gerencia/dashboard')
      .then((r) => r.ok ? r.json() : Promise.reject('Error al cargar'))
      .then((d) => { if (d) setData(d) })
      .catch(() => setError('Error al cargar datos del dashboard'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Dashboard Gerencia</h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-200">{error}</div>
          ) : data ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card title="Ventas del Mes" value={data.totalVentas} icon={ShoppingCart} color="bg-blue-600" />
              <Card title="Ingresos" value={data.ingresos} icon={TrendingUp} color="bg-green-600" currency />
              <Card title="Compras" value={data.compras} icon={Package} color="bg-orange-600" />
              <Card title="IGV" value={data.igv} icon={BarChart3} color="bg-red-600" currency />
              <Card title="Utilidad Estimada" value={data.utilidad} icon={TrendingUp} color="bg-purple-600" currency />
              <Card title="Solicitudes Pendientes" value={data.solicitudesPendientes} icon={ClipboardList} color="bg-yellow-600" />
              <Card title="Usuarios Activos" value={data.usuariosActivos} icon={Users} color="bg-teal-600" />
              <Card title="Bajas del Mes" value={data.bajasMes} icon={AlertTriangle} color="bg-red-600" />
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">No se pudieron cargar los datos</div>
          )}
        </main>
      </div>
    </div>
  )
}
