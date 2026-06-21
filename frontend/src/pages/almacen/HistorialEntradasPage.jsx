// src/pages/almacen/HistorialEntradasPage.jsx
import { useEffect, useState, useCallback } from 'react';
import { ArrowDownToLine, Filter } from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import api, { withAuth } from '../../lib/axios';

const hoy = () => new Date().toISOString().split('T')[0];
const hace30 = () => { const d = new Date(); d.setDate(d.getDate() - 30); return d.toISOString().split('T')[0]; };

export default function HistorialEntradasPage() {
  const { token } = useAuth();
  const [entradas, setEntradas] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');
  const [desde,    setDesde]    = useState(hace30());
  const [hasta,    setHasta]    = useState(hoy());

  const fetchEntradas = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const params = new URLSearchParams();
      if (desde) params.set('desde', desde);
      if (hasta) params.set('hasta', hasta);
      const { data } = await api.get(`/almacen/entradas?${params}`, withAuth(token));
      setEntradas(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar entradas');
    } finally { setLoading(false); }
  }, [token, desde, hasta]);

  useEffect(() => { fetchEntradas(); }, []);

  const totalUnidades = entradas.reduce((s, e) => s + e.cantidad, 0);

  return (
    <div className="p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Historial de Entradas</h1>
          <p className="text-gray-500 text-sm mt-0.5">Registro de ingresos de mercadería al inventario</p>
        </div>
        {/* Stat pill */}
        {!loading && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
            <ArrowDownToLine size={15} className="text-emerald-600" />
            <div className="text-sm">
              <span className="font-bold text-emerald-700">{entradas.length}</span>
              <span className="text-emerald-600 ml-1">entradas</span>
              <span className="text-gray-400 mx-1.5">·</span>
              <span className="font-bold text-emerald-700">{totalUnidades}</span>
              <span className="text-emerald-600 ml-1">unidades</span>
            </div>
          </div>
        )}
      </div>

      {/* Filtros de fecha */}
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
          <button onClick={fetchEntradas}
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
          <table className="w-full text-sm" id="tabla-entradas">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Fecha','Producto','Proveedor','Cantidad','Registrado por'].map((h) => (
                  <th key={h} className={`px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide ${h === 'Cantidad' ? 'text-right' : 'text-left'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {entradas.length === 0 && (
                <tr><td colSpan={5} className="text-center text-gray-400 py-12">No hay entradas en el período seleccionado</td></tr>
              )}
              {entradas.map((e) => (
                <tr key={e.id} id={`entrada-row-${e.id}`} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                    {new Date(e.creadoEn).toLocaleString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{e.producto.nombre}</p>
                    <p className="text-xs text-gray-400">{e.producto.marca}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{e.proveedor.nombre}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs">
                      <ArrowDownToLine size={10} /> +{e.cantidad}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{e.usuario.nombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
