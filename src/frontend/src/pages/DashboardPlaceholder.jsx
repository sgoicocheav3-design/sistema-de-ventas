// src/pages/DashboardPlaceholder.jsx
// Página temporal para roles que aún no tienen vista completa.
// Se reemplazará con el dashboard real de cada módulo.
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';

const ROL_INFO = {
  ADMIN:      { emoji: '👑', titulo: 'Panel Administrador', color: 'text-purple-400' },
  GERENTE:    { emoji: '📊', titulo: 'Panel Gerencia',      color: 'text-blue-400' },
  VENDEDOR:   { emoji: '🏪', titulo: 'Punto de Venta',      color: 'text-green-400' },
  ALMACENERO: { emoji: '📦', titulo: 'Gestión de Almacén',  color: 'text-amber-400' },
};

export default function DashboardPlaceholder() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const info = ROL_INFO[usuario?.rol] || { emoji: '🛒', titulo: 'Dashboard', color: 'text-indigo-400' };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-6xl mb-4">{info.emoji}</div>
        <h1 className={`text-3xl font-bold mb-1 ${info.color}`}>{info.titulo}</h1>
        <p className="text-slate-400 mb-1">Bienvenido, <span className="text-white font-medium">{usuario?.nombre}</span></p>
        <p className="text-slate-600 text-sm mb-8">Esta sección está en construcción</p>

        {usuario?.rol === 'ADMIN' && (
          <button
            id="btn-ir-usuarios"
            onClick={() => navigate('/admin/usuarios')}
            className="mb-4 block mx-auto px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
          >
            Gestión de Usuarios →
          </button>
        )}

        <button
          id="btn-logout-dashboard"
          onClick={handleLogout}
          className="px-5 py-2.5 rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-800 transition-colors text-sm"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
