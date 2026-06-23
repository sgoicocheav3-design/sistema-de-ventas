# 🤖 PROMPT MAESTRO — OpenCode: Sistema de Ventas Sprint 2
> Repositorio: https://github.com/sgoicocheav3-design/sistema-de-ventas/tree/master

---

## ⚠️ INSTRUCCIONES DE COMPORTAMIENTO PARA OPENCODE

Antes de escribir UNA SOLA línea de código, debes:

1. **Leer TODOS los archivos del repositorio** con `find . -type f | head -80` y `cat` de los archivos clave (package.json, schema, rutas existentes, modelos).
2. **Identificar el stack exacto** (Node/Express, Python/FastAPI, etc.), la base de datos (PostgreSQL, MySQL, SQLite), y el framework de frontend.
3. **Nunca asumir** nombres de tablas, columnas ni rutas. Busca primero.
4. **Implementar de forma incremental**: termina una HU completa (backend + frontend + validaciones) antes de pasar a la siguiente.
5. **Ejecutar migraciones atómicas**: cada nueva tabla debe tener su script de migración separado, nunca editar tablas existentes sin respaldo.
6. **No romper código existente**: antes de editar un archivo que ya existe, lee su contenido completo.
7. **Confirmar con tests manuales** (curl o equivalente) que cada endpoint funciona antes de cerrar esa HU.

---

## 📦 CONTEXTO DEL PROYECTO

Sistema de Ventas con roles: **Almacenero**, **Gerente** y **Vendedor**.  
Sprint activo: **Sprint 2**. Épicas involucradas: EP-03, EP-05, EP-06.

El trabajo a implementar son **6 Historias de Usuario** priorizadas. Respeta el orden de implementación que se indica abajo, ya que hay dependencias entre HUs.

---

## 📋 ORDEN DE IMPLEMENTACIÓN (respétalo)

```
1. HU-06 (Highest)  →  Entradas de mercadería
2. HU-05 (High)     →  Alertas visuales de stock bajo
3. HU-07 (High)     →  Bajas / mermas de inventario
4. HU-11 (High)     →  Solicitudes de reposición
5. HU-12 (High)     →  Aprobación de solicitudes (Gerente)
6. HU-17 (High)     →  Comprobantes de venta en PDF
```

---

## 🏗️ HISTORIAS DE USUARIO — ESPECIFICACIÓN COMPLETA

---

### ✅ HU-06 | EP-03 | SP: 5 | Prioridad: HIGHEST

**Enunciado:**  
Como Almacenero, quiero registrar entradas de mercadería indicando proveedor, producto y cantidad, para mantener el inventario actualizado.

**Criterios de Aceptación (implementa TODOS):**

- [ ] DADO proveedor y cantidad válidos CUANDO registra entrada ENTONCES incrementa stock en tabla `productos` Y crea registro en historial de entradas.
- [ ] DADO producto sin proveedor vinculado CUANDO selecciona ENTONCES muestra mensaje de error bloqueando el guardado (no se guarda nada).
- [ ] DADO cantidad igual a cero o negativa CUANDO intenta guardar ENTONCES muestra mensaje `"Cantidad debe ser mayor a cero"` y bloquea el guardado.

**Tareas Técnicas:**

```sql
-- 1. Crear tabla entradas_mercaderia
CREATE TABLE entradas_mercaderia (
  id            SERIAL PRIMARY KEY,
  producto_id   INTEGER NOT NULL REFERENCES productos(id),
  proveedor_id  INTEGER NOT NULL REFERENCES proveedores(id),
  cantidad      INTEGER NOT NULL CHECK (cantidad > 0),
  fecha         TIMESTAMP DEFAULT NOW(),
  usuario_id    INTEGER REFERENCES usuarios(id),
  observacion   TEXT
);
```

```
-- 2. Backend
POST /almacen/entradas
  Body: { producto_id, proveedor_id, cantidad, observacion? }
  - Validar que cantidad > 0
  - Validar que proveedor_id esté vinculado al producto (verificar relación en BD)
  - En transacción atómica:
      a) INSERT en entradas_mercaderia
      b) UPDATE productos SET stock = stock + cantidad WHERE id = producto_id
  - Retornar el nuevo stock actualizado

GET /almacen/entradas?fecha_inicio=&fecha_fin=
  - Historial paginado, filtrable por fecha
  - Join con productos y proveedores para mostrar nombres

-- 3. Frontend
Módulo "Registrar Entrada":
  - Selector de proveedor (autocomplete o dropdown)
  - Al seleccionar proveedor → cargar solo productos vinculados a ese proveedor
  - Campo cantidad (numérico, mínimo 1)
  - Campo observación (opcional)
  - Botón "Guardar" → POST /almacen/entradas
  - Mostrar stock actual antes y después del registro
  - Tabla de historial de entradas con filtro por fecha
```

