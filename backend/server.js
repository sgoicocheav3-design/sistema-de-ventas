require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./src/middlewares/errorHandler.middleware');

const app = express();
const PORT = process.env.PORT || 4000;

// ─── Middlewares globales ────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Health check ────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/auth',              require('./src/routes/auth.routes'));
app.use('/api/dashboard',         require('./src/routes/dashboard.routes'));
app.use('/api/ventas',            require('./src/routes/ventas.routes'));
app.use('/api/admin/usuarios',    require('./src/routes/usuarios.routes'));
app.use('/api/admin/proveedores', require('./src/routes/proveedores.routes'));
app.use('/api/categorias',        require('./src/routes/categorias.routes'));
app.use('/api/almacen/productos', require('./src/routes/productos.routes'));
app.use('/api/almacen/entradas',  require('./src/routes/entradas.routes'));
app.use('/api/almacen/bajas',     require('./src/routes/bajas.routes'));
// app.use('/api/clientes',       require('./src/routes/clientes.routes'));
// app.use('/api/ventas',         require('./src/routes/ventas.routes'));
// app.use('/api/inventario',     require('./src/routes/inventario.routes'));
// app.use('/api/solicitudes',    require('./src/routes/solicitudes.routes'));
// app.use('/api/reportes',       require('./src/routes/reportes.routes'));
// app.use('/api/config',         require('./src/routes/config.routes'));
// app.use('/api/logs',           require('./src/routes/logs.routes'));

// ─── Error handler global (debe ser el último middleware) ────────────────────
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
