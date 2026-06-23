# 🤖 PROMPT MAESTRO — OpenCode: Sistema de Ventas SPRINT 3
> Repositorio: https://github.com/sgoicocheav3-design/sistema-de-ventas/tree/master

---

## ⚠️ CONTEXTO CRÍTICO — LEE ANTES DE TOCAR CUALQUIER ARCHIVO

Este es el **Sprint 3**. El Sprint 2 **ya fue completado** e incluye:
- Tablas creadas: `entradas_mercaderia`, `bajas_inventario`, `solicitudes_reposicion`, `notificaciones`
- Endpoints activos: `/almacen/entradas`, `/almacen/bajas`, `/almacen/solicitudes`, `/gerencia/solicitudes/:id/aprobar`, `/gerencia/solicitudes/:id/rechazar`, `/ventas/:id/comprobante`
- Lógica de alertas de stock ≤ 5 en inventario
- Sistema de notificaciones internas entre roles

**Tu primera acción SIEMPRE es:**
```bash
# 1. Explorar estructura actual
find . -type f -name "*.js" -o -name "*.ts" -o -name "*.py" | grep -v node_modules | grep -v .git
cat package.json   # o requirements.txt / pyproject.toml
# 2. Revisar tablas existentes
# Busca archivos de migración o schema
find . -name "*.sql" -o -name "schema*" -o -name "migrate*" | grep -v node_modules
# 3. Revisar modelos y rutas ya existentes antes de crear nada nuevo
```

**REGLAS DE ORO:**
1. Nunca crear una tabla sin verificar si ya existe
2. Nunca editar un endpoint existente sin leerlo completo primero  
3. El campo `estado` en `productos` puede llamarse `activo` (boolean) o `estado` (varchar) — **verifícalo antes de escribir queries**
4. El campo `estado` en `solicitudes_reposicion` ahora añade un valor nuevo: `'Completada'` — **usa ALTER TABLE**, no recrees la tabla
5. Toda nueva funcionalidad va en archivos **nuevos** (nuevas rutas, nuevos controladores) a menos que sea una extensión mínima

---

## 📋 ORDEN DE IMPLEMENTACIÓN (respétalo — hay dependencias)

```
1. HU-02 (High)    → Reset de contraseña (auth, independiente)
2. HU-09 (Medium)  → Filtros por categoría/marca (crea tabla categorias que necesita HU-18)
3. HU-08 (Medium)  → Reactivar productos inactivos (usa estado de productos del Sprint 2)
4. HU-14 (Medium)  → Historial de solicitudes (usa datos ya existentes del Sprint 2)
5. HU-13 (High)    → Recepción física de mercadería (depende de solicitudes aprobadas Sprint 2)
6. HU-20 (Medium)  → Alerta menú recepciones (depende de HU-13)
7. HU-18 (High)    → Búsqueda POS (depende de HU-09 para categorías)
8. HU-19 (Medium)  → Indicador de stock en POS (extiende HU-18)
```

---

## 🏗️ HISTORIAS DE USUARIO — ESPECIFICACIÓN COMPLETA

---

### ✅ HU-02 | EP-01 | SP: 3 | Prioridad: HIGH

**Enunciado:**  
Como Usuario del sistema, quiero restablecer mi contraseña mediante un código de verificación enviado a mi correo, para recuperar el acceso sin depender del administrador.

**Criterios de Aceptación (implementa TODOS):**

- [ ] DADO usuario con correo registrado CUANDO solicita recuperación ENTONCES recibe un código de **4 dígitos** a su correo con expiración de **15 minutos**.
- [ ] DADO código válido y no expirado CUANDO ingresa nueva contraseña ENTONCES se actualiza el **hash** en BD (nunca guardar contraseña en texto plano).
- [ ] DADO código expirado o incorrecto CUANDO intenta validar ENTONCES muestra `"Código inválido o expirado"` y **no** actualiza la contraseña.

**Tareas Técnicas:**

```sql
-- 1. Extender tabla usuarios (NO recrearla, usar ALTER TABLE)
ALTER TABLE usuarios 
  ADD COLUMN IF NOT EXISTS reset_code VARCHAR(4),
  ADD COLUMN IF NOT EXISTS reset_expiry TIMESTAMP;
-- Estos campos deben limpiarse (NULL) tras un reset exitoso.
```

