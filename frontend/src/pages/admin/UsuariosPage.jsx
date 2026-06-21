// src/pages/admin/UsuariosPage.jsx
import { useEffect, useState } from 'react';
import { UserPlus, Pencil, UserX } from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import api, { withAuth } from '../../lib/axios';

const ROLES = ['ADMIN', 'GERENTE', 'VENDEDOR', 'ALMACENERO'];

const ROL_BADGE = {
  ADMIN:      'bg-purple-100 text-purple-700',
  GERENTE:    'bg-sky-100 text-sky-700',
  VENDEDOR:   'bg-emerald-100 text-emerald-700',
  ALMACENERO: 'bg-amber-100 text-amber-700',
};

const EMPTY_FORM = { nombre: '', email: '', password: '', rol: 'VENDEDOR' };

export default function UsuariosPage() {
  const { token, usuario: me } = useAuth();

  const [usuarios,  setUsuarios]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState('');

  const [modal,     setModal]     = useState(false);
  const [editId,    setEditId]    = useState(null);
  const [form,      setForm]      = useState(EMPTY_FORM);
  const [formError, setFormError] = useState('');
  const [saving,    setSaving]    = useState(false);

  // ─── Fetch ────────────────────────────────────────────────────────────────
  const fetchUsuarios = async () => {
    setLoading(true); setError('');
    try {
      const { data } = await api.get('/admin/usuarios', withAuth(token));
      setUsuarios(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar usuarios');
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchUsuarios(); }, []);

  // ─── Modal helpers ────────────────────────────────────────────────────────
  const abrirCrear = () => { setEditId(null); setForm(EMPTY_FORM); setFormError(''); setModal(true); };
  const abrirEditar = (u) => { setEditId(u.id); setForm({ nombre: u.nombre, email: u.email, password: '', rol: u.rol }); setFormError(''); setModal(true); };
  const cerrarModal = () => { setModal(false); setFormError(''); };

  const handleGuardar = async (e) => {
    e.preventDefault(); setSaving(true); setFormError('');
    try {
      if (editId) {
        await api.put(`/admin/usuarios/${editId}`, { nombre: form.nombre, email: form.email, rol: form.rol }, withAuth(token));
      } else {
        if (!form.password) { setFormError('La contraseña es requerida'); return; }
        await api.post('/admin/usuarios', form, withAuth(token));
      }
      await fetchUsuarios(); cerrarModal();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Error al guardar');
    } finally { setSaving(false); }
  };

  const handleDesactivar = async (id, nombre) => {
    if (!confirm(`¿Desactivar a "${nombre}"?`)) return;
    try {
      await api.delete(`/admin/usuarios/${id}`, withAuth(token));
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (err) { alert(err.response?.data?.message || 'Error'); }
  };

  return (
    <div className="p-5">
      {/* Page header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Usuarios</h1>
          <p className="text-gray-500 text-sm mt-0.5">Gestión de accesos al sistema</p>
        </div>
        <button
          id="btn-crear-usuario"
          onClick={abrirCrear}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium transition-colors"
        >
          <UserPlus size={15} /> Nuevo usuario
        </button>
      </div>

      {/* Error */}
      {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">{error}</div>}

      {/* Table card */}
      <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400 text-sm">Cargando...</div>
        ) : (
          <table className="w-full text-sm" id="tabla-usuarios">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['ID','Nombre','Correo electrónico','Rol','Creado','Acciones'].map((h) => (
                  <th key={h} className={`px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide ${h === 'Acciones' ? 'text-right' : 'text-left'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {usuarios.length === 0 && (
                <tr><td colSpan={6} className="text-center text-gray-400 py-12">No hay usuarios activos</td></tr>
              )}
              {usuarios.map((u) => (
                <tr key={u.id} id={`usuario-row-${u.id}`} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-400 text-xs">#{u.id}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{u.nombre}</td>
                  <td className="px-4 py-3 text-gray-600">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${ROL_BADGE[u.rol]}`}>{u.rol}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{new Date(u.creadoEn).toLocaleDateString('es-PE')}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button id={`btn-editar-${u.id}`} onClick={() => abrirEditar(u)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
                        <Pencil size={12} /> Editar
                      </button>
                      {u.id !== me?.id && (
                        <button id={`btn-desactivar-${u.id}`} onClick={() => handleDesactivar(u.id, u.nombre)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors">
                          <UserX size={12} /> Desactivar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ─── Modal ───────────────────────────────────────────────────────────── */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) cerrarModal(); }}
          id="modal-usuario">
          <div className="bg-white border border-gray-200 rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h2 className="text-base font-bold text-gray-900" id="modal-titulo">
                {editId ? 'Editar usuario' : 'Nuevo usuario'}
              </h2>
              <button id="btn-cerrar-modal" onClick={cerrarModal} className="text-gray-400 hover:text-gray-600 transition-colors text-lg">✕</button>
            </div>

            <form onSubmit={handleGuardar} id="form-usuario" className="p-5 space-y-4">
              {[
                { id: 'input-nombre',   label: 'Nombre completo', type: 'text',     key: 'nombre',   placeholder: 'Juan Pérez' },
                { id: 'input-email',    label: 'Correo',          type: 'email',    key: 'email',    placeholder: 'juan@minimarket.com' },
                ...(!editId ? [{ id: 'input-password', label: 'Contraseña', type: 'password', key: 'password', placeholder: 'Mínimo 6 caracteres' }] : []),
              ].map((f) => (
                <div key={f.id} className="space-y-1">
                  <label htmlFor={f.id} className="block text-sm font-medium text-gray-700">{f.label}</label>
                  <input
                    id={f.id} type={f.type} required
                    value={form[f.key]}
                    onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
              ))}

              <div className="space-y-1">
                <label htmlFor="select-rol" className="block text-sm font-medium text-gray-700">Rol</label>
                <select id="select-rol" value={form.rol} onChange={(e) => setForm((p) => ({ ...p, rol: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent appearance-none">
                  {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              {formError && (
                <div id="form-error" className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-lg px-3 py-2.5 text-sm">
                  ⚠️ {formError}
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={cerrarModal}
                  className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
                  Cancelar
                </button>
                <button id="btn-guardar-usuario" type="submit" disabled={saving}
                  className="flex-1 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 disabled:bg-sky-300 text-white text-sm font-semibold transition-colors">
                  {saving ? 'Guardando...' : editId ? 'Guardar cambios' : 'Crear usuario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
