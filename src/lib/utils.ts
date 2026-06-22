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

const UNIDADES = ['', 'UN', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE']
const DECENAS = ['', 'DIEZ', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA']
const DIEZ_DIECISEIS = ['DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISÉIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE']
const CENTENAS = ['', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS']

function convertirGrupo(n: number): string {
  if (n === 0) return ''
  if (n === 100) return 'CIEN'

  let result = ''
  const c = Math.floor(n / 100)
  const d = Math.floor((n % 100) / 10)
  const u = n % 10

  if (c > 0) result += CENTENAS[c] + ' '
  if (d === 1 && u > 0) {
    result += DIEZ_DIECISEIS[u] + ' '
    return result.trim()
  }
  if (d > 0) result += DECENAS[d] + (d > 2 && u > 0 ? ' Y ' : ' ')
  if (u > 0 && !(d === 1)) result += UNIDADES[u] + ' '
  return result.trim()
}

export function numeroALetras(monto: number): string {
  if (monto === 0) return 'CERO SOLES CON 00/100'

  const entero = Math.floor(monto)
  const decimales = Math.round((monto - entero) * 100)
  const decStr = String(decimales).padStart(2, '0')

  if (entero === 0) return `CERO SOLES CON ${decStr}/100`

  const millones = Math.floor(entero / 1000000)
  const miles = Math.floor((entero % 1000000) / 1000)
  const resto = entero % 1000

  let partes: string[] = []

  if (millones > 0) {
    if (millones === 1) partes.push('UN MILLÓN')
    else partes.push(convertirGrupo(millones) + ' MILLONES')
  }
  if (miles > 0) {
    if (miles === 1) partes.push('MIL')
    else partes.push(convertirGrupo(miles) + ' MIL')
  }
  if (resto > 0) {
    partes.push(convertirGrupo(resto))
  }

  const palabra = partes.join(' ')
  if (entero === 1) {
    return `${palabra} SOL CON ${decStr}/100`
  }
  return `${palabra} SOLES CON ${decStr}/100`
}
