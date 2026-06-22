'use client'

import { useState } from 'react'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import { Shield, Download, RefreshCw } from 'lucide-react'

export default function BackupsPage() {
  const [generating, setGenerating] = useState(false)
  const [message, setMessage] = useState('')

  const handleGenerate = async () => {
    setGenerating(true); setMessage('')
    try {
      const res = await fetch('/api/admin/backups', { method: 'POST' })
      const data = await res.json()
      if (res.ok) setMessage(`Backup generado: ${data.archivo}`)
      else setMessage(data.message || 'Error al generar backup')
    } catch {
      setMessage('Error de conexión')
    } finally {
      setGenerating(false)
    }
  }

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
              <h2 className="text-lg font-semibold">Respaldo de Base de Datos</h2>
            </div>

            <p className="text-gray-500 text-sm mb-6">
              Genera un backup completo de la base de datos. El archivo se guardará en el servidor en la carpeta <code className="bg-gray-100 px-1 rounded">backups/</code>.
            </p>

            {message && (
              <div className={`text-sm px-4 py-2.5 rounded-lg mb-4 ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                {message}
              </div>
            )}

            <button onClick={handleGenerate} disabled={generating}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition cursor-pointer">
              {generating ? <RefreshCw size={18} className="animate-spin" /> : <Download size={18} />}
              {generating ? 'Generando...' : 'Generar Backup'}
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
