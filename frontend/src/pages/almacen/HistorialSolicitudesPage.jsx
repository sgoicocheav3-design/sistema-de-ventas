// src/pages/almacen/HistorialSolicitudesPage.jsx
import { useEffect, useState, useCallback } from 'react';
import { ClipboardList, Filter } from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import api, { withAuth } from '../../lib/axios';

const hoy = () => new Date().toISOString().split('T')[0];
const hace90 = () => { const d = new Date(); d.setDate(d.getDate() - 90); return d.toISOString().split('T')[0]; };

const ESTADO_STYLE = {
  PENDIENTE:  'bg-amber-50 text-amber-700 border-amber-200',
  APROBADA:   'bg-emerald-50 text-emerald-700 border-emerald-200',
  COMPLETADA: 'bg-sky-50 text-sky-700 border-sky-200',
  RECHAZADA:  'bg-red-50 text-red-700 border-red-200',
};

const ESTADO_LABEL = {
  PENDIENTE:  '⏳ Pendiente',
  APROBADA:   '✅ Aprobada',
  COMPLETADA: '📦 Completada',
  RECHAZADA:  '❌ Rechazada',
};

const ESTADOS = ['', 'PENDIENTE', 'APROBADA', 'COMPLETADA', 'RECHAZADA'];

export default function HistorialSolicitudesPage() {
  const { token } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState('');
  const [desde,       setDesde]       = useState(hace90());
  const [hasta,       setHasta]       = useState(hoy());
  const [filtEstado,  setFiltEstado]  = useState('');

  const fetchHistorial = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const params = new URLSearchParams();
      if (desde)      params.set('desde', desde);
      if (hasta)      params.set('hasta', hasta);
      if (filtEstado) params.set('estado', filtEstado);
      const { data } = await api.get(`/almacen/solicitudes/historial?${params}`, withAuth(token));
      setSolicitudes(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar historial');
    } finally { setLoading(false); }
  }, [token, desde, hasta, filtEstado]);

  useEffect(() => { fetchHistorial(); }, []);

  const fmtFecha = (f) => f
    ? new Date(f).toLocaleString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : '—';

  // Stats
  const stats = {
    total: solicitudes.length,
    pendientes: solicitudes.filter((s) => s.estado === 'PENDIENTE').length,
    aprobadas:  solicitudes.filter((s) => s.estado === 'APROBADA').length,
    completadas:solicitudes.filter((s) => s.estado === 'COMPLETADA').length,
    rechazadas: solicitudes.filter((s) => s.estado === 'RECHAZADA').length,
  };

  return (
    <div className="p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Historial de Solicitudes</h1>
          <p className="text-gray-500 text-sm mt-0.5">Tus solicitudes de reposición de stock</p>
        </div>
        {!loading && (
          <div className="flex items-center gap-3 text-xs">
            <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded-lg font-semibold">{stats.pendientes} pend.</span>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded-lg font-semibold">{stats.aprobadas} aprob.</span>
            <span className="bg-sky-50 text-sky-700 border border-sky-200 px-2 py-1 rounded-lg font-semibold">{stats.completadas} comp.</span>
            <span className="bg-red-50 text-red-700 border border-red-200 px-2 py-1 rounded-lg font-semibold">{stats.rechazadas} rech.</span>
          </div>
        )}
      </div>

      {/* Filtros */}
      <div className="bg-white border border-gray-200 rounded-[10px] px-4 py-3 flex flex-wrap items-end gap-4">
        <div className="flex items-center gap-1 text-sm font-medium text-gray-600">
          <Filter size={14} /> Filtros:
        </div>
        <div className="flex items-center gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Desde</label>
            <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Hasta</label>
            <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Estado</label>
            <select value={filtEstado} onChange={(e) => setFiltEstado(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 appearance-none">
              <option value="">Todos</option>
              {ESTADOS.filter(Boolean).map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
          <button onClick={fetchHistorial}
            className="mt-5 px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium transition-colors">
            Buscar
          </button>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">{error}</div>}

      {/* Tabla */}
      <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400 text-sm">Cargando...</div>
        ) : (
          <table className="w-full text-sm" id="tabla-historial-solicitudes">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Fecha', 'Producto', 'Stock al solicitar', 'Cant. solicitada', 'Estado', 'Proveedor', 'Nota rechazo'].map((h) => (
                  <th key={h} className={`px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide ${
                    ['Stock al solicitar', 'Cant. solicitada'].includes(h) ? 'text-right' : 'text-left'
                  }`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {solicitudes.length === 0 && (
                <tr><td colSpan={7} className="text-center text-gray-400 py-12">No hay solicitudes en el período seleccionado</td></tr>
              )}
              {solicitudes.map((s) => (
                <tr key={s.id} id={`historial-sol-row-${s.id}`} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{fmtFecha(s.creadoEn)}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{s.producto.nombre}</p>
                    <p className="text-xs text-gray-400">{s.producto.marca}</p>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-600">{s.cantidadActual}</td>
                  <td className="px-4 py-3 text-right font-bold text-sky-700">+{s.cantidadSolicitada}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${ESTADO_STYLE[s.estado] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                      {ESTADO_LABEL[s.estado] || s.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{s.proveedor?.nombre || '—'}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs max-w-[160px] truncate" title={s.notaRechazo || ''}>
                    {s.notaRechazo || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
