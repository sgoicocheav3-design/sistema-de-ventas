# 🤖 PROMPT MAESTRO — OpenCode: Sistema de Ventas SPRINT 1 (FUNDACIÓN)
> Repositorio: https://github.com/sgoicocheav3-design/sistema-de-ventas/tree/master

---

## ⚠️ INSTRUCCIONES CRÍTICAS — LEE ESTO COMPLETO ANTES DE TOCAR CUALQUIER ARCHIVO

Este es el **Sprint 1 — Sprint de Fundación**. Los Sprints 2 y 3 ya están implementados y dependen íntegramente de la arquitectura y base de datos que se define aquí. Eso significa que **partes del Sprint 1 ya existen en el repositorio**. Tu trabajo es:

1. **Identificar qué ya está implementado** y verificar que cumple la especificación de este documento.
2. **Implementar únicamente lo que falta**, sin romper lo que ya funciona.

### Primera acción OBLIGATORIA (ejecutar antes de escribir código):

```bash
# 1. Ver estructura completa del proyecto
find . -type f | grep -v node_modules | grep -v .git | grep -v ".next" | grep -v dist | head -120

# 2. Leer el stack
cat package.json            # O requirements.txt / pyproject.toml
cat tsconfig.json 2>/dev/null || true

# 3. Encontrar archivos de esquema o migraciones
find . -name "*.sql" -o -name "schema*" -o -name "migrate*" -o -name "prisma*" | grep -v node_modules

# 4. Revisar tablas ya existentes en BD (ajustar según el motor de BD del proyecto)
# PostgreSQL: \dt   o   SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
# SQLite:      .tables
# MySQL:        SHOW TABLES;

# 5. Leer TODAS las rutas ya existentes
find . -name "*.routes.*" -o -name "*.router.*" | grep -v node_modules
cat src/index.js 2>/dev/null || cat src/app.js 2>/dev/null || cat main.py 2>/dev/null || true
```

### Reglas de oro inamovibles:

1. **NUNCA recrear una tabla que ya existe** — usa `ALTER TABLE … ADD COLUMN IF NOT EXISTS`
2. **NUNCA editar un archivo existente sin leerlo completo primero**
3. **NUNCA hardcodear secretos** (JWT_SECRET, DB_PASSWORD, etc.) — solo en `.env`
4. **SIEMPRE usar transacciones atómicas** en operaciones que tocan stock o ventas
5. **Implementar de forma incremental**: backend completo + frontend + tests de una HU antes de pasar a la siguiente
6. Los Sprints 2 y 3 usan las tablas `usuarios`, `productos`, `proveedores`, `ventas`, `detalle_venta` con los nombres y columnas EXACTOS de este documento — **no los cambies**

### Sobre HUs ya verificadas (marcadas en ROJO en el tablero):
Para las HUs ya verificadas: **lee el código existente** y confirma que cumple cada criterio de aceptación de este documento. Si algo falta, agrégalo. NO reimplementes desde cero.  
Para las HUs pendientes: impleméntalas siguiendo esta especificación al pie de la letra.

---

## 📦 CONTEXTO DEL PROYECTO

Sistema de Ventas con **4 roles**: Administrador, Almacenero, Gerente, Vendedor.  
Sprint activo: **Sprint 1**. Épicas: EP-01, EP-02, EP-03, EP-04, EP-06.  
Este sprint crea el **núcleo completo**: autenticación, usuarios, proveedores, catálogo de productos y punto de venta (POS) básico con métodos de pago.

---

## 📋 ORDEN DE IMPLEMENTACIÓN (respétalo — hay dependencias críticas)

```
1. HU-01 (Highest) → Auth + tabla usuarios + JWT + roles         ← FUNDACIÓN: todo depende de aquí
2. HU-03 (Highest) → CRUD de usuarios (Admin)                    ← Depende de HU-01 (tabla usuarios)
3. HU-10 (High)    → CRUD de proveedores                         ← Depende de HU-01 (auth middleware)
4. HU-04 (Highest) → CRUD de productos + catálogo                ← Depende de HU-10 (relación proveedor-producto)
5. HU-16 (Highest) → Selector método de pago                     ← Define el schema de la tabla ventas
6. HU-15 (Highest) → Registro de ventas + POS                    ← Depende de HU-04 (stock) y HU-16 (metodo_pago)
```

---

## 🗄️ SCHEMA COMPLETO — BASE DE DATOS SPRINT 1

> Ejecutar los scripts en este orden exacto. Cada uno en su propio archivo de migración.