```
-- 2. Backend — Endpoints

POST /auth/forgot-password
  Body: { email }
  - Verificar que el email exista en tabla usuarios
  - Si no existe: responder con HTTP 200 de todas formas (no revelar si el correo existe o no — seguridad)
  - Si existe:
    a) Generar código aleatorio de 4 dígitos: Math.floor(1000 + Math.random() * 9000)
    b) Calcular expiración: NOW() + 15 minutos
    c) UPDATE usuarios SET reset_code = codigo, reset_expiry = expiracion WHERE email = email
    d) Enviar correo con el código (ver configuración SMTP abajo)
  - Responder: { message: "Si el correo existe, recibirás un código en los próximos minutos" }

POST /auth/reset-password
  Body: { email, codigo, nueva_password }
  - Buscar usuario por email
  - Verificar: reset_code === codigo Y reset_expiry > NOW()
  - Si falla: HTTP 400 → { error: "Código inválido o expirado" }
  - Si válido:
    a) Hashear nueva_password (usar bcrypt u el mismo método que usa el sistema)
    b) UPDATE usuarios SET password_hash = nuevo_hash, reset_code = NULL, reset_expiry = NULL WHERE id = usuario.id
  - Responder: { message: "Contraseña actualizada correctamente" }

-- 3. Configuración SMTP
-- Buscar si el proyecto ya tiene algún servicio de email configurado (nodemailer, smtplib, etc.)
-- Si NO existe, usar nodemailer con configuración desde variables de entorno:

// .env (agregar estas variables — NO hardcodear credenciales)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu-correo@gmail.com
EMAIL_PASS=tu-app-password
EMAIL_FROM="Sistema de Ventas <no-reply@sistemaventas.com>"

// Si el entorno no tiene SMTP configurado, usar modo simulado:
// Imprimir el código en consola del servidor: console.log(`[RESET CODE] ${email}: ${codigo}`)
// Documentar en README que en producción se debe configurar SMTP real
```

```
-- 4. Frontend — Formulario en 2 pasos

PASO 1 — Solicitar código:
  - Campo: email
  - Botón "Enviar código de recuperación"
  - Tras submit → mostrar mensaje: "Si el correo existe, recibirás un código"
  - Mostrar automáticamente el Paso 2 (no redirigir, mismo formulario)
  - Timer visual de 15 minutos (cuenta regresiva)

PASO 2 — Ingresar código y nueva contraseña:
  - Campo: código (4 dígitos, solo numérico)
  - Campo: nueva contraseña (con confirmación)
  - Validación: las dos contraseñas deben coincidir antes de enviar
  - Botón "Restablecer contraseña"
  - Tras éxito → redirigir a login con mensaje "Contraseña actualizada"
  - Tras error → mostrar "Código inválido o expirado" sin redirigir

Enlace en login: "¿Olvidaste tu contraseña?" → abre el formulario de recuperación
```

**Definición de Hecho:**
- Flujo completo funciona: solicitar → recibir código → resetear contraseña
- Código expira en 15 minutos (probar con `UPDATE usuarios SET reset_expiry = NOW() - interval '1 minute'`)
- Correo enviado (o simulado en consola) con éxito
- Hash almacenado, nunca texto plano

---

### ✅ HU-09 | EP-03 | SP: 3 | Prioridad: MEDIUM

**Enunciado:**  
Como Almacenero, quiero filtrar el inventario por categoría o marca, para navegar el catálogo eficientemente durante el reposicionamiento.

**IMPORTANTE:** Esta HU crea la tabla `categorias` que también usa HU-18. Impleméntala antes.

**Criterios de Aceptación (implementa TODOS):**

- [ ] DADO categoría seleccionada CUANDO aplica filtro ENTONCES tabla muestra **solo** productos de esa categoría.
- [ ] DADO marca ingresada CUANDO filtra ENTONCES tabla muestra **solo** productos de esa marca.
- [ ] DADO filtro sin coincidencias CUANDO ejecuta ENTONCES muestra `"No se encontraron productos"` (no tabla vacía sin mensaje).

**Tareas Técnicas:**

```sql
-- 1. Crear tabla categorias (maestra de datos)
CREATE TABLE IF NOT EXISTS categorias (
  id     SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  activo BOOLEAN DEFAULT true
);

-- Precargar datos iniciales (adaptar al negocio del proyecto):
INSERT INTO categorias (nombre) VALUES 
  ('Electrónica'), ('Ropa'), ('Alimentos'), ('Herramientas'), 
  ('Limpieza'), ('Papelería'), ('Otros')
ON CONFLICT (nombre) DO NOTHING;

-- 2. Verificar si productos ya tiene categoria_id y marca
-- Si NO tiene, agregarlos:
ALTER TABLE productos 
  ADD COLUMN IF NOT EXISTS categoria_id INTEGER REFERENCES categorias(id),
  ADD COLUMN IF NOT EXISTS marca VARCHAR(100);

-- 3. Índices para optimizar consultas de filtro
CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos(categoria_id);
CREATE INDEX IF NOT EXISTS idx_productos_marca ON productos(marca);
```

```
-- 4. Backend — Extender endpoint existente
-- ⚠️ NO crear nuevo endpoint. Agregar query params al GET /almacen/productos ya existente.

GET /almacen/productos?categoria_id=2&marca=Samsung&solo_stock_bajo=true&solo_inactivos=false
  - Construir query dinámicamente según los params recibidos
  - JOIN con categorias para incluir nombre de categoría en respuesta
  - Devolver también lista de marcas únicas disponibles (para el dropdown del frontend)
  
Ejemplo de respuesta:
{
  productos: [...],
  total: 42,
  filtros_disponibles: {
    categorias: [{ id: 1, nombre: "Electrónica" }, ...],
    marcas: ["Samsung", "LG", "Apple", ...]
  }
}

-- 5. Endpoint adicional para obtener maestro de categorías
GET /almacen/categorias
  → Lista todas las categorías activas (para poblar dropdowns)
```

