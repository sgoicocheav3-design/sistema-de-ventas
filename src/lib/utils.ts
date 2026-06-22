import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fmtCurrency(n: number | string | null | undefined): string {
  return `S/ ${Number(n || 0).toFixed(2)}`
}

export function fmtDate(f: string | Date | null | undefined): string {
  if (!f) return '—'
  return new Date(f).toLocaleDateString('es-PE', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  })
}

export function fmtDateTime(f: string | Date | null | undefined): string {
  if (!f) return '—'
  return new Date(f).toLocaleString('es-PE', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export function todayISO(): string {
  return new Date().toISOString().split('T')[0]
}

export function daysAgoISO(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString().split('T')[0]
}

const IGV_RATE = 0.18
const IGV_FACTOR = 1 + IGV_RATE

export function calcularTotalesConIgvIncluido(
  items: Array<{ precio: number | string; cantidad: number }>
) {
  const total = items.reduce((acumulado, item) => {
    const precio = Number(item.precio)
    const cantidad = Number(item.cantidad)
    return acumulado + precio * cantidad
  }, 0)

  const subtotalSinIgv = Math.round((total / IGV_FACTOR) * 100) / 100
  const igvIncluido = Math.round((total - subtotalSinIgv) * 100) / 100
  const totalRedondeado = Math.round(total * 100) / 100

  return {
    subtotalSinIgv,
    igvIncluido,
    total: totalRedondeado,
  }
}
