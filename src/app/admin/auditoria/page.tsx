'use client'

import { useState, useEffect } from 'react'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import { FileSearch, User } from 'lucide-react'

interface LogEntry {
  id: number
  usuario: { id: number; nombre: string; rol: string }
  accion: string
  creadoEn: string
}

export default function AuditoriaPage() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  const fetchLogs = async (p: number) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/auditoria?page=${p}`)
      if (res.ok) {
        const data = await res.json()
        setLogs(data.registros)
        setTotalPages(data.totalPages)
        setPage(data.page)
      }
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchLogs(1) }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Auditoría</h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Usuario</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Rol</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Acción</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {logs.map((l) => (
                      <tr key={l.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 flex items-center gap-2">
                          <User size={14} className="text-gray-400" />
                          {l.usuario?.nombre || 'Sistema'}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">{l.usuario?.rol || '-'}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{l.accion}</td>
                        <td className="px-4 py-3 text-gray-500 text-sm">{new Date(l.creadoEn).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 p-4 border-t">
                  <button onClick={() => fetchLogs(page - 1)} disabled={page <= 1}
                    className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 cursor-pointer">Anterior</button>
                  <span className="text-sm text-gray-600">Página {page} de {totalPages}</span>
                  <button onClick={() => fetchLogs(page + 1)} disabled={page >= totalPages}
                    className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 cursor-pointer">Siguiente</button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