```sql
-- =============================================
-- MIGRACIÓN 001: categorias
-- (necesaria para productos.categoria_id)
-- =============================================
CREATE TABLE IF NOT EXISTS categorias (
  id      SERIAL PRIMARY KEY,
  nombre  VARCHAR(100) NOT NULL UNIQUE,
  activo  BOOLEAN DEFAULT true
);

-- Datos iniciales (ajustar al rubro del negocio):
INSERT INTO categorias (nombre) VALUES
  ('Electrónica'), ('Ropa'), ('Alimentos'), ('Herramientas'),
  ('Limpieza'), ('Papelería'), ('Bebidas'), ('Otros')
ON CONFLICT (nombre) DO NOTHING;

-- =============================================
-- MIGRACIÓN 002: usuarios
-- =============================================
CREATE TABLE IF NOT EXISTS usuarios (
  id             SERIAL PRIMARY KEY,
  nombre         VARCHAR(100) NOT NULL,
  email          VARCHAR(150) NOT NULL UNIQUE,
  password_hash  VARCHAR(255) NOT NULL,
  rol            VARCHAR(20)  NOT NULL
                   CHECK (rol IN ('Administrador', 'Almacenero', 'Gerente', 'Vendedor')),
  activo         BOOLEAN DEFAULT true,
  created_at     TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- MIGRACIÓN 003: log_accesos
-- =============================================
CREATE TABLE IF NOT EXISTS log_accesos (
  id          SERIAL PRIMARY KEY,
  usuario_id  INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
  email       VARCHAR(150),   -- guardar email incluso en logins fallidos
  accion      VARCHAR(20) NOT NULL
                CHECK (accion IN ('LOGIN_OK', 'LOGIN_FAIL', 'LOGOUT')),
  ip          VARCHAR(45),
  user_agent  TEXT,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- MIGRACIÓN 004: proveedores
-- =============================================
CREATE TABLE IF NOT EXISTS proveedores (
  id         SERIAL PRIMARY KEY,
  nombre     VARCHAR(150) NOT NULL,
  ruc        VARCHAR(11)  NOT NULL UNIQUE,  -- RUC peruano 11 dígitos
  contacto   VARCHAR(150),
  email      VARCHAR(150),
  telefono   VARCHAR(20),
  activo     BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- MIGRACIÓN 005: productos
-- =============================================
CREATE TABLE IF NOT EXISTS productos (
  id            SERIAL PRIMARY KEY,
  nombre        VARCHAR(200) NOT NULL UNIQUE,
  marca         VARCHAR(100),
  categoria_id  INTEGER REFERENCES categorias(id) ON DELETE SET NULL,
  precio        NUMERIC(10,2) NOT NULL CHECK (precio > 0),
  stock         INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  activo        BOOLEAN DEFAULT true,
  created_at    TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- MIGRACIÓN 006: proveedores_productos (N:M)
-- =============================================
CREATE TABLE IF NOT EXISTS proveedores_productos (
  proveedor_id  INTEGER NOT NULL REFERENCES proveedores(id) ON DELETE CASCADE,
  producto_id   INTEGER NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  PRIMARY KEY (proveedor_id, producto_id)
);

-- =============================================
-- MIGRACIÓN 007: ventas
-- =============================================
CREATE TABLE IF NOT EXISTS ventas (
  id               SERIAL PRIMARY KEY,
  usuario_id       INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
  total            NUMERIC(10,2) NOT NULL CHECK (total >= 0),
  metodo_pago      VARCHAR(10) NOT NULL
                     CHECK (metodo_pago IN ('Efectivo', 'Yape', 'Plin')),
  monto_recibido   NUMERIC(10,2),  -- solo para Efectivo
  estado           VARCHAR(15) DEFAULT 'Completada'
                     CHECK (estado IN ('Completada', 'Cancelada')),
  fecha            TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- MIGRACIÓN 008: detalle_venta
-- =============================================
CREATE TABLE IF NOT EXISTS detalle_venta (
  id               SERIAL PRIMARY KEY,
  venta_id         INTEGER NOT NULL REFERENCES ventas(id) ON DELETE CASCADE,
  producto_id      INTEGER NOT NULL REFERENCES productos(id) ON DELETE RESTRICT,
  cantidad         INTEGER NOT NULL CHECK (cantidad > 0),
  precio_unitario  NUMERIC(10,2) NOT NULL CHECK (precio_unitario > 0),
  subtotal         NUMERIC(10,2) NOT NULL  -- calcular en app: cantidad * precio_unitario
);

-- =============================================
-- ÍNDICES DE PERFORMANCE
-- =============================================
CREATE INDEX IF NOT EXISTS idx_productos_categoria  ON productos(categoria_id);
CREATE INDEX IF NOT EXISTS idx_productos_activo     ON productos(activo);
CREATE INDEX IF NOT EXISTS idx_productos_nombre     ON productos(nombre);
CREATE INDEX IF NOT EXISTS idx_ventas_usuario       ON ventas(usuario_id);
CREATE INDEX IF NOT EXISTS idx_ventas_fecha         ON ventas(fecha);
CREATE INDEX IF NOT EXISTS idx_detalle_venta_id     ON detalle_venta(venta_id);
CREATE INDEX IF NOT EXISTS idx_log_accesos_usuario  ON log_accesos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_prov_productos       ON proveedores_productos(producto_id);
```

---

## 🏗️ HISTORIAS DE USUARIO — ESPECIFICACIÓN COMPLETA

---

### ✅ HU-01 | EP-01 | SP: 5 | Prioridad: HIGHEST

**Enunciado:**  
Como Usuario del sistema, quiero iniciar sesión con mis credenciales y acceder únicamente a las funciones de mi rol, para garantizar el acceso seguro y diferenciado al sistema.

**Criterios de Aceptación (implementa TODOS):**

- [ ] DADO usuario con credenciales válidas CUANDO inicia sesión ENTONCES el sistema redirige al panel correspondiente a su rol Y registra el evento en `log_accesos` con accion `'LOGIN_OK'`.
- [ ] DADO credenciales incorrectas (email no existe o contraseña incorrecta) CUANDO intenta iniciar sesión ENTONCES muestra el mensaje `"Credenciales incorrectas"` (mismo mensaje para ambos casos — no revelar cuál falló) Y registra `'LOGIN_FAIL'` en `log_accesos`.
- [ ] DADO usuario sin permiso CUANDO accede directamente a una ruta restringida ENTONCES el middleware redirige con mensaje `"Acceso no autorizado"` sin mostrar contenido de esa ruta.

**Tareas Técnicas:**

```
-- BACKEND

1. Configuración de variables de entorno (archivo .env):
   JWT_SECRET=tu_secreto_aleatorio_muy_largo
   JWT_EXPIRES_IN=8h
   BCRYPT_ROUNDS=10

2. Endpoint de login:
POST /auth/login
  Body: { email, password }
  - Buscar usuario por email en tabla usuarios
  - Si no existe O activo=false: responder HTTP 401 { error: "Credenciales incorrectas" }
  - Si existe: comparar password con bcrypt.compare(password, usuario.password_hash)
  - Si no coincide: HTTP 401 { error: "Credenciales incorrectas" }
  - Si coincide: 
      a) Generar JWT: { id, nombre, email, rol } firmado con JWT_SECRET, expira en 8h
      b) INSERT en log_accesos (usuario_id, email, accion='LOGIN_OK', ip, user_agent)
      c) Responder: { token, usuario: { id, nombre, email, rol } }
  - En caso de error: INSERT log_accesos (email, accion='LOGIN_FAIL', ip)

3. Endpoint de logout:
POST /auth/logout
  - Registrar en log_accesos (usuario_id, accion='LOGOUT')
  - Responder 200 OK
  - (El token se invalida en el frontend borrando del localStorage/cookie)

4. Middleware de autenticación (aplicar a TODAS las rutas protegidas):
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];  // Bearer TOKEN
  if (!token) return res.status(401).json({ error: 'Token requerido' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;  // { id, nombre, email, rol }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

5. Middleware de autorización por rol (usar en rutas específicas):
function requireRol(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.usuario?.rol)) {
      return res.status(403).json({ error: 'Acceso no autorizado' });
    }
    next();
  };
}

// Ejemplo de uso:
router.get('/admin/usuarios', authMiddleware, requireRol('Administrador'), controller.listar);
router.post('/almacen/productos', authMiddleware, requireRol('Administrador', 'Almacenero'), controller.crear);

6. Script de seeder — usuario administrador inicial:
// Ejecutar UNA VEZ al inicializar el proyecto (no al arrancar el servidor)
const hash = await bcrypt.hash('Admin123!', 10);
await db.query(
  "INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING",
  ['Administrador', 'admin@sistema.com', hash, 'Administrador']
);
console.log('Usuario admin creado: admin@sistema.com / Admin123!');
console.log('⚠️  CAMBIAR CONTRASEÑA DESPUÉS DEL PRIMER LOGIN');
```

