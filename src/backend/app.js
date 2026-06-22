require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./src/middlewares/errorHandler.middleware');
const { setupSwagger } = require('./src/swagger');
const { startBackupCron } = require('./src/jobs/backupJob');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4000',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (curl, mobile apps, same-origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    return callback(new Error(`CORS bloqueado para origen: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Handle preflight requests explicitly
app.options('*', cors());

app.use(express.json());

setupSwagger(app);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth',              require('./src/routes/auth.routes'));
app.use('/api/dashboard',         require('./src/routes/dashboard.routes'));
app.use('/api/ventas',            require('./src/routes/ventas.routes'));
app.use('/api/admin/usuarios',    require('./src/routes/usuarios.routes'));
app.use('/api/admin/proveedores', require('./src/routes/proveedores.routes'));
app.use('/api/admin/config',      require('./src/routes/config.routes'));
app.use('/api/admin/backups',     require('./src/routes/backup.routes'));
app.use('/api/categorias',        require('./src/routes/categorias.routes'));
app.use('/api/almacen/productos', require('./src/routes/productos.routes'));
app.use('/api/almacen/entradas',  require('./src/routes/entradas.routes'));
app.use('/api/almacen/bajas',     require('./src/routes/bajas.routes'));
app.use('/api/almacen/solicitudes',  require('./src/routes/solicitudes.routes'));
app.use('/api/almacen/recepciones',  require('./src/routes/recepciones.routes'));
app.use('/api/gerencia/solicitudes', require('./src/routes/gerencia-solicitudes.routes'));
app.use('/api/clientes',             require('./src/routes/clientes.routes'));
app.use('/api/gerencia/dashboard',   require('./src/routes/gerencia-dashboard.routes'));
app.use('/api/admin/reportes',       require('./src/routes/reportes.routes'));
app.use('/api/gerencia/reportes',    require('./src/routes/gerencia-reportes.routes'));
app.use('/api/gerencia/auditoria',   require('./src/routes/auditoria.routes'));

app.use(errorHandler);

startBackupCron();

module.exports = app;