**Definición de Hecho:**
- Stock se incrementa correctamente en BD tras cada entrada
- Historial de entradas visible en la UI con fecha, proveedor, producto y cantidad
- Validaciones de proveedor vinculado y cantidad > 0 activas y con mensajes claros
- Exportación del historial disponible (PDF o CSV)

---

### ✅ HU-05 | EP-03 | SP: 3 | Prioridad: HIGH

**Enunciado:**  
Como Almacenero, quiero ver alertas visuales cuando el stock sea ≤ 5 unidades, para anticipar reposiciones y evitar rupturas de stock.

**Criterios de Aceptación (implementa TODOS):**

- [ ] DADO stock ≤ 5 CUANDO carga la vista de inventario ENTONCES la fila del producto se resalta en **amarillo** con un ícono de alerta (⚠️ o similar).
- [ ] DADO stock > 5 CUANDO carga la vista de inventario ENTONCES la fila se muestra con estilo **normal** (sin resaltado).
- [ ] DADO filtro "Solo stock bajo" activo CUANDO el usuario lo ejecuta ENTONCES la tabla muestra **únicamente** los productos con stock ≤ 5.

**Tareas Técnicas:**

```sql
-- El umbral debe ser configurable (no hardcodeado en frontend).
-- Agregar columna o constante configurable en backend:
-- Por defecto: UMBRAL_STOCK_BAJO = 5

-- En la consulta SQL del inventario agregar:
SELECT 
  p.*,
  CASE WHEN p.stock <= 5 THEN true ELSE false END AS alerta_stock
FROM productos p
ORDER BY alerta_stock DESC, p.nombre ASC;

-- Para el filtro:
GET /almacen/inventario?solo_stock_bajo=true
  → WHERE stock <= [umbral configurable]
```

```
-- Backend
- Crear constante/variable configurable UMBRAL_STOCK_BAJO = 5
- El endpoint GET /almacen/inventario debe aceptar query param ?solo_stock_bajo=true
- Incluir campo booleano alerta_stock en la respuesta JSON

-- Frontend
- CSS/clase condicional: si alerta_stock === true → fila amarilla + ícono ⚠️
- Checkbox o toggle "Solo stock bajo" en el filtro superior de la tabla de inventario
- Al marcar el toggle → refetch con ?solo_stock_bajo=true
- Columna "Alerta" visible en exportación PDF/CSV del inventario
```

**Definición de Hecho:**
- Alerta visual amarilla visible en inventario para stock ≤ 5
- Filtro "Solo stock bajo" funcional
- Exportación del inventario incluye columna de alerta

---

### ✅ HU-07 | EP-03 | SP: 3 | Prioridad: HIGH

**Enunciado:**  
Como Almacenero, quiero registrar productos vencidos o dañados para reducir el stock, para evitar ventas de artículos no aptos y llevar historial de mermas.

**Criterios de Aceptación (implementa TODOS):**

- [ ] DADO motivo y cantidad válida CUANDO confirma la baja ENTONCES reduce el stock Y registra la baja con motivo, fecha y usuario.
- [ ] DADO cantidad ingresada mayor al stock actual CUANDO intenta guardar ENTONCES muestra `"Stock insuficiente: solo hay X unidades"` y **no** guarda nada.
- [ ] DADO administrador consulta bajas CUANDO genera reporte ENTONCES se muestran todas las bajas con: producto, cantidad, motivo, fecha y usuario responsable.

**Tareas Técnicas:**

```sql
-- 1. Crear tabla bajas_inventario
CREATE TABLE bajas_inventario (
  id            SERIAL PRIMARY KEY,
  producto_id   INTEGER NOT NULL REFERENCES productos(id),
  cantidad      INTEGER NOT NULL CHECK (cantidad > 0),
  motivo        VARCHAR(100) NOT NULL,  -- Ej: "Vencido", "Dañado", "Robo", "Otro"
  descripcion   TEXT,
  fecha         TIMESTAMP DEFAULT NOW(),
  usuario_id    INTEGER REFERENCES usuarios(id)
);
```

