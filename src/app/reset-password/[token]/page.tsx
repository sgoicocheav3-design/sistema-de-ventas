'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle, ChevronRight } from 'lucide-react'

export default function ResetPasswordRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/recuperar-password')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-sm">
        <div className="bg-amber-50 text-amber-700 text-sm px-4 py-3 rounded-xl border border-amber-100 flex items-center gap-2 mb-5">
          <AlertCircle size={16} /> Este método de recuperación ha sido actualizado
        </div>
        <button onClick={() => router.push('/recuperar-password')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 text-sm">
          Usar nuevo método <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
