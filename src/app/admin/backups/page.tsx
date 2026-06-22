'use client'

import { useEffect, useState } from 'react'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import { Shield, ExternalLink } from 'lucide-react'

export default function BackupsPage() {
  const [dashboardUrl, setDashboardUrl] = useState('https://supabase.com/dashboard')

  useEffect(() => {
    fetch('/api/admin/backups')
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.dashboardUrl) setDashboardUrl(d.dashboardUrl) })
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Backups</h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-lg">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-blue-600" size={24} />
              <h2 className="text-lg font-semibold">Respaldo en Supabase</h2>
            </div>

            <p className="text-gray-500 text-sm mb-4">
              Todos los datos del sistema (usuarios, productos, ventas, inventario, etc.) se guardan en tu base de datos de Supabase.
              No se almacena información de negocio en el servidor de la aplicación.
            </p>

            <p className="text-gray-500 text-sm mb-6">
              Los respaldos automáticos y manuales se configuran desde el panel de Supabase (Database → Backups).
            </p>

            <a
              href={dashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition"
            >
              <ExternalLink size={18} />
              Abrir panel de Supabase
            </a>
          </div>
        </main>
      </div>
    </div>
  )
}