```
-- Backend
POST /almacen/bajas
  Body: { producto_id, cantidad, motivo, descripcion? }
  - Validar cantidad > 0
  - Verificar stock actual: SELECT stock FROM productos WHERE id = producto_id
  - Si cantidad > stock → Error 422: "Stock insuficiente: solo hay X unidades"
  - En transacción atómica (todo o nada):
      a) INSERT en bajas_inventario
      b) UPDATE productos SET stock = stock - cantidad WHERE id = producto_id
  - IMPORTANTE: usar BEGIN/COMMIT o transacción equivalente

GET /almacen/bajas
  - Lista todas las bajas con join a productos y usuarios
  - Exportable a PDF/CSV

-- Frontend
Módulo "Registrar Baja / Merma":
  - Selector de producto (muestra stock actual al seleccionar)
  - Selector de motivo (dropdown: Vencido, Dañado, Robo, Error, Otro)
  - Campo cantidad (numérico, máximo = stock actual del producto)
  - Campo descripción (opcional)
  - Botón "Confirmar Baja" con diálogo de confirmación antes de enviar
  - Historial de mermas en tabla separada
  - Botón exportar a PDF/CSV
```

**Definición de Hecho:**
- Baja reduce el stock correctamente en BD
- Historial de mermas visible con todos los campos requeridos
- Transacción atómica implementada (si falla el UPDATE, no se hace el INSERT)
- Validación de stock insuficiente con mensaje específico

---

### ✅ HU-11 | EP-05 | SP: 5 | Prioridad: HIGH

**Enunciado:**  
Como Almacenero, quiero filtrar productos con stock bajo y enviar solicitudes de reposición, para notificar necesidades urgentes al área de compras.

**NOTA:** Esta HU depende de HU-05 (umbral de stock bajo ya configurado).

**Criterios de Aceptación (implementa TODOS):**

- [ ] DADO stock ≤ 15 unidades CUANDO selecciona el filtro de stock crítico ENTONCES la tabla muestra solo productos críticos.
  > ⚠️ El umbral para SOLICITUDES es 15 (diferente al umbral de alerta visual que es 5).
- [ ] DADO producto(s) seleccionado(s) con cantidad válida CUANDO envía solicitud ENTONCES registra como **Pendiente** y envía notificación interna al Gerente.
- [ ] DADO ningún producto seleccionado CUANDO intenta enviar ENTONCES muestra `"Debe seleccionar al menos un producto"`.

**Tareas Técnicas:**

```sql
-- 1. Crear tabla solicitudes_reposicion
CREATE TABLE solicitudes_reposicion (
  id              SERIAL PRIMARY KEY,
  producto_id     INTEGER NOT NULL REFERENCES productos(id),
  cantidad_solicitada INTEGER NOT NULL CHECK (cantidad_solicitada > 0),
  estado          VARCHAR(20) DEFAULT 'Pendiente',  -- Pendiente, Aprobada, Rechazada
  proveedor_id    INTEGER REFERENCES proveedores(id),  -- se llena al aprobar
  fecha_solicitada TIMESTAMP DEFAULT NOW(),
  fecha_procesada  TIMESTAMP,
  almacenero_id   INTEGER REFERENCES usuarios(id),
  gerente_id      INTEGER REFERENCES usuarios(id),
  motivo_rechazo  TEXT
);
```

```
-- Backend
GET /almacen/solicitudes?solo_critico=true
  → Retorna productos con stock <= 15

POST /almacen/solicitudes
  Body: { items: [{ producto_id, cantidad_solicitada }] }
  - Validar que items no esté vacío
  - Validar que cada cantidad > 0
  - INSERT múltiple en solicitudes_reposicion con estado = 'Pendiente'
  - Crear notificación interna para todos los usuarios con rol 'Gerente'

GET /almacen/solicitudes (para historial del almacenero)
  - Lista solicitudes propias con estado y fecha

-- Sistema de notificaciones internas (si no existe, créalo):
CREATE TABLE notificaciones (
  id          SERIAL PRIMARY KEY,
  usuario_id  INTEGER REFERENCES usuarios(id),
  titulo      VARCHAR(200),
  mensaje     TEXT,
  leida       BOOLEAN DEFAULT false,
  creada_en   TIMESTAMP DEFAULT NOW()
);
```

