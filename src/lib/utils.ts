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