```
-- FRONTEND

Formulario de Login:
  - Campo: email (type="email", requerido)
  - Campo: contraseña (type="password", requerido)
  - Botón "Iniciar sesión"
  - Link "¿Olvidaste tu contraseña?" → abre flujo de recuperación (HU-02, Sprint 3)
  - Validación frontend: ambos campos no vacíos antes de enviar
  - Al hacer submit → POST /auth/login
  - En éxito: guardar token en localStorage (key: 'auth_token') y usuario en estado global
  - Redirección según rol:
      Administrador → /admin/usuarios
      Almacenero    → /almacen/inventario
      Gerente       → /gerencia/solicitudes
      Vendedor      → /pos/venta
  - En error: mostrar mensaje de error bajo el formulario (no un alert)

Protección de rutas en frontend (React):
  function ProtectedRoute({ roles, children }) {
    const usuario = getUsuarioFromToken();  // decodificar JWT del localStorage
    if (!usuario) return <Navigate to="/login" />;
    if (roles && !roles.includes(usuario.rol)) return <Navigate to="/no-autorizado" />;
    return children;
  }

  // Uso:
  <Route path="/admin/*" element={<ProtectedRoute roles={['Administrador']}><AdminLayout /></ProtectedRoute>} />
  <Route path="/almacen/*" element={<ProtectedRoute roles={['Administrador','Almacenero']}><AlmacenLayout /></ProtectedRoute>} />
  <Route path="/gerencia/*" element={<ProtectedRoute roles={['Gerente','Administrador']}><GerenciaLayout /></ProtectedRoute>} />
  <Route path="/pos/*" element={<ProtectedRoute roles={['Vendedor','Administrador']}><PosLayout /></ProtectedRoute>} />
```

**Definición de Hecho:**
- Login exitoso redirige al panel correcto según rol
- Credenciales incorrectas muestran mensaje genérico (no revela cuál campo falló)
- Ruta restringida redirige con mensaje de acceso no autorizado
- Todos los logins (exitosos y fallidos) quedan registrados en `log_accesos`
- Middleware probado con los 4 roles
- JWT expira en 8 horas
- JWT_SECRET nunca está hardcodeado en el código

---

### ✅ HU-03 | EP-02 | SP: 5 | Prioridad: HIGHEST

**Enunciado:**  
Como Administrador, quiero crear, editar, asignar roles y eliminar cuentas de usuario, para garantizar el acceso diferenciado y seguro al sistema.

**Criterios de Aceptación (implementa TODOS):**

- [ ] DADO formulario completo con nombre, email, rol y contraseña CUANDO guarda ENTONCES el sistema crea el usuario con rol asignado, aparece en la lista activa y se puede loguear.
- [ ] DADO campos obligatorios vacíos (nombre, email, rol, contraseña) CUANDO intenta guardar ENTONCES muestra mensajes de validación por cada campo vacío y bloquea el guardado.
- [ ] DADO usuario existente CUANDO el Administrador hace clic en eliminar y confirma ENTONCES el sistema desactiva la cuenta (`activo = false`) SIN borrar el registro en BD (soft delete). El usuario no puede loguearse pero sus datos históricos se preservan.

**Tareas Técnicas:**

```
-- BACKEND (todas las rutas protegidas: authMiddleware + requireRol('Administrador'))

GET /admin/usuarios
  - Lista todos los usuarios (incluyendo inactivos, mostrar estado)
  - Filtrar por ?activo=true/false opcional
  - No devolver password_hash en la respuesta
  - Ordenar por created_at DESC

POST /admin/usuarios
  Body: { nombre, email, password, rol }
  - Validar: nombre requerido, email válido y único, password mínimo 6 caracteres, rol válido
  - Si email ya existe: HTTP 409 { error: "El email ya está registrado" }
  - Hashear password: bcrypt.hash(password, 10)
  - INSERT en usuarios
  - Responder: usuario creado (sin password_hash)

PUT /admin/usuarios/:id
  Body: { nombre, email, rol, activo, password? }  ← password solo si se quiere cambiar
  - Validar mismos campos que POST
  - Si email cambia, verificar que no existe en otro usuario
  - Si viene password: hashear con bcrypt antes de guardar
  - UPDATE usuarios SET ... WHERE id = :id
  - Responder: usuario actualizado

DELETE /admin/usuarios/:id   ← SOFT DELETE (no borrar)
  - Verificar que :id no es el propio usuario autenticado (un admin no puede eliminarse a sí mismo)
  - UPDATE usuarios SET activo = false WHERE id = :id
  - Responder: { message: "Usuario desactivado correctamente" }

⚠️ IMPORTANTE: Nunca devolver el campo password_hash en ninguna respuesta.
```

