// src/routes/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';

/**
 * Protege una ruta verificando autenticación y (opcionalmente) rol.
 *
 * Props:
 *   - roles?: string[]  → Si se pasa, el usuario debe tener uno de esos roles
 *   - children: ReactNode
 *
 * Comportamiento:
 *   - No autenticado → redirige a /login
 *   - Autenticado pero sin rol permitido → redirige a /unauthorized
 *   - OK → renderiza children
 */
const PrivateRoute = ({ children, roles }) => {
  const { isAuthenticated, usuario } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(usuario?.rol)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