```
-- 6. Frontend — Componente de filtros combinados
Agregar barra de filtros arriba de la tabla de inventario:
  - Dropdown "Categoría": se puebla con GET /almacen/categorias
  - Input de texto "Marca" (con debounce 300ms)
  - Los filtros se pueden combinar (categoría + marca al mismo tiempo)
  - Botón "Limpiar filtros" que resetea todos los params
  - La URL debe actualizarse con los params activos (para que sea sharable/refresh-safe)
  - Si resultado vacío → mostrar mensaje "No se encontraron productos" en lugar de tabla vacía
```

**Definición de Hecho:**
- Filtros funcionales individualmente y combinados
- Tabla `categorias` precargada con datos maestros
- Consultas optimizadas con índices SQL
- Dropdown de categorías se puebla dinámicamente

---

### ✅ HU-08 | EP-03 | SP: 2 | Prioridad: MEDIUM

**Enunciado:**  
Como Almacenero, quiero visualizar y reactivar productos inactivos dados de baja por error, para corregir registros e incorporar mercadería recuperada.

**CONTEXTO:** En Sprint 2, HU-07 implementó bajas de inventario. Cuando un producto se da de baja completamente, su estado puede quedar como `inactivo`. Esta HU permite revertirlo.

**Criterios de Aceptación (implementa TODOS):**

- [ ] DADO productos con estado inactivo en BD CUANDO accede al sub-panel ENTONCES muestra tabla **solo** con esos productos (no mezclar con activos).
- [ ] DADO producto inactivo identificado CUANDO selecciona y confirma reactivación ENTONCES cambia estado a **Activo** y aparece nuevamente en el catálogo.
- [ ] DADO ningún producto seleccionado CUANDO presiona Reactivar ENTONCES muestra alerta `"Debe seleccionar al menos un producto"`.

**Tareas Técnicas:**

```sql
-- 1. Verificar cómo está implementado el estado en productos
-- Puede ser: activo BOOLEAN, o estado VARCHAR('activo','inactivo'), o eliminado_en TIMESTAMP
-- Busca en el schema/migraciones del Sprint 2 (o de antes) cómo está definido.
-- Adapta los queries según lo que encuentres.

-- Si usa campo booleano: WHERE activo = false
-- Si usa varchar: WHERE estado = 'inactivo'
-- Si usa soft-delete con timestamp: WHERE eliminado_en IS NOT NULL

-- 2. Crear tabla de auditoría si no existe
CREATE TABLE IF NOT EXISTS auditoria (
  id            SERIAL PRIMARY KEY,
  tabla         VARCHAR(50) NOT NULL,
  registro_id   INTEGER NOT NULL,
  accion        VARCHAR(50) NOT NULL,  -- 'reactivacion', 'baja', 'edicion', etc.
  descripcion   TEXT,
  usuario_id    INTEGER REFERENCES usuarios(id),
  created_at    TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_auditoria_tabla ON auditoria(tabla, registro_id);
```

```
-- 3. Backend

GET /almacen/productos/inactivos
  - WHERE activo = false (o equivalente según cómo esté implementado)
  - Incluir: id, nombre, marca, categoria, stock_al_dar_baja, fecha_baja, motivo_baja
  - Ordenar por fecha más reciente primero

PATCH /almacen/productos/:id/reactivar
  - Verificar que el producto existe y está inactivo
  - Si ya está activo → HTTP 400: "El producto ya está activo"
  - UPDATE productos SET activo = true (o estado = 'activo') WHERE id = :id
  - INSERT en auditoria: { tabla: 'productos', registro_id: id, accion: 'reactivacion', usuario_id: req.user.id }
  - Responder: { message: "Producto reactivado exitosamente", producto: {...} }

-- Autorización: solo Almacenero y Admin pueden reactivar
```

```
-- 4. Frontend — Sub-panel "Productos Inactivos"
Ubicación: pestaña o sección dentro de la vista de Inventario
  - Tab "Activos" / Tab "Inactivos" (toggle de vista)
  - Tabla de inactivos con columnas: Nombre | Marca | Categoría | Stock | Motivo Baja | Fecha | ✓ Seleccionar
  - Checkbox por fila para seleccionar productos a reactivar
  - Botón "Reactivar seleccionados" → dialogo de confirmación → PATCH por cada seleccionado
  - Tras éxito: el producto desaparece de la lista de inactivos y aparece en activos
  - Si no hay inactivos: mostrar "No hay productos inactivos"
```

**Definición de Hecho:**
- Sub-panel de inactivos visible y separado del inventario activo
- Reactivación actualiza el estado correctamente en BD
- Evento registrado en tabla `auditoria` con usuario y timestamp
- Producto reaparece en catálogo activo inmediatamente

---

### ✅ HU-14 | EP-05 | SP: 2 | Prioridad: MEDIUM

**Enunciado:**  
Como Almacenero, quiero consultar el historial de mis solicitudes con estado, fecha estimada y motivo de rechazo, para hacer seguimiento a los pedidos.

**CONTEXTO:** La tabla `solicitudes_reposicion` ya existe del Sprint 2. Esta HU solo agrega una vista de historial con filtros, no crea datos nuevos.

