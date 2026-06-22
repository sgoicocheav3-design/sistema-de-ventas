// src/pages/pos/PosPage.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search, Plus, Minus, Trash2, ShoppingCart,
  CheckCircle, Printer, X, Tag, AlertTriangle, User,
} from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import api, { withAuth } from '../../lib/axios';

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmt = (n) => `S/ ${parseFloat(n || 0).toFixed(2)}`;

const stockColor = (stock) => {
  if (stock === 0) return 'text-red-600 bg-red-50';
  if (stock <= 5)  return 'text-amber-600 bg-amber-50';
  return 'text-emerald-600 bg-emerald-50';
};

const METODOS = [
  { value: 'EFECTIVO', label: 'Efectivo',  emoji: '💵' },
  { value: 'YAPE',     label: 'Yape',      emoji: '📱' },
  { value: 'PLIN',     label: 'Plin',      emoji: '📲' },
];

// ─── Hook: debounce ──────────────────────────────────────────────────────────
const useDebounce = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

// ─── Componente principal ─────────────────────────────────────────────────────
export default function PosPage() {
  const { token } = useAuth();

  // ─ Búsqueda
  const [busqueda,    setBusqueda]    = useState('');
  const [resultados,  setResultados]  = useState([]);
  const [buscando,    setBuscando]    = useState(false);
  const [categorias,  setCategorias]  = useState([]);
  const [filtCat,     setFiltCat]     = useState('');
  const searchRef = useRef(null);

  // ─ Carrito: [{ producto, cantidad }]
  const [carrito,     setCarrito]     = useState([]);

  // ─ Pago
  const [metodoPago,  setMetodoPago]  = useState('EFECTIVO');
  const [montoRec,    setMontoRec]    = useState('');

  // ─ Estados de UI
  const [procesando,  setProcesando]  = useState(false);
  const [errorVenta,  setErrorVenta]  = useState('');
  const [ventaOk,     setVentaOk]     = useState(null); // Venta completada

  // ─ Cliente (opcional)
  const [dniSearch,     setDniSearch]     = useState('');
  const [clienteVinc,   setClienteVinc]   = useState(null); // cliente vinculado a la venta
  const [buscandoCli,   setBuscandoCli]   = useState(false);
  const [cliNotFound,   setCliNotFound]   = useState(false);
  const [showCliForm,   setShowCliForm]   = useState(false);
  const [cliForm,       setCliForm]       = useState({ nombre: '', email: '', telefono: '' });
  const [cliErr,        setCliErr]        = useState('');
  const [creandoCli,    setCreandoCli]    = useState(false);

  const busquedaDebounced = useDebounce(busqueda, 300);

  // ─── Cargar categorías ───────────────────────────────────────────────────
  useEffect(() => {
    api.get('/categorias').then(({ data }) => setCategorias(data)).catch(() => {});
    searchRef.current?.focus();
  }, []);

  // ─── Buscar productos con debounce ──────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams();
    if (busquedaDebounced) params.set('q', busquedaDebounced);
    if (filtCat)           params.set('categoria', filtCat);

    if (!busquedaDebounced && !filtCat) {
      setResultados([]);
      return;
    }

    setBuscando(true);
    api.get(`/ventas/productos/buscar?${params}`, withAuth(token))
      .then(({ data }) => setResultados(data))
      .catch(() => setResultados([]))
      .finally(() => setBuscando(false));
  }, [busquedaDebounced, filtCat, token]);

  // ─── Carrito: agregar producto ───────────────────────────────────────────
  const agregar = useCallback((producto) => {
    if (producto.stock === 0) return;
    setCarrito((prev) => {
      const existing = prev.find((i) => i.producto.id === producto.id);
      if (existing) {
        // No pasar del stock disponible
        if (existing.cantidad >= producto.stock) return prev;
        return prev.map((i) =>
          i.producto.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      return [...prev, { producto, cantidad: 1 }];
    });
  }, []);

  // ─── Carrito: cambiar cantidad ───────────────────────────────────────────
  const setCantidad = (productoId, delta) => {
    setCarrito((prev) =>
      prev
        .map((i) => {
          if (i.producto.id !== productoId) return i;
          const nueva = i.cantidad + delta;
          if (nueva <= 0) return null;
          if (nueva > i.producto.stock) return i;
          return { ...i, cantidad: nueva };
        })
        .filter(Boolean)
    );
  };

  const eliminar = (productoId) =>
    setCarrito((prev) => prev.filter((i) => i.producto.id !== productoId));

  const vaciarCarrito = () => {
    setCarrito([]); setMontoRec(''); setErrorVenta('');
    setClienteVinc(null); setDniSearch(''); setCliNotFound(false); setShowCliForm(false);
  };

  // ─── Cliente: buscar por DNI ────────────────────────────────────────────
  const buscarCliente = async () => {
    if (!/^\d{8}$/.test(dniSearch.trim())) {
      setCliErr('El DNI debe tener 8 dígitos');
      return;
    }
    setBuscandoCli(true); setCliErr(''); setCliNotFound(false); setShowCliForm(false);
    try {
      const { data } = await api.get(`/clientes/buscar-dni/${dniSearch.trim()}`, withAuth(token));
      setClienteVinc(data);
    } catch (err) {
      if (err.response?.status === 404) {
        setCliNotFound(true);
      } else {
        setCliErr(err.response?.data?.message || 'Error al buscar cliente');
      }
    } finally { setBuscandoCli(false); }
  };

  // ─── Cliente: crear nuevo ────────────────────────────────────────────────
  const crearCliente = async () => {
    if (!cliForm.nombre.trim()) { setCliErr('El nombre es requerido'); return; }
    setCreandoCli(true); setCliErr('');
    try {
      const { data } = await api.post('/clientes', {
        dni: dniSearch.trim(),
        nombre: cliForm.nombre.trim(),
        email: cliForm.email.trim() || undefined,
        telefono: cliForm.telefono.trim() || undefined,
      }, withAuth(token));
      setClienteVinc(data);
      setShowCliForm(false); setCliNotFound(false);
    } catch (err) {
      // Si el cliente ya existe (409), vincularlo directamente
      if (err.response?.status === 409 && err.response?.data?.cliente) {
        setClienteVinc(err.response.data.cliente);
        setShowCliForm(false); setCliNotFound(false);
      } else {
        setCliErr(err.response?.data?.message || 'Error al crear cliente');
      }
    } finally { setCreandoCli(false); }
  };

  // ─── Cálculos del carrito ────────────────────────────────────────────────
  const subtotal   = carrito.reduce((s, i) => s + parseFloat(i.producto.precio) * i.cantidad, 0);
  const igv        = Math.round(subtotal * 0.18 * 100) / 100;
  const montoTotal = Math.round((subtotal + igv) * 100) / 100;
  const recibido   = parseFloat(montoRec || 0);
  const vuelto     = metodoPago === 'EFECTIVO' ? Math.max(0, recibido - montoTotal) : 0;
  const puedeConfirmar =
    carrito.length > 0 &&
    !procesando &&
    (metodoPago !== 'EFECTIVO' || recibido >= montoTotal);

  // ─── Confirmar venta ────────────────────────────────────────────────────
  const confirmarVenta = async () => {
    setErrorVenta('');
    setProcesando(true);
    try {
      const body = {
        items: carrito.map((i) => ({ productoId: i.producto.id, cantidad: i.cantidad })),
        metodoPago,
        montoRecibido: metodoPago === 'EFECTIVO' ? recibido : montoTotal,
        clienteId: clienteVinc?.id || null,
      };
      const { data } = await api.post('/ventas', body, withAuth(token));
      setVentaOk({ ...data, subtotal, vuelto });
      vaciarCarrito();
    } catch (err) {
      setErrorVenta(err.response?.data?.message || 'Error al procesar la venta');
    } finally {
      setProcesando(false);
    }
  };

  // ─── Imprimir comprobante ────────────────────────────────────────────────
  const imprimir = () => {
    const w = window.open('', '_blank');
    const fecha = new Date(ventaOk.creadoEn).toLocaleString('es-PE');
    const lineas = ventaOk.detalles.map((d) =>
      `<tr>
        <td style="padding:4px 8px">${d.producto.nombre}</td>
        <td style="padding:4px 8px;text-align:center">${d.cantidad}</td>
        <td style="padding:4px 8px;text-align:right">S/ ${parseFloat(d.precioUnitario).toFixed(2)}</td>
        <td style="padding:4px 8px;text-align:right">S/ ${(parseFloat(d.precioUnitario)*d.cantidad).toFixed(2)}</td>
      </tr>`
    ).join('');
    w.document.write(`<!DOCTYPE html><html><head>
      <title>Comprobante #${ventaOk.id}</title>
      <style>body{font-family:monospace;font-size:13px;max-width:300px;margin:0 auto;padding:16px}
      h2{text-align:center;margin:0}p{margin:2px 0}table{width:100%}
      hr{border:1px dashed #999}td,th{font-size:12px}.total{font-size:15px;font-weight:bold}</style>
    </head><body>
      <h2>MINIMARKET SYSTEM</h2>
      <p style="text-align:center">Comprobante de Venta</p>
      <hr/>
      <p>Venta #: ${ventaOk.id}</p>
      <p>Fecha: ${fecha}</p>
      <p>Vendedor: ${ventaOk.usuario?.nombre || '-'}</p>
      <p>Pago: ${ventaOk.metodoPago}</p>
      <hr/>
      <table><thead><tr>
        <th style="text-align:left">Producto</th><th>Cant.</th><th>P.Unit</th><th>Total</th>
      </tr></thead><tbody>${lineas}</tbody></table>
      <hr/>
      <p>Subtotal: ${fmt(ventaOk.subtotal)}</p>
      <p>IGV (18%): ${fmt(ventaOk.igv)}</p>
      <p class="total">TOTAL: ${fmt(ventaOk.total)}</p>
      ${ventaOk.metodoPago === 'EFECTIVO' ? `<p>Recibido: ${fmt(ventaOk.montoRecibido)}</p><p>Vuelto: ${fmt(ventaOk.vuelto)}</p>` : ''}
      <hr/><p style="text-align:center;font-size:11px">¡Gracias por su compra!</p>
    </body></html>`);
    w.document.close();
    w.print();
  };

  // ─── Descargar PDF con pdfmake ───────────────────────────────────────────
  const descargarPDF = async () => {
    try {
      const pdfMakeLib = await import('pdfmake/build/pdfmake');
      const pdfFonts   = await import('pdfmake/build/vfs_fonts');
      const pdfMake = pdfMakeLib.default;
      pdfMake.vfs = pdfFonts.default?.pdfMake?.vfs ||
                    pdfFonts.pdfMake?.vfs ||
                    pdfFonts.default?.vfs;

      const fecha = new Date(ventaOk.creadoEn).toLocaleString('es-PE');
      const subtotalNum  = parseFloat(ventaOk.subtotal);
      const igvNum       = parseFloat(ventaOk.igv);
      const totalNum     = parseFloat(ventaOk.total);
      const recibidoNum  = parseFloat(ventaOk.montoRecibido);
      const vueltoNum    = parseFloat(ventaOk.vuelto);

      // Filas del detalle
      const filas = [
        [
          { text: 'Producto',   bold: true, fontSize: 9 },
          { text: 'Cant.',      bold: true, fontSize: 9, alignment: 'center' },
          { text: 'P.Unit.',    bold: true, fontSize: 9, alignment: 'right'  },
          { text: 'Subtotal',   bold: true, fontSize: 9, alignment: 'right'  },
        ],
        ...ventaOk.detalles.map((d) => [
          { text: d.producto.nombre,                                                  fontSize: 9 },
          { text: String(d.cantidad),                                                 fontSize: 9, alignment: 'center' },
          { text: `S/ ${parseFloat(d.precioUnitario).toFixed(2)}`,                  fontSize: 9, alignment: 'right'  },
          { text: `S/ ${(parseFloat(d.precioUnitario) * d.cantidad).toFixed(2)}`,   fontSize: 9, alignment: 'right'  },
        ]),
      ];

      const efBloques = ventaOk.metodoPago === 'EFECTIVO' ? [
        { columns: [{ text: 'Recibido:', width: '*', fontSize: 9 }, { text: `S/ ${recibidoNum.toFixed(2)}`, width: 'auto', fontSize: 9, alignment: 'right' }] },
        { columns: [{ text: 'Vuelto:',   width: '*', fontSize: 9, bold: true }, { text: `S/ ${vueltoNum.toFixed(2)}`, width: 'auto', fontSize: 9, bold: true, alignment: 'right' }] },
      ] : [];

      const docDef = {
        pageSize:    { width: 226, height: 'auto' }, // 80mm
        pageMargins: [12, 12, 12, 12],
        content: [
          { text: 'MINIMARKET SYSTEM', style: 'header', alignment: 'center' },
          { text: 'Comprobante de Venta', fontSize: 9, alignment: 'center', margin: [0, 1, 0, 4] },
          { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 202, y2: 0, lineWidth: 0.5, dash: { length: 3 } }] },
          { text: `Venta #: ${ventaOk.id}`,              fontSize: 9, margin: [0, 4, 0, 1] },
          { text: `Fecha  : ${fecha}`,                    fontSize: 9, margin: [0, 0, 0, 1] },
          { text: `Vendedor: ${ventaOk.usuario?.nombre || '-'}`, fontSize: 9, margin: [0, 0, 0, 1] },
          { text: `Pago   : ${ventaOk.metodoPago}`,       fontSize: 9, margin: [0, 0, 0, 4] },
          { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 202, y2: 0, lineWidth: 0.5, dash: { length: 3 } }] },
          {
            table: { widths: ['*', 28, 42, 42], body: filas },
            layout: 'noBorders',
            margin: [0, 4, 0, 4],
          },
          { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 202, y2: 0, lineWidth: 0.5, dash: { length: 3 } }] },
          { columns: [{ text: 'Subtotal:', width: '*', fontSize: 9 }, { text: `S/ ${subtotalNum.toFixed(2)}`, width: 'auto', fontSize: 9, alignment: 'right' }], margin: [0, 4, 0, 1] },
          { columns: [{ text: 'IGV (18%):', width: '*', fontSize: 9 }, { text: `S/ ${igvNum.toFixed(2)}`, width: 'auto', fontSize: 9, alignment: 'right' }], margin: [0, 0, 0, 1] },
          { columns: [{ text: 'TOTAL:', width: '*', fontSize: 11, bold: true }, { text: `S/ ${totalNum.toFixed(2)}`, width: 'auto', fontSize: 11, bold: true, alignment: 'right' }], margin: [0, 0, 0, 2] },
          ...efBloques,
          { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 202, y2: 0, lineWidth: 0.5, dash: { length: 3 } }], margin: [0, 4, 0, 4] },
          { text: '¡Gracias por su compra!', fontSize: 9, alignment: 'center', italics: true },
        ],
        styles: {
          header: { fontSize: 12, bold: true, margin: [0, 0, 0, 2] },
        },
        defaultStyle: { font: 'Roboto' },
      };

      pdfMake.createPdf(docDef).download(`comprobante-${ventaOk.id}.pdf`);
    } catch (e) {
      console.error('PDF error:', e);
      alert('Error al generar el PDF. Usa el botón Imprimir como alternativa.');
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="flex overflow-hidden bg-white" style={{ height: 'calc(100vh - 48px)' }}>

      {/* ══════════════════════════════════════════
          PANEL IZQUIERDO — Búsqueda de productos
      ══════════════════════════════════════════ */}
      <div className="flex flex-col w-[58%] border-r border-gray-200 bg-gray-50 overflow-hidden">

        {/* Header búsqueda */}
        <div className="bg-white border-b border-gray-200 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                ref={searchRef}
                id="pos-buscar"
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre, marca o categoría..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white"
              />
              {busqueda && (
                <button onClick={() => setBusqueda('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filtro categoría */}
            <select
              id="pos-categoria"
              value={filtCat}
              onChange={(e) => setFiltCat(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="">Todas</option>
              {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>

          {(busqueda || filtCat) && (
            <p className="text-xs text-gray-400">
              {buscando ? 'Buscando...' : `${resultados.length} resultado(s)`}
            </p>
          )}
        </div>

        {/* Resultados */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {!busqueda && !filtCat && (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400 text-sm">
              <Search size={36} strokeWidth={1} className="mb-3 text-gray-300" />
              Escribe para buscar un producto
            </div>
          )}

          {(busqueda || filtCat) && !buscando && resultados.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400 text-sm">
              <p className="text-3xl mb-2">📦</p>
              Sin resultados para <strong className="ml-1">"{busqueda}"</strong>
            </div>
          )}

          {resultados.map((p) => {
            const enCarrito = carrito.find((i) => i.producto.id === p.id);
            const sinStock  = p.stock === 0;

            return (
              <div
                key={p.id}
                id={`pos-prod-${p.id}`}
                className={`bg-white border rounded-lg px-4 py-3 flex items-center gap-3 transition-all ${
                  sinStock ? 'opacity-60 border-gray-200' : 'border-gray-200 hover:border-sky-300 hover:shadow-sm cursor-pointer'
                }`}
                onClick={() => !sinStock && agregar(p)}
              >
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{p.nombre}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-500">{p.marca}</span>
                    {p.categoria && (
                      <span className="flex items-center gap-1 text-[10px] text-gray-400">
                        <Tag size={9}/> {p.categoria.nombre}
                      </span>
                    )}
                  </div>
                </div>

                {/* Precio */}
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-900 text-sm">{fmt(p.precio)}</p>
                  <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded ${stockColor(p.stock)}`}>
                    {sinStock ? 'Sin stock' : `Stock: ${p.stock}`}
                  </span>
                </div>

                {/* Botón agregar */}
                <button
                  id={`btn-agregar-${p.id}`}
                  disabled={sinStock}
                  onClick={(e) => { e.stopPropagation(); agregar(p); }}
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    sinStock
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : enCarrito
                        ? 'bg-sky-600 text-white hover:bg-sky-700'
                        : 'bg-sky-100 text-sky-700 hover:bg-sky-200'
                  }`}
                >
                  <Plus size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          PANEL DERECHO — Carrito y pago
      ══════════════════════════════════════════ */}
      <div className="flex flex-col w-[42%] bg-white overflow-hidden">

        {/* Header carrito */}
        <div className="border-b border-gray-200 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} className="text-sky-600" />
            <h2 className="font-bold text-gray-900 text-base">Carrito</h2>
            {carrito.length > 0 && (
              <span className="bg-sky-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {carrito.length}
              </span>
            )}
          </div>
          {carrito.length > 0 && (
            <button onClick={vaciarCarrito}
              className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors">
              <Trash2 size={12} /> Vaciar
            </button>
          )}
        </div>

        {/* ─── Cliente (opcional) ─────────────────────────────────────────── */}
        <div className="border-b border-gray-200 px-5 py-3 bg-gray-50/50">
          {clienteVinc ? (
            /* Cliente vinculado */
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-sky-50 border border-sky-200 text-sky-700 rounded-lg px-3 py-1.5 text-sm flex-1 min-w-0">
                <User size={14} className="flex-shrink-0" />
                <span className="font-semibold truncate">{clienteVinc.nombre}</span>
                <span className="text-sky-500 text-xs flex-shrink-0">DNI: {clienteVinc.dni}</span>
              </div>
              <button
                id="btn-desvincular-cliente"
                onClick={() => { setClienteVinc(null); setDniSearch(''); setCliNotFound(false); setShowCliForm(false); setCliErr(''); }}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                title="Quitar cliente"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            /* Búsqueda de cliente */
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <User size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="pos-dni-search"
                    type="text"
                    inputMode="numeric"
                    maxLength={8}
                    value={dniSearch}
                    onChange={(e) => { setDniSearch(e.target.value.replace(/\D/g, '').slice(0, 8)); setCliErr(''); setCliNotFound(false); }}
                    onKeyDown={(e) => { if (e.key === 'Enter' && dniSearch.length === 8) buscarCliente(); }}
                    placeholder="DNI del cliente (opcional)"
                    className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white"
                  />
                </div>
                <button
                  id="btn-buscar-cliente"
                  onClick={buscarCliente}
                  disabled={dniSearch.length !== 8 || buscandoCli}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg bg-sky-600 text-white hover:bg-sky-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all"
                >
                  {buscandoCli ? '...' : 'Buscar'}
                </button>
              </div>

              {/* Error */}
              {cliErr && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertTriangle size={11} /> {cliErr}
                </p>
              )}

              {/* Cliente no encontrado → opción crear */}
              {cliNotFound && !showCliForm && (
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  <AlertTriangle size={13} className="text-amber-500 flex-shrink-0" />
                  <span className="text-xs text-amber-700 flex-1">No se encontró cliente con DNI {dniSearch}</span>
                  <button
                    id="btn-crear-cliente-toggle"
                    onClick={() => { setShowCliForm(true); setCliForm({ nombre: '', email: '', telefono: '' }); }}
                    className="text-xs font-semibold text-sky-600 hover:text-sky-800 whitespace-nowrap transition-colors"
                  >
                    + Crear
                  </button>
                </div>
              )}

              {/* Mini formulario crear cliente */}
              {showCliForm && (
                <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Nuevo cliente · DNI {dniSearch}</p>
                  <input
                    id="cli-nombre"
                    type="text"
                    value={cliForm.nombre}
                    onChange={(e) => setCliForm(f => ({ ...f, nombre: e.target.value }))}
                    placeholder="Nombre completo *"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      id="cli-email"
                      type="email"
                      value={cliForm.email}
                      onChange={(e) => setCliForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="Email (opcional)"
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                    />
                    <input
                      id="cli-telefono"
                      type="text"
                      value={cliForm.telefono}
                      onChange={(e) => setCliForm(f => ({ ...f, telefono: e.target.value }))}
                      placeholder="Teléfono (opcional)"
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      id="btn-crear-cliente"
                      onClick={crearCliente}
                      disabled={creandoCli || !cliForm.nombre.trim()}
                      className="flex-1 py-1.5 text-sm font-semibold rounded-lg bg-sky-600 text-white hover:bg-sky-700 disabled:bg-gray-200 disabled:text-gray-400 transition-all"
                    >
                      {creandoCli ? 'Creando...' : 'Crear cliente'}
                    </button>
                    <button
                      onClick={() => { setShowCliForm(false); setCliErr(''); }}
                      className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Lista de items */}
        <div className="flex-1 overflow-y-auto">
          {carrito.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-300 text-sm">
              <ShoppingCart size={48} strokeWidth={1} className="mb-3" />
              <p className="font-medium text-gray-400">El carrito está vacío</p>
              <p className="text-xs text-gray-300 mt-1">Agrega productos desde el panel izquierdo</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {carrito.map(({ producto, cantidad }) => (
                <div key={producto.id} id={`carrito-item-${producto.id}`}
                  className="px-5 py-3 flex items-center gap-3">
                  {/* Nombre */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{producto.nombre}</p>
                    <p className="text-xs text-gray-500">{fmt(producto.precio)} × {cantidad}</p>
                  </div>

                  {/* Controles cantidad */}
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => setCantidad(producto.id, -1)}
                      className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors">
                      <Minus size={12} />
                    </button>
                    <span className="w-7 text-center text-sm font-bold text-gray-900">{cantidad}</span>
                    <button onClick={() => setCantidad(producto.id, +1)}
                      disabled={cantidad >= producto.stock}
                      className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 flex items-center justify-center text-gray-600 transition-colors">
                      <Plus size={12} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <p className="w-20 text-right text-sm font-semibold text-gray-900">
                    {fmt(parseFloat(producto.precio) * cantidad)}
                  </p>

                  {/* Eliminar */}
                  <button onClick={() => eliminar(producto.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors">
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ─── Panel de pago ──────────────────────────────────────────────── */}
        <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-4">
          {/* Método de pago */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Método de pago
            </p>
            <div className="flex gap-2">
              {METODOS.map((m) => (
                <button
                  key={m.value}
                  id={`btn-pago-${m.value}`}
                  onClick={() => { setMetodoPago(m.value); setMontoRec(''); }}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    metodoPago === m.value
                      ? 'bg-sky-600 text-white border-sky-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-sky-400'
                  }`}
                >
                  {m.emoji} {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Monto recibido (solo EFECTIVO) */}
          {metodoPago === 'EFECTIVO' && (
            <div>
              <label htmlFor="monto-recibido" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Monto recibido (S/)
              </label>
              <input
                id="monto-recibido"
                type="number"
                step="0.10"
                min="0"
                value={montoRec}
                onChange={(e) => setMontoRec(e.target.value)}
                placeholder={fmt(montoTotal)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
              />
            </div>
          )}

          {/* Desglose */}
          <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100 text-sm">
            <div className="flex justify-between px-3 py-2 text-gray-600">
              <span>Subtotal</span>
              <span>{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between px-3 py-2 text-gray-600">
              <span>IGV (18%)</span>
              <span>{fmt(igv)}</span>
            </div>
            <div className="flex justify-between px-3 py-2.5 font-bold text-gray-900 text-base">
              <span>TOTAL</span>
              <span>{fmt(montoTotal)}</span>
            </div>
            {metodoPago === 'EFECTIVO' && montoRec && (
              <div className={`flex justify-between px-3 py-2 font-semibold ${
                vuelto >= 0 ? 'text-emerald-700 bg-emerald-50' : 'text-red-600 bg-red-50'
              }`}>
                <span>Vuelto</span>
                <span>{vuelto >= 0 ? fmt(vuelto) : `Faltan ${fmt(montoTotal - recibido)}`}</span>
              </div>
            )}
          </div>

          {/* Error */}
          {errorVenta && (
            <div id="pos-error" className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 rounded-lg px-3 py-2.5 text-xs">
              <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
              <span>{errorVenta}</span>
            </div>
          )}

          {/* Botón confirmar */}
          <button
            id="btn-confirmar-venta"
            onClick={confirmarVenta}
            disabled={!puedeConfirmar}
            className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${
              puedeConfirmar
                ? 'bg-sky-600 hover:bg-sky-700 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {procesando ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Procesando...
              </span>
            ) : (
              `Confirmar venta · ${fmt(montoTotal)}`
            )}
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MODAL — Venta exitosa
      ══════════════════════════════════════════ */}
      {ventaOk && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" id="modal-venta-ok">
          <div className="bg-white border border-gray-200 rounded-xl w-full max-w-sm">
            {/* Header */}
            <div className="text-center pt-8 pb-4 px-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={36} className="text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">¡Venta registrada!</h2>
              <p className="text-gray-500 text-sm mt-1">Venta #{ventaOk.id} · {ventaOk.metodoPago}</p>
            </div>

            {/* Resumen */}
            <div className="mx-5 mb-4 bg-gray-50 border border-gray-200 rounded-lg divide-y divide-gray-100 text-sm">
              <div className="flex justify-between px-4 py-2.5 text-gray-600">
                <span>Subtotal</span><span>{fmt(ventaOk.subtotal)}</span>
              </div>
              <div className="flex justify-between px-4 py-2.5 text-gray-600">
                <span>IGV (18%)</span><span>{fmt(ventaOk.igv)}</span>
              </div>
              <div className="flex justify-between px-4 py-2.5 font-bold text-gray-900">
                <span>Total pagado</span><span>{fmt(ventaOk.total)}</span>
              </div>
              {ventaOk.metodoPago === 'EFECTIVO' && (
                <div className="flex justify-between px-4 py-2.5 text-emerald-700 font-semibold bg-emerald-50">
                  <span>Vuelto</span><span>{fmt(ventaOk.vuelto)}</span>
                </div>
              )}
            </div>

            {/* Acciones */}
            <div className="grid grid-cols-3 gap-2 px-5 pb-6">
              <button
                id="btn-imprimir-comprobante"
                onClick={imprimir}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors col-span-1"
              >
                <Printer size={14} /> Imprimir
              </button>
              <button
                id="btn-descargar-pdf"
                onClick={descargarPDF}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-sm font-medium transition-colors col-span-1"
              >
                📄 PDF
              </button>
              <button
                id="btn-nueva-venta"
                onClick={() => setVentaOk(null)}
                className="py-2.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold transition-colors col-span-1"
              >
                Nueva venta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