```
-- FRONTEND

Módulo "Gestión de Usuarios" (/admin/usuarios):
  - Solo accesible para rol Administrador

  TABLA de usuarios:
    Columnas: Nombre | Email | Rol | Estado (Activo/Inactivo) | Acciones
    - Badge de color por rol (Administrador=rojo, Almacenero=azul, Gerente=morado, Vendedor=verde)
    - Botones por fila: [Editar ✏️] [Desactivar 🗑️]
    - Botón principal: [+ Nuevo Usuario]

  MODAL de crear/editar usuario:
    Campos:
      - Nombre (texto, requerido)
      - Email (email, requerido, único)
      - Rol (select: Administrador | Almacenero | Gerente | Vendedor, requerido)
      - Contraseña (requerida al crear; opcional al editar — dejar vacío = no cambiar)
      - Confirmar contraseña (validar que coincida)
    Botones: [Cancelar] [Guardar]
    Validaciones en tiempo real antes de enviar:
      - Nombre no vacío
      - Email válido (formato)
      - Contraseña mínimo 6 caracteres
      - Contraseñas coinciden

  CONFIRMACIÓN de desactivación:
    - Modal de confirmación: "¿Seguro que deseas desactivar a [Nombre]? No podrá iniciar sesión."
    - Botones: [Cancelar] [Sí, desactivar]
    - Tras confirmar → PUT con activo=false → actualizar tabla sin recargar página
```

**Definición de Hecho:**
- CRUD completo funcional (crear, editar, desactivar)
- Soft delete implementado: usuario desactivado no puede loguearse (validado en HU-01)
- Validaciones de frontend y backend activas para todos los campos
- Email único validado en backend (HTTP 409 si duplicado)
- Password nunca expuesto en respuestas de API
- Solo el rol Administrador puede acceder al módulo

---

### ✅ HU-10 | EP-04 | SP: 5 | Prioridad: HIGH

**Enunciado:**  
Como Administrador, quiero registrar, editar y eliminar proveedores (nombre, RUC, contacto), para mantener actualizada la base de proveedores vinculada al inventario.

**Criterios de Aceptación (implementa TODOS):**

- [ ] DADO datos completos (nombre y RUC mínimo) CUANDO guarda ENTONCES confirma registro, añade el proveedor a la lista activa con ID único y está disponible para vincularse a productos.
- [ ] DADO campos obligatorios vacíos (nombre o RUC) CUANDO intenta guardar ENTONCES muestra validaciones por campo y bloquea el guardado.
- [ ] DADO proveedor a eliminar CUANDO el Administrador confirma la eliminación ENTONCES aplica soft delete (`activo = false`) y los productos que tenían ese proveedor vinculado **conservan sus datos** (la relación en `proveedores_productos` permanece pero el proveedor aparece como inactivo).

**Tareas Técnicas:**

```
-- BACKEND (rutas protegidas: authMiddleware + requireRol('Administrador', 'Almacenero'))

GET /admin/proveedores
  - Lista todos los proveedores activos (activo=true por defecto)
  - Aceptar ?activo=false para ver inactivos
  - Incluir conteo de productos vinculados por proveedor (JOIN con proveedores_productos)
  - Ordenar por nombre ASC

POST /admin/proveedores
  Body: { nombre, ruc, contacto?, email?, telefono? }
  - Validar: nombre requerido, ruc requerido y único (11 dígitos numéricos)
  - Si ruc ya existe: HTTP 409 { error: "El RUC ya está registrado" }
  - INSERT en proveedores
  - Responder: proveedor creado

PUT /admin/proveedores/:id
  Body: { nombre, ruc, contacto?, email?, telefono?, activo? }
  - Validar nombre y ruc requeridos
  - Si ruc cambia, verificar unicidad
  - UPDATE proveedores SET ... WHERE id = :id
  - Responder: proveedor actualizado

DELETE /admin/proveedores/:id   ← SOFT DELETE
  - UPDATE proveedores SET activo = false WHERE id = :id
  - NO tocar proveedores_productos (conservar la relación histórica)
  - Responder: { message: "Proveedor desactivado correctamente" }

-- Endpoints para gestionar la relación proveedor-producto:

POST /admin/proveedores/:id/productos
  Body: { producto_id }
  - INSERT INTO proveedores_productos (proveedor_id, producto_id) ON CONFLICT DO NOTHING
  - Responder: { message: "Producto vinculado al proveedor" }

DELETE /admin/proveedores/:id/productos/:producto_id
  - DELETE FROM proveedores_productos WHERE proveedor_id = :id AND producto_id = :producto_id
  - Responder: { message: "Vínculo eliminado" }

GET /admin/proveedores/:id/productos
  - Lista los productos vinculados a este proveedor
  - JOIN con productos para devolver nombre, marca, stock, precio
```

```
-- FRONTEND

Módulo "Gestión de Proveedores" (/admin/proveedores):
  Solo accesible para Administrador (y Almacenero puede ver la lista, no editar)

  TABLA de proveedores:
    Columnas: Nombre | RUC | Contacto | Teléfono | Productos vinculados | Estado | Acciones
    - Botones: [Editar ✏️] [Ver productos 📦] [Desactivar 🗑️]
    - Botón principal: [+ Nuevo Proveedor]

  MODAL de crear/editar proveedor:
    Campos:
      - Nombre (texto, requerido)
      - RUC (numérico, exactamente 11 dígitos, requerido)
      - Persona de contacto (texto, opcional)
      - Email (email válido, opcional)
      - Teléfono (texto, opcional)
    Validaciones:
      - RUC solo dígitos, longitud exacta 11
      - Nombre no vacío

  MODAL de productos vinculados:
    - Lista los productos actuales del proveedor
    - Selector para agregar nuevos productos (search/autocomplete de productos activos)
    - Botón para desvincular productos individuales con confirmación

  CONFIRMACIÓN de desactivación:
    - "¿Desactivar a [Nombre del proveedor]? Los productos vinculados conservarán su historial."
```

**Definición de Hecho:**
- CRUD de proveedores funcional (crear, editar, soft delete)
- RUC único validado en backend (HTTP 409 si duplicado)
- Relación N:M con productos funcional (vincular y desvincular)
- Proveedor desactivado no aparece en el selector de entradas de mercadería (Sprint 2)
- Solo Administrador puede crear/editar/eliminar

---

### ✅ HU-04 | EP-03 | SP: 5 | Prioridad: HIGHEST

**Enunciado:**  
Como Almacenero, quiero registrar, editar y eliminar productos (nombre, marca, categoría, precio), para mantener el catálogo actualizado para la venta.

**Criterios de Aceptación (implementa TODOS):**