```
-- Frontend
Vista "Solicitar Reposición":
  - Toggle "Mostrar solo críticos (stock ≤ 15)" activo por defecto
  - Tabla con checkboxes por producto (columnas: nombre, stock actual, cantidad a pedir)
  - Campo editable de cantidad_solicitada por cada fila seleccionada
  - Botón "Enviar Solicitud" → POST /almacen/solicitudes
  - Confirmación visual de éxito con número de solicitud generado
  - Historial de solicitudes enviadas con estado (badge: Pendiente/Aprobada/Rechazada)
```

**Definición de Hecho:**
- Solicitud registrada correctamente con estado "Pendiente"
- Notificación interna al Gerente creada
- Validación de selección mínima activa
- Historial de solicitudes visible para el almacenero

---

### ✅ HU-12 | EP-05 | SP: 5 | Prioridad: HIGH

**Enunciado:**  
Como Gerente, quiero aprobar (con proveedor y fecha) o rechazar solicitudes de reposición con motivo, para controlar el presupuesto y seleccionar proveedores.

**NOTA:** Esta HU depende de HU-11. Solo accesible para rol **Gerente**.

**Criterios de Aceptación (implementa TODOS):**

- [ ] DADO solicitud Pendiente CUANDO Gerente aprueba con proveedor y fecha ENTONCES estado cambia a **Aprobada** y se notifica al Almacenero.
- [ ] DADO motivo escrito CUANDO Gerente rechaza ENTONCES estado cambia a **Rechazada** y el Almacenero puede ver el motivo.
- [ ] DADO nota de rechazo escrita pero Gerente presiona "Aprobar" ENTONCES muestra advertencia: `"Hay una nota de rechazo escrita. ¿Confirmar aprobación?"`.

**Tareas Técnicas:**

```
-- Backend
PATCH /gerencia/solicitudes/:id/aprobar
  Body: { proveedor_id, fecha_entrega_esperada }
  - Validar que solicitud existe y está en estado 'Pendiente'
  - Validar que proveedor_id y fecha_entrega_esperada no sean nulos
  - UPDATE solicitudes_reposicion SET estado = 'Aprobada', proveedor_id = ?, fecha_procesada = NOW()
  - Crear notificación al almacenero que creó la solicitud

PATCH /gerencia/solicitudes/:id/rechazar
  Body: { motivo_rechazo }
  - Validar que motivo_rechazo no esté vacío (mínimo 10 caracteres)
  - UPDATE solicitudes_reposicion SET estado = 'Rechazada', motivo_rechazo = ?, fecha_procesada = NOW()
  - Crear notificación al almacenero con el motivo de rechazo

GET /gerencia/solicitudes?estado=Pendiente
  - Lista solicitudes con join a productos, almacenero y proveedor
  - Filtro por estado (Pendiente, Aprobada, Rechazada)

-- Middleware de autorización:
  - Las rutas /gerencia/* deben verificar que req.user.rol === 'Gerente'
  - Retornar 403 si el rol no coincide
```

```
-- Frontend (vista exclusiva para rol Gerente)
Vista "Gestión de Solicitudes":
  - Tabla de solicitudes Pendientes con columnas:
    ID | Producto | Stock actual | Cantidad solicitada | Almacenero | Fecha | Acciones
  - Botón "Aprobar" → abre modal con:
    - Selector de proveedor
    - Campo fecha de entrega esperada
    - Botón confirmar
  - Botón "Rechazar" → abre modal con:
    - Campo texto "Motivo de rechazo" (obligatorio)
    - Botón confirmar
  - Si el usuario escribe en el campo rechazo y luego presiona Aprobar → mostrar alerta de confirmación
  - Badge de estado con colores: Pendiente (amarillo), Aprobada (verde), Rechazada (rojo)
  - Filtro por estado en la tabla
```

**Definición de Hecho:**
- Aprobación y rechazo funcionan correctamente y cambian el estado en BD
- Notificación al almacenero activa en ambos casos
- Validaciones de campos obligatorios implementadas
- Ruta protegida por rol Gerente

---

### ✅ HU-17 | EP-06 | SP: 5 | Prioridad: HIGH

