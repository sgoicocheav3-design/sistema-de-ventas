// src/pages/almacen/ProductosPage.jsx
import { useEffect, useState, useCallback } from 'react';
import {
  Plus, Pencil, Trash2, RotateCcw, AlertTriangle,
  ArrowDownToLine, ArrowUpFromLine, X,
} from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import api, { withAuth } from '../../lib/axios';

const EMPTY_PROD_FORM = { nombre: '', marca: '', categoriaId: '', precio: '', fechaVencimiento: '' };
const EMPTY_ENTRADA = { proveedorId: '', cantidad: '', precioUnitario: '' };
const EMPTY_BAJA    = { motivo: 'Vencido', cantidad: '' };
const MOTIVOS_BAJA  = ['Vencido', 'Dañado', 'Robo/Pérdida', 'Otro'];

const diasHastaVencimiento = (fecha) => {
  const hoy  = new Date(); hoy.setHours(0,0,0,0);
  const fv   = new Date(fecha); fv.setHours(0,0,0,0);
  return Math.ceil((fv - hoy) / 86400000);
};

export default function ProductosPage() {
  const { token } = useAuth();

  const [productos,    setProductos]    = useState([]);
  const [inactivos,    setInactivos]    = useState([]);
  const [categorias,   setCategorias]   = useState([]);
  const [proveedores,  setProveedores]  = useState([]);
  const [umbral,       setUmbral]       = useState(5);
  const [porVencer,    setPorVencer]    = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState('');

  // Filtros
  const [filtCat,       setFiltCat]       = useState('');
  const [filtMarca,     setFiltMarca]     = useState('');
  const [filtStockBajo, setFiltStockBajo] = useState(false);

  // Tabs
  const [tab, setTab] = useState('activos');

  // Modal producto (crear/editar)
  const [modalProd,  setModalProd]  = useState(false);
  const [editId,     setEditId]     = useState(null);
  const [formProd,   setFormProd]   = useState(EMPTY_PROD_FORM);
  const [errProd,    setErrProd]    = useState('');
  const [savingProd, setSavingProd] = useState(false);

  // Modal entrada
  const [modalEntrada,  setModalEntrada]  = useState(null); // { id, nombre, stockActual }
  const [formEntrada,   setFormEntrada]   = useState(EMPTY_ENTRADA);
  const [errEntrada,    setErrEntrada]    = useState('');
  const [savingEntrada, setSavingEntrada] = useState(false);

  // Modal baja
  const [modalBaja,  setModalBaja]  = useState(null); // { id, nombre, stockActual }
  const [formBaja,   setFormBaja]   = useState(EMPTY_BAJA);
  const [errBaja,    setErrBaja]    = useState('');
  const [savingBaja, setSavingBaja] = useState(false);

  // ─── Fetches ─────────────────────────────────────────────────────────────
  const fetchProductos = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const params = new URLSearchParams();
      if (filtCat)       params.set('categoria', filtCat);
      if (filtMarca)     params.set('marca', filtMarca);
      if (filtStockBajo) params.set('stockBajo', 'true');
      const { data } = await api.get(`/almacen/productos?${params}`, withAuth(token));
      setProductos(data.productos);
      setUmbral(data.umbralAlerta);
    } catch (err) { setError(err.response?.data?.message || 'Error al cargar productos'); }
    finally { setLoading(false); }
  }, [token, filtCat, filtMarca, filtStockBajo]);

  const fetchInactivos = useCallback(async () => {
    try { const { data } = await api.get('/almacen/productos/inactivos', withAuth(token)); setInactivos(data); } catch {}
  }, [token]);

  const fetchPorVencer = useCallback(async () => {
    try { const { data } = await api.get('/almacen/productos/vencimiento-proximo?dias=7', withAuth(token)); setPorVencer(data); } catch {}
  }, [token]);

  const fetchAuxData = useCallback(async () => {
    try {
      const [catRes, provRes] = await Promise.all([
        api.get('/categorias'),
        api.get('/admin/proveedores', withAuth(token)),
      ]);
      setCategorias(catRes.data);
      setProveedores(provRes.data);
    } catch {}
  }, [token]);

  useEffect(() => { fetchAuxData(); fetchProductos(); fetchInactivos(); fetchPorVencer(); }, []);
  useEffect(() => { fetchProductos(); }, [filtCat, filtMarca, filtStockBajo]);

  // ─── Modal Producto ───────────────────────────────────────────────────────
  const abrirCrear = () => { setEditId(null); setFormProd(EMPTY_PROD_FORM); setErrProd(''); setModalProd(true); };
  const abrirEditar = (p) => {
    setEditId(p.id);
    setFormProd({ nombre: p.nombre, marca: p.marca, categoriaId: String(p.categoriaId), precio: String(p.precio),
      fechaVencimiento: p.fechaVencimiento ? new Date(p.fechaVencimiento).toISOString().split('T')[0] : '' });
    setErrProd(''); setModalProd(true);
  };

  const handleGuardarProd = async (e) => {
    e.preventDefault(); setSavingProd(true); setErrProd('');
    try {
      const payload = { nombre: formProd.nombre, marca: formProd.marca,
        categoriaId: parseInt(formProd.categoriaId), precio: parseFloat(formProd.precio),
        fechaVencimiento: formProd.fechaVencimiento || null };
      if (editId) await api.put(`/almacen/productos/${editId}`, payload, withAuth(token));
      else await api.post('/almacen/productos', payload, withAuth(token));
      await fetchProductos(); await fetchPorVencer(); setModalProd(false);
    } catch (err) { setErrProd(err.response?.data?.message || 'Error al guardar'); }
    finally { setSavingProd(false); }
  };

  const handleDesactivar = async (id, nombre) => {
    if (!confirm(`¿Desactivar "${nombre}"?`)) return;
    try { await api.delete(`/almacen/productos/${id}`, withAuth(token)); await fetchProductos(); await fetchInactivos(); }
    catch (err) { alert(err.response?.data?.message || 'Error'); }
  };

  const handleReactivar = async (id, nombre) => {
    if (!confirm(`¿Reactivar "${nombre}"?`)) return;
    try { await api.patch(`/almacen/productos/${id}/reactivar`, {}, withAuth(token)); await fetchProductos(); await fetchInactivos(); }
    catch (err) { alert(err.response?.data?.message || 'Error'); }
  };

  // ─── Modal Entrada ────────────────────────────────────────────────────────
  const abrirEntrada = (p) => { setModalEntrada({ id: p.id, nombre: p.nombre, stockActual: p.stock }); setFormEntrada(EMPTY_ENTRADA); setErrEntrada(''); };
  const cerrarEntrada = () => { setModalEntrada(null); setErrEntrada(''); };

  const handleEntrada = async (e) => {
    e.preventDefault(); setSavingEntrada(true); setErrEntrada('');
    try {
      await api.post('/almacen/entradas', {
        productoId: modalEntrada.id, proveedorId: parseInt(formEntrada.proveedorId),
        cantidad: parseInt(formEntrada.cantidad), precioUnitario: parseFloat(formEntrada.precioUnitario),
      }, withAuth(token));
      await fetchProductos(); cerrarEntrada();
    } catch (err) { setErrEntrada(err.response?.data?.message || 'Error al registrar entrada'); }
    finally { setSavingEntrada(false); }
  };

  // ─── Modal Baja ───────────────────────────────────────────────────────────
  const abrirBaja = (p) => { setModalBaja({ id: p.id, nombre: p.nombre, stockActual: p.stock }); setFormBaja(EMPTY_BAJA); setErrBaja(''); };
  const cerrarBaja = () => { setModalBaja(null); setErrBaja(''); };

  const handleBaja = async (e) => {
    e.preventDefault(); setSavingBaja(true); setErrBaja('');
    try {
      await api.post('/almacen/bajas', {
        productoId: modalBaja.id, cantidad: parseInt(formBaja.cantidad), motivo: formBaja.motivo,
      }, withAuth(token));
      await fetchProductos(); cerrarBaja();
    } catch (err) { setErrBaja(err.response?.data?.message || 'Error al registrar baja'); }
    finally { setSavingBaja(false); }
  };

  const fmt = (p) => `S/ ${parseFloat(p).toFixed(2)}`;
  const fmtFecha = (f) => f ? new Date(f).toLocaleDateString('es-PE') : '—';

  return (
    <div className="p-5 space-y-4">
      {/* ─── Banner: Productos por vencer ──────────────────────────────────── */}
      {porVencer.length > 0 && (
        <div id="banner-vencimiento" className="bg-orange-50 border border-orange-200 rounded-[10px] px-4 py-3">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="text-orange-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-orange-800">
                ⚠️ {porVencer.length} producto(s) vence(n) en los próximos 7 días
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {porVencer.map((p) => {
                  const dias = diasHastaVencimiento(p.fechaVencimiento);
                  return (
                    <span key={p.id} className="inline-flex items-center gap-1 text-xs bg-orange-100 border border-orange-300 text-orange-800 px-2.5 py-1 rounded-full">
                      <strong>{p.nombre}</strong>
                      <span className="text-orange-500">
                        · {dias <= 0 ? '¡Vencido!' : `${dias}d`}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Productos</h1>
          <p className="text-gray-500 text-sm mt-0.5">Inventario · Alerta de stock ≤ {umbral} unidades</p>
        </div>
        <button id="btn-nuevo-producto" onClick={abrirCrear}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium transition-colors">
          <Plus size={15} /> Nuevo producto
        </button>
      </div>

      {/* ─── Tabs ───────────────────────────────────────────────────────────── */}
      <div className="flex gap-px bg-gray-200 rounded-lg p-px w-fit">
        {[{ key: 'activos', label: `Activos (${productos.length})` }, { key: 'inactivos', label: `Inactivos (${inactivos.length})` }].map(({ key, label }) => (
          <button key={key} id={`tab-${key}`} onClick={() => setTab(key)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${tab === key ? 'bg-white text-sky-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* ─── Filtros ────────────────────────────────────────────────────────── */}
      {tab === 'activos' && (
        <div className="flex flex-wrap gap-2 items-center">
          <select id="filtro-categoria" value={filtCat} onChange={(e) => setFiltCat(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500">
            <option value="">Todas las categorías</option>
            {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
          <input id="filtro-marca" type="text" placeholder="Buscar marca..." value={filtMarca}
            onChange={(e) => setFiltMarca(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-700 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500" />
          <button id="btn-filtro-stock-bajo" onClick={() => setFiltStockBajo((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${filtStockBajo ? 'bg-amber-50 border-amber-300 text-amber-700' : 'bg-white border-gray-300 text-gray-600 hover:border-amber-300'}`}>
            <AlertTriangle size={13} /> Solo stock bajo
          </button>
          {(filtCat || filtMarca || filtStockBajo) && (
            <button onClick={() => { setFiltCat(''); setFiltMarca(''); setFiltStockBajo(false); }}
              className="text-xs text-gray-400 hover:text-gray-600 underline">Limpiar filtros</button>
          )}
        </div>
      )}

      {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">{error}</div>}

      {/* ─── Tabla activos ───────────────────────────────────────────────────── */}
      {tab === 'activos' && (
        <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
          {loading ? <div className="flex items-center justify-center py-16 text-gray-400 text-sm">Cargando...</div> : (
            <table className="w-full text-sm" id="tabla-productos">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {['Nombre','Marca','Categoría','Precio','Stock','Vencimiento','Acciones'].map((h) => (
                    <th key={h} className={`px-3 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap ${['Precio','Stock','Acciones'].includes(h) ? 'text-right' : 'text-left'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {productos.length === 0 && <tr><td colSpan={7} className="text-center text-gray-400 py-12">No se encontraron productos</td></tr>}
                {productos.map((p) => {
                  const bajo = p.stock <= umbral;
                  return (
                    <tr key={p.id} id={`producto-row-${p.id}`}
                      className={`transition-colors ${bajo ? 'bg-amber-50 hover:bg-amber-100' : 'hover:bg-gray-50'}`}>
                      <td className="px-3 py-2.5 font-medium text-gray-900">
                        {bajo && <AlertTriangle size={11} className="inline text-amber-500 mr-1" />}{p.nombre}
                      </td>
                      <td className="px-3 py-2.5 text-gray-600">{p.marca}</td>
                      <td className="px-3 py-2.5"><span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{p.categoria?.nombre}</span></td>
                      <td className="px-3 py-2.5 text-right text-emerald-700 font-medium">{fmt(p.precio)}</td>
                      <td className={`px-3 py-2.5 text-right font-bold ${bajo ? 'text-amber-600' : 'text-gray-900'}`}>{p.stock}</td>
                      <td className="px-3 py-2.5 text-gray-400 text-xs whitespace-nowrap">{fmtFecha(p.fechaVencimiento)}</td>
                      <td className="px-3 py-2.5 text-right">
                        <div className="flex items-center justify-end gap-1.5 flex-wrap">
                          <button id={`btn-entrada-${p.id}`} onClick={() => abrirEntrada(p)}
                            title="Registrar entrada"
                            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors">
                            <ArrowDownToLine size={11} /> Entrada
                          </button>
                          <button id={`btn-baja-${p.id}`} onClick={() => abrirBaja(p)}
                            title="Registrar baja"
                            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 transition-colors">
                            <ArrowUpFromLine size={11} /> Baja
                          </button>
                          <button id={`btn-editar-prod-${p.id}`} onClick={() => abrirEditar(p)}
                            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
                            <Pencil size={11} /> Editar
                          </button>
                          <button id={`btn-desactivar-prod-${p.id}`} onClick={() => handleDesactivar(p.id, p.nombre)}
                            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors">
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ─── Tabla inactivos ──────────────────────────────────────────────── */}
      {tab === 'inactivos' && (
        <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
          <table className="w-full text-sm" id="tabla-inactivos">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              {['Nombre','Marca','Categoría','Precio','Acción'].map((h) => (
                <th key={h} className={`px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide ${h==='Acción'?'text-right':'text-left'}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-gray-100">
              {inactivos.length === 0 && <tr><td colSpan={5} className="text-center text-gray-400 py-12">No hay productos inactivos</td></tr>}
              {inactivos.map((p) => (
                <tr key={p.id} id={`inactivo-row-${p.id}`} className="hover:bg-gray-50 opacity-60">
                  <td className="px-4 py-2.5 text-gray-600">{p.nombre}</td>
                  <td className="px-4 py-2.5 text-gray-500">{p.marca}</td>
                  <td className="px-4 py-2.5 text-xs text-gray-400">{p.categoria?.nombre}</td>
                  <td className="px-4 py-2.5 text-gray-500">{fmt(p.precio)}</td>
                  <td className="px-4 py-2.5 text-right">
                    <button id={`btn-reactivar-${p.id}`} onClick={() => handleReactivar(p.id, p.nombre)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors ml-auto">
                      <RotateCcw size={11} /> Reactivar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          MODAL: Crear / Editar Producto
      ═══════════════════════════════════════════ */}
      {modalProd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={(e) => { if (e.target===e.currentTarget) setModalProd(false); }} id="modal-producto">
          <div className="bg-white border border-gray-200 rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h2 className="text-base font-bold text-gray-900">{editId ? 'Editar producto' : 'Nuevo producto'}</h2>
              <button onClick={() => setModalProd(false)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>
            <form onSubmit={handleGuardarProd} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" required value={formProd.nombre} onChange={(e) => setFormProd((p) => ({ ...p, nombre: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Marca</label>
                <input type="text" required value={formProd.marca} onChange={(e) => setFormProd((p) => ({ ...p, marca: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Categoría</label>
                  <select required value={formProd.categoriaId} onChange={(e) => setFormProd((p) => ({ ...p, categoriaId: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 appearance-none">
                    <option value="">Seleccionar...</option>
                    {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Precio (S/)</label>
                  <input type="number" step="0.01" min="0.01" required value={formProd.precio}
                    onChange={(e) => setFormProd((p) => ({ ...p, precio: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Fecha de vencimiento <span className="text-gray-400 font-normal">(opcional)</span></label>
                <input type="date" value={formProd.fechaVencimiento} onChange={(e) => setFormProd((p) => ({ ...p, fechaVencimiento: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
              </div>
              {editId && <p className="text-xs text-gray-400 bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg">ℹ️ El stock se modifica con Entradas / Bajas.</p>}
              {errProd && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-3 py-2.5 text-sm">⚠️ {errProd}</div>}
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setModalProd(false)} className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm">Cancelar</button>
                <button type="submit" disabled={savingProd} className="flex-1 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 disabled:bg-sky-300 text-white text-sm font-semibold">
                  {savingProd ? 'Guardando...' : editId ? 'Guardar cambios' : 'Crear producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          MODAL: Registrar Entrada
      ═══════════════════════════════════════════ */}
      {modalEntrada && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={(e) => { if (e.target===e.currentTarget) cerrarEntrada(); }} id="modal-entrada">
          <div className="bg-white border border-gray-200 rounded-xl w-full max-w-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-base font-bold text-gray-900">Registrar entrada</h2>
                <p className="text-xs text-gray-500 mt-0.5">{modalEntrada.nombre} · Stock actual: <strong>{modalEntrada.stockActual}</strong></p>
              </div>
              <button onClick={cerrarEntrada} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>
            <form onSubmit={handleEntrada} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Proveedor</label>
                <select required value={formEntrada.proveedorId} onChange={(e) => setFormEntrada((p) => ({ ...p, proveedorId: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 appearance-none">
                  <option value="">Seleccionar proveedor...</option>
                  {proveedores.map((p) => <option key={p.id} value={p.id}>{p.nombre} — {p.ruc}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Cantidad a ingresar</label>
                  <input id="entrada-cantidad" type="number" min="1" required value={formEntrada.cantidad}
                    onChange={(e) => setFormEntrada((p) => ({ ...p, cantidad: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Precio unitario (S/)</label>
                  <input id="entrada-precio" type="number" step="0.01" min="0.01" required value={formEntrada.precioUnitario}
                    onChange={(e) => setFormEntrada((p) => ({ ...p, precioUnitario: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>
              {formEntrada.cantidad && (
                <p className="text-xs text-emerald-600">Stock resultante: <strong>{modalEntrada.stockActual + parseInt(formEntrada.cantidad || 0)}</strong> unidades</p>
              )}
              {errEntrada && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-3 py-2.5 text-sm">⚠️ {errEntrada}</div>}
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={cerrarEntrada} className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm">Cancelar</button>
                <button id="btn-guardar-entrada" type="submit" disabled={savingEntrada}
                  className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white text-sm font-semibold">
                  {savingEntrada ? 'Registrando...' : 'Registrar entrada'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          MODAL: Registrar Baja
      ═══════════════════════════════════════════ */}
      {modalBaja && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={(e) => { if (e.target===e.currentTarget) cerrarBaja(); }} id="modal-baja">
          <div className="bg-white border border-gray-200 rounded-xl w-full max-w-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-base font-bold text-gray-900">Registrar baja</h2>
                <p className="text-xs text-gray-500 mt-0.5">{modalBaja.nombre} · Stock disponible: <strong>{modalBaja.stockActual}</strong></p>
              </div>
              <button onClick={cerrarBaja} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>
            <form onSubmit={handleBaja} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Motivo de baja</label>
                <select id="baja-motivo" required value={formBaja.motivo} onChange={(e) => setFormBaja((p) => ({ ...p, motivo: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 appearance-none">
                  {MOTIVOS_BAJA.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Cantidad a dar de baja</label>
                <input id="baja-cantidad" type="number" min="1" max={modalBaja.stockActual} required
                  value={formBaja.cantidad} onChange={(e) => setFormBaja((p) => ({ ...p, cantidad: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
                {formBaja.cantidad && parseInt(formBaja.cantidad) > 0 && (
                  <p className={`text-xs ${parseInt(formBaja.cantidad) > modalBaja.stockActual ? 'text-red-600' : 'text-amber-600'}`}>
                    Stock resultante: <strong>{Math.max(0, modalBaja.stockActual - parseInt(formBaja.cantidad || 0))}</strong> unidades
                  </p>
                )}
              </div>
              {errBaja && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-3 py-2.5 text-sm">⚠️ {errBaja}</div>}
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={cerrarBaja} className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm">Cancelar</button>
                <button id="btn-guardar-baja" type="submit" disabled={savingBaja}
                  className="flex-1 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 disabled:bg-amber-300 text-white text-sm font-semibold">
                  {savingBaja ? 'Registrando...' : 'Confirmar baja'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
