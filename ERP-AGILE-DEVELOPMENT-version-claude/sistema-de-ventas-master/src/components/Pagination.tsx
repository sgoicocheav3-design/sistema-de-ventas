'use client'

interface PaginationProps {
  page: number
  totalPages: number
  total: number
  limit: number
  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
}

export default function Pagination({ page, totalPages, total, limit, onPageChange, onLimitChange }: PaginationProps) {
  if (totalPages <= 1 && total <= limit) return null

  const from = total === 0 ? 0 : (page - 1) * limit + 1
  const to = Math.min(page * limit, total)

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mt-4 text-sm text-gray-500">
      <span>Mostrando {from}–{to} de {total} registros</span>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span>Ver</span>
          <select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="px-2 py-1 border rounded outline-none bg-white text-gray-700"
          >
            {[10, 20, 30, 50, 100].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <span>por página</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onPageChange(1)}
            disabled={page <= 1}
            className="px-2 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
            title="Primera página"
          >
            &laquo;
          </button>
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
          >
            Anterior
          </button>
          <span className="px-3 py-1 text-gray-700">
            Pág {page} de {totalPages}
          </span>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
          >
            Siguiente
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={page >= totalPages}
            className="px-2 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
            title="Última página"
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  )
}
