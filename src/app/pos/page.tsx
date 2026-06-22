'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '@/lib/AuthContext'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import { Search, Plus, Minus, Trash2, ShoppingCart, Printer, X, User, FileText } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

interface Producto {
  id: number
  nombre: string
  marca: string
  precio: number
  stock: number
  categoria: { id: number; nombre: string }
}

interface CarritoItem {
  productoId: number
  nombre: string
  precio: number
  cantidad: number
}

interface DetalleVenta {
  id: number
  cantidad: number
  precioUnitario: number
  subtotal: number
  producto: { nombre: string; marca: string }
}

interface VentaData {
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
  cliente: { id: number; dni: string; nombre: string } | null
  detalles: DetalleVenta[]
}

export default function POSPage() {
  const { user } = useAuth()
  const [q, setQ] = useState('')
  const [categoria, setCategoria] = useState('')
  const [limite, setLimite] = useState('50')
  const [productos, setProductos] = useState<Producto[]>([])
  const [carrito, setCarrito] = useState<CarritoItem[]>([])
  const [metodoPago, setMetodoPago] = useState('EFECTIVO')
  const [montoRecibido, setMontoRecibido] = useState('')
  const [clienteId, setClienteId] = useState('')
  const [searching, setSearching] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [resultado, setResultado] = useState<VentaData | null>(null)
  const [showReceipt, setShowReceipt] = useState(false)
  const [qrModal, setQrModal] = useState<{ url: string; ventaId: number; total: number } | null>(null)
  const [categorias, setCategorias] = useState<Array<{ id: number; nombre: string }>>([])
  const receiptRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!qrModal) return
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/ventas/${qrModal.ventaId}/status`)
        if (res.ok) {
          const data = await res.json()
          if (data.estado === 'COMPLETADA') {
            setQrModal(null)
            const fullRes = await fetch(`/api/ventas/${data.id}`)
            if (fullRes.ok) {
              const fullData = await fullRes.json()
              setResultado(fullData)
            } else {
              setResultado({ id: data.id, numero: data.numero, vuelto: 0, total: 0, subtotal: 0, igv: 0, metodoPago: '', montoRecibido: 0, estado: 'COMPLETADA', creadoEn: '', usuario: { id: 0, nombre: '' }, cliente: null, detalles: [] })
            }
            setCarrito([])
            setMontoRecibido('')
          }
        }
      } catch (e) {}
    }, 3000)
    return () => clearInterval(interval)
  }, [qrModal])

  useEffect(() => {
    fetch('/api/categorias').then((r) => r.ok && r.json()).then(setCategorias).catch(() => {})
  }, [])

  const search = useCallback(async (query: string, cat: string, limit: string) => {
    setSearching(true)
    try {
      const params = new URLSearchParams()
      if (query.trim()) params.set('q', query)
      if (cat) params.set('categoria', cat)
      if (limit) params.set('limit', limit)
      const res = await fetch(`/api/ventas?${params}`)
      if (res.ok) setProductos(await res.json())
    } catch {
      // ignore
    } finally {
      setSearching(false)
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => search(q, categoria, limite), 300)
    return () => clearTimeout(t)
  }, [q, categoria, limite, search])

  const addToCart = (p: Producto) => {
    setCarrito((prev) => {
      const existing = prev.find((i) => i.productoId === p.id)
      if (existing) {
        if (existing.cantidad >= p.stock) return prev
        return prev.map((i) => i.productoId === p.id ? { ...i, cantidad: i.cantidad + 1 } : i)
      }
      return [...prev, { productoId: p.id, nombre: p.nombre, precio: Number(p.precio), cantidad: 1 }]
    })
  }

  const updateCantidad = (id: number, delta: number) => {
    setCarrito((prev) => prev.map((i) => {
      if (i.productoId !== id) return i
      const nueva = i.cantidad + delta
      return nueva <= 0 ? i : { ...i, cantidad: nueva }
    }).filter((i) => i.cantidad > 0))
  }

  const removeFromCart = (id: number) => {
    setCarrito((prev) => prev.filter((i) => i.productoId !== id))
  }

  const subtotal = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0)
  const igv = subtotal * 0.18
  const total = subtotal + igv
  const recibido = parseFloat(montoRecibido) || 0
  const vuelto = metodoPago === 'EFECTIVO' ? Math.max(0, recibido - total) : 0

  const handleSubmit = async () => {
    if (carrito.length === 0) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/ventas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: carrito.map(({ productoId, cantidad }) => ({ productoId, cantidad })),
          metodoPago,
          montoRecibido: metodoPago === 'EFECTIVO' ? montoRecibido : total.toFixed(2),
          clienteId: clienteId || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Error al procesar venta')

      if (data.qrData) {
        setQrModal({ url: data.qrData, ventaId: data.id, total: Number(data.total) })
        setSubmitting(false)
        return
      }

      setResultado(data as VentaData)
      setCarrito([])
      setMontoRecibido('')
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al procesar venta')
    } finally {
      setSubmitting(false)
    }
  }

  if (qrModal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Escanea para Pagar</h2>
          <p className="text-gray-500 mb-6">Total: S/ {qrModal.total.toFixed(2)}</p>
          <div className="flex justify-center mb-6">
            <QRCodeSVG value={qrModal.url} size={200} />
          </div>
          <div className="flex items-center justify-center gap-2 text-blue-600 mb-6">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="font-medium">Esperando pago...</span>
          </div>
          <button onClick={() => setQrModal(null)}
            className="w-full px-4 border border-gray-300 rounded-lg py-2.5 text-gray-600 hover:bg-gray-50 transition cursor-pointer">
            Cancelar
          </button>
        </div>
      </div>
    )
  }

  const formatFecha = (fecha: string) => {
    const d = new Date(fecha)
    return d.toLocaleDateString('es-PE', { year: 'numeric', month: '2-digit', day: '2-digit' }) +
      ' ' + d.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })
  }

  const metodoPagoLabel: Record<string, string> = {
    EFECTIVO: 'Efectivo', YAPE: 'Yape', PLIN: 'Plin',
    TARJETA: 'Tarjeta', CHEQUE: 'Cheque', TRANSFERENCIA: 'Transferencia',
  }

  if (showReceipt && resultado) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex justify-end gap-2 mb-4 no-print">
            <button onClick={() => window.print()}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition cursor-pointer">
              <Printer size={18} /> Imprimir
            </button>
            <button onClick={() => setShowReceipt(false)}
              className="flex items-center gap-2 border border-gray-300 bg-white px-4 py-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
              Volver
            </button>
          </div>

          <div id="receipt-print-area" ref={receiptRef} className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 print:shadow-none print:rounded-none">
            <div className="text-center border-b border-gray-300 pb-4 mb-4">
              <h1 className="text-xl font-bold text-gray-800">MINIMARKET</h1>
              <p className="text-sm text-gray-500">Sistema de Ventas</p>
              {resultado.usuario?.nombre && (
                <p className="text-xs text-gray-400 mt-1">Atendido por: {resultado.usuario.nombre}</p>
              )}
            </div>

            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span className="font-bold text-gray-800">COMPROBANTE DE PAGO</span>
              <span>{formatFecha(resultado.creadoEn)}</span>
            </div>

            <div className="text-sm text-gray-700 mb-4 space-y-0.5">
              <p><span className="font-semibold">N° Venta:</span> {resultado.numero}</p>
              {resultado.cliente && (
                <p>
                  <span className="font-semibold">Cliente:</span> {resultado.cliente.nombre}
                  {resultado.cliente.dni ? ` (DNI: ${resultado.cliente.dni})` : ''}
                </p>
              )}
              <p><span className="font-semibold">Método de pago:</span> {metodoPagoLabel[resultado.metodoPago] || resultado.metodoPago}</p>
            </div>

            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-2 font-semibold text-gray-700">Producto</th>
                  <th className="text-center py-2 font-semibold text-gray-700">Cant.</th>
                  <th className="text-right py-2 font-semibold text-gray-700">Precio</th>
                  <th className="text-right py-2 font-semibold text-gray-700">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {resultado.detalles.map((d) => (
                  <tr key={d.id} className="border-b border-gray-200">
                    <td className="py-2 text-gray-800">
                      <span className="font-medium">{d.producto.nombre}</span>
                      <span className="text-gray-400 ml-1 text-xs">{d.producto.marca}</span>
                    </td>
                    <td className="py-2 text-center text-gray-700">{d.cantidad}</td>
                    <td className="py-2 text-right text-gray-700">S/ {Number(d.precioUnitario).toFixed(2)}</td>
                    <td className="py-2 text-right text-gray-800 font-medium">S/ {Number(d.subtotal).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-t border-gray-300 pt-3 space-y-1 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>S/ {Number(resultado.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>IGV (18%)</span>
                <span>S/ {Number(resultado.igv).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-800 pt-1 border-t border-gray-200">
                <span>Total</span>
                <span>S/ {Number(resultado.total).toFixed(2)}</span>
              </div>
              {resultado.metodoPago === 'EFECTIVO' && resultado.montoRecibido > 0 && (
                <>
                  <div className="flex justify-between text-gray-600">
                    <span>Recibido</span>
                    <span>S/ {Number(resultado.montoRecibido).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Vuelto</span>
                    <span>S/ {Number(resultado.vuelto).toFixed(2)}</span>
                  </div>
                </>
              )}
            </div>

            <div className="text-center text-xs text-gray-400 mt-6 pt-4 border-t border-gray-200">
              <p>Gracias por su compra</p>
              <p className="mt-0.5">Genere este comprobante para cualquier reclamo</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (resultado) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Venta Exitosa</h2>
          <p className="text-gray-500 mb-1">N° {resultado.numero}</p>
          {resultado.vuelto > 0 && (
            <p className="text-lg font-semibold text-green-600 mb-4">
              Vuelto: S/ {Number(resultado.vuelto).toFixed(2)}
            </p>
          )}
          <div className="flex flex-col gap-3">
            <button onClick={() => setResultado(null)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition cursor-pointer">
              Nueva Venta
            </button>
            <button onClick={() => setShowReceipt(true)}
              className="w-full flex items-center justify-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-50 py-2.5 rounded-lg transition cursor-pointer">
              <FileText size={18} /> Ver Comprobante
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen overflow-hidden bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Punto de Venta</h1>
        </header>

          <div className="flex-1 flex flex-col lg:flex-row min-h-0">
          <div className="flex-1 p-4 lg:p-6 overflow-y-auto min-h-0 scrollbar-pos">
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Buscar producto por nombre, marca o categoría..."
                />
              </div>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas</option>
                {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
              <select
                value={limite}
                onChange={(e) => setLimite(e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="400">400</option>
              </select>
            </div>

            {searching ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            ) : productos.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Package className="mx-auto mb-2 w-12 h-12" />
                <p>Busca productos para agregar al carrito</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {productos.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => addToCart(p)}
                    disabled={p.stock === 0}
                    className="bg-white rounded-xl border border-gray-200 p-4 text-left hover:shadow-md hover:border-blue-300 disabled:opacity-50 transition cursor-pointer"
                  >
                    <p className="font-semibold text-gray-800 truncate">{p.nombre}</p>
                    <p className="text-sm text-gray-500 truncate">{p.marca}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-lg font-bold text-blue-600">S/ {Number(p.precio).toFixed(2)}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${p.stock <= 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        Stock: {p.stock}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:w-96 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                <ShoppingCart size={18} /> Carrito ({carrito.length})
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {carrito.length === 0 ? (
                <p className="text-center text-gray-400 py-8">Carrito vacío</p>
              ) : (
                carrito.map((item) => (
                  <div key={item.productoId} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm truncate">{item.nombre}</p>
                      <p className="text-xs text-gray-500">S/ {item.precio.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateCantidad(item.productoId, -1)}
                        className="p-1 hover:bg-gray-200 rounded cursor-pointer">
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-medium">{item.cantidad}</span>
                      <button onClick={() => updateCantidad(item.productoId, 1)}
                        className="p-1 hover:bg-gray-200 rounded cursor-pointer">
                        <Plus size={14} />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.productoId)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded cursor-pointer">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-gray-200 space-y-3">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>S/ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>IGV (18%)</span>
                  <span>S/ {igv.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total</span>
                  <span>S/ {total.toFixed(2)}</span>
                </div>
              </div>

              <select
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none"
              >
                <option value="EFECTIVO">Efectivo</option>
                <option value="YAPE">Yape</option>
                <option value="PLIN">Plin</option>
                <option value="TARJETA">Tarjeta</option>
                <option value="CHEQUE">Cheque</option>
                <option value="TRANSFERENCIA">Transferencia</option>
              </select>

              {metodoPago === 'EFECTIVO' && (
                <input
                  type="number"
                  step="0.01"
                  value={montoRecibido}
                  onChange={(e) => setMontoRecibido(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none"
                  placeholder="Monto recibido..."
                />
              )}

              {metodoPago === 'EFECTIVO' && recibido >= total && (
                <div className="text-sm text-green-600 font-medium text-center">
                  Vuelto: S/ {vuelto.toFixed(2)}
                </div>
              )}

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="number"
                  value={clienteId}
                  onChange={(e) => setClienteId(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg outline-none text-sm"
                  placeholder="ID Cliente (opcional)"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={carrito.length === 0 || submitting || (metodoPago === 'EFECTIVO' && recibido < total)}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium py-3 rounded-lg transition cursor-pointer"
              >
                {submitting ? 'Procesando...' : `Cobrar S/ ${total.toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Package(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
  )
}
