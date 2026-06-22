// src/pages/almacen/HistorialBajasPage.jsx
import { useEffect, useState, useCallback } from 'react';
import { ArrowUpFromLine, Filter } from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import api, { withAuth } from '../../lib/axios';

const hoy = () => new Date().toISOString().split('T')[0];
const hace30 = () => { const d = new Date(); d.setDate(d.getDate() - 30); return d.toISOString().split('T')[0]; };

const MOTIVO_COLOR = {
  'Vencido':     'bg-red-50 text-red-700 border-red-200',
  'Dañado':      'bg-orange-50 text-orange-700 border-orange-200',
  'Robo/Pérdida':'bg-purple-50 text-purple-700 border-purple-200',
  'Otro':        'bg-gray-100 text-gray-600 border-gray-200',
};

export default function HistorialBajasPage() {
  const { token } = useAuth();
  const [bajas,   setBajas]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const [desde,   setDesde]   = useState(hace30());
  const [hasta,   setHasta]   = useState(hoy());

  const fetchBajas = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const params = new URLSearchParams();
      if (desde) params.set('desde', desde);
      if (hasta) params.set('hasta', hasta);
      const { data } = await api.get(`/almacen/bajas?${params}`, withAuth(token));
      setBajas(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar bajas');
    } finally { setLoading(false); }
  }, [token, desde, hasta]);

  useEffect(() => { fetchBajas(); }, []);

  const totalUnidades = bajas.reduce((s, b) => s + b.cantidad, 0);

  return (
    <div className="p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Historial de Bajas</h1>
          <p className="text-gray-500 text-sm mt-0.5">Registro de bajas de inventario (vencidos, dañados, etc.)</p>
        </div>
        {!loading && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            <ArrowUpFromLine size={15} className="text-amber-600" />
            <div className="text-sm">
              <span className="font-bold text-amber-700">{bajas.length}</span>
              <span className="text-amber-600 ml-1">bajas</span>
              <span className="text-gray-400 mx-1.5">·</span>
              <span className="font-bold text-amber-700">{totalUnidades}</span>
              <span className="text-amber-600 ml-1">unidades</span>
            </div>
          </div>
        )}
      </div>

      {/* Filtros */}
      <div className="bg-white border border-gray-200 rounded-[10px] px-4 py-3 flex flex-wrap items-end gap-4">
        <div className="flex items-center gap-1 text-sm font-medium text-gray-600">
          <Filter size={14} /> Filtrar por fecha:
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
          <button onClick={fetchBajas}
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
          <table className="w-full text-sm" id="tabla-bajas">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Fecha','Producto','Motivo','Cantidad','Registrado por'].map((h) => (
                  <th key={h} className={`px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide ${h === 'Cantidad' ? 'text-right' : 'text-left'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bajas.length === 0 && (
                <tr><td colSpan={5} className="text-center text-gray-400 py-12">No hay bajas en el período seleccionado</td></tr>
              )}
              {bajas.map((b) => (
                <tr key={b.id} id={`baja-row-${b.id}`} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                    {new Date(b.creadoEn).toLocaleString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{b.producto.nombre}</p>
                    <p className="text-xs text-gray-400">{b.producto.marca}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${MOTIVO_COLOR[b.motivo] || MOTIVO_COLOR['Otro']}`}>
                      {b.motivo}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="inline-flex items-center gap-1 text-amber-700 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full text-xs">
                      <ArrowUpFromLine size={10} /> -{b.cantidad}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{b.usuario.nombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
