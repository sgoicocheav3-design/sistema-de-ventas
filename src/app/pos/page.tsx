'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '@/lib/AuthContext'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import ComprobantePago from '@/components/ComprobantePago'
import { Search, Plus, Minus, Trash2, ShoppingCart, Printer, X, User, FileText, Package } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { calcularTotalesConIgvIncluido } from '@/lib/utils'
import type { VentaData } from '@/components/types'

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

export default function POSPage() {
  const { user } = useAuth()
  const [q, setQ] = useState('')
  const [categoria, setCategoria] = useState('')
  const [limite, setLimite] = useState('50')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [productos, setProductos] = useState<Producto[]>([])
  const [carrito, setCarrito] = useState<CarritoItem[]>([])
  const [metodoPago, setMetodoPago] = useState('EFECTIVO')
  const [montoRecibido, setMontoRecibido] = useState('')
  const [searching, setSearching] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [resultado, setResultado] = useState<VentaData | null>(null)
  const [showReceipt, setShowReceipt] = useState(false)
  const [empresaData, setEmpresaData] = useState<Record<string, string>>({})
  const [qrModal, setQrModal] = useState<{ url: string; ventaId: number; total: number } | null>(null)
  const [qrEstado, setQrEstado] = useState<string>('PENDIENTE')
  const [qrStatusDetail, setQrStatusDetail] = useState<string | null>(null)
  const [qrError, setQrError] = useState<string | null>(null)
  const [categorias, setCategorias] = useState<Array<{ id: number; nombre: string }>>([])
  const [searchError, setSearchError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const receiptRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const mountedRef = useRef(true)

  const fetchStatus = useCallback(async (ventaId: number) => {
    if (!mountedRef.current) return
    try {
      const res = await fetch(`/api/ventas/${ventaId}/status`, { cache: 'no-store' })
      if (!res.ok) return
      const data = await res.json()
      if (!mountedRef.current) return

      setQrEstado(data.estado)
      setQrStatusDetail(data.statusDetail || null)
      setQrError(null)

      if (data.estado === 'COMPLETADA') {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        const fullRes = await fetch(`/api/ventas/${ventaId}`)
        if (fullRes.ok) {
          const fullData = await fullRes.json()
          setResultado(fullData)
        } else {
          setResultado({ id: data.id, numero: data.numero, vuelto: 0, total: 0, subtotal: 0, igv: 0, metodoPago: '', montoRecibido: 0, estado: 'COMPLETADA', creadoEn: '', usuario: { id: 0, nombre: '' }, cliente: null, detalles: [] })
        }
        setQrModal(null)
        setCarrito([])
        setMontoRecibido('')
        fetch('/api/almacen/productos?limit=50').then(r => r.ok && r.json()).then(data => {
          if (data?.productos) setProductos(data.productos)
        }).catch(() => {})
      } else if (data.estado === 'RECHAZADO' || data.estado === 'CANCELADO') {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    } catch {
      if (mountedRef.current) {
        setQrError('Error al verificar pago')
      }
    }
  }, [])

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  useEffect(() => {
    if (!qrModal) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setQrEstado('PENDIENTE')
      setQrStatusDetail(null)
      setQrError(null)
      return
    }

    setQrEstado('PENDIENTE')
    setQrStatusDetail(null)
    setQrError(null)

    fetchStatus(qrModal.ventaId)
    intervalRef.current = setInterval(() => fetchStatus(qrModal.ventaId), 3000)

    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && qrModal) {
        fetchStatus(qrModal.ventaId)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [qrModal, fetchStatus])

  useEffect(() => {
    fetch('/api/categorias').then((r) => r.ok && r.json()).then(setCategorias).catch(() => {})
  }, [])

  const search = useCallback(async (query: string, cat: string, limit: string, pg: number) => {
    setSearching(true)
    setSearchError('')
    try {
      const params = new URLSearchParams()
      if (query.trim()) params.set('q', query)
      if (cat) params.set('categoria', cat)
      if (limit) params.set('limit', limit)
      if (pg > 1) params.set('page', String(pg))
      const res = await fetch(`/api/almacen/productos?${params}`)
      if (res.ok) {
        const data = await res.json()
        setProductos(data.productos || [])
        setTotalPages(data.totalPages || 1)
      }
      else setSearchError('Error al buscar productos')
    } catch {
      setSearchError('Error de conexión')
    } finally {
      setSearching(false)
    }
  }, [])

  useEffect(() => {
    setPage(1)
    const t = setTimeout(() => search(q, categoria, limite, 1), 300)
    return () => clearTimeout(t)
  }, [q, categoria, limite, search])

  useEffect(() => {
    if (page <= 1) return
    const t = setTimeout(() => search(q, categoria, limite, page), 300)
    return () => clearTimeout(t)
  }, [page])

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

  const { total, subtotalSinIgv, igvIncluido } = calcularTotalesConIgvIncluido(
    carrito.map((i) => ({ precio: i.precio, cantidad: i.cantidad }))
  )
  const recibido = parseFloat(montoRecibido) || 0
  const vuelto = metodoPago === 'EFECTIVO' ? Math.max(0, recibido - total) : 0

  const handleSubmit = async () => {
    if (carrito.length === 0) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/ventas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: carrito.map(({ productoId, cantidad }) => ({ productoId, cantidad })),
          metodoPago,
          montoRecibido: metodoPago === 'EFECTIVO' ? montoRecibido : total.toFixed(2),
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
      search(q, categoria, limite, 1)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Error al procesar venta')
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    if (showReceipt && resultado) {
      fetch(`/api/ventas/${resultado.id}/comprobante`)
        .then((r) => r.ok && r.json())
        .then((data) => {
          if (data?.empresa) setEmpresaData(data.empresa)
        })
        .catch(() => {})
    }
  }, [showReceipt, resultado])

  if (qrModal) {
    const estadoFinal = qrEstado === 'COMPLETADA' || qrEstado === 'RECHAZADO' || qrEstado === 'CANCELADO'

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Escanea para Pagar</h2>
          <p className="text-gray-500 mb-6">Total: S/ {qrModal.total.toFixed(2)}</p>
          {!estadoFinal && (
            <div className="flex justify-center mb-6">
              <QRCodeSVG value={qrModal.url} size={200} />
            </div>
          )}

          {qrEstado === 'PENDIENTE' && (
            <div className="flex items-center justify-center gap-2 text-blue-600 mb-6">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="font-medium">Esperando pago...</span>
            </div>
          )}
          {qrEstado === 'PROCESANDO' && (
            <div className="flex items-center justify-center gap-2 text-yellow-600 mb-6">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600"></div>
              <span className="font-medium">Estamos confirmando tu pago...</span>
            </div>
          )}
          {qrEstado === 'COMPLETADA' && (
            <div className="text-green-600 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShoppingCart className="text-green-600" size={24} />
              </div>
              <p className="text-lg font-bold">Pago aprobado</p>
              <p className="text-sm text-gray-500">Tu compra se registró correctamente.</p>
            </div>
          )}
          {qrEstado === 'RECHAZADO' && (
            <div className="text-red-600 mb-6">
              <p className="text-lg font-bold">El pago fue rechazado</p>
              <p className="text-sm text-gray-500">Puedes intentarlo nuevamente.</p>
            </div>
          )}
          {qrEstado === 'CANCELADO' && (
            <div className="text-gray-600 mb-6">
              <p className="text-lg font-bold">El pago fue cancelado</p>
            </div>
          )}
          {qrError && !estadoFinal && (
            <div className="text-gray-500 mb-4">
              <p className="text-sm">{qrError}</p>
            </div>
          )}

          {!estadoFinal && (
            <div className="flex flex-col gap-2">
              <button onClick={() => fetchStatus(qrModal.ventaId)}
                className="w-full px-4 border border-blue-600 text-blue-600 rounded-lg py-2.5 hover:bg-blue-50 transition cursor-pointer">
                Verificar pago
              </button>
              <button onClick={() => setQrModal(null)}
                className="w-full px-4 border border-gray-300 rounded-lg py-2.5 text-gray-600 hover:bg-gray-50 transition cursor-pointer">
                Cancelar
              </button>
            </div>
          )}

          {qrEstado === 'RECHAZADO' && (
            <button onClick={() => setQrModal(null)}
              className="w-full px-4 bg-blue-600 text-white rounded-lg py-2.5 hover:bg-blue-700 transition cursor-pointer">
              Intentar nuevamente
            </button>
          )}
          {qrEstado === 'CANCELADO' && (
            <button onClick={() => setQrModal(null)}
              className="w-full px-4 bg-blue-600 text-white rounded-lg py-2.5 hover:bg-blue-700 transition cursor-pointer">
              Volver
            </button>
          )}
        </div>
      </div>
    )
  }


  if (showReceipt && resultado) {
    return (
      <ComprobantePago
        venta={resultado}
        empresa={empresaData}
        onVolver={() => setShowReceipt(false)}
        onNuevaVenta={() => { setResultado(null); setShowReceipt(false) }}
      />
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

            {searchError && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg border border-red-200 mb-4">{searchError}</div>
            )}

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
              <>
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
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-6">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page <= 1}
                      className="px-3 py-1.5 rounded border border-gray-300 text-sm disabled:opacity-30 hover:bg-gray-100 transition cursor-pointer"
                    >
                      Anterior
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                      <button
                        key={pg}
                        onClick={() => setPage(pg)}
                        className={`w-8 h-8 rounded text-sm font-medium transition cursor-pointer ${
                          pg === page
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {pg}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page >= totalPages}
                      className="px-3 py-1.5 rounded border border-gray-300 text-sm disabled:opacity-30 hover:bg-gray-100 transition cursor-pointer"
                    >
                      Siguiente
                    </button>
                  </div>
                )}
              </>
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
                  <span>Subtotal sin IGV</span>
                  <span>S/ {subtotalSinIgv.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>IGV incluido (18%)</span>
                  <span>S/ {igvIncluido.toFixed(2)}</span>
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

              {submitError && (
                <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg border border-red-200">{submitError}</div>
              )}

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

