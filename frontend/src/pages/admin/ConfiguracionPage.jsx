// src/pages/admin/ConfiguracionPage.jsx
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../store/AuthContext';
import api, { withAuth } from '../../lib/axios';
import {
  Settings, Database, RefreshCw, Download, AlertTriangle,
  Save, CheckCircle, XCircle, Shield, Loader2,
} from 'lucide-react';

// ─── Modal de confirmación estricta ─────────────────────────────────────────
const ConfirmModal = ({ show, archivo, onConfirm, onCancel, loading }) => {
  const [texto, setTexto] = useState('');

  useEffect(() => {
    if (show) setTexto('');
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle size={20} className="text-red-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Restaurar Base de Datos</h3>
            <p className="text-xs text-red-500 font-medium">⚠️ Acción destructiva e irreversible</p>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-red-800">
            Estás a punto de restaurar la base de datos desde:
          </p>
          <p className="text-sm font-mono font-bold text-red-900 mt-1">{archivo}</p>
          <p className="text-xs text-red-600 mt-2">
            Esto <strong>sobreescribirá todos los datos actuales</strong> del sistema.
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Escribe <span className="font-bold text-red-600 bg-red-50 px-1 rounded">CONFIRMAR</span> para proceder:
          </label>
          <input
            id="input-confirm-restore"
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Escribe CONFIRMAR"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
            autoComplete="off"
            disabled={loading}
          />
        </div>

        <div className="flex gap-3">
          <button
            id="btn-cancel-restore"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            id="btn-confirm-restore"
            onClick={onConfirm}
            disabled={texto !== 'CONFIRMAR' || loading}
            className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Restaurando…
              </>
            ) : (
              <>
                <Database size={14} />
                Restaurar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Componente principal ───────────────────────────────────────────────────
export default function ConfiguracionPage() {
  const { token } = useAuth();

  // Estado de configuración
  const [config, setConfig] = useState({
    umbral_alerta_visual: 5,
    umbral_solicitud_reposicion: 5,
  });
  const [configLoading, setConfigLoading] = useState(true);
  const [configSaving, setConfigSaving] = useState(false);
  const [configMsg, setConfigMsg] = useState(null);

  // Estado de backups
  const [backups, setBackups] = useState([]);
  const [backupsLoading, setBackupsLoading] = useState(true);
  const [backupsError, setBackupsError] = useState(null);

  // Modal de restauración
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState(null);
  const [restoring, setRestoring] = useState(false);

  // ─── Fetch configuración ──────────────────────────────────────────────────
  const fetchConfig = useCallback(async () => {
    try {
      setConfigLoading(true);
      const { data } = await api.get('/admin/config', withAuth(token));
      setConfig(data);
    } catch (err) {
      setConfigMsg({ type: 'error', text: err.response?.data?.message || 'Error al cargar configuración' });
    } finally {
      setConfigLoading(false);
    }
  }, [token]);

  // ─── Fetch backups ────────────────────────────────────────────────────────
  const fetchBackups = useCallback(async () => {
    try {
      setBackupsLoading(true);
      setBackupsError(null);
      const { data } = await api.get('/admin/backups', withAuth(token));
      setBackups(data);
    } catch (err) {
      setBackupsError(err.response?.data?.message || 'Error al cargar backups');
    } finally {
      setBackupsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchConfig();
    fetchBackups();
  }, [fetchConfig, fetchBackups]);

  // ─── Guardar configuración ────────────────────────────────────────────────
  const handleSaveConfig = async (e) => {
    e.preventDefault();
    try {
      setConfigSaving(true);
      setConfigMsg(null);
      await api.put('/admin/config', config, withAuth(token));
      setConfigMsg({ type: 'success', text: 'Configuración actualizada correctamente' });
      setTimeout(() => setConfigMsg(null), 4000);
    } catch (err) {
      setConfigMsg({ type: 'error', text: err.response?.data?.message || 'Error al guardar configuración' });
    } finally {
      setConfigSaving(false);
    }
  };

  // ─── Restaurar backup ────────────────────────────────────────────────────
  const handleRestore = async () => {
    try {
      setRestoring(true);
      await api.post('/admin/backups/restaurar', { archivo: selectedBackup }, withAuth(token));
      setModalOpen(false);
      setConfigMsg({ type: 'success', text: `Base de datos restaurada desde ${selectedBackup}` });
    } catch (err) {
      setConfigMsg({ type: 'error', text: err.response?.data?.message || 'Error en la restauración' });
      setModalOpen(false);
    } finally {
      setRestoring(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* ─── Header ────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-200">
          <Settings size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configuración del Sistema</h1>
          <p className="text-sm text-gray-500">Umbrales de alerta, backups y restauración</p>
        </div>
      </div>

      {/* ─── Mensaje global ──────────────────────────────────────────────── */}
      {configMsg && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium border transition-all ${
          configMsg.type === 'success'
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-red-50 text-red-700 border-red-200'
        }`}>
          {configMsg.type === 'success' ? <CheckCircle size={16} /> : <XCircle size={16} />}
          {configMsg.text}
        </div>
      )}

      {/* ─── Sección 1: Configuración de Umbrales ────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-violet-500" />
            <h2 className="text-lg font-semibold text-gray-900">Umbrales de Configuración</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Define los valores mínimos para alertas visuales y solicitudes de reposición automáticas.
          </p>
        </div>

        <form onSubmit={handleSaveConfig} className="p-6 space-y-5">
          {configLoading ? (
            <div className="flex items-center justify-center py-8 gap-2 text-gray-400">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-sm">Cargando configuración…</span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="umbral_alerta_visual" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Umbral Alerta Visual (stock)
                  </label>
                  <input
                    id="umbral_alerta_visual"
                    type="number"
                    min="0"
                    value={config.umbral_alerta_visual}
                    onChange={(e) => setConfig((prev) => ({ ...prev, umbral_alerta_visual: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Productos con stock ≤ este valor se mostrarán con alerta visual.
                  </p>
                </div>

                <div>
                  <label htmlFor="umbral_solicitud_reposicion" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Umbral Solicitud Reposición
                  </label>
                  <input
                    id="umbral_solicitud_reposicion"
                    type="number"
                    min="0"
                    value={config.umbral_solicitud_reposicion}
                    onChange={(e) => setConfig((prev) => ({ ...prev, umbral_solicitud_reposicion: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Nivel de stock a partir del cual se sugiere crear una solicitud de reposición.
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  id="btn-save-config"
                  type="submit"
                  disabled={configSaving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 shadow-sm"
                >
                  {configSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  {configSaving ? 'Guardando…' : 'Guardar Configuración'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>

      {/* ─── Sección 2: Backups ──────────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database size={18} className="text-blue-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Backups de Base de Datos</h2>
              <p className="text-sm text-gray-500">Backup automático diario a las 2:00 AM — Retención: 30 días</p>
            </div>
          </div>
          <button
            id="btn-refresh-backups"
            onClick={fetchBackups}
            disabled={backupsLoading}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors disabled:opacity-50"
            title="Refrescar"
          >
            <RefreshCw size={16} className={backupsLoading ? 'animate-spin' : ''} />
          </button>
        </div>

        <div className="p-6">
          {backupsLoading ? (
            <div className="flex items-center justify-center py-8 gap-2 text-gray-400">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-sm">Cargando backups…</span>
            </div>
          ) : backupsError ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700 flex items-center gap-2">
              <XCircle size={16} />
              {backupsError}
            </div>
          ) : backups.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <Database size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">No hay archivos de backup disponibles</p>
              <p className="text-xs mt-1">El primer backup se generará automáticamente a las 2:00 AM</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Archivo</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tamaño</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {backups.map((b) => (
                    <tr key={b.nombre} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-4 font-mono text-xs text-gray-800 flex items-center gap-2">
                        <Download size={13} className="text-gray-400" />
                        {b.nombre}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{b.tamanoMB} MB</td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(b.fecha).toLocaleString('es-PE', {
                          day: '2-digit', month: '2-digit', year: 'numeric',
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          id={`btn-restore-${b.nombre}`}
                          onClick={() => {
                            setSelectedBackup(b.nombre);
                            setModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 rounded-lg text-xs font-medium transition-colors"
                        >
                          <RefreshCw size={12} />
                          Restaurar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ─── Modal de confirmación ─────────────────────────────────────────── */}
      <ConfirmModal
        show={modalOpen}
        archivo={selectedBackup}
        onConfirm={handleRestore}
        onCancel={() => setModalOpen(false)}
        loading={restoring}
      />
    </div>
  );
}
