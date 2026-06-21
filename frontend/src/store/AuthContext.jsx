// src/store/AuthContext.jsx
// Token guardado SOLO en memoria (estado React), NO en localStorage.
// Al recargar la página, el usuario deberá volver a hacer login.
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,       // JWT en memoria
    usuario: null,     // { id, nombre, rol }
  });

  const login = (token, usuario) => {
    setAuth({ token, usuario });
  };

  const logout = () => {
    setAuth({ token: null, usuario: null });
  };

  const isAuthenticated = !!auth.token;

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
};