**Enunciado:**  
Como Vendedor, quiero emitir comprobantes de venta con detalle de compra al finalizar la transacción, para entregar constancia al cliente.

**Criterios de Aceptación (implementa TODOS):**

- [ ] DADO venta confirmada CUANDO imprime ENTONCES genera ticket con: fecha, productos, cantidades, total y método de pago.
- [ ] DADO cliente prefiere digital CUANDO genera PDF ENTONCES archivo disponible para descarga inmediata en el navegador.
- [ ] DADO comprobante histórico requerido CUANDO selecciona en historial de ventas ENTONCES regenera el comprobante con los datos originales de la venta.

**Tareas Técnicas:**

```
-- Backend
GET /ventas/:id/comprobante
  - Busca la venta por ID con todos sus items (join a productos)
  - Retorna JSON con estructura completa para el comprobante:
    {
      venta_id, fecha, vendedor, cliente (si aplica),
      items: [{ producto, cantidad, precio_unitario, subtotal }],
      subtotal, impuesto (si aplica), total,
      metodo_pago, numero_comprobante
    }

-- Si el sistema ya tiene un campo numero_comprobante en ventas, úsalo.
-- Si no, generarlo con formato: "COMP-{año}{mes}-{id}" ej: COMP-202506-0042

-- Frontend
Librería PDF: usar jsPDF (ya disponible como npm) o pdfmake.
NO usar soluciones de servidor para el PDF; generarlo en el cliente (browser).

Plantilla del comprobante debe incluir:
  - Header: nombre del negocio, logo (si existe), dirección, RUT/NIT
  - Número de comprobante y fecha
  - Tabla de productos: descripción | cant | precio unit | subtotal
  - Totales: subtotal, descuento (si aplica), impuesto (si aplica), TOTAL
  - Método de pago
  - Footer: "Gracias por su compra" + datos de contacto

Función de generación:
  async function generarComprobantePDF(ventaId: number): Promise<void>
  - Llama a GET /ventas/:id/comprobante
  - Genera el PDF con jsPDF
  - Abre ventana de impresión O descarga el archivo como "comprobante-{id}.pdf"

Compatibilidad con impresoras térmicas POS:
  - Ofrecer también una vista de impresión CSS optimizada (@media print)
  - Ancho máximo: 80mm para papel POS estándar
  - Fuente monoespaciada para tabla de productos

Reimpresión desde historial:
  - En la lista de ventas, cada fila tiene botón "🖨️ Reimprimir"
  - Llama a la misma función generarComprobantePDF(ventaId)
```

```javascript
// Ejemplo de integración jsPDF (adaptar al framework del proyecto):
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function generarPDF(datosVenta) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  
  doc.setFontSize(16);
  doc.text('COMPROBANTE DE VENTA', 105, 20, { align: 'center' });
  doc.setFontSize(10);
  doc.text(`N° ${datosVenta.numero_comprobante}`, 105, 28, { align: 'center' });
  doc.text(`Fecha: ${new Date(datosVenta.fecha).toLocaleString('es-CL')}`, 20, 36);
  
  doc.autoTable({
    startY: 45,
    head: [['Producto', 'Cant.', 'Precio Unit.', 'Subtotal']],
    body: datosVenta.items.map(i => [
      i.producto,
      i.cantidad,
      `$${i.precio_unitario.toLocaleString('es-CL')}`,
      `$${i.subtotal.toLocaleString('es-CL')}`
    ]),
  });
  
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.text(`TOTAL: $${datosVenta.total.toLocaleString('es-CL')}`, 160, finalY, { align: 'right' });
  doc.text(`Método de pago: ${datosVenta.metodo_pago}`, 20, finalY);
  
  doc.save(`comprobante-${datosVenta.venta_id}.pdf`);
}
```

**Definición de Hecho:**
- Comprobante en PDF generado correctamente con todos los campos requeridos
- Descarga funcional en el navegador
- Reimpresión desde historial operativa
- Vista de impresión térmica (80mm) disponible

---

## 🗄️ ESQUEMA DE BASE DE DATOS — RESUMEN DE TABLAS NUEVAS

```sql
-- Ejecutar en este orden (respetar dependencias de FK):

-- 1. entradas_mercaderia (depende de: productos, proveedores, usuarios)
-- 2. bajas_inventario    (depende de: productos, usuarios)
-- 3. solicitudes_reposicion (depende de: productos, proveedores, usuarios)
-- 4. notificaciones      (depende de: usuarios)
```

