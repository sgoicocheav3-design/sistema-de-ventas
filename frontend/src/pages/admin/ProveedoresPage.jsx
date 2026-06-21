// src/pages/admin/ProveedoresPage.jsx
import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import api, { withAuth } from '../../lib/axios';

const EMPTY_FORM = { nombre: '', ruc: '', contacto: '' };

export default function ProveedoresPage() {
  const { token } = useAuth();

  const [proveedores, setProveedores] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState('');

  const [modal,     setModal]     = useState(false);
  const [editId,    setEditId]    = useState(null);
  const [form,      setForm]      = useState(EMPTY_FORM);
  const [formError, setFormError] = useState('');
  const [saving,    setSaving]    = useState(false);

  const fetchProveedores = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const { data } = await api.get('/admin/proveedores', withAuth(token));
      setProveedores(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar proveedores');
    } finally { setLoading(false); }
  }, [token]);

  useEffect(() => { fetchProveedores(); }, []);

  const abrirCrear = () => { setEditId(null); setForm(EMPTY_FORM); setFormError(''); setModal(true); };
  const abrirEditar = (p) => { setEditId(p.id); setForm({ nombre: p.nombre, ruc: p.ruc, contacto: p.contacto }); setFormError(''); setModal(true); };
  const cerrarModal = () => { setModal(false); setFormError(''); };

  const handleGuardar = async (e) => {
    e.preventDefault(); setSaving(true); setFormError('');
    try {
      if (editId) await api.put(`/admin/proveedores/${editId}`, form, withAuth(token));
      else await api.post('/admin/proveedores', form, withAuth(token));
      await fetchProveedores(); cerrarModal();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Error al guardar');
    } finally { setSaving(false); }
  };

  const handleDesactivar = async (id, nombre) => {
    if (!confirm(`¿Desactivar al proveedor "${nombre}"?`)) return;
    try {
      await api.delete(`/admin/proveedores/${id}`, withAuth(token));
      setProveedores((prev) => prev.filter((p) => p.id !== id));
    } catch (err) { alert(err.response?.data?.message || 'Error'); }
  };

  return (
    <div className="p-5">
      {/* Page header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Proveedores</h1>
          <p className="text-gray-500 text-sm mt-0.5">Administra los proveedores del minimarket</p>
        </div>
        <button
          id="btn-nuevo-proveedor"
          onClick={abrirCrear}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium transition-colors"
        >
          <Plus size={15} /> Nuevo proveedor
        </button>
      </div>

      {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">{error}</div>}

      <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400 text-sm">Cargando...</div>
        ) : (
          <table className="w-full text-sm" id="tabla-proveedores">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Nombre','RUC','Contacto','Acciones'].map((h) => (
                  <th key={h} className={`px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide ${h === 'Acciones' ? 'text-right' : 'text-left'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {proveedores.length === 0 && (
                <tr><td colSpan={4} className="text-center text-gray-400 py-12">No hay proveedores activos</td></tr>
              )}
              {proveedores.map((p) => (
                <tr key={p.id} id={`proveedor-row-${p.id}`} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-gray-900">{p.nombre}</td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md border border-indigo-100">
                      {p.ruc}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{p.contacto}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button id={`btn-editar-prov-${p.id}`} onClick={() => abrirEditar(p)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
                        <Pencil size={12} /> Editar
                      </button>
                      <button id={`btn-desactivar-prov-${p.id}`} onClick={() => handleDesactivar(p.id, p.nombre)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors">
                        <Trash2 size={12} /> Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) cerrarModal(); }}
          id="modal-proveedor">
          <div className="bg-white border border-gray-200 rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h2 className="text-base font-bold text-gray-900" id="modal-prov-titulo">
                {editId ? 'Editar proveedor' : 'Nuevo proveedor'}
              </h2>
              <button onClick={cerrarModal} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>

            <form onSubmit={handleGuardar} id="form-proveedor" className="p-5 space-y-4">
              <div className="space-y-1">
                <label htmlFor="prov-nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input id="prov-nombre" type="text" required value={form.nombre}
                  onChange={(e) => setForm((p) => ({ ...p, nombre: e.target.value }))}
                  placeholder="Distribuidora XYZ"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent" />
              </div>

              <div className="space-y-1">
                <label htmlFor="prov-ruc" className="block text-sm font-medium text-gray-700">
                  RUC <span className="text-gray-400 font-normal">(11 dígitos)</span>
                </label>
                <input id="prov-ruc" type="text" required maxLength={11} pattern="\d{11}"
                  value={form.ruc}
                  onChange={(e) => setForm((p) => ({ ...p, ruc: e.target.value.replace(/\D/g, '') }))}
                  placeholder="20123456789"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm font-mono placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent" />
                {form.ruc && form.ruc.length !== 11 && (
                  <p className="text-xs text-amber-600">{form.ruc.length}/11 dígitos</p>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="prov-contacto" className="block text-sm font-medium text-gray-700">Contacto</label>
                <input id="prov-contacto" type="text" required value={form.contacto}
                  onChange={(e) => setForm((p) => ({ ...p, contacto: e.target.value }))}
                  placeholder="999 888 777 / ventas@empresa.com"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent" />
              </div>

              {formError && (
                <div id="prov-form-error" className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-3 py-2.5 text-sm">⚠️ {formError}</div>
              )}

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={cerrarModal}
                  className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors">
                  Cancelar
                </button>
                <button id="btn-guardar-proveedor" type="submit" disabled={saving}
                  className="flex-1 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 disabled:bg-sky-300 text-white text-sm font-semibold transition-colors">
                  {saving ? 'Guardando...' : editId ? 'Guardar cambios' : 'Crear proveedor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
