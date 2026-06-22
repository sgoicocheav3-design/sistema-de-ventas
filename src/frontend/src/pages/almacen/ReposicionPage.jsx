// src/pages/almacen/ReposicionPage.jsx
import { useEffect, useState, useCallback } from 'react';
import {
  Package, AlertTriangle, Send, CheckSquare, Square, X,
} from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import api, { withAuth } from '../../lib/axios';

export default function ReposicionPage() {
  const { token } = useAuth();

  const [productos,   setProductos]   = useState([]);
  const [umbral,      setUmbral]      = useState(5);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState('');
  const [selected,    setSelected]    = useState(new Set());

  // Modal solicitud
  const [modalOpen,   setModalOpen]   = useState(false);
  const [formCant,    setFormCant]    = useState({});
  const [sending,     setSending]     = useState(false);
  const [sendErr,     setSendErr]     = useState('');
  const [sendOk,      setSendOk]      = useState('');

  // ─── Fetch productos con stock bajo ───────────────────────────────────────
  const fetchProductos = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const { data } = await api.get('/almacen/productos?stockBajo=true', withAuth(token));
      setProductos(data.productos);
      setUmbral(data.umbralAlerta);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar productos');
    } finally { setLoading(false); }
  }, [token]);

  useEffect(() => { fetchProductos(); }, []);

  // ─── Selección ─────────────────────────────────────────────────────────────
  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === productos.length) setSelected(new Set());
    else setSelected(new Set(productos.map((p) => p.id)));
  };

  // ─── Abrir modal ───────────────────────────────────────────────────────────
  const abrirModal = () => {
    if (selected.size === 0) return;
    const cantidades = {};
    selected.forEach((id) => {
      const prod = productos.find((p) => p.id === id);
      cantidades[id] = prod ? Math.max(1, (umbral * 2) - prod.stock) : 10;
    });
    setFormCant(cantidades);
    setSendErr('');
    setSendOk('');
    setModalOpen(true);
  };

  // ─── Enviar solicitudes ────────────────────────────────────────────────────
  const enviarSolicitudes = async () => {
    setSending(true); setSendErr(''); setSendOk('');
    try {
      const ids = Array.from(selected);
      let ok = 0;
      let errores = [];
      for (const id of ids) {
        try {
          await api.post('/almacen/solicitudes', {
            productoId: id,
            cantidadSolicitada: parseInt(formCant[id] || 1),
          }, withAuth(token));
          ok++;
        } catch (err) {
          const prod = productos.find((p) => p.id === id);
          errores.push(`${prod?.nombre || id}: ${err.response?.data?.message || 'Error'}`);
        }
      }
      if (ok > 0) {
        setSendOk(`✅ ${ok} solicitud(es) enviada(s) correctamente`);
        setSelected(new Set());
        await fetchProductos();
      }
      if (errores.length > 0) {
        setSendErr(errores.join('; '));
      } else {
        setTimeout(() => setModalOpen(false), 1200);
      }
    } finally { setSending(false); }
  };

  const fmt = (p) => `S/ ${parseFloat(p).toFixed(2)}`;

  return (
    <div className="p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Reposición de Stock</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Productos con stock ≤ {umbral} unidades · Selecciona para solicitar reposición
          </p>
        </div>
        <button
          id="btn-enviar-solicitudes"
          onClick={abrirModal}
          disabled={selected.size === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selected.size > 0
              ? 'bg-sky-600 hover:bg-sky-700 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send size={15} /> Solicitar reposición ({selected.size})
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">{error}</div>}

      {/* Tabla */}
      <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400 text-sm">Cargando...</div>
        ) : productos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Package size={40} strokeWidth={1} className="mb-3 text-gray-300" />
            <p className="font-medium text-gray-500">¡Todos los productos tienen stock suficiente!</p>
            <p className="text-sm mt-1">No hay productos con stock ≤ {umbral}</p>
          </div>
        ) : (
          <table className="w-full text-sm" id="tabla-reposicion">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-3 py-3 text-left w-10">
                  <button onClick={toggleAll} className="text-gray-400 hover:text-sky-600 transition-colors">
                    {selected.size === productos.length && productos.length > 0
                      ? <CheckSquare size={16} className="text-sky-600" />
                      : <Square size={16} />
                    }
                  </button>
                </th>
                {['Producto', 'Marca', 'Categoría', 'Precio', 'Stock actual'].map((h) => (
                  <th key={h} className={`px-3 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap ${
                    ['Precio', 'Stock actual'].includes(h) ? 'text-right' : 'text-left'
                  }`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {productos.map((p) => {
                const isSelected = selected.has(p.id);
                return (
                  <tr
                    key={p.id}
                    id={`repo-row-${p.id}`}
                    className={`transition-colors cursor-pointer ${
                      isSelected ? 'bg-sky-50 hover:bg-sky-100' : 'bg-amber-50/50 hover:bg-amber-50'
                    }`}
                    onClick={() => toggleSelect(p.id)}
                  >
                    <td className="px-3 py-2.5">
                      {isSelected
                        ? <CheckSquare size={16} className="text-sky-600" />
                        : <Square size={16} className="text-gray-300" />
                      }
                    </td>
                    <td className="px-3 py-2.5 font-medium text-gray-900">
                      <AlertTriangle size={11} className="inline text-amber-500 mr-1" />
                      {p.nombre}
                    </td>
                    <td className="px-3 py-2.5 text-gray-600">{p.marca}</td>
                    <td className="px-3 py-2.5">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{p.categoria?.nombre}</span>
                    </td>
                    <td className="px-3 py-2.5 text-right text-emerald-700 font-medium">{fmt(p.precio)}</td>
                    <td className="px-3 py-2.5 text-right">
                      <span className="inline-flex items-center gap-1 text-amber-700 font-bold bg-amber-100 px-2.5 py-0.5 rounded-full text-xs">
                        <AlertTriangle size={10} /> {p.stock}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* ═══ Modal: Confirmar solicitudes ═══ */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }} id="modal-solicitud">
          <div className="bg-white border border-gray-200 rounded-xl w-full max-w-md max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-base font-bold text-gray-900">Confirmar solicitud de reposición</h2>
                <p className="text-xs text-gray-500 mt-0.5">{selected.size} producto(s) seleccionado(s)</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {Array.from(selected).map((id) => {
                const prod = productos.find((p) => p.id === id);
                if (!prod) return null;
                return (
                  <div key={id} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-900 text-sm">{prod.nombre}</p>
                      <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                        Stock: {prod.stock}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-500 whitespace-nowrap">Cantidad a solicitar:</label>
                      <input
                        type="number"
                        min="1"
                        value={formCant[id] || ''}
                        onChange={(e) => setFormCant((prev) => ({ ...prev, [id]: e.target.value }))}
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 w-24"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {sendOk && <div className="mx-5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg px-3 py-2.5 text-sm">{sendOk}</div>}
            {sendErr && <div className="mx-5 bg-red-50 border border-red-200 text-red-600 rounded-lg px-3 py-2.5 text-sm">⚠️ {sendErr}</div>}

            <div className="px-5 py-4 border-t border-gray-200 flex gap-3">
              <button onClick={() => setModalOpen(false)}
                className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm">
                Cancelar
              </button>
              <button
                id="btn-confirmar-solicitudes"
                onClick={enviarSolicitudes}
                disabled={sending}
                className="flex-1 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 disabled:bg-sky-300 text-white text-sm font-semibold"
              >
                {sending ? 'Enviando...' : 'Enviar solicitudes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