- [ ] DADO formulario completo con nombre, precio y stock inicial CUANDO el Almacenero guarda ENTONCES el sistema crea el producto con el stock ingresado y lo muestra en el inventario y en el POS disponible para venta.
- [ ] DADO modal de edición abierto CUANDO el Almacenero modifica el campo stock directamente ENTONCES el sistema actualiza el stock en BD (en Sprint 2 este campo se controlará desde entradas/bajas; por ahora la edición directa del modal es válida).
- [ ] DADO nombre de producto ya registrado CUANDO intenta guardar ENTONCES muestra `"Ya existe un producto con ese nombre"` y bloquea el guardado.

**Tareas Técnicas:**

```
-- BACKEND (rutas protegidas: authMiddleware + requireRol('Administrador', 'Almacenero'))

GET /almacen/productos
  - Lista productos ACTIVOS por defecto (activo=true)
  - Query params opcionales: ?activo=false, ?categoria_id=N, ?marca=X, ?q=búsqueda
  - JOIN con categorias para devolver nombre de categoría
  - JOIN con proveedores_productos + proveedores para devolver proveedores vinculados
  - Ordenar por nombre ASC
  - Response por item:
    {
      id, nombre, marca, precio, stock, activo,
      categoria: { id, nombre },
      proveedores: [{ id, nombre }]
    }

POST /almacen/productos
  Body: { nombre, marca?, categoria_id?, precio, stock }
  - Validar: nombre requerido y único, precio > 0, stock >= 0
  - Si nombre ya existe: HTTP 409 { error: "Ya existe un producto con ese nombre" }
  - INSERT en productos
  - Responder: producto creado con categoría

PUT /almacen/productos/:id
  Body: { nombre, marca?, categoria_id?, precio, stock?, activo? }
  - Validar nombre único (excluyendo el propio id), precio > 0
  - UPDATE productos SET ... WHERE id = :id
  - Responder: producto actualizado

DELETE /almacen/productos/:id   ← SOFT DELETE
  - UPDATE productos SET activo = false WHERE id = :id
  - El producto desaparece del POS y del inventario (filtrar activo=true)
  - Responder: { message: "Producto desactivado" }

GET /almacen/categorias
  - Lista todas las categorías activas (para poblar el selector del formulario)
  - Response: [{ id, nombre }]
```

```sql
-- Verificar que estos índices existen (crearlos si no):
CREATE INDEX IF NOT EXISTS idx_productos_nombre     ON productos(nombre);
CREATE INDEX IF NOT EXISTS idx_productos_activo     ON productos(activo);
CREATE INDEX IF NOT EXISTS idx_productos_categoria  ON productos(categoria_id);
```

```
-- FRONTEND

Módulo "Inventario / Catálogo" (/almacen/inventario):
  Accesible para Administrador y Almacenero

  TABLA de productos (filtrable):
    Columnas: Nombre | Marca | Categoría | Precio | Stock | Estado | Acciones
    Filtros sobre la tabla:
      - Buscador por nombre (búsqueda en tiempo real con debounce 300ms)
      - Selector de categoría (dropdown)
      - Selector de marca (dropdown con valores únicos de BD)
    - Colores de stock (preconfigurar para Sprint 2):
        stock <= 5  → fila amarilla + ícono ⚠️
        stock = 0   → fila roja o texto en rojo
        stock > 5   → normal
    - Botones por fila: [Editar ✏️] [Desactivar 🗑️]
    - Botón principal: [+ Nuevo Producto]

  MODAL de crear/editar producto:
    Campos:
      - Nombre (texto, requerido, único)
      - Marca (texto, opcional)
      - Categoría (select de /almacen/categorias, opcional)
      - Precio de venta (numérico > 0, requerido, formato moneda)
      - Stock (numérico >= 0, requerido en creación)
    Validaciones:
      - Nombre no vacío
      - Precio mayor a 0
      - Stock no negativo

  CONFIRMACIÓN de desactivación:
    - "¿Desactivar el producto [Nombre]? Dejará de aparecer en el inventario y en el POS."
```

**Definición de Hecho:**
- Catálogo visible y filtrable en el módulo de inventario
- Productos activos disponibles en el POS para el Vendedor
- Soft delete implementado: producto desactivado no aparece en inventario ni en POS
- Validación de nombre único activa (frontend + backend)
- Validación de precio > 0 activa

---

### ✅ HU-16 | EP-06 | SP: 3 | Prioridad: HIGHEST

**Enunciado:**  
Como Vendedor, quiero seleccionar el método de pago (Efectivo, Yape o Plin) al registrar una venta, para documentar correctamente la forma de pago.

> ⚠️ Esta HU define el schema de la tabla `ventas`. Impleméntala antes de HU-15.

**Criterios de Aceptación (implementa TODOS):**

- [ ] DADO pago en Efectivo con monto ingresado CUANDO confirma la venta ENTONCES el sistema calcula y muestra el vuelto (`monto_recibido - total`) y lo guarda en BD.
- [ ] DADO pago con Yape o Plin CUANDO selecciona y confirma ENTONCES el sistema guarda el método sin mostrar ni calcular vuelto (el campo `monto_recibido` queda NULL).
- [ ] DADO ningún método seleccionado CUANDO intenta confirmar la venta ENTONCES muestra `"Debe seleccionar un método de pago"` y bloquea el guardado.

**Tareas Técnicas:**

```
-- BACKEND
-- La lógica del método de pago forma parte del endpoint POST /ventas (HU-15).
-- Aquí definimos las validaciones específicas para este campo:

En POST /ventas:
  Body: { items: [...], metodo_pago, monto_recibido? }

  Validaciones de método de pago:
  - metodo_pago es requerido
  - metodo_pago debe ser uno de: 'Efectivo', 'Yape', 'Plin'
  - Si metodo_pago === 'Efectivo':
      - monto_recibido es requerido
      - monto_recibido debe ser >= total de la venta
      - Calcular vuelto: monto_recibido - total
  - Si metodo_pago === 'Yape' o 'Plin':
      - monto_recibido = NULL (no aplica)
      - vuelto = 0 (no aplica)

  En la respuesta de POST /ventas incluir:
  {
    venta_id,
    total,
    metodo_pago,
    monto_recibido,
    vuelto,   ← null si no es Efectivo, número si es Efectivo
    fecha
  }
```

