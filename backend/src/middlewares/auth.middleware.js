// src/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

/**
 * Extrae y verifica el JWT del header Authorization: Bearer <token>
 * Adjunta req.user = { id, rol, nombre } a la request.
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, rol: decoded.rol, nombre: decoded.nombre };
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

/**
 * Fábrica de middleware de roles.
 * Lanza 403 si req.user.rol no está en el array de roles permitidos.
 * @param {string[]} roles - Roles permitidos, e.g. ['ADMIN', 'GERENTE']
 */
const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'No autenticado' });
    }
    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({
        message: `Acceso denegado. Se requiere uno de: ${roles.join(', ')}`,
      });
    }
    next();
  };
};

module.exports = { authMiddleware, roleMiddleware };
