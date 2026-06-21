// src/lib/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Inyecta el token JWT desde el AuthContext en cada petición.
 * El token debe ser pasado explícitamente porque no está en localStorage.
 * Uso: api.get('/ruta', { headers: { Authorization: `Bearer ${token}` } })
 *
 * Alternativamente, usa el helper withAuth(token) exportado abajo.
 */
export const withAuth = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export default api;