**Criterios de Aceptación (implementa TODOS):**

- [ ] DADO solicitudes procesadas (Aprobadas, Rechazadas, Completadas) CUANDO accede al historial ENTONCES muestra tabla con estado codificado por colores, fecha estimada de entrega y nota del gerente.

**Tareas Técnicas:**

```
-- 1. Backend

GET /almacen/solicitudes/historial?estado=Aprobada&fecha_inicio=2025-01-01&fecha_fin=2025-12-31
  - Solo devuelve solicitudes del almacenero autenticado (WHERE almacenero_id = req.user.id)
  - JOIN con productos para nombre del producto
  - JOIN con proveedores para nombre del proveedor asignado
  - JOIN con usuarios (gerente) para nombre del aprobador/rechazador
  - Columnas: id, producto, cantidad, estado, fecha_solicitada, fecha_procesada, proveedor_asignado, gerente, motivo_rechazo
  - Filtros opcionales por estado y rango de fechas
  - Ordenar por fecha_solicitada DESC

⚠️ DIFERENCIA CON GET /almacen/solicitudes (Sprint 2):
  - El endpoint existente devolvía todas las solicitudes para el flujo de envío
  - Este historial es de LECTURA con filtros, para seguimiento personal
  - Si prefieres, agrega query params al existente en lugar de crear uno nuevo: 
    GET /almacen/solicitudes?vista=historial&estado=Aprobada&...
```

```
-- 2. Frontend — Vista "Mi Historial de Solicitudes"
Tabla con colores por estado:
  - Pendiente → badge amarillo ⏳
  - Aprobada  → badge verde ✅ + mostrar proveedor y fecha estimada
  - Rechazada → badge rojo ❌ + mostrar motivo de rechazo en tooltip o fila expandida
  - Completada → badge azul 📦

Filtros en la parte superior:
  - Dropdown de estado (Todos / Pendiente / Aprobada / Rechazada / Completada)
  - DatePicker: fecha desde — fecha hasta
  - Botón "Limpiar filtros"

Si motivo_rechazo existe → mostrar ícono de información, al hover mostrar el texto completo
Si fecha_procesada existe → calcular "hace X días" y mostrarlo en tooltip
```

**Definición de Hecho:**
- Historial visible con todos los estados del flujo completo
- Colores correctos por estado
- Filtros por estado y rango de fechas funcionales

---

### ✅ HU-13 | EP-05 | SP: 3 | Prioridad: HIGH

**Enunciado:**  
Como Almacenero, quiero registrar el ingreso físico de mercadería de pedidos aprobados, para actualizar el stock automáticamente.

**CONTEXTO:** Depende de `solicitudes_reposicion` con `estado = 'Aprobada'` (creadas en Sprint 2, HU-12). Esta HU cierra el ciclo: la mercadería llega físicamente y el stock se actualiza.

**Criterios de Aceptación (implementa TODOS):**

- [ ] DADO solicitudes aprobadas con fecha_entrega ≤ hoy CUANDO el Almacenero accede a Recepción ENTONCES ve lista de pedidos **pendientes de recibir** (no los ya completados).
- [ ] DADO pedido seleccionado en la lista CUANDO el Almacenero accede al detalle ENTONCES ve: producto, cantidad esperada, proveedor y fecha de aprobación.
- [ ] DADO mercadería verificada físicamente CUANDO confirma recepción ENTONCES: stock aumenta en `cantidad_solicitada` Y `solicitudes_reposicion.estado` cambia a `'Completada'`.

**Tareas Técnicas:**

```sql
-- 1. El estado 'Completada' puede no existir en el CHECK constraint de solicitudes_reposicion
-- Verificar e incorporar si es necesario:
-- Si el campo estado tiene CHECK constraint, actualizarlo:
ALTER TABLE solicitudes_reposicion 
  DROP CONSTRAINT IF EXISTS solicitudes_reposicion_estado_check;
ALTER TABLE solicitudes_reposicion
  ADD CONSTRAINT solicitudes_reposicion_estado_check 
  CHECK (estado IN ('Pendiente', 'Aprobada', 'Rechazada', 'Completada'));

-- 2. La recepción debe registrarse también en entradas_mercaderia (tabla del Sprint 2)
-- para mantener coherencia del historial de entradas
```

```
-- 3. Backend

GET /almacen/recepciones
  - SELECT solicitudes donde estado = 'Aprobada'
  - JOIN con productos, proveedores
  - Ordenar por fecha_procesada ASC (las más urgentes primero)
  - Opcional: filtrar fecha_procesada <= hoy para mostrar las "debidas hoy"
  
Respuesta de cada item:
{
  solicitud_id, producto_id, nombre_producto, cantidad_solicitada,
  proveedor, fecha_aprobada, fecha_entrega_esperada
}

PATCH /almacen/solicitudes/:id/completar
  Body: { cantidad_recibida? }  // por defecto = cantidad_solicitada
  - Verificar que la solicitud existe y está en estado 'Aprobada'
  - En transacción atómica:
    a) UPDATE solicitudes_reposicion SET estado = 'Completada', fecha_procesada = NOW()
    b) UPDATE productos SET stock = stock + cantidad_solicitada WHERE id = producto_id
    c) INSERT en entradas_mercaderia (reutilizar tabla Sprint 2):
       { producto_id, proveedor_id, cantidad: cantidad_recibida, 
         usuario_id: req.user.id, observacion: 'Recepción de pedido #' + solicitud_id }
    d) Crear notificación al Gerente: "Pedido #ID recibido conforme por {almacenero}"
  - Responder: { message: "Recepción confirmada. Stock actualizado.", nuevo_stock: X }
```

