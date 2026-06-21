// src/middlewares/roles.middleware.js

/**
 * Fábrica de middleware para verificar que el usuario tenga uno de los roles permitidos.
 * @param {...string} roles - Roles permitidos (ADMIN, VENDEDOR, ALMACENERO, GERENTE)
 */
const requireRol = (...roles) => {
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

module.exports = { requireRol };
