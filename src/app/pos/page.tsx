'use client'

import { useState, useEffect, useMemo } from 'react'
import { Plus, Search, Pencil, EyeOff, Eye, X, Trash2, AlertTriangle, Loader2, Package } from 'lucide-react'
import Sidebar, { HeaderToggle } from '@/components/Sidebar'
import { useAuth } from '@/lib/AuthContext'

interface Categoria {
  id: number
  nombre: string
}

interface Producto {
  id: number
  nombre: string
  marca: string | null
  precio: number
  stock: number
  activo: boolean
  codigoBarras?: string | null
  fechaVencimiento?: string | null
  categoria?: { id: number; nombre: string } | null
  categoriaId?: number | null
}

interface ToastState {
  mensaje: string
  tipo: 'exito' | 'error'
}

interface ModalProductoProps {
  abierto: boolean
  onCerrar: () => void
  onGuardar: () => void
  productoEditando: Producto | null
  categorias: Categoria[]
}

function ModalProducto({ abierto, onCerrar, onGuardar, productoEditando, categorias }: ModalProductoProps) {
  const [nombre, setNombre] = useState('')
  const [marca, setMarca] = useState('')
  const [categoriaId, setCategoriaId] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')
  const [codigoBarras, setCodigoBarras] = useState('')
  const [fechaVencimiento, setFechaVencimiento] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const esCreacion = !productoEditando

  useEffect(() => {
    if (abierto) {
      if (productoEditando) {
        setNombre(productoEditando.nombre || '')
        setMarca(productoEditando.marca || '')
        setCategoriaId(String(productoEditando.categoria?.id ?? productoEditando.categoriaId ?? ''))
        setPrecio(String(productoEditando.precio ?? ''))
        setStock(String(productoEditando.stock ?? ''))
        setCodigoBarras(productoEditando.codigoBarras ?? '')
        setFechaVencimiento(
          productoEditando.fechaVencimiento
            ? new Date(productoEditando.fechaVencimiento).toISOString().split('T')[0]
            : ''
        )
      } else {
        const fv = new Date()
        fv.setFullYear(fv.getFullYear() + 2)
        setNombre('')
        setMarca('')
        setCategoriaId(categorias.length > 0 ? String(categorias[0].id) : '')
        setPrecio('')
        setStock('')
        setCodigoBarras('')
        setFechaVencimiento(fv.toISOString().split('T')[0])
      }
      setError('')
    }
  }, [abierto, productoEditando, categorias])

  if (!abierto) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (esCreacion) {
        const codigo = 'PROD-' + Date.now()
        const payload: Record<string, unknown> = {
          codigo,
          nombre,
          marca: marca || undefined,
          categoriaId: categoriaId || undefined,
          precio: parseFloat(precio),
          stock: parseInt(stock, 10) || 0,
        }
        const res = await fetch('/api/almacen/productos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) {
          const errData = await res.json()
          throw new Error(errData.message || 'Error al crear producto')
        }
      } else {
        const payload: Record<string, unknown> = {
          nombre,
          marca: marca || undefined,
          categoriaId: categoriaId || undefined,
          precio: parseFloat(precio),
        }
        if (productoEditando.stock !== undefined) {
          payload.stock = parseInt(stock, 10)
        }
        const res = await fetch(`/api/almacen/productos/${productoEditando.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.message || 'Error al actualizar producto')
        }
      }
      onGuardar()
    } catch (err: unknown) {
      setError((err as { message?: string })?.message || 'Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">
            {esCreacion ? 'Nuevo Producto' : 'Editar Producto'}
          </h2>
          <button onClick={onCerrar} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Marca</label>
            <input
              type="text"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Categoría</label>
            <select
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Seleccionar...</option>
              {categorias.map((c: Categoria) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Precio</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">S./</span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Código de Barras</label>
            <input
              type="text"
              value={codigoBarras}
              onChange={(e) => setCodigoBarras(e.target.value)}
              placeholder="Opcional"
              className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {esCreacion && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Fecha de Vencimiento</label>
            <input
              type="date"
              value={fechaVencimiento}
              onChange={(e) => setFechaVencimiento(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {esCreacion && (
              <p className="mt-1 text-xs text-gray-400">Prellenado con +2 años por defecto</p>
            )}
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCerrar}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-[#6366f1] px-4 py-2 text-sm text-white transition-colors hover:bg-indigo-600 disabled:opacity-70 cursor-pointer"
            >
              {loading && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

interface ModalSolicitudProps {
  abierto: boolean
  onCerrar: () => void
  producto: Producto | null
  proveedores: unknown[]
  onCreada: () => void
}

function ModalSolicitud({ abierto, onCerrar, producto, proveedores, onCreada }: ModalSolicitudProps) {
  const [cantidad, setCantidad] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (abierto && producto) {
      setCantidad('')
      setError('')
    }
  }, [abierto, producto])

  if (!abierto || !producto) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)
    setError('')
    try {
      const res = await fetch('/api/almacen/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ productoId: producto!.id, cantidad_solicitada: parseInt(cantidad, 10) }],
        }),
      })
      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.message || 'Error al crear solicitud')
      }
      onCreada()
    } catch (err: unknown) {
      setError((err as { message?: string })?.message || 'Error al crear solicitud')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onCerrar}>
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Solicitar Reposición</h2>
          <button onClick={onCerrar} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X className="h-5 w-5" /></button>
        </div>
        <div className="mb-4 space-y-1 rounded-lg bg-gray-50 p-3 text-sm">
          <p><span className="font-medium text-gray-700">Producto:</span> {producto.nombre} - {producto.marca}</p>
          <p><span className="font-medium text-gray-700">Stock actual:</span> {producto.stock} und(s)</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Cantidad a solicitar</label>
            <input
              type="number" min="1" value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          {error && <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</div>}
          <div className="flex justify-end">
            <button
              type="submit" disabled={enviando}
              className="flex items-center gap-2 rounded-lg bg-[#6366f1] px-4 py-2 text-sm text-white transition-colors hover:bg-indigo-600 disabled:opacity-70 cursor-pointer"
            >
              {enviando && <Loader2 className="h-4 w-4 animate-spin" />}
              Crear Solicitud
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

interface ModalBajaProps {
  abierto: boolean
  onCerrar: () => void
  producto: Producto | null
  onRegistrada: () => void
}

function ModalBaja({ abierto, onCerrar, producto, onRegistrada }: ModalBajaProps) {
  const [cantidad, setCantidad] = useState('')
  const [motivo, setMotivo] = useState('Vencido')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (abierto && producto) {
      setCantidad('1')
      setMotivo('Vencido')
      setError('')
    }
  }, [abierto, producto])

  if (!abierto || !producto) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const c = parseInt(cantidad, 10)
    if (!c || c <= 0) { setError('La cantidad debe ser mayor a 0'); return }
    if (c > (producto!.stock || 0)) { setError(`Stock insuficiente (disponible: ${producto!.stock})`); return }
    setEnviando(true)
    setError('')
    try {
      const res = await fetch('/api/almacen/bajas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productoId: producto!.id, cantidad: c, motivo }),
      })
      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.message || 'Error al registrar baja')
      }
      onRegistrada()
    } catch (err: unknown) {
      setError((err as { message?: string })?.message || 'Error al registrar baja')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Dar de Baja</h2>
          <button onClick={onCerrar} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4 space-y-1 rounded-lg bg-gray-50 p-3 text-sm">
          <p><span className="font-medium text-gray-700">Producto:</span> {producto.nombre}</p>
          <p><span className="font-medium text-gray-700">Stock actual:</span> {producto.stock} und(s)</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Cantidad</label>
            <div className="flex gap-2">
              <input
                type="number"
                min={1}
                max={producto.stock}
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                required
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="button"
                onClick={() => setCantidad(String(producto.stock))}
                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 cursor-pointer"
              >
                Todo
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Motivo</label>
            <select
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="Vencido">Vencido</option>
              <option value="Dañado">Dañado</option>
              <option value="Rotura">Rotura</option>
              <option value="Caducado">Caducado</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          {error && <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</div>}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCerrar}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={enviando}
              className="flex items-center gap-2 rounded-lg bg-[#ef4444] px-4 py-2 text-sm text-white transition-colors hover:bg-red-600 disabled:opacity-70 cursor-pointer"
            >
              {enviando && <Loader2 className="h-4 w-4 animate-spin" />}
              Registrar Baja
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function formatFecha(fecha: string | null | undefined) {
  if (!fecha) return '-'
  const d = new Date(fecha)
  return d.toLocaleDateString('es-PE', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

export default function ProductosPage() {
  const { user } = useAuth()
  const [productos, setProductos] = useState<Producto[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalAbierto, setModalAbierto] = useState(false)
  const [productoEditando, setProductoEditando] = useState<Producto | null>(null)
  const [busqueda, setBusqueda] = useState('')
  const [filtroCategoria, setFiltroCategoria] = useState('Todas')
  const [filtroEstado, setFiltroEstado] = useState('Todos')
  const [confirmarEstado, setConfirmarEstado] = useState<Producto | null>(null)
  const [modalBaja, setModalBaja] = useState<Producto | null>(null)
  const [modalSolicitud, setModalSolicitud] = useState<Producto | null>(null)
  const [proveedores, setProveedores] = useState<unknown[]>([])
  const [filtroAlerta, setFiltroAlerta] = useState('Todos')
  const [paginaActual, setPaginaActual] = useState(1)
  const [toast, setToast] = useState<ToastState | null>(null)
  const ITEMS_POR_PAGINA = 12
  const rol = user?.rol
  const puedeDarBaja = rol === 'ALMACENERO' || rol === 'ADMIN'

  const mostrarExito = (mensaje: string) => {
    setToast({ mensaje, tipo: 'exito' })
    setTimeout(() => setToast(null), 3000)
  }
  const mostrarError = (mensaje: string) => {
    setToast({ mensaje, tipo: 'error' })
    setTimeout(() => setToast(null), 3000)
  }
  const cerrarToast = () => setToast(null)

  const cargarDatos = async () => {
    setLoading(true)
    setError('')
    try {
      const [resProductos, resCategorias, resProv] = await Promise.all([
        fetch('/api/almacen/productos?limit=1000'),
        fetch('/api/categorias'),
        fetch('/api/admin/proveedores').catch(() => null),
      ])

      const dataProductos = resProductos.ok ? await resProductos.json() : { productos: [] }
      const dataCategorias = resCategorias.ok ? await resCategorias.json() : []
      const dataProv = resProv?.ok ? await resProv.json() : []

      setProductos(Array.isArray(dataProductos.productos) ? dataProductos.productos : [])
      setCategorias(Array.isArray(dataCategorias) ? dataCategorias : [])
      setProveedores(Array.isArray(dataProv) ? dataProv : [])
    } catch {
      setError('Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargarDatos() }, [])

  const abrirCrear = () => { setProductoEditando(null); setModalAbierto(true) }
  const abrirEditar = (p: Producto) => { setProductoEditando(p); setModalAbierto(true) }

  const handleGuardar = () => {
    setModalAbierto(false)
    setProductoEditando(null)
    cargarDatos()
  }

  const esActivo = (p: Producto) => p.activo === true || p.activo == null

  const toggleEstado = async () => {
    if (!confirmarEstado) return
    const p = confirmarEstado
    const activo = esActivo(p)
    setConfirmarEstado(null)
    try {
      if (activo) {
        const res = await fetch(`/api/almacen/productos/${p.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ activo: false }),
        })
        if (!res.ok) throw new Error('Error al desactivar producto')
        mostrarExito('Producto desactivado correctamente')
      } else {
        const res = await fetch(`/api/almacen/productos/${p.id}/reactivar`, { method: 'PATCH' })
        if (!res.ok) throw new Error('Error al reactivar producto')
        mostrarExito('Producto reactivado correctamente')
      }
      cargarDatos()
    } catch (err: unknown) {
      mostrarError((err as { message?: string })?.message || 'Error al cambiar estado')
    }
  }

  const conteoAlertas = useMemo(() => {
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    const limite = new Date(hoy)
    limite.setDate(limite.getDate() + 30)

    const idsVencidos = new Set()
    const idsPorVencer = new Set()
    for (const p of productos) {
      if (!p.fechaVencimiento) continue
      const fv = new Date(p.fechaVencimiento)
      fv.setHours(0, 0, 0, 0)
      if (fv < hoy) idsVencidos.add(p.id)
      else if (fv <= limite) idsPorVencer.add(p.id)
    }

    const stockBajo = productos.filter((p) => esActivo(p) && p.stock <= 5).length
    return { stockBajo, idsVencidos, idsPorVencer }
  }, [productos])

  const filtrados = productos.filter((p: Producto) => {
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    const limite = new Date(hoy)
    limite.setDate(limite.getDate() + 30)
    const fv = p.fechaVencimiento ? new Date(p.fechaVencimiento) : null
    if (fv) fv.setHours(0, 0, 0, 0)

    const coincideTexto =
      p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.marca?.toLowerCase().includes(busqueda.toLowerCase())
    const prodCategoriaId = p.categoria?.id ?? p.categoriaId
    const coincideCategoria =
      filtroCategoria === 'Todas' || String(prodCategoriaId) === String(filtroCategoria)
    const coincideEstado =
      filtroEstado === 'Todos' ||
      (filtroEstado === 'Activo' && esActivo(p)) ||
      (filtroEstado === 'Inactivo' && !esActivo(p))
    const coincideAlerta =
      filtroAlerta === 'Todos' ||
      (filtroAlerta === 'Stock bajo' && esActivo(p) && p.stock <= 5) ||
      (filtroAlerta === 'Vencido' && (conteoAlertas.idsVencidos.has(p.id) || (fv && fv < hoy))) ||
      (filtroAlerta === 'Por vencer' && (conteoAlertas.idsPorVencer.has(p.id) || (fv && fv >= hoy && fv <= limite)))
    return coincideTexto && coincideCategoria && coincideEstado && coincideAlerta
  })

  useEffect(() => { setPaginaActual(1) }, [busqueda, filtroCategoria, filtroEstado, filtroAlerta])

  const totalPaginas = Math.ceil(filtrados.length / ITEMS_POR_PAGINA)
  const productosPagina = filtrados.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  )

  const stockColor = (stock: number) => {
    if (stock === 0) return 'bg-red-50'
    if (stock <= 5) return 'bg-amber-50'
    return ''
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <HeaderToggle />
          <h1 className="text-xl font-bold text-gray-800">Productos</h1>
          <button
            onClick={abrirCrear}
            className="ml-auto flex items-center gap-2 rounded-lg bg-[#6366f1] px-4 py-2 text-sm text-white transition-colors hover:bg-indigo-600 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Nuevo Producto
          </button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          {toast && (
            <div className={`fixed top-4 right-4 z-[100] flex items-center gap-2 rounded-lg px-4 py-3 text-sm shadow-lg transition-all ${
              (toast as ToastState).tipo === 'exito' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              <span>{(toast as ToastState).mensaje}</span>
              <button onClick={cerrarToast} className="ml-2 hover:opacity-80 cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {(conteoAlertas.stockBajo > 0 || conteoAlertas.idsVencidos.size > 0 || conteoAlertas.idsPorVencer.size > 0) && (
            <div className="flex flex-wrap gap-2 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              {conteoAlertas.stockBajo > 0 && (
                <button
                  onClick={() => setFiltroAlerta(filtroAlerta === 'Stock bajo' ? 'Todos' : 'Stock bajo')}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                    filtroAlerta === 'Stock bajo'
                      ? 'bg-amber-200 text-amber-900'
                      : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                  }`}
                >
                  <AlertTriangle className="h-3 w-3" />
                  {conteoAlertas.stockBajo} producto{conteoAlertas.stockBajo !== 1 ? 's' : ''} con stock bajo
                </button>
              )}
              {conteoAlertas.idsVencidos.size > 0 && (
                <button
                  onClick={() => setFiltroAlerta(filtroAlerta === 'Vencido' ? 'Todos' : 'Vencido')}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                    filtroAlerta === 'Vencido'
                      ? 'bg-red-200 text-red-900'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  <AlertTriangle className="h-3 w-3" />
                  {conteoAlertas.idsVencidos.size} producto{conteoAlertas.idsVencidos.size !== 1 ? 's' : ''} vencido{conteoAlertas.idsVencidos.size !== 1 ? 's' : ''}
                </button>
              )}
              {conteoAlertas.idsPorVencer.size > 0 && (
                <button
                  onClick={() => setFiltroAlerta(filtroAlerta === 'Por vencer' ? 'Todos' : 'Por vencer')}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                    filtroAlerta === 'Por vencer'
                      ? 'bg-yellow-200 text-yellow-900'
                      : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  }`}
                >
                  <AlertTriangle className="h-3 w-3" />
                  {conteoAlertas.idsPorVencer.size} producto{conteoAlertas.idsPorVencer.size !== 1 ? 's' : ''} por vencer
                </button>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre o marca..."
                className="w-full rounded-lg border border-gray-200 px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="Todas">Todas las categorías</option>
              {categorias.map((c: Categoria) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>

            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="Todos">Todos los estados</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>

            <select
              value={filtroAlerta}
              onChange={(e) => setFiltroAlerta(e.target.value)}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="Todos">Sin filtro</option>
              <option value="Stock bajo">Stock bajo (&le;5)</option>
              <option value="Vencido">Vencido</option>
              <option value="Por vencer">Por vencer</option>
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="flex flex-col items-center gap-3 text-gray-400">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#6366f1] border-t-transparent" />
                <span className="text-sm">Cargando productos...</span>
              </div>
            </div>
          ) : error ? (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
          ) : filtrados.length === 0 ? (
            <div className="flex h-64 items-center justify-center text-sm text-gray-400">
              No hay productos registrados
            </div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-[#6366f1] text-white">
                      <th className="px-4 py-3 font-medium">Nombre</th>
                      <th className="px-4 py-3 font-medium">Marca</th>
                      <th className="px-4 py-3 font-medium">Categoría</th>
                      <th className="px-4 py-3 font-medium">Precio</th>
                      <th className="px-4 py-3 font-medium">Stock</th>
                      <th className="px-4 py-3 font-medium">Vencimiento</th>
                      <th className="px-4 py-3 font-medium">Estado</th>
                      <th className="px-4 py-3 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productosPagina.map((p: Producto, i: number) => (
                      <tr key={p.id} className={`${stockColor(p.stock)} ${i % 2 === 0 ? 'bg-white' : ''}`}>
                        <td className="px-4 py-3 text-gray-800">{p.nombre}</td>
                        <td className="px-4 py-3 text-gray-500">{p.marca || '-'}</td>
                        <td className="px-4 py-3 text-gray-500">
                          {p.categoria?.nombre || categorias.find((c) => String(c.id) === String(p.categoria?.id ?? p.categoriaId))?.nombre || '-'}
                        </td>
                        <td className="px-4 py-3 text-gray-800">S/ {Number(p.precio).toFixed(2)}</td>
                        <td className="px-4 py-3 text-gray-600">{p.stock}</td>
                        <td className="px-4 py-3 text-gray-600">{formatFecha(p.fechaVencimiento)}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              esActivo(p)
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {esActivo(p) ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => abrirEditar(p)}
                              className="rounded-lg p-1.5 text-[#6366f1] transition-colors hover:bg-indigo-50 cursor-pointer"
                              title="Editar"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setConfirmarEstado(p)}
                              className={`rounded-lg p-1.5 transition-colors cursor-pointer ${
                                esActivo(p)
                                  ? 'text-red-500 hover:bg-red-50'
                                  : 'text-green-500 hover:bg-green-50'
                              }`}
                              title={esActivo(p) ? 'Desactivar' : 'Reactivar'}
                            >
                              {esActivo(p) ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                            {puedeDarBaja && (
                              <button
                                onClick={() => setModalBaja(p)}
                                className="rounded-lg p-1.5 text-red-500 transition-colors hover:bg-red-50 cursor-pointer"
                                title="Dar de baja"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                            {esActivo(p) && p.stock <= 5 && (
                              <button
                                onClick={() => setModalSolicitud(p)}
                                className="rounded-lg p-1.5 text-amber-600 transition-colors hover:bg-amber-50 cursor-pointer"
                                title="Solicitar reposición"
                              >
                                <Package className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-sm bg-red-100 border border-red-200" />
                    Sin stock
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-sm bg-amber-100 border border-amber-200" />
                    Stock crítico (&le;5)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-sm bg-white border border-gray-300" />
                    Stock normal
                  </div>
                </div>

                {totalPaginas > 1 && (
                  <div className="flex items-center gap-2 text-sm">
                    <button
                      onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
                      disabled={paginaActual === 1}
                      className="rounded-lg border border-gray-200 px-3 py-1 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                    >
                      Anterior
                    </button>
                    <span className="px-2 text-gray-500">
                      Pág. {paginaActual} de {totalPaginas}
                    </span>
                    <button
                      onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))}
                      disabled={paginaActual === totalPaginas}
                      className="rounded-lg border border-gray-200 px-3 py-1 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                    >
                      Siguiente
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          <ModalProducto
            abierto={modalAbierto}
            onCerrar={() => { setModalAbierto(false); setProductoEditando(null) }}
            onGuardar={handleGuardar}
            productoEditando={productoEditando}
            categorias={categorias}
          />

          <ModalBaja
            abierto={!!modalBaja}
            onCerrar={() => setModalBaja(null)}
            producto={modalBaja}
            onRegistrada={() => {
              setModalBaja(null)
              mostrarExito('Baja registrada correctamente')
              cargarDatos()
            }}
          />

          <ModalSolicitud
            abierto={!!modalSolicitud}
            onCerrar={() => setModalSolicitud(null)}
            producto={modalSolicitud}
            proveedores={proveedores}
            onCreada={() => {
              setModalSolicitud(null)
              mostrarExito('Solicitud de reposición creada')
              cargarDatos()
            }}
          />

          {confirmarEstado && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-2 flex items-center gap-3">
                  <div className={`rounded-full p-2 ${esActivo(confirmarEstado) ? 'bg-red-100' : 'bg-green-100'}`}>
                    <AlertTriangle className={`h-5 w-5 ${esActivo(confirmarEstado) ? 'text-red-600' : 'text-green-600'}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {esActivo(confirmarEstado) ? 'Desactivar' : 'Reactivar'} producto
                  </h3>
                </div>
                <p className="mb-6 text-sm text-gray-600">
                  ¿{esActivo(confirmarEstado) ? 'Desactivar' : 'Reactivar'} producto &ldquo;{confirmarEstado.nombre}&rdquo;?
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setConfirmarEstado(null)}
                    className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={toggleEstado}
                    className={`rounded-lg px-4 py-2 text-sm text-white transition-colors cursor-pointer ${
                      esActivo(confirmarEstado)
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {esActivo(confirmarEstado) ? 'Desactivar' : 'Reactivar'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