```
-- 4. Frontend — Panel de Recepción

Vista "Recepciones Pendientes":
  - Tabla con: Nº Pedido | Producto | Cantidad | Proveedor | Fecha Aprobada | Acción
  - Botón "Confirmar Recepción" por fila
  - Al presionar: dialog de confirmación con detalle del pedido
    "¿Confirmar recepción de 50 unidades de [Producto] del proveedor [Proveedor]?"
  - Si la cantidad recibida difiere → campo editable "Cantidad realmente recibida"
  - Tras confirmar → fila desaparece de la lista (pasa a Completada)
  - Mensaje de éxito: "Recepción registrada. Stock actualizado correctamente."
  - Si lista vacía → "No hay pedidos pendientes de recibir"
```

**Definición de Hecho:**
- Panel de recepción muestra solo solicitudes en estado Aprobada
- Stock se incrementa correctamente al confirmar
- Estado de solicitud cambia a Completada en BD
- Entrada registrada en historial de entradas (tabla Sprint 2)
- Notificación enviada al Gerente

---

### ✅ HU-20 | EP-05 | SP: 2 | Prioridad: MEDIUM

**Enunciado:**  
Como Almacenero, quiero ver una alerta visual en el menú con pedidos listos para recibir hoy, para priorizar el ingreso de mercadería.

**CONTEXTO:** Depende de HU-13 (el endpoint de recepciones ya existe). Esta HU agrega el badge de notificación en el menú lateral/principal.

**Criterios de Aceptación (implementa TODOS):**

- [ ] DADO solicitudes aprobadas con fecha_entrega ≤ hoy CUANDO el Almacenero carga cualquier pantalla ENTONCES el ítem "Recepción" en el menú muestra un **badge numérico** con la cantidad de pedidos pendientes.
- [ ] DADO sin pedidos pendientes de recibir hoy CUANDO carga la pantalla ENTONCES el ítem "Recepción" se muestra con **estilo normal** (sin badge).

**Tareas Técnicas:**

```
-- 1. Backend

GET /almacen/recepciones/pendientes/count
  - SELECT COUNT(*) FROM solicitudes_reposicion 
    WHERE estado = 'Aprobada' 
    AND (fecha_procesada IS NULL OR DATE(fecha_procesada) <= CURRENT_DATE)
  - Responder: { count: 3 }
  - Este endpoint debe ser MUY rápido (solo un COUNT, sin JOINs innecesarios)
  - Cachear en backend por máximo 30 segundos si el sistema tiene cache layer
```

```
-- 2. Frontend

Al montar el Layout/Sidebar (componente que siempre está presente):
  - Llamar a GET /almacen/recepciones/pendientes/count
  - Solo hacerlo si el usuario tiene rol 'Almacenero'
  - Si count > 0:
    → Mostrar badge rojo/naranja con el número sobre el ítem "Recepción" del menú
    → Si count > 9 → mostrar "9+"
  - Si count === 0: ítem de menú normal, sin badge

Actualización del conteo:
  - Volver a llamar al endpoint cada vez que se confirma una recepción (HU-13)
  - O con polling cada 60 segundos si el sistema lo soporta
  - Al navegar entre páginas, el conteo debe persistir (guardar en estado global/contexto)

Estilo sugerido del badge:
  - Pequeño círculo rojo posicionado en esquina superior derecha del ítem de menú
  - Fondo: #EF4444 (rojo), texto blanco, border-radius: 9999px
  - Tamaño: min-width 18px, font-size: 11px
```

**Definición de Hecho:**
- Badge numérico visible en menú para el Almacenero
- El conteo se actualiza al confirmar una recepción (HU-13)
- Sin badge cuando no hay pedidos pendientes

---

### ✅ HU-18 | EP-06 | SP: 3 | Prioridad: HIGH

**Enunciado:**  
Como Vendedor, quiero buscar productos por nombre, marca o categoría desde el POS, para agilizar la atención al cliente.

**CONTEXTO:** Depende de HU-09 (tabla `categorias` ya creada). Esta búsqueda es en el punto de venta (POS), diferente al inventario del Almacenero.

**Criterios de Aceptación (implementa TODOS):**

- [ ] DADO nombre ingresado CUANDO busca ENTONCES muestra coincidencias **en tiempo real** con stock y precio (no esperar a presionar Enter).
- [ ] DADO categoría seleccionada CUANDO filtra ENTONCES lista **todos** los productos activos de esa categoría (con stock > 0).
- [ ] DADO búsqueda sin coincidencias CUANDO ejecuta ENTONCES muestra `"Producto no encontrado"`.