```
-- FRONTEND (parte del componente POS)

Sección "Método de Pago" en el modal/panel de confirmación de venta:

  SELECTOR DE MÉTODO:
  - 3 botones/tabs grandes y visuales:
      [💵 Efectivo]    [📱 Yape]    [📱 Plin]
  - El botón seleccionado se resalta (color de acento del sistema)
  - NINGUNO seleccionado por defecto al abrir el modal

  CAMPO CONDICIONAL (solo visible si Efectivo está seleccionado):
  - Label: "Monto recibido del cliente"
  - Input numérico, mínimo = total de la venta
  - Debajo del input mostrar en tiempo real:
      Vuelto: S/ [monto_recibido - total]
  - Si monto_recibido < total → mostrar en rojo: "Monto insuficiente"

  VALIDACIÓN AL CONFIRMAR:
  - Si ningún método seleccionado → toast/mensaje de error: "Debe seleccionar un método de pago"
  - Si Efectivo y monto_recibido < total → bloquear y mostrar "Monto insuficiente"
  - Si Yape o Plin → habilitar confirmar directamente (sin campo de monto)
```

**Definición de Hecho:**
- Los 3 métodos de pago funcionales y guardados en BD
- Vuelto calculado y mostrado correctamente en tiempo real para Efectivo
- Vuelto no aplica para Yape/Plin (campo oculto, valor null en BD)
- Validación de método requerido activa

---

### ✅ HU-15 | EP-06 | SP: 8 | Prioridad: HIGHEST

**Enunciado:**  
Como Vendedor, quiero registrar ventas seleccionando productos y cantidades, para llevar control de transacciones diarias y actualizar el inventario en tiempo real.

**Criterios de Aceptación (implementa TODOS):**

- [ ] DADO stock suficiente para todos los productos en el carrito CUANDO el Vendedor confirma la venta ENTONCES el sistema registra la transacción, descuenta el stock de cada producto y muestra el total y el vuelto (si aplica).
- [ ] DADO el Vendedor intenta agregar un producto sin stock disponible (`stock = 0`) CUANDO lo busca o selecciona ENTONCES muestra `"Producto sin stock disponible"` y **no** lo agrega al carrito.
- [ ] DADO venta iniciada con productos en el carrito CUANDO el Vendedor cancela ENTONCES el sistema descarta la operación **sin modificar el inventario** (no se crea ningún registro en `ventas` ni en `detalle_venta`).

**Tareas Técnicas:**

```sql
-- Verificar que las tablas ventas y detalle_venta existen con el schema correcto.
-- Si ya existen con estructura diferente, hacer ALTER TABLE para adaptarlas.
-- Nunca recrearlas si ya tienen datos.
```

```
-- BACKEND

POST /ventas
  Body:
  {
    items: [
      { producto_id: 1, cantidad: 2 },
      { producto_id: 3, cantidad: 1 }
    ],
    metodo_pago: "Efectivo",   ← 'Efectivo' | 'Yape' | 'Plin'
    monto_recibido: 50.00      ← solo si metodo_pago = 'Efectivo'
  }

  Algoritmo (DENTRO DE UNA TRANSACCIÓN ATÓMICA — BEGIN/COMMIT):
  
  PASO 1 — Validar:
    - items no puede estar vacío
    - metodo_pago requerido y válido
    - Para cada item:
        a) Verificar que el producto existe y está activo
        b) Verificar stock suficiente: SELECT stock FROM productos WHERE id = producto_id FOR UPDATE
        c) Si stock < cantidad_solicitada → ROLLBACK y responder HTTP 422:
           { error: "Stock insuficiente para [nombre_producto]: solo hay [X] unidades" }
    - Si metodo_pago = 'Efectivo': monto_recibido >= total calculado

  PASO 2 — Calcular totales:
    - Para cada item: precio_unitario = precio actual del producto, subtotal = precio_unitario * cantidad
    - total = SUM(subtotales)

  PASO 3 — Registrar (todo o nada):
    a) INSERT INTO ventas (usuario_id, total, metodo_pago, monto_recibido, fecha)
       → Obtener venta_id
    b) Para cada item:
       INSERT INTO detalle_venta (venta_id, producto_id, cantidad, precio_unitario, subtotal)
       UPDATE productos SET stock = stock - cantidad WHERE id = producto_id
    c) COMMIT

  PASO 4 — Responder:
  {
    venta_id,
    total,
    metodo_pago,
    monto_recibido,
    vuelto: (metodo_pago === 'Efectivo' ? monto_recibido - total : null),
    items: [ { producto, cantidad, precio_unitario, subtotal } ],
    fecha
  }

GET /ventas
  - Lista ventas del usuario autenticado (si es Vendedor, solo las suyas)
  - Si es Administrador o Gerente: todas las ventas
  - Query params: ?fecha_inicio=&fecha_fin=&usuario_id=
  - JOIN con detalle_venta y productos para incluir items
  - Ordenar por fecha DESC

GET /ventas/:id
  - Detalle completo de la venta
  - JOIN detalle_venta + productos
  - Incluir datos del vendedor (nombre)
```

