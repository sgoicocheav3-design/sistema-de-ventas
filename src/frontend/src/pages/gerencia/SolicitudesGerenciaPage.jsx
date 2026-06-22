// src/pages/gerencia/SolicitudesGerenciaPage.jsx
import { useEffect, useState, useCallback } from 'react';
import {
  ClipboardList, CheckCircle, XCircle, Filter, Truck, X,
} from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import api, { withAuth } from '../../lib/axios';

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

export default function SolicitudesGerenciaPage() {
  const { token } = useAuth();

  const [solicitudes,  setSolicitudes]  = useState([]);
  const [proveedores,  setProveedores]  = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState('');
  const [filtEstado,   setFiltEstado]   = useState('');

  // Modal aprobar
  const [modalAprobar, setModalAprobar] = useState(null); // solicitud obj
  const [formAprobar,  setFormAprobar]  = useState({ proveedorId: '', fechaEstimada: '' });
  const [savingAprob,  setSavingAprob]  = useState(false);
  const [errAprob,     setErrAprob]     = useState('');

  // Modal rechazar
  const [modalRechazar, setModalRechazar] = useState(null); // solicitud obj
  const [notaRechazo,   setNotaRechazo]   = useState('');
  const [savingRech,    setSavingRech]    = useState(false);
  const [errRech,       setErrRech]       = useState('');

  // ─── Fetch ────────────────────────────────────────────────────────────────
  const fetchSolicitudes = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const params = new URLSearchParams();
      if (filtEstado) params.set('estado', filtEstado);
      const { data } = await api.get(`/gerencia/solicitudes?${params}`, withAuth(token));
      setSolicitudes(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar solicitudes');
    } finally { setLoading(false); }
  }, [token, filtEstado]);

  const fetchProveedores = useCallback(async () => {
    try {
      const { data } = await api.get('/gerencia/solicitudes/proveedores', withAuth(token));
      setProveedores(data);
    } catch {}
  }, [token]);

  useEffect(() => { fetchSolicitudes(); fetchProveedores(); }, []);
  useEffect(() => { fetchSolicitudes(); }, [filtEstado]);

  // ─── Aprobar ──────────────────────────────────────────────────────────────
  const abrirAprobar = (s) => {
    setModalAprobar(s);
    const manana = new Date();
    manana.setDate(manana.getDate() + 3);
    setFormAprobar({ proveedorId: '', fechaEstimada: manana.toISOString().split('T')[0] });
    setErrAprob('');
  };

  const handleAprobar = async (e) => {
    e.preventDefault(); setSavingAprob(true); setErrAprob('');
    try {
      await api.patch(`/gerencia/solicitudes/${modalAprobar.id}/aprobar`, {
        proveedorId:   parseInt(formAprobar.proveedorId),
        fechaEstimada: formAprobar.fechaEstimada || null,
      }, withAuth(token));
      setModalAprobar(null);
      await fetchSolicitudes();
    } catch (err) {
      setErrAprob(err.response?.data?.message || 'Error al aprobar');
    } finally { setSavingAprob(false); }
  };

  // ─── Rechazar ─────────────────────────────────────────────────────────────
  const abrirRechazar = (s) => {
    setModalRechazar(s);
    setNotaRechazo('');
    setErrRech('');
  };

  const handleRechazar = async (e) => {
    e.preventDefault(); setSavingRech(true); setErrRech('');
    try {
      await api.patch(`/gerencia/solicitudes/${modalRechazar.id}/rechazar`, {
        notaRechazo: notaRechazo || null,
      }, withAuth(token));
      setModalRechazar(null);
      await fetchSolicitudes();
    } catch (err) {
      setErrRech(err.response?.data?.message || 'Error al rechazar');
    } finally { setSavingRech(false); }
  };

  const fmtFecha = (f) => f
    ? new Date(f).toLocaleString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : '—';

  // Stats
  const pendientes = solicitudes.filter((s) => s.estado === 'PENDIENTE').length;

  return (
    <div className="p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Solicitudes de Reposición</h1>
          <p className="text-gray-500 text-sm mt-0.5">Gestiona las solicitudes de los almaceneros</p>
        </div>
        {pendientes > 0 && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            <ClipboardList size={15} className="text-amber-600" />
            <span className="text-sm font-bold text-amber-700">{pendientes}</span>
            <span className="text-sm text-amber-600">pendiente(s)</span>
          </div>
        )}
      </div>

      {/* Filtro de estado */}
      <div className="bg-white border border-gray-200 rounded-[10px] px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-1 text-sm font-medium text-gray-600">
          <Filter size={14} /> Estado:
        </div>
        <div className="flex gap-px bg-gray-200 rounded-lg p-px">
          {[
            { key: '', label: 'Todos' },
            { key: 'PENDIENTE', label: 'Pendientes' },
            { key: 'APROBADA', label: 'Aprobadas' },
            { key: 'COMPLETADA', label: 'Completadas' },
            { key: 'RECHAZADA', label: 'Rechazadas' },
          ].map(({ key, label }) => (
            <button key={key} onClick={() => setFiltEstado(key)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                filtEstado === key ? 'bg-white text-sky-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">{error}</div>}

      {/* Tabla */}
      <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400 text-sm">Cargando...</div>
        ) : (
          <table className="w-full text-sm" id="tabla-solicitudes-gerencia">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Fecha', 'Almacenero', 'Producto', 'Stock', 'Solicitado', 'Estado', 'Proveedor', 'Acciones'].map((h) => (
                  <th key={h} className={`px-3 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap ${
                    ['Stock', 'Solicitado', 'Acciones'].includes(h) ? 'text-right' : 'text-left'
                  }`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {solicitudes.length === 0 && (
                <tr><td colSpan={8} className="text-center text-gray-400 py-12">No hay solicitudes</td></tr>
              )}
              {solicitudes.map((s) => (
                <tr key={s.id} id={`ger-sol-row-${s.id}`}
                  className={`transition-colors ${
                    s.estado === 'PENDIENTE' ? 'bg-amber-50/40 hover:bg-amber-50' : 'hover:bg-gray-50'
                  }`}>
                  <td className="px-3 py-3 text-gray-500 text-xs whitespace-nowrap">{fmtFecha(s.creadoEn)}</td>
                  <td className="px-3 py-3 text-gray-700 text-xs font-medium">{s.usuario.nombre}</td>
                  <td className="px-3 py-3">
                    <p className="font-medium text-gray-900 text-sm">{s.producto.nombre}</p>
                    <p className="text-xs text-gray-400">{s.producto.marca}</p>
                  </td>
                  <td className="px-3 py-3 text-right text-gray-600">{s.cantidadActual}</td>
                  <td className="px-3 py-3 text-right font-bold text-sky-700">+{s.cantidadSolicitada}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${ESTADO_STYLE[s.estado] || ''}`}>
                      {ESTADO_LABEL[s.estado] || s.estado}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-gray-600 text-xs">{s.proveedor?.nombre || '—'}</td>
                  <td className="px-3 py-3 text-right">
                    {s.estado === 'PENDIENTE' && (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          id={`btn-aprobar-${s.id}`}
                          onClick={() => abrirAprobar(s)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors font-medium"
                        >
                          <CheckCircle size={12} /> Aprobar
                        </button>
                        <button
                          id={`btn-rechazar-${s.id}`}
                          onClick={() => abrirRechazar(s)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors font-medium"
                        >
                          <XCircle size={12} /> Rechazar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ═══ Modal: Aprobar solicitud ═══ */}
      {modalAprobar && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setModalAprobar(null); }} id="modal-aprobar">
          <div className="bg-white border border-gray-200 rounded-xl w-full max-w-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-base font-bold text-gray-900">Aprobar solicitud #{modalAprobar.id}</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {modalAprobar.producto.nombre} · +{modalAprobar.cantidadSolicitada} uds.
                </p>
              </div>
              <button onClick={() => setModalAprobar(null)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>
            <form onSubmit={handleAprobar} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Proveedor asignado</label>
                <select required value={formAprobar.proveedorId}
                  onChange={(e) => setFormAprobar((p) => ({ ...p, proveedorId: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 appearance-none">
                  <option value="">Seleccionar proveedor...</option>
                  {proveedores.map((p) => <option key={p.id} value={p.id}>{p.nombre} — {p.ruc}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Fecha estimada de llegada <span className="text-gray-400 font-normal">(opcional)</span>
                </label>
                <input type="date" value={formAprobar.fechaEstimada}
                  onChange={(e) => setFormAprobar((p) => ({ ...p, fechaEstimada: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
              </div>
              {errAprob && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-3 py-2.5 text-sm">⚠️ {errAprob}</div>}
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setModalAprobar(null)}
                  className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm">Cancelar</button>
                <button type="submit" disabled={savingAprob}
                  className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white text-sm font-semibold">
                  {savingAprob ? 'Aprobando...' : '✅ Aprobar solicitud'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══ Modal: Rechazar solicitud ═══ */}
      {modalRechazar && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setModalRechazar(null); }} id="modal-rechazar">
          <div className="bg-white border border-gray-200 rounded-xl w-full max-w-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-base font-bold text-gray-900">Rechazar solicitud #{modalRechazar.id}</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {modalRechazar.producto.nombre} · +{modalRechazar.cantidadSolicitada} uds.
                </p>
              </div>
              <button onClick={() => setModalRechazar(null)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>
            <form onSubmit={handleRechazar} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Motivo de rechazo <span className="text-gray-400 font-normal">(opcional)</span>
                </label>
                <textarea
                  rows={3}
                  value={notaRechazo}
                  onChange={(e) => setNotaRechazo(e.target.value)}
                  placeholder="Explica por qué se rechaza esta solicitud..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                />
              </div>
              {errRech && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-3 py-2.5 text-sm">⚠️ {errRech}</div>}
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setModalRechazar(null)}
                  className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm">Cancelar</button>
                <button type="submit" disabled={savingRech}
                  className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white text-sm font-semibold">
                  {savingRech ? 'Rechazando...' : '❌ Rechazar solicitud'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
