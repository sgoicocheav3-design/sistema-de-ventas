// src/components/AuthLayout.jsx
// Wrapper que protege todas las rutas anidadas (verifica isAuthenticated)
// y envuelve con el Layout visual.
import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import Layout from './Layout';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Layout />;
}
