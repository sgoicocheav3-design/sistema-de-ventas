export function formatMoneda(valor: number | string | null | undefined): string {
  const n = Number(valor ?? 0)
  return `S/ ${n.toFixed(2)}`
}

export function formatStock(valor: number | string | null | undefined): string {
  const n = Number(valor ?? 0)
  return `${n} und(s)`
}

export function formatFecha(fecha: string | Date | null | undefined): string {
  if (!fecha) return '-'
  return new Date(fecha).toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
