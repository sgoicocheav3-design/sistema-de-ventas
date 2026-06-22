// src/pages/gerencia/AuditoriaPage.jsx
import { useState, useEffect, useCallback } from 'react';
import {
  Shield, ChevronLeft, ChevronRight, Archive,
  Calendar, User, Clock, AlertTriangle, CheckCircle,
} from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import api, { withAuth } from '../../lib/axios';

const ROL_BADGE = {
  ADMIN:      { bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-200' },
  GERENTE:    { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  VENDEDOR:   { bg: 'bg-emerald-50',text: 'text-emerald-700',border: 'border-emerald-200' },
  ALMACENERO: { bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200' },
};

export default function AuditoriaPage() {
  const { token } = useAuth();

  const [logs, setLogs]           = useState([]);
  const [paginacion, setPaginacion] = useState({ pagina: 1, limite: 20, total: 0, totalPaginas: 0 });
  const [loading, setLoading]     = useState(true);
  const [pagina, setPagina]       = useState(1);

  // Archive modal
  const [showArchive, setShowArchive]   = useState(false);
  const [archiveFecha, setArchiveFecha] = useState('');
  const [archiving, setArchiving]       = useState(false);
  const [archiveMsg, setArchiveMsg]     = useState('');

  // ─── Fetch logs ───────────────────────────────────────────────────────
  const fetchLogs = useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/gerencia/auditoria?pagina=${p}&limite=20`, withAuth(token));
      setLogs(data.logs || []);
      setPaginacion(data.paginacion || {});
    } catch {
      setLogs([]);
    } finally { setLoading(false); }
  }, [token]);

  useEffect(() => { fetchLogs(pagina); }, [pagina, fetchLogs]);

  // ─── Archive ──────────────────────────────────────────────────────────
  const handleArchive = async () => {
    if (!archiveFecha) return;
    setArchiving(true);
    setArchiveMsg('');
    try {
      const { data } = await api.patch('/gerencia/auditoria/archivar', { hasta: archiveFecha }, withAuth(token));
      setArchiveMsg(`✅ ${data.archivados} registro(s) archivados`);
      setPagina(1);
      fetchLogs(1);
      setTimeout(() => { setShowArchive(false); setArchiveMsg(''); }, 2000);
    } catch (err) {
      setArchiveMsg(`❌ ${err.response?.data?.message || 'Error al archivar'}`);
    } finally { setArchiving(false); }
  };

  return (
    <div className="p-5 space-y-4">
      {/* ─── Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Shield size={20} className="text-sky-600" />
          Auditoría de Accesos
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            {paginacion.total} registro(s) activos
          </span>
          <button
            id="btn-open-archive"
            onClick={() => { setShowArchive(true); setArchiveFecha(''); setArchiveMsg(''); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 transition-all"
          >
            <Archive size={13} /> Archivar registros
          </button>
        </div>
      </div>

      {/* ─── Archive modal ──────────────────────────────────────────────── */}
      {showArchive && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" id="modal-archive">
          <div className="bg-white rounded-xl w-full max-w-sm p-6 space-y-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Archive size={18} className="text-amber-600" />
              Archivar registros
            </h2>
            <p className="text-sm text-gray-500">
              Los registros anteriores a la fecha seleccionada serán archivados (no eliminados).
            </p>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Archivar registros anteriores a:</label>
              <input
                id="archive-date"
                type="date"
                value={archiveFecha}
                onChange={(e) => setArchiveFecha(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {archiveMsg && (
              <p className={`text-sm px-3 py-2 rounded-lg ${
                archiveMsg.startsWith('✅') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
              }`}>{archiveMsg}</p>
            )}

            <div className="flex gap-2 pt-2">
              <button
                id="btn-confirm-archive"
                onClick={handleArchive}
                disabled={!archiveFecha || archiving}
                className="flex-1 py-2 text-sm font-semibold rounded-lg bg-amber-600 text-white hover:bg-amber-700 disabled:bg-gray-200 disabled:text-gray-400 transition-all"
              >
                {archiving ? 'Archivando...' : 'Confirmar archivo'}
              </button>
              <button
                onClick={() => setShowArchive(false)}
                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Table ──────────────────────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">ID</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">Usuario</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">Rol</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">Fecha / Hora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">Cargando registros...</td></tr>
              ) : logs.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle size={28} className="text-emerald-300" />
                    <span>No hay registros de acceso activos</span>
                  </div>
                </td></tr>
              ) : (
                logs.map((log) => {
                  const rolStyle = ROL_BADGE[log.rol] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
                  return (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2.5 text-gray-400 text-xs font-mono">{log.id}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                            <User size={11} className="text-sky-600" />
                          </div>
                          <span className="font-medium text-gray-900">{log.usuario?.nombre || '-'}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-gray-500 text-xs">{log.usuario?.email || '-'}</td>
                      <td className="px-4 py-2.5">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${rolStyle.bg} ${rolStyle.text} ${rolStyle.border}`}>
                          {log.rol}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-gray-600 text-xs flex items-center gap-1.5">
                        <Clock size={11} className="text-gray-400" />
                        {new Date(log.timestamp).toLocaleString('es-PE')}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {paginacion.totalPaginas > 1 && (
          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Página {paginacion.pagina} de {paginacion.totalPaginas} · {paginacion.total} registros
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setPagina(Math.max(1, pagina - 1))}
                disabled={pagina === 1}
                className="p-1.5 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft size={14} />
              </button>
              {/* Page numbers */}
              {Array.from({ length: Math.min(5, paginacion.totalPaginas) }, (_, i) => {
                const start = Math.max(1, Math.min(pagina - 2, paginacion.totalPaginas - 4));
                const p = start + i;
                if (p > paginacion.totalPaginas) return null;
                return (
                  <button
                    key={p}
                    onClick={() => setPagina(p)}
                    className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${
                      p === pagina
                        ? 'bg-sky-600 text-white'
                        : 'border border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >{p}</button>
                );
              })}
              <button
                onClick={() => setPagina(Math.min(paginacion.totalPaginas, pagina + 1))}
                disabled={pagina === paginacion.totalPaginas}
                className="p-1.5 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
