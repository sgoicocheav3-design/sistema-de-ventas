import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import AuthLayout              from '../components/AuthLayout';
import LoginPage               from '../pages/LoginPage';
import DashboardPage           from '../pages/DashboardPage';
import UsuariosPage            from '../pages/admin/UsuariosPage';
import ProveedoresPage         from '../pages/admin/ProveedoresPage';
import ProductosPage           from '../pages/almacen/ProductosPage';
import PosPage                 from '../pages/pos/PosPage';
import HistorialEntradasPage   from '../pages/almacen/HistorialEntradasPage';
import HistorialBajasPage      from '../pages/almacen/HistorialBajasPage';

// ─── Componente de verificación de rol ──────────────────────────────────────
// Solo comprueba el rol; AuthLayout ya verificó la autenticación.
const RoleRoute = ({ roles, children }) => {
  const { usuario } = useAuth();
  if (roles && !roles.includes(usuario?.rol)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

// ─── Página de Unauthorized (inline, sin Layout) ─────────────────────────────
const UnauthorizedPage = () => {
  const { logout, usuario } = useAuth();
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-xl p-10 text-center max-w-sm">
        <p className="text-5xl mb-4">🚫</p>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Acceso denegado</h1>
        <p className="text-gray-500 text-sm mb-6">
          Tu rol <span className="font-semibold text-sky-600">({usuario?.rol})</span> no tiene permiso para esta sección.
        </p>
        <button onClick={() => { logout(); window.location.href = '/login'; }}
          className="px-5 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium transition-colors">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

// ─── Página placeholder para módulos en construcción ─────────────────────────
const Placeholder = ({ titulo }) => (
  <div className="p-8 text-center text-gray-400">
    <p className="text-4xl mb-3">🚧</p>
    <p className="font-semibold text-gray-600 text-lg">{titulo}</p>
    <p className="text-sm mt-1">Módulo en construcción</p>
  </div>
);

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ─── Rutas públicas ─────────────────────────────────────────────── */}
        <Route path="/login"        element={<LoginPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/"             element={<Navigate to="/login" replace />} />

        {/* ─── Rutas protegidas (dentro del Layout con sidebar) ───────────── */}
        <Route element={<AuthLayout />}>

          {/* ADMIN */}
          <Route path="/admin" element={
            <RoleRoute roles={['ADMIN']}><DashboardPage /></RoleRoute>
          } />
          <Route path="/admin/usuarios" element={
            <RoleRoute roles={['ADMIN']}><UsuariosPage /></RoleRoute>
          } />
          <Route path="/admin/proveedores" element={
            <RoleRoute roles={['ADMIN']}><ProveedoresPage /></RoleRoute>
          } />
          <Route path="/admin/categorias" element={
            <RoleRoute roles={['ADMIN']}><Placeholder titulo="Categorías" /></RoleRoute>
          } />

          {/* GERENTE */}
          <Route path="/gerente" element={
            <RoleRoute roles={['GERENTE', 'ADMIN']}><DashboardPage /></RoleRoute>
          } />
          <Route path="/gerente/reportes" element={
            <RoleRoute roles={['GERENTE', 'ADMIN']}><Placeholder titulo="Reportes" /></RoleRoute>
          } />

          {/* VENDEDOR */}
          <Route path="/pos" element={
            <RoleRoute roles={['VENDEDOR', 'ADMIN']}><PosPage /></RoleRoute>
          } />

          {/* ALMACENERO */}
          <Route path="/almacen" element={
            <RoleRoute roles={['ALMACENERO', 'ADMIN']}><DashboardPage /></RoleRoute>
          } />
          <Route path="/almacen/productos" element={
            <RoleRoute roles={['ALMACENERO', 'ADMIN']}><ProductosPage /></RoleRoute>
          } />
          <Route path="/almacen/entradas" element={
            <RoleRoute roles={['ALMACENERO', 'ADMIN']}><HistorialEntradasPage /></RoleRoute>
          } />
          <Route path="/almacen/bajas" element={
            <RoleRoute roles={['ALMACENERO', 'ADMIN']}><HistorialBajasPage /></RoleRoute>
          } />
          <Route path="/almacen/solicitudes" element={
            <RoleRoute roles={['ALMACENERO', 'ADMIN']}><Placeholder titulo="Solicitudes de Reposición" /></RoleRoute>
          } />

          {/* 404 dentro del layout */}
          <Route path="*" element={
            <div className="p-8 text-center text-gray-400">
              <p className="text-5xl mb-3">404</p>
              <p className="text-gray-500">Página no encontrada</p>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
