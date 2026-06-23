-- =============================================
-- SCHEMA DE REFERENCIA — Sistema de Ventas
-- Gestionado vía Prisma ORM (prisma/schema.prisma)
-- Este archivo es solo referencia documental.
-- =============================================

CREATE TABLE IF NOT EXISTS categorias (
  id      SERIAL PRIMARY KEY,
  nombre  VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS usuarios (
  id             SERIAL PRIMARY KEY,
  nombre         VARCHAR(100) NOT NULL,
  email          VARCHAR(150) NOT NULL UNIQUE,
  password_hash  VARCHAR(255) NOT NULL,
  rol            VARCHAR(20) NOT NULL,
  activo         BOOLEAN DEFAULT true,
  intentos_fallidos INTEGER DEFAULT 0,
  bloqueado_hasta  TIMESTAMP,
  reset_token_hash TEXT,
  reset_expiry    TIMESTAMP,
  reset_used      BOOLEAN DEFAULT false,
  created_at     TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS log_accesos (
  id          SERIAL PRIMARY KEY,
  usuario_id  INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
  email       VARCHAR(150),
  accion      VARCHAR(20) NOT NULL,
  ip          VARCHAR(45),
  user_agent  TEXT,
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS proveedores (
  id         SERIAL PRIMARY KEY,
  nombre     VARCHAR(150) NOT NULL,
  ruc        VARCHAR(11) NOT NULL UNIQUE,
  contacto   VARCHAR(150),
  email      VARCHAR(150),
  telefono   VARCHAR(20),
  activo     BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS productos (
  id            SERIAL PRIMARY KEY,
  codigo        VARCHAR(50) NOT NULL UNIQUE,
  nombre        VARCHAR(200) NOT NULL,
  marca         VARCHAR(100),
  categoria_id  INTEGER REFERENCES categorias(id) ON DELETE SET NULL,
  precio        NUMERIC(10,2) NOT NULL CHECK (precio > 0),
  stock         INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  fecha_vencimiento TIMESTAMP,
  activo        BOOLEAN DEFAULT true,
  created_at    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS proveedores_productos (
  proveedor_id  INTEGER NOT NULL REFERENCES proveedores(id) ON DELETE CASCADE,
  producto_id   INTEGER NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  PRIMARY KEY (proveedor_id, producto_id)
);

CREATE TABLE IF NOT EXISTS ventas (
  id               SERIAL PRIMARY KEY,
  numero           VARCHAR(20) NOT NULL UNIQUE,
  usuario_id       INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
  cliente_id       INTEGER REFERENCES clientes(id) ON DELETE SET NULL,
  subtotal         NUMERIC(12,2) NOT NULL,
  igv              NUMERIC(12,2) NOT NULL,
  total            NUMERIC(10,2) NOT NULL CHECK (total >= 0),
  metodo_pago      VARCHAR(10) NOT NULL,
  monto_recibido   NUMERIC(10,2) DEFAULT 0,
  vuelto           NUMERIC(10,2) DEFAULT 0,
  estado           VARCHAR(15) DEFAULT 'COMPLETADA',
  pago_id          VARCHAR(100) UNIQUE,
  qr_data          TEXT,
  fecha            TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS detalle_venta (
  id               SERIAL PRIMARY KEY,
  venta_id         INTEGER NOT NULL REFERENCES ventas(id) ON DELETE CASCADE,
  producto_id      INTEGER NOT NULL REFERENCES productos(id) ON DELETE RESTRICT,
  cantidad         INTEGER NOT NULL CHECK (cantidad > 0),
  precio_unitario  NUMERIC(10,2) NOT NULL CHECK (precio_unitario > 0),
  subtotal         NUMERIC(10,2) NOT NULL
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_productos_categoria  ON productos(categoria_id);
CREATE INDEX IF NOT EXISTS idx_productos_activo     ON productos(activo);
CREATE INDEX IF NOT EXISTS idx_productos_nombre     ON productos(nombre);
CREATE INDEX IF NOT EXISTS idx_ventas_usuario       ON ventas(usuario_id);
CREATE INDEX IF NOT EXISTS idx_ventas_fecha         ON ventas(fecha);
CREATE INDEX IF NOT EXISTS idx_detalle_venta_id     ON detalle_venta(venta_id);
CREATE INDEX IF NOT EXISTS idx_log_accesos_usuario  ON log_accesos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_prov_productos       ON proveedores_productos(producto_id);
