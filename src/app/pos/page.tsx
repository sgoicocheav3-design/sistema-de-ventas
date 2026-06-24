'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '@/lib/AuthContext'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import ComprobantePago from '@/components/ComprobantePago'
import { Search, Plus, Minus, Trash2, ShoppingCart, FileText, Package, ChevronDown, ChevronUp, ScanLine } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { calcularTotalesConIgvIncluido } from '@/lib/utils'
import { useDebounce } from '@/lib/hooks'
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
  const [barcodeInput, setBarcodeInput] = useState('')
  const [categoria, setCategoria] = useState('')
  const [limite, setLimite] = useState('50')
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
  const [showProductList, setShowProductList] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [comprobante, setComprobante] = useState('BOLETA_SIMPLE')
  const [clienteDni, setClienteDni] = useState('')
  const [facturaRuc, setFacturaRuc] = useState('')
  const [facturaRazonSocial, setFacturaRazonSocial] = useState('')
  const [facturaDireccion, setFacturaDireccion] = useState('')
  const barcodeRef = useRef<HTMLInputElement>(null)
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
        fetch('/api/ventas/productos/buscar?limit=50').then(r => r.ok && r.json()).then(data => {
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
    fetch('/api/categorias')
      .then((r) => {
        if (!r.ok) throw new Error('Error en la respuesta')
        return r.json()
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setCategorias(data)
        }
      })
      .catch(() => {})
  }, [])

  const debouncedQ = useDebounce(q, 250)

  const search = useCallback(async (query: string, cat: string, limit: string) => {
    setSearching(true)
    setSearchError('')
    try {
      const params = new URLSearchParams()
      if (query.trim()) params.set('q', query)
      if (cat) params.set('categoria', cat)
      if (limit) params.set('limit', limit)
      const res = await fetch(`/api/ventas/productos/buscar?${params}`)
      if (res.ok) {
        const data = await res.json()
        setProductos(data.productos || [])
      }
      else setSearchError('Error al buscar productos')
    } catch {
      setSearchError('Error de conexión')
    } finally {
      setSearching(false)
    }
  }, [])

  useEffect(() => {
    if (showProductList) {
      search(debouncedQ, categoria, limite)
    }
  }, [debouncedQ, categoria, limite, search, showProductList])

  const handleBarcodeSearch = async (barcode: string) => {
    if (!barcode.trim()) return
    setSearching(true)
    try {
      const res = await fetch(`/api/ventas/productos/buscar?q=${encodeURIComponent(barcode)}&limit=5`)
      if (res.ok) {
        const data = await res.json()
        const found = data.productos?.[0]
        if (found && found.stock > 0) {
          addToCart(found)
          setBarcodeInput('')
        } else if (found && found.stock === 0) {
          setSearchError('Producto sin stock')
        } else {
          setSearchError('Producto no encontrado')
        }
      }
    } catch {
      setSearchError('Error al buscar')
    } finally {
      setSearching(false)
      barcodeRef.current?.focus()
    }
  }

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

  const clearCart = () => {
    setCarrito([])
    setSubmitError('')
  }

  const { total, subtotalSinIgv, igvIncluido } = calcularTotalesConIgvIncluido(
    carrito.map((i) => ({ precio: i.precio, cantidad: i.cantidad }))
  )
  const recibido = parseFloat(montoRecibido) || 0
  const vuelto = metodoPago === 'EFECTIVO' ? Math.max(0, recibido - total) : 0

  const handleSubmit = async () => {
    if (carrito.length === 0) return

    if (comprobante === 'FACTURA') {
      if (!facturaRuc.trim() || !facturaRazonSocial.trim() || !facturaDireccion.trim()) {
        setSubmitError('Completa RUC, Razón Social y Dirección para emitir factura')
        return
      }
    }

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
          dniCliente: comprobante === 'BOLETA_DNI' && clienteDni.trim() ? clienteDni.trim() : undefined,
          rucCliente: comprobante === 'FACTURA' ? facturaRuc.trim() : undefined,
          razonSocial: comprobante === 'FACTURA' ? facturaRazonSocial.trim() : undefined,
          direccion: comprobante === 'FACTURA' ? facturaDireccion.trim() : undefined,
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
      setClienteDni('')
      setFacturaRuc('')
      setFacturaRazonSocial('')
      setFacturaDireccion('')
      if (showProductList) search(q, categoria, limite)
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Paga con Yape o Mercado Pago</h2>
          <p className="text-gray-500 mb-6">Total: S/ {qrModal.total.toFixed(2)}</p>
          {!estadoFinal && (
            <div className="flex justify-center mb-6">
              <QRCodeSVG value={qrModal.url} size={200} />
            </div>
          )}

          {qrEstado === 'PENDIENTE' && (
            <div className="flex items-center justify-center gap-2 text-blue-600 mb-6">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="font-medium">Escanea este código QR para pagar...</span>
            </div>
          )}
          {qrEstado === 'PROCESANDO' && (
            <div className="flex items-center justify-center gap-2 text-yellow-600 mb-6">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600"></div>
              <span className="font-medium">Confirmando pago...</span>
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
        onNuevaVenta={() => { setResultado(null); setShowReceipt(false); setClienteDni(''); setFacturaRuc(''); setFacturaRazonSocial(''); setFacturaDireccion('') }}
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
            <button onClick={() => { setResultado(null); setClienteDni(''); setFacturaRuc(''); setFacturaRazonSocial(''); setFacturaDireccion('') }}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2.5 rounded-lg transition cursor-pointer">
              Nueva Venta
            </button>
            <button onClick={() => setShowReceipt(true)}
              className="w-full flex items-center justify-center gap-2 border border-violet-600 text-violet-600 hover:bg-violet-50 py-2.5 rounded-lg transition cursor-pointer">
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
      <div className="flex-1 flex flex-col min-h-0">
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3 shrink-0">
          <HeaderToggle />
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">{user?.nombre || 'Usuario'}</p>
              <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">{user?.rol || '—'}</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-violet-600 text-white flex items-center justify-center text-sm font-bold">
              {(user?.nombre || 'U').charAt(0)}
            </div>
          </div>
        </header>

        <div className="flex-1 flex min-h-0">
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto p-4 lg:p-6 scrollbar-pos">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Punto de Venta</h1>

            <div className="flex gap-2 mb-4">
              {[
                { key: 'BOLETA_SIMPLE', label: 'Boleta Simple' },
                { key: 'BOLETA_DNI', label: 'Boleta con DNI' },
                { key: 'FACTURA', label: 'Factura' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => { setComprobante(opt.key); setSubmitError('') }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                    comprobante === opt.key
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-violet-300 hover:text-violet-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {comprobante === 'BOLETA_DNI' && (
              <input
                value={clienteDni}
                onChange={(e) => setClienteDni(e.target.value)}
                className="w-full max-w-xs px-3 py-2 mb-4 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                placeholder="DNI del cliente..."
              />
            )}

            {comprobante === 'FACTURA' && (
              <div className="grid grid-cols-3 gap-3 mb-4">
                <input
                  value={facturaRuc}
                  onChange={(e) => setFacturaRuc(e.target.value)}
                  className="px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                  placeholder="RUC del cliente"
                />
                <input
                  value={facturaRazonSocial}
                  onChange={(e) => setFacturaRazonSocial(e.target.value)}
                  className="px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                  placeholder="Razón Social"
                />
                <input
                  value={facturaDireccion}
                  onChange={(e) => setFacturaDireccion(e.target.value)}
                  className="px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                  placeholder="Dirección"
                />
              </div>
            )}

            <div className="relative mb-4">
              <ScanLine className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-500" size={20} />
              <input
                ref={barcodeRef}
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { handleBarcodeSearch(barcodeInput) } }}
                className="w-full pl-10 pr-4 py-3 border-2 border-violet-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-lg bg-violet-50/30"
                placeholder="Escanea o ingresa el código de barras..."
                autoFocus
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4">
              {carrito.length === 0 ? (
                <div className="py-16 text-center text-gray-400">
                  <ShoppingCart className="mx-auto mb-3 w-12 h-12" />
                  <p className="text-base">Escanea un producto para agregarlo al carrito</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Producto</th>
                        <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Precio Unit.</th>
                        <th className="text-center px-4 py-3 text-sm font-medium text-gray-500">Cantidad</th>
                        <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Subtotal</th>
                        <th className="text-center px-4 py-3 text-sm font-medium text-gray-500">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {carrito.map((item) => (
                        <tr key={item.productoId} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-800 text-sm">{item.nombre}</td>
                          <td className="px-4 py-3 text-right text-sm text-gray-600">S/ {item.precio.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-1">
                              <button onClick={() => updateCantidad(item.productoId, -1)}
                                className="p-1 hover:bg-gray-200 rounded cursor-pointer text-gray-600">
                                <Minus size={14} />
                              </button>
                              <span className="w-8 text-center font-medium text-sm">{item.cantidad}</span>
                              <button onClick={() => updateCantidad(item.productoId, 1)}
                                className="p-1 hover:bg-gray-200 rounded cursor-pointer text-gray-600">
                                <Plus size={14} />
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right font-medium text-sm">S/ {(item.precio * item.cantidad).toFixed(2)}</td>
                          <td className="px-4 py-3 text-center">
                            <button onClick={() => removeFromCart(item.productoId)}
                              className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded cursor-pointer">
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowProductList(!showProductList)}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 mb-4 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-violet-300 hover:text-violet-600 transition cursor-pointer"
            >
              <Package size={18} />
              {showProductList ? 'Ocultar lista de productos' : 'Mostrar lista de productos'}
              {showProductList ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showProductList && (
              <div>
                <div className="flex gap-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-violet-500"
                      placeholder="Buscar producto por nombre o marca..."
                    />
                  </div>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                  >
                    <option value="">Todas las categorías</option>
                    {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                  </select>
                </div>

                <p className="text-sm text-gray-500 mb-3">{productos.length} productos</p>

                {searchError && (
                  <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg border border-red-200 mb-4">{searchError}</div>
                )}

                {searching ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600" />
                  </div>
                ) : productos.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 bg-white rounded-xl border border-gray-200">
                    <Package className="mx-auto mb-2 w-10 h-10" />
                    <p className="text-sm">No se encontraron productos</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {productos.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => addToCart(p)}
                        disabled={p.stock === 0}
                        className="bg-white rounded-xl border border-gray-200 p-3 text-left hover:shadow-md hover:border-violet-300 disabled:opacity-50 transition cursor-pointer flex flex-col"
                      >
                        <p className="font-semibold text-gray-800 text-sm truncate">{p.nombre}</p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">{p.marca}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-base font-bold text-violet-600">S/ {Number(p.precio).toFixed(2)}</span>
                        </div>
                        <div className="mt-1">
                          {p.stock === 0 ? (
                            <span className="text-xs text-red-400 font-medium">Sin stock</span>
                          ) : (
                            <span className="text-xs text-gray-500">{p.stock} ud.</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="w-80 bg-white border-l border-gray-200 flex flex-col shrink-0">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">Resumen de Venta</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>S/ {subtotalSinIgv.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold text-gray-800">
                  <span>Total</span>
                  <span>S/ {total.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <label className="text-sm font-medium text-gray-600">Método de pago</label>
                <select
                  value={metodoPago}
                  onChange={(e) => setMetodoPago(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                >
                  <option value="EFECTIVO">Efectivo</option>
                  <option value="YAPE">Yape (QR)</option>
                </select>

                {metodoPago === 'EFECTIVO' && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Monto recibido</label>
                    <input
                      type="number"
                      step="0.01"
                      value={montoRecibido}
                      onChange={(e) => setMontoRecibido(e.target.value)}
                      className="w-full px-3 py-2.5 mt-1 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                      placeholder="Monto recibido"
                    />
                  </div>
                )}

                {metodoPago === 'EFECTIVO' && recibido >= total && (
                  <div className="text-sm text-green-600 font-medium text-center bg-green-50 py-2 rounded-lg">
                    Vuelto: S/ {vuelto.toFixed(2)}
                  </div>
                )}
              </div>

              {submitError && (
                <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg border border-red-200">{submitError}</div>
              )}
            </div>

            <div className="p-5 border-t border-gray-100 space-y-2">
              <button
                onClick={handleSubmit}
                disabled={carrito.length === 0 || submitting || (metodoPago === 'EFECTIVO' && recibido < total)}
                className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition cursor-pointer"
              >
                {submitting ? 'Procesando...' : `Realizar Venta`}
              </button>
              <button
                onClick={clearCart}
                disabled={carrito.length === 0}
                className="w-full border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium py-2.5 rounded-xl transition disabled:opacity-50 cursor-pointer"
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
