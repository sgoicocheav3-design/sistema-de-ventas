// src/middlewares/errorHandler.middleware.js

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';

  if (process.env.NODE_ENV !== 'production') {
    console.error(`[ERROR] ${status} - ${message}`);
    if (err.stack) console.error(err.stack);
  }

  res.status(status).json({ message });
};

module.exports = { errorHandler };
