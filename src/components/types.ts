export interface DetalleVenta {
  id: number
  cantidad: number
  precioUnitario: number
  subtotal: number
  producto: { nombre: string; marca: string; codigo?: string }
}

export interface VentaData {
  id: number
  numero: string
  subtotal: number
  igv: number
  total: number
  metodoPago: string
  montoRecibido: number
  vuelto: number
  estado: string
  creadoEn: string
  usuario: { id: number; nombre: string }
  cliente: { id: number; dni: string; nombre: string; email?: string; telefono?: string } | null
  detalles: DetalleVenta[]
  pagoId?: string | null
  qrData?: string | null
}