**Tareas Técnicas:**

```
-- 1. Backend

GET /ventas/productos/buscar?q=samsung&categoria_id=1
  - Solo devuelve productos con: activo = true AND stock > 0
  - Búsqueda por q: ILIKE '%samsung%' en nombre, marca
  - Si se envía categoria_id: filtrar también por categoría
  - Debounce ya se maneja en frontend; el backend simplemente responde rápido
  - Caché de 5 segundos en servidor (si se usa Redis o similar):
    key: `busqueda:${q}:${categoria_id}`, TTL: 5
  - Si no hay cache layer: simplemente optimizar el query con índices (ya creados en HU-09)
  
Respuesta por producto:
{
  id, nombre, marca, categoria_id, categoria_nombre,
  precio_venta, stock, unidad_medida,
  alerta_stock: stock <= 5  // reutilizar lógica del Sprint 2
}

Limitar resultados: máximo 20 productos por búsqueda (paginación o LIMIT 20)

-- Autorización: solo rol Vendedor y Admin pueden acceder a esta ruta
-- Esta ruta es DIFERENTE de GET /almacen/productos — no mezclarlas
```

```
-- 2. Frontend — Buscador POS

Componente SearchBar en el módulo de ventas/POS:
  - Input de texto con placeholder "Buscar por nombre o marca..."
  - Dropdown de categoría (se puebla con GET /almacen/categorias del HU-09)
  - DEBOUNCE de 300ms: no hacer fetch en cada tecla, sino 300ms después de la última tecla

Implementación del debounce:
  // React
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  useEffect(() => {
    if (debouncedQuery.length >= 2 || categoriaId) {
      fetchProductos(debouncedQuery, categoriaId);
    }
  }, [debouncedQuery, categoriaId]);

  // O con un hook useDebounce simple:
  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
  }

Resultados mostrados como lista/cards debajo del input:
  - Nombre del producto | Marca | Categoría | Precio | Stock (con indicador de color)
  - Botón "+ Agregar al carrito" por producto (deshabilitado si stock = 0)
  - Si resultado vacío → "Producto no encontrado"
  - Máximo mostrar 10-15 resultados con scroll
```

**Definición de Hecho:**
- Búsqueda en tiempo real funcional (empieza a buscar desde 2 caracteres)
- Solo muestra productos activos con stock > 0
- Debounce de 300ms implementado
- Filtro por categoría funcional

---

### ✅ HU-19 | EP-06 | SP: 2 | Prioridad: MEDIUM

**Enunciado:**  
Como Vendedor, quiero consultar el stock disponible de un producto mientras atiendo al cliente, para informar con precisión sobre disponibilidad.

**CONTEXTO:** Esta HU extiende HU-18. No crea endpoints nuevos, mejora la visualización del stock en los resultados de búsqueda del POS.

**Criterios de Aceptación (implementa TODOS):**

- [ ] DADO producto con stock > 5 CUANDO consulta ENTONCES muestra stock con indicador **verde**.
- [ ] DADO stock ≤ 5 CUANDO consulta ENTONCES muestra stock con alerta **amarilla** y texto `"Stock bajo"`.
- [ ] DADO stock = 0 CUANDO busca ENTONCES muestra `"Sin stock disponible"` en **rojo** y el botón "Agregar" está **deshabilitado**.

**Tareas Técnicas:**

```
-- 1. Backend: Verificar que el endpoint GET /ventas/productos/buscar (HU-18)
-- ya devuelve el campo stock en la respuesta. Si no, agregarlo.
-- Asegurar que el campo sea siempre el stock actual (sincronizado con tabla productos)
-- No cachear el stock por más de 5 segundos (puede cambiar con cada venta)

-- 2. La lógica de colores (verde/amarillo/rojo) es 100% de FRONTEND
-- Reutiliza la misma constante UMBRAL_STOCK_BAJO del Sprint 2 (probablemente en config o constants)
```

```
-- 3. Frontend — Indicador visual de stock

Función helper (reutilizable en todo el proyecto):
  function getStockStatus(stock) {
    if (stock === 0) return { color: 'red',    label: 'Sin stock',  disabled: true  };
    if (stock <= 5)  return { color: 'yellow', label: 'Stock bajo', disabled: false };
    return           { color: 'green',  label: `${stock} disponibles`, disabled: false };
  }

En cada card/fila de resultado de búsqueda:
  const status = getStockStatus(producto.stock);
  
  // Badge de stock:
  <span class={`badge badge-${status.color}`}>
    {status.color === 'red' ? '⛔ Sin stock disponible' : 
     status.color === 'yellow' ? `⚠️ Stock bajo: ${producto.stock}` :
     `✅ ${producto.stock} disponibles`}
  </span>
  
  // Botón agregar:
  <button disabled={status.disabled} onClick={() => agregarAlCarrito(producto)}>
    {status.disabled ? 'Sin stock' : '+ Agregar'}
  </button>

Colores CSS:
  - Verde:    background #D1FAE5, text #065F46  (Tailwind: bg-green-100 text-green-800)
  - Amarillo: background #FEF3C7, text #92400E  (Tailwind: bg-yellow-100 text-yellow-800)
  - Rojo:     background #FEE2E2, text #991B1B  (Tailwind: bg-red-100 text-red-800)

Sincronización:
  - Si el Vendedor tiene la pantalla abierta mucho tiempo, el stock mostrado puede quedar desactualizado
  - Al hacer click en "Agregar", re-consultar stock antes de agregar al carrito
  - Si stock cambió a 0 entre la búsqueda y el click → mostrar "Este producto se agotó"
```

