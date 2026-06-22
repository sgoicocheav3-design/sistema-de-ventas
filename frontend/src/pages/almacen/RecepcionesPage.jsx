// src/pages/almacen/RecepcionesPage.jsx
import { useEffect, useState, useCallback } from 'react';
import { Truck, CheckCircle, Package, Clock, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import api, { withAuth } from '../../lib/axios';

export default function RecepcionesPage() {
  const { token } = useAuth();

  const [recepciones, setRecepciones] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState('');

  // Confirmar recepción
  const [confirmando, setConfirmando] = useState(null); // id de solicitud
  const [confirmErr,  setConfirmErr]  = useState('');

  const fetchRecepciones = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const { data } = await api.get('/almacen/recepciones/pendientes', withAuth(token));
      setRecepciones(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar recepciones');
    } finally { setLoading(false); }
  }, [token]);

  useEffect(() => { fetchRecepciones(); }, []);

  const confirmarRecepcion = async (id) => {
    setConfirmando(id); setConfirmErr('');
    try {
      await api.patch(`/almacen/solicitudes/${id}/completar`, {}, withAuth(token));
      await fetchRecepciones();
    } catch (err) {
      setConfirmErr(err.response?.data?.message || 'Error al confirmar recepción');
    } finally { setConfirmando(null); }
  };

  const fmtFecha = (f) => f
    ? new Date(f).toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : '—';

  const isVencida = (f) => {
    if (!f) return false;
    const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
    const fecha = new Date(f); fecha.setHours(0, 0, 0, 0);
    return fecha < hoy;
  };

  return (
    <div className="p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Recepciones Pendientes</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Pedidos aprobados listos para recibir · Confirma al recepcionar la mercadería
          </p>
        </div>
        {!loading && (
          <div className="flex items-center gap-2 bg-sky-50 border border-sky-200 rounded-lg px-3 py-2">
            <Truck size={15} className="text-sky-600" />
            <div className="text-sm">
              <span className="font-bold text-sky-700">{recepciones.length}</span>
              <span className="text-sky-600 ml-1">pendiente(s)</span>
            </div>
          </div>
        )}
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">{error}</div>}
      {confirmErr && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">⚠️ {confirmErr}</div>}

      {/* Grid de tarjetas */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-400 text-sm">Cargando...</div>
      ) : recepciones.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-[10px] flex flex-col items-center justify-center py-16 text-gray-400">
          <CheckCircle size={40} strokeWidth={1} className="mb-3 text-emerald-300" />
          <p className="font-medium text-gray-500">No hay recepciones pendientes</p>
          <p className="text-sm mt-1">Todas las solicitudes aprobadas han sido recibidas</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {recepciones.map((s) => {
            const vencida = isVencida(s.fechaEstimada);
            return (
              <div
                key={s.id}
                id={`recepcion-card-${s.id}`}
                className={`bg-white border rounded-xl overflow-hidden transition-all hover:shadow-md ${
                  vencida ? 'border-red-200' : 'border-gray-200'
                }`}
              >
                {/* Header de la tarjeta */}
                <div className={`px-4 py-3 flex items-center justify-between ${
                  vencida ? 'bg-red-50 border-b border-red-200' : 'bg-sky-50 border-b border-sky-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <Package size={14} className={vencida ? 'text-red-600' : 'text-sky-600'} />
                    <span className="text-sm font-bold text-gray-900">Solicitud #{s.id}</span>
                  </div>
                  {vencida && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                      <AlertTriangle size={9} /> Atrasada
                    </span>
                  )}
                </div>

                {/* Contenido */}
                <div className="px-4 py-3 space-y-2.5">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Producto</p>
                    <p className="text-sm font-medium text-gray-900">{s.producto.nombre}</p>
                    <p className="text-xs text-gray-500">{s.producto.marca}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-400">Cantidad</p>
                      <p className="text-sm font-bold text-sky-700">+{s.cantidadSolicitada} uds.</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Stock actual</p>
                      <p className="text-sm font-medium text-gray-700">{s.producto.stock} uds.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-400">Proveedor</p>
                      <p className="text-sm text-gray-700">{s.proveedor?.nombre || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Fecha estimada</p>
                      <p className={`text-sm font-medium ${vencida ? 'text-red-600' : 'text-gray-700'}`}>
                        <Clock size={11} className="inline mr-1" />
                        {fmtFecha(s.fechaEstimada)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Acción */}
                <div className="px-4 py-3 border-t border-gray-100">
                  <button
                    id={`btn-confirmar-${s.id}`}
                    onClick={() => confirmarRecepcion(s.id)}
                    disabled={confirmando === s.id}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white text-sm font-semibold transition-colors"
                  >
                    {confirmando === s.id ? (
                      'Procesando...'
                    ) : (
                      <><CheckCircle size={15} /> Confirmar recepción</>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