---

## 🔒 REGLAS DE SEGURIDAD Y ROLES

| Ruta / Módulo               | Almacenero | Gerente | Vendedor | Admin |
|-----------------------------|:----------:|:-------:|:--------:|:-----:|
| POST /almacen/entradas      | ✅         | ✅      | ❌       | ✅    |
| GET  /almacen/inventario    | ✅         | ✅      | ✅       | ✅    |
| POST /almacen/bajas         | ✅         | ✅      | ❌       | ✅    |
| POST /almacen/solicitudes   | ✅         | ❌      | ❌       | ✅    |
| PATCH /gerencia/solicitudes | ❌         | ✅      | ❌       | ✅    |
| GET  /ventas/:id/comprobante| ❌         | ✅      | ✅       | ✅    |

**Implementa middleware de verificación de rol en cada grupo de rutas.**

---

## 🧪 CHECKLIST DE VERIFICACIÓN ANTES DE CERRAR CADA HU

Para cada HU implementada, verifica:

```bash
# Verifica que la tabla existe:
\dt   # en psql, o equivalente

# Prueba el endpoint exitoso:
curl -X POST http://localhost:PORT/almacen/entradas \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"producto_id": 1, "proveedor_id": 1, "cantidad": 10}'

# Prueba la validación de error:
curl -X POST http://localhost:PORT/almacen/entradas \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"producto_id": 1, "proveedor_id": 1, "cantidad": 0}'
# Esperado: HTTP 422 con mensaje de error claro

# Verifica que el stock cambió:
# SELECT stock FROM productos WHERE id = 1;
```

---

## 📁 ESTRUCTURA SUGERIDA DE ARCHIVOS NUEVOS

```
/src
  /routes
    almacen.routes.js       ← HU-05, HU-06, HU-07, HU-11
    gerencia.routes.js      ← HU-12
    ventas.routes.js        ← HU-17 (añadir endpoint comprobante)
  /controllers
    almacen.controller.js
    gerencia.controller.js
    comprobante.controller.js
  /models
    EntradaMercaderia.js
    BajaInventario.js
    SolicitudReposicion.js
    Notificacion.js
  /migrations
    001_create_entradas_mercaderia.sql
    002_create_bajas_inventario.sql
    003_create_solicitudes_reposicion.sql
    004_create_notificaciones.sql
  /frontend/src
    /pages
      Inventario.jsx         ← Agregar alertas (HU-05)
      EntradaMercaderia.jsx  ← Nueva página (HU-06)
      BajaInventario.jsx     ← Nueva página (HU-07)
      SolicitudReposicion.jsx← Nueva página (HU-11)
      GestionSolicitudes.jsx ← Nueva página (HU-12, solo Gerente)
    /utils
      generarComprobante.js  ← Lógica PDF jsPDF (HU-17)
```

---

## 🚨 ERRORES COMUNES — EVÍTALOS

1. **NO hardcodear el umbral de stock** en el frontend. Usa una constante en backend.
2. **NO hacer múltiples UPDATE separados sin transacción**. Siempre usa BEGIN/COMMIT.
3. **NO modificar stock directamente desde el frontend**. Solo a través de los endpoints creados.
4. **NO asumir que el usuario autenticado siempre tiene todos los roles**. Verifica siempre.
5. **NO generar el PDF del lado del servidor** para HU-17. Usa jsPDF en el cliente.
6. **NO dejar solicitudes sin notificación**. Toda aprobación/rechazo debe notificar.

---

## ✅ DEFINICIÓN DE "SPRINT COMPLETO"

El Sprint 2 está completo cuando:

- [ ] Las 4 tablas nuevas están creadas en BD con sus scripts de migración
- [ ] Los 8 endpoints están implementados y probados
- [ ] Las 6 vistas/páginas de frontend están funcionando
- [ ] Los roles y permisos están aplicados en todas las rutas
- [ ] El PDF de comprobante se genera correctamente
- [ ] El sistema de notificaciones internas funciona
- [ ] Las alertas visuales de stock bajo son visibles en inventario
- [ ] No hay errores en consola ni en los logs del servidor

---

*Prompt generado para OpenCode — Sistema de Ventas Sprint 2*  
*Repo: https://github.com/sgoicocheav3-design/sistema-de-ventas/tree/master*