**Definición de Hecho:**
- Indicador de stock con colores correctos visible en resultados de búsqueda POS
- Botón "Agregar" deshabilitado correctamente cuando stock = 0
- Sincronización básica de stock al momento de agregar al carrito

---

## 🗄️ TABLAS NUEVAS EN SPRINT 3

```sql
-- Solo estas 2 tablas son nuevas en Sprint 3:

-- 1. categorias (creada en HU-09)
CREATE TABLE IF NOT EXISTS categorias (
  id     SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  activo BOOLEAN DEFAULT true
);

-- 2. auditoria (creada en HU-08)
CREATE TABLE IF NOT EXISTS auditoria (
  id          SERIAL PRIMARY KEY,
  tabla       VARCHAR(50) NOT NULL,
  registro_id INTEGER NOT NULL,
  accion      VARCHAR(50) NOT NULL,
  descripcion TEXT,
  usuario_id  INTEGER REFERENCES usuarios(id),
  created_at  TIMESTAMP DEFAULT NOW()
);
```

**Modificaciones a tablas existentes (Sprint 3):**

```sql
-- usuarios (para HU-02):
ALTER TABLE usuarios 
  ADD COLUMN IF NOT EXISTS reset_code VARCHAR(4),
  ADD COLUMN IF NOT EXISTS reset_expiry TIMESTAMP;

-- productos (para HU-09):
ALTER TABLE productos 
  ADD COLUMN IF NOT EXISTS categoria_id INTEGER REFERENCES categorias(id),
  ADD COLUMN IF NOT EXISTS marca VARCHAR(100);

-- solicitudes_reposicion (para HU-13): agregar 'Completada' al CHECK
ALTER TABLE solicitudes_reposicion 
  DROP CONSTRAINT IF EXISTS solicitudes_reposicion_estado_check;
ALTER TABLE solicitudes_reposicion
  ADD CONSTRAINT solicitudes_reposicion_estado_check 
  CHECK (estado IN ('Pendiente', 'Aprobada', 'Rechazada', 'Completada'));
```

---

## 🔒 TABLA DE PERMISOS — SPRINT 3

| Ruta / Módulo                              | Almacenero | Gerente | Vendedor | Admin |
|--------------------------------------------|:----------:|:-------:|:--------:|:-----:|
| POST /auth/forgot-password                  | ✅ (todos) | ✅      | ✅       | ✅    |
| POST /auth/reset-password                   | ✅ (todos) | ✅      | ✅       | ✅    |
| GET  /almacen/productos (con filtros HU-09) | ✅         | ✅      | ❌       | ✅    |
| GET  /almacen/categorias                    | ✅         | ✅      | ✅       | ✅    |
| GET  /almacen/productos/inactivos           | ✅         | ✅      | ❌       | ✅    |
| PATCH /almacen/productos/:id/reactivar      | ✅         | ❌      | ❌       | ✅    |
| GET  /almacen/solicitudes/historial         | ✅         | ❌      | ❌       | ✅    |
| GET  /almacen/recepciones                   | ✅         | ❌      | ❌       | ✅    |
| PATCH /almacen/solicitudes/:id/completar    | ✅         | ❌      | ❌       | ✅    |
| GET  /almacen/recepciones/pendientes/count  | ✅         | ❌      | ❌       | ✅    |
| GET  /ventas/productos/buscar               | ❌         | ❌      | ✅       | ✅    |

---

## 🧪 CHECKLIST DE VERIFICACIÓN POR HU

```bash
# HU-02: Probar flujo completo de reset
curl -X POST /auth/forgot-password -d '{"email":"test@test.com"}'
# → 200 OK con mensaje genérico
# Verificar en BD: SELECT reset_code, reset_expiry FROM usuarios WHERE email = 'test@test.com';
# Probar con código correcto → contraseña cambiada
# Probar con código expirado → error 400

# HU-09: Probar filtros
curl "/almacen/productos?categoria_id=1"
# → Solo productos de esa categoría
curl "/almacen/productos?marca=Samsung&categoria_id=1"
# → Filtro combinado funciona
curl "/almacen/productos?marca=MarcaQueNoExiste"
# → Respuesta con array vacío (no error)

# HU-08: Probar reactivación
curl "/almacen/productos/inactivos"
# → Lista de inactivos
curl -X PATCH "/almacen/productos/5/reactivar"
# → Producto 5 aparece en /almacen/productos (activos)
# Verificar en auditoria: SELECT * FROM auditoria WHERE registro_id = 5;

# HU-13: Probar recepción completa
curl "/almacen/recepciones"
# → Lista solicitudes en estado Aprobada
curl -X PATCH "/almacen/solicitudes/3/completar"
# Verificar: SELECT estado FROM solicitudes_reposicion WHERE id = 3;  → Completada
# Verificar: SELECT stock FROM productos WHERE id = [producto_id];  → stock aumentó
# Verificar: SELECT * FROM entradas_mercaderia ORDER BY id DESC LIMIT 1;  → nueva entrada

# HU-20: Probar badge
curl "/almacen/recepciones/pendientes/count"
# → { count: N }

# HU-18: Probar búsqueda POS
curl "/ventas/productos/buscar?q=sam"
# → Resultados que contienen "sam" en nombre o marca, con stock > 0
curl "/ventas/productos/buscar?categoria_id=1"
# → Todos los productos de esa categoría con stock > 0

# HU-19: Verificar campo stock en respuesta de HU-18
# El mismo curl anterior debe incluir: stock, precio_venta en cada producto
```

