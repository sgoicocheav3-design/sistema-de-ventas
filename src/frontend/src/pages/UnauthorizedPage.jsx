// src/pages/UnauthorizedPage.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';

export default function UnauthorizedPage() {
  const navigate = useNavigate();
  const { logout, usuario } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-3xl font-bold text-white mb-2">Acceso denegado</h1>
        <p className="text-slate-400 mb-6">
          Tu rol <span className="text-indigo-400 font-semibold">({usuario?.rol})</span> no tiene permiso para acceder a esta sección.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            id="btn-volver"
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors"
          >
            Volver
          </button>
          <button
            id="btn-logout-unauthorized"
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