```
-- FRONTEND — Interfaz POS (/pos/venta)
  Accesible para Vendedor y Administrador

  LAYOUT DEL POS (dos columnas):

  COLUMNA IZQUIERDA — Buscador de productos:
    - Campo de búsqueda (texto, debounce 300ms)
    - Busca en: nombre y marca del producto (GET /almacen/productos?q=texto)
    - Solo muestra productos con activo=true Y stock > 0
    - Resultados en tarjetas/filas: Nombre | Marca | Precio | Stock disponible
    - Botón [+ Agregar] en cada resultado
    - Al hacer clic: agrega al carrito (o incrementa cantidad si ya está)
    - Si stock = 0 → no mostrar botón o mostrarlo deshabilitado con tooltip "Sin stock"

  COLUMNA DERECHA — Carrito / Resumen de venta:
    Lista de items en el carrito:
      Columnas: Producto | Precio unit. | Cantidad | Subtotal | [Eliminar]
      - Campo cantidad editable (input numérico, mínimo 1, máximo = stock disponible)
      - Al cambiar cantidad → recalcular subtotal y total en tiempo real
      - Botón 🗑️ para quitar el item del carrito

    Resumen:
      TOTAL: S/ [suma de subtotales]

    Botones de acción:
      [🚫 Cancelar venta]  ← Limpia el carrito sin registrar nada
      [✅ Confirmar venta]  ← Abre modal de pago

  MODAL DE CONFIRMACIÓN DE PAGO (de HU-16):
    - Resumen breve del total
    - Selector de método de pago (Efectivo / Yape / Plin)
    - Campo monto recibido (solo si Efectivo)
    - Vuelto calculado en tiempo real
    - Botón [Confirmar y registrar]
    - Al confirmar → POST /ventas
    - En éxito:
        a) Mostrar pantalla de éxito con el total y vuelto (si aplica)
        b) Opción: [🖨️ Imprimir comprobante] (conecta con HU-17 Sprint 2)
        c) Botón [Nueva venta] → limpiar carrito y volver al POS
    - En error (ej. stock insuficiente detectado en backend):
        Mostrar mensaje de error específico sin cerrar el modal

  Estado del carrito en memoria:
  // Solo en estado React/Vue — NO guardar en localStorage
  const [carrito, setCarrito] = useState([]);
  // item: { producto_id, nombre, precio_unitario, cantidad, stock_disponible }
```

**Definición de Hecho:**
- Venta registrada correctamente en BD con todos sus items
- Stock descontado atómicamente (no puede quedar inconsistente si falla a mitad)
- Cancelar venta NO modifica ninguna tabla en BD
- Validación de stock insuficiente con mensaje específico por producto
- POS funcional con búsqueda, carrito y confirmación de pago

---

## 🔒 TABLA DE PERMISOS — SPRINT 1

| Ruta / Módulo                          | Admin | Almacenero | Gerente | Vendedor |
|----------------------------------------|:-----:|:----------:|:-------:|:--------:|
| POST /auth/login                        | ✅ (todos sin auth) | ✅ | ✅ | ✅ |
| POST /auth/logout                       | ✅    | ✅         | ✅      | ✅       |
| GET  /admin/usuarios                    | ✅    | ❌         | ❌      | ❌       |
| POST /admin/usuarios                    | ✅    | ❌         | ❌      | ❌       |
| PUT  /admin/usuarios/:id                | ✅    | ❌         | ❌      | ❌       |
| DELETE /admin/usuarios/:id              | ✅    | ❌         | ❌      | ❌       |
| GET  /admin/proveedores                 | ✅    | ✅ (solo GET) | ❌   | ❌       |
| POST/PUT/DELETE /admin/proveedores      | ✅    | ❌         | ❌      | ❌       |
| GET  /almacen/productos                 | ✅    | ✅         | ✅      | ✅       |
| POST/PUT/DELETE /almacen/productos      | ✅    | ✅         | ❌      | ❌       |
| GET  /almacen/categorias                | ✅    | ✅         | ✅      | ✅       |
| POST /ventas                            | ✅    | ❌         | ❌      | ✅       |
| GET  /ventas                            | ✅    | ❌         | ✅      | ✅ (solo las propias) |

**Implementa el middleware `requireRol(...)` en cada grupo de rutas.**

---

## 🧪 CHECKLIST DE VERIFICACIÓN ANTES DE CERRAR CADA HU

```bash
# === HU-01: Auth ===
# Login exitoso:
curl -X POST http://localhost:PORT/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sistema.com","password":"Admin123!"}'
# Esperado: HTTP 200 con { token, usuario: { rol: "Administrador" } }

# Login fallido:
curl -X POST http://localhost:PORT/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sistema.com","password":"wrongpass"}'
# Esperado: HTTP 401 con { error: "Credenciales incorrectas" }

# Ruta protegida sin token:
curl http://localhost:PORT/admin/usuarios
# Esperado: HTTP 401

# Verificar log en BD:
# SELECT * FROM log_accesos ORDER BY created_at DESC LIMIT 5;

# === HU-03: Usuarios ===
# Crear usuario:
curl -X POST http://localhost:PORT/admin/usuarios \
  -H "Authorization: Bearer TOKEN_ADMIN" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Pérez","email":"juan@test.com","password":"pass123","rol":"Vendedor"}'
# Esperado: HTTP 201 con usuario creado (sin password_hash)

# Email duplicado:
# Repetir el mismo curl → Esperado: HTTP 409 { error: "El email ya está registrado" }

# Soft delete:
curl -X DELETE http://localhost:PORT/admin/usuarios/ID \
  -H "Authorization: Bearer TOKEN_ADMIN"
# Verificar: SELECT activo FROM usuarios WHERE id = ID; → false
# Verificar: Login con ese usuario → HTTP 401

# === HU-10: Proveedores ===
# Crear proveedor:
curl -X POST http://localhost:PORT/admin/proveedores \
  -H "Authorization: Bearer TOKEN_ADMIN" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Proveedor SAC","ruc":"12345678901"}'
# Esperado: HTTP 201 con proveedor creado

# RUC duplicado: repetir → HTTP 409

# === HU-04: Productos ===
# Crear producto:
curl -X POST http://localhost:PORT/almacen/productos \
  -H "Authorization: Bearer TOKEN_ALMACENERO" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Laptop HP","precio":2500.00,"stock":10,"marca":"HP","categoria_id":1}'
# Esperado: HTTP 201

# Nombre duplicado: repetir → HTTP 409

# Verificar en BD:
# SELECT id, nombre, stock FROM productos ORDER BY id DESC LIMIT 5;

# === HU-15 + HU-16: Ventas ===
# Registrar venta con Efectivo:
curl -X POST http://localhost:PORT/ventas \
  -H "Authorization: Bearer TOKEN_VENDEDOR" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"producto_id": 1, "cantidad": 2}],
    "metodo_pago": "Efectivo",
    "monto_recibido": 5100.00
  }'
# Esperado: HTTP 201 con vuelto = 100.00

# Verificar stock descontado:
# SELECT stock FROM productos WHERE id = 1; → debe ser stock_anterior - 2

# Cancelar sin modificar stock:
# Solo en frontend (no hay endpoint de cancelación — el carrito se vacía en memoria)
# Verificar que el stock no cambió

# Producto sin stock (stock=0):
# Intentar agregar producto con stock=0 al carrito → error en frontend antes de POST

# Sin método de pago:
curl -X POST http://localhost:PORT/ventas \
  -H "Authorization: Bearer TOKEN_VENDEDOR" \
  -H "Content-Type: application/json" \
  -d '{"items": [{"producto_id": 1, "cantidad": 1}]}'
# Esperado: HTTP 422 con error de metodo_pago requerido
```