---

## 📁 ARCHIVOS NUEVOS A CREAR EN SPRINT 3

```
/src
  /routes
    auth.routes.js          ← Extender con /forgot-password y /reset-password (HU-02)
    pos.routes.js           ← Nueva: endpoints del Vendedor (HU-18, HU-19)
  /controllers
    auth.controller.js      ← Extender o crear si no existe (HU-02)
    pos.controller.js       ← Nueva (HU-18, HU-19)
    recepciones.controller.js ← Nueva (HU-13, HU-20)
  /services
    email.service.js        ← Nueva: lógica SMTP/nodemailer (HU-02)
  /models
    Categoria.js            ← Nueva (HU-09)
    Auditoria.js            ← Nueva (HU-08)
  /migrations
    005_add_reset_fields_to_usuarios.sql   ← HU-02
    006_create_categorias.sql              ← HU-09
    007_add_categoria_marca_to_productos.sql ← HU-09
    008_create_auditoria.sql               ← HU-08
    009_add_completada_to_solicitudes.sql  ← HU-13
  /frontend/src
    /pages
      RecuperarPassword.jsx  ← Nueva (HU-02)
      ProductosInactivos.jsx ← Nueva (HU-08) o pestaña en Inventario.jsx
      BuscadorPOS.jsx        ← Nueva o componente en la vista de ventas (HU-18, HU-19)
      RecepcionesPendientes.jsx ← Nueva (HU-13)
      HistorialSolicitudes.jsx  ← Nueva (HU-14)
    /components
      StockBadge.jsx         ← Componente reutilizable (HU-19)
      MenuBadge.jsx          ← Badge del menú (HU-20)
      FiltrosInventario.jsx  ← Filtros categoría/marca (HU-09)
    /hooks
      useDebounce.js         ← Hook reutilizable (HU-18)
    /utils
      stockHelpers.js        ← getStockStatus() y constantes (HU-19)
```

---

## 🚨 ERRORES COMUNES — SPRINT 3

1. **NO recrear la tabla `solicitudes_reposicion`** para agregar 'Completada'. Usa `ALTER TABLE`.
2. **NO hardcodear credenciales SMTP** en el código. Usar `.env` y variables de entorno.
3. **NO reutilizar el endpoint `/almacen/productos`** del Almacenero para el Vendedor. Son rutas separadas con permisos distintos.
4. **NO devolver la contraseña o reset_code en ninguna respuesta JSON** (aunque sea en texto plano).
5. **NO confirmar si un email existe o no** en `/forgot-password` (responder siempre con el mismo mensaje).
6. **NO olvidar limpiar** `reset_code` y `reset_expiry` tras un reset exitoso.
7. **El debounce** va en el frontend. El backend no debe limitarse — responde a cada request que llegue.

---

## ✅ DEFINICIÓN DE SPRINT 3 COMPLETO

El Sprint 3 está cerrado cuando:

- [ ] HU-02: Flujo reset password funciona end-to-end (solicitar → recibir código → nueva contraseña)
- [ ] HU-09: Filtros por categoría y marca activos en inventario; tabla categorias precargada
- [ ] HU-08: Panel de inactivos visible; reactivación funcional con registro en auditoría
- [ ] HU-14: Historial de solicitudes con colores por estado y filtros de fecha
- [ ] HU-13: Panel de recepciones con confirmación; stock actualiza y estado pasa a Completada
- [ ] HU-20: Badge numérico en menú para Almacenero; se actualiza tras recepciones
- [ ] HU-18: Búsqueda POS en tiempo real con debounce 300ms; solo productos activos con stock
- [ ] HU-19: Indicadores de stock verde/amarillo/rojo; botón Agregar deshabilitado con stock = 0
- [ ] Todas las rutas protegidas por rol correcto
- [ ] 2 nuevas tablas creadas (`categorias`, `auditoria`)
- [ ] 3 ALTER TABLE ejecutados sobre tablas existentes
- [ ] Sin errores en consola de servidor ni de navegador

---

*Prompt Maestro Sprint 3 — Sistema de Ventas*  
*Repo: https://github.com/sgoicocheav3-design/sistema-de-ventas/tree/master*  
*Sprint 2 ya implementado — No recrear lo que ya existe*