---

## 📁 ESTRUCTURA DE ARCHIVOS SUGERIDA

```
/
├── .env                          ← JWT_SECRET, DB_*, PORT (NUNCA en git)
├── .env.example                  ← Plantilla con keys vacías (sí en git)
├── package.json
├── /migrations
│     001_create_categorias.sql
│     002_create_usuarios.sql
│     003_create_log_accesos.sql
│     004_create_proveedores.sql
│     005_create_productos.sql
│     006_create_proveedores_productos.sql
│     007_create_ventas.sql
│     008_create_detalle_venta.sql
│     009_create_indexes.sql
├── /seeders
│     001_admin_user.js           ← Crear usuario admin inicial
│     002_categorias.js           ← Insertar categorías iniciales
├── /src
│     /config
│       db.js                     ← Conexión a BD (pool)
│       jwt.js                    ← Helpers de JWT
│     /middleware
│       auth.middleware.js        ← authMiddleware + requireRol
│     /routes
│       auth.routes.js            ← POST /auth/login, /auth/logout (HU-01)
│       admin.routes.js           ← /admin/usuarios, /admin/proveedores (HU-03, HU-10)
│       almacen.routes.js         ← /almacen/productos, /almacen/categorias (HU-04)
│       ventas.routes.js          ← POST /ventas, GET /ventas (HU-15)
│     /controllers
│       auth.controller.js
│       usuarios.controller.js
│       proveedores.controller.js
│       productos.controller.js
│       ventas.controller.js
│     /models (si el stack usa ORM)
│       Usuario.js
│       Proveedor.js
│       Producto.js
│       Venta.js
│       DetalleVenta.js
│     app.js                      ← Express app setup
│     server.js                   ← Listen port
├── /frontend/src
│     /pages
│       Login.jsx                 ← HU-01
│       NoAutorizado.jsx          ← HU-01
│       admin/
│         Usuarios.jsx            ← HU-03
│         Proveedores.jsx         ← HU-10
│       almacen/
│         Inventario.jsx          ← HU-04
│       pos/
│         POS.jsx                 ← HU-15 + HU-16
│     /components
│       ProtectedRoute.jsx        ← HU-01 (router guard)
│       ModalConfirmacion.jsx     ← Reutilizable
│       ModalPago.jsx             ← HU-16
│       TablaProductos.jsx        ← HU-04
│     /hooks
│       useAuth.js                ← Token, usuario, logout
│       useDebounce.js            ← Para búsqueda en POS y catálogo
│     /services
│       api.js                    ← Axios/Fetch con interceptor de token
│       auth.service.js
│       productos.service.js
│       ventas.service.js
│     /context
│       AuthContext.jsx           ← Estado global del usuario autenticado
```

---

## 🚨 ERRORES COMUNES — EVÍTALOS

1. **NO guardar el JWT_SECRET en el código fuente**. Usar `process.env.JWT_SECRET` desde `.env`.
2. **NO devolver `password_hash` en ninguna respuesta de API**. Hacer SELECT explícito de columnas.
3. **NO borrar registros de usuarios o proveedores**. Solo soft delete (`activo = false`).
4. **NO actualizar el stock directamente desde el POS sin verificar disponibilidad**. Siempre verificar antes del UPDATE.
5. **NO hacer múltiples UPDATE de stock sin transacción**. Usar `BEGIN / COMMIT` — si falla un item, hacer `ROLLBACK`.
6. **NO asumir que el mismo nombre de columna existe en todas las tablas**. Siempre verificar el schema real antes de escribir queries.
7. **NO crear la ruta `/admin/usuarios` accesible para Vendedor o Almacenero**. El middleware `requireRol('Administrador')` es obligatorio.
8. **NO reutilizar el token después de logout**. Aunque el backend no invalida el JWT (stateless), el frontend DEBE borrar el token del localStorage.
9. **NO olvidar el índice UNIQUE en `usuarios.email` y `proveedores.ruc`**. Son columnas críticas.
10. **NO calcular el vuelto en el backend con columnas GENERATED** si el motor de BD no las soporta — calcularlo en la lógica de la aplicación y guardarlo como valor normal.

---

## ✅ DEFINICIÓN DE SPRINT 1 COMPLETO

El Sprint 1 está cerrado cuando:

- [ ] **HU-01**: Login con JWT funcional para los 4 roles; middleware de auth y roles aplicado a todas las rutas; log_accesos registra cada intento
- [ ] **HU-03**: CRUD de usuarios completo desde panel Admin; soft delete funcional; password nunca expuesta en respuestas; validación de email único
- [ ] **HU-10**: CRUD de proveedores completo; RUC único validado; relación N:M con productos funcional; soft delete sin borrar historial
- [ ] **HU-04**: Catálogo de productos CRUD completo; soft delete; visible en inventario y en POS; validación de nombre único y precio > 0
- [ ] **HU-16**: 3 métodos de pago funcionales; vuelto calculado para Efectivo; campo requerido validado
- [ ] **HU-15**: POST /ventas con transacción atómica; stock descontado; cancelación NO toca BD; POS funcional con búsqueda y carrito
- [ ] Las 8 tablas creadas con sus scripts de migración independientes
- [ ] Los 4 roles protegidos correctamente en todas las rutas
- [ ] Usuario admin inicial creado vía seeder (no hardcodeado)
- [ ] No hay errores en consola del servidor ni del navegador
- [ ] Las tablas `usuarios`, `productos`, `proveedores`, `ventas`, `detalle_venta` tienen **exactamente** las columnas descritas en este documento (los Sprints 2 y 3 dependen de ello)

---

*Prompt Maestro Sprint 1 (Fundación) — Sistema de Ventas*  
*Repo: https://github.com/sgoicocheav3-design/sistema-de-ventas/tree/master*  
*Sprint 2 y Sprint 3 ya implementados — Este sprint es la base de todo el sistema*
