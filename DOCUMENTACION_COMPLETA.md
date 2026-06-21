# 📊 SISTEMA DE VENTAS - CONFIGURACIÓN COMPLETA

## ✅ STATUS GENERAL: TODO FUNCIONAL

Todos los módulos de movimientos de inventario y comprobantes han sido **implementados y configurados**:

---

## 🏗️ ARQUITECTURA

### Backend (Node.js + Express + Prisma)
- **URL**: http://localhost:4000
- **Base de Datos**: PostgreSQL (minimarket_db)

### Frontend (React + Vite)
- **URL**: http://localhost:5173
- **Builder**: Vite
- **Componentes**: Shadcn/ui + Tailwind CSS

---

## 🗄️ MÓDULOS IMPLEMENTADOS

### 1️⃣ **ALMACÉN - Movimientos de Inventario**

#### 📥 Entradas de Mercadería
- **Ruta**: `POST /api/almacen/entradas`
- **Controlador**: `src/controllers/entradas.controller.js` ✅
- **Funcionalidad**:
  - Registra entrada de productos desde proveedores
  - Incrementa stock automáticamente (transacción atómica)
  - Valida cantidad > 0 y existencia de proveedor
  - Historial filtrable por fecha y producto
- **Frontend**: Modal en ProductosPage.jsx con selector de proveedor y cantidad
- **Historial**: Página `/almacen/historial-entradas` con tabla completa

#### 📤 Baja de Inventario  
- **Ruta**: `POST /api/almacen/bajas`
- **Controlador**: `src/controllers/bajas.controller.js` ✅
- **Funcionalidad**:
  - Descuenta stock (transacción atómica)
  - Motivos: Vencido, Dañado, Robo/Pérdida, Otro
  - Valida que cantidad ≤ stock disponible
  - Error descriptivo si stock insuficiente
- **Frontend**: Modal en ProductosPage.jsx con selector de motivo
- **Historial**: Página `/almacen/historial-bajas` con tabla completa

#### ⚠️ Alertas de Vencimiento
- **Ruta**: `GET /api/almacen/productos/vencimiento-proximo?dias=7`
- **Controlador**: `src/controllers/productos.controller.js::vencimientoProximo()` ✅
- **Funcionalidad**:
  - Retorna productos que vencen en ≤ 7 días
  - Banner naranja en ProductosPage.jsx con lista de productos próximos a vencer
  - Cuenta regresiva en días
  - Alerta si ya está vencido

---

### 2️⃣ **POS - Punto de Venta**

#### 💳 Sistema de Ventas
- **Ruta**: `POST /api/ventas`
- **Controlador**: `src/controllers/ventas.controller.js::crearVenta()` ✅
- **Funcionalidad**:
  - Crea venta con transacción atómica (5 pasos)
  - Valida stock disponible para cada item
  - Calcula: subtotal, IGV (18%), total, vuelto
  - Métodos de pago: EFECTIVO, YAPE, PLIN, TARJETA, CHEQUE, TRANSFERENCIA
  - Genera número único de comprobante
  - Descuenta stock automáticamente
- **Frontend**: PosPage.jsx con:
  - Búsqueda de productos (ILIKE en nombre, marca, categoría)
  - Carrito editable
  - Validación de monto en efectivo
  - Modal de éxito con resumen

#### 📄 Comprobantes
- **Ruta**: `GET /api/ventas/:id/comprobante`
- **Controlador**: `src/controllers/ventas.controller.js::comprobante()` ✅
- **Funcionalidad**:
  - Retorna datos completos de venta para impresión
  - Incluye detalles de productos, totales, método de pago
- **Frontend PDF**: 
  - Descargar PDF con pdfmake (`usePdfComprobante.js` hook)
  - Comprobante térmico 80mm formato
  - Incluye: negocio, fecha/hora, productos, subtotal, IGV, total, método de pago, vuelto

---

## 👥 USUARIOS DE PRUEBA

| Email | Contraseña | Rol | Acceso |
|-------|-----------|-----|--------|
| admin@minimarket.com | Admin1234! | ADMIN | Todo |
| gerente@minimarket.com | Gerente1234! | GERENTE | Reportes, dashboard |
| vendedor@minimarket.com | Vendedor1234! | VENDEDOR | POS, buscar productos |
| maria@minimarket.com | Vendedor1234! | VENDEDOR | POS, buscar productos |
| almacenero@minimarket.com | Almacen1234! | ALMACENERO | Inventario, entradas, bajas |

---

## 📦 DATOS DE PRUEBA

✅ **5 Categorías**: Bebidas, Snacks, Lácteos, Limpieza, Panadería
✅ **3 Proveedores**: Bebidas del Perú, Snacks Premium, Lacteos Andinos
✅ **10 Productos**: Coca Cola, Inca Kola, Doritos, Lay's, Leche Gloria, Queso, Detergentes, etc.

---

## 🔗 ENDPOINTS DISPONIBLES

### Autenticación
- `POST /api/auth/login` - Iniciar sesión

### Almacén
- `GET /api/almacen/productos` - Listar productos
- `GET /api/almacen/productos/inactivos` - Listar inactivos
- `GET /api/almacen/productos/vencimiento-proximo?dias=7` - Alertas
- `POST /api/almacen/productos` - Crear producto
- `PUT /api/almacen/productos/:id` - Editar producto
- `DELETE /api/almacen/productos/:id` - Desactivar
- `PATCH /api/almacen/productos/:id/reactivar` - Reactivar
- `POST /api/almacen/entradas` - Registrar entrada
- `GET /api/almacen/entradas` - Historial entradas
- `POST /api/almacen/bajas` - Registrar baja
- `GET /api/almacen/bajas` - Historial bajas

### Ventas
- `GET /api/ventas/productos/buscar?q=&categoria=` - Buscar POS
- `POST /api/ventas` - Crear venta
- `GET /api/ventas/:id/comprobante` - Obtener comprobante

### Admin
- `GET /api/admin/usuarios` - Listar usuarios
- `POST /api/admin/usuarios` - Crear usuario
- `PUT /api/admin/usuarios/:id` - Editar usuario
- `DELETE /api/admin/usuarios/:id` - Desactivar usuario
- `PATCH /api/admin/usuarios/:id/reactivar` - Reactivar usuario
- `GET /api/admin/proveedores` - Listar proveedores
- `POST /api/admin/proveedores` - Crear proveedor
- `PUT /api/admin/proveedores/:id` - Editar proveedor
- `DELETE /api/admin/proveedores/:id` - Desactivar proveedor

### Otros
- `GET /api/categorias` - Listar categorías (público)
- `GET /api/dashboard/...` - Reportes
- `GET /health` - Health check

---

## 🎨 FLUJOS DE USUARIO

### 📥 Almacenero - Registrar Entrada
1. Ir a Almacén → Productos
2. Buscar producto
3. Click en botón "Entrada" (flecha verde hacia abajo)
4. Seleccionar proveedor
5. Ingresar cantidad
6. Confirmar → Stock se incrementa automáticamente

### 📤 Almacenero - Registrar Baja
1. Ir a Almacén → Productos
2. Buscar producto
3. Click en botón "Baja" (flecha naranja hacia arriba)
4. Seleccionar motivo (Vencido/Dañado/etc)
5. Ingresar cantidad (validación máximo disponible)
6. Confirmar → Stock se decrementa automáticamente

### 🛒 Vendedor - Realizar Venta
1. Ir a POS (Almacén → Punto de Venta)
2. Buscar productos por nombre/marca
3. Click en productos para agregar al carrito
4. Ajustar cantidades si es necesario
5. Seleccionar método de pago
6. Si EFECTIVO: ingresar monto recibido
7. Click "Cobrar"
8. Modal de éxito con opción "Descargar PDF"
9. PDF se descarga con formato térmico 80mm

### ⚠️ Ver Alertas de Vencimiento
1. Ir a Almacén → Productos
2. Banner naranja en la parte superior si hay productos próximos a vencer
3. Click en producto para editar fecha de vencimiento

---

## 📊 BASE DE DATOS - ESQUEMA

```sql
-- Tablas principales
usuarios - Cuentas de usuario (ADMIN, GERENTE, VENDEDOR, ALMACENERO)
categorias - Categorías de productos
productos - Inventario (nombre, marca, precio, stock, vencimiento)
proveedores - Proveedores de mercadería

-- Ventas
ventas - Registro de transacciones
detalles_venta - Items de cada venta

-- Movimientos
entradas_mercaderia - Ingresos de stock
bajas_inventario - Salidas/pérdidas de stock
solicitudes_reposicion - Solicitudes de compra

-- Auditoría
log_accesos - Registro de logins
config_sistema - Configuración (umbrales)
```

---

## 🔐 SEGURIDAD

✅ JWT para autenticación
✅ Roles basado en control de acceso (RBAC)
✅ Middlewares de validación
✅ Transacciones atómicas para operaciones críticas
✅ Hash bcrypt para contraseñas

---

## 🚀 CÓMO INICIAR

### Terminal 1 - Backend
```powershell
cd "c:\Users\Stefano\Desktop\sistema de ventas\backend"
$env:DATABASE_URL="postgresql://minimarket_user:minimarket2026@localhost:5432/minimarket_db"
npm start
```

### Terminal 2 - Frontend
```powershell
cd "c:\Users\Stefano\Desktop\sistema de ventas\frontend"
npm run dev
```

### Acceder
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000

---

## 📝 ARCHIVOS CLAVE

### Backend
- `backend/prisma/schema.prisma` - Esquema BD
- `backend/src/controllers/entradas.controller.js`
- `backend/src/controllers/bajas.controller.js`
- `backend/src/controllers/productos.controller.js`
- `backend/src/controllers/ventas.controller.js`
- `backend/server.js` - Servidor principal

### Frontend
- `frontend/src/pages/almacen/ProductosPage.jsx` - Inventario + alertas
- `frontend/src/pages/almacen/HistorialEntradasPage.jsx`
- `frontend/src/pages/almacen/HistorialBajasPage.jsx`
- `frontend/src/pages/pos/PosPage.jsx` - Sistema de ventas
- `frontend/src/hooks/usePdfComprobante.js` - Descarga de PDF

---

## ✨ CARACTERÍSTICAS COMPLETADAS

- ✅ Gestión de entradas de mercadería con stock automático
- ✅ Gestión de bajas con motivos y validaciones
- ✅ Alertas de productos próximos a vencer
- ✅ Sistema POS completo con búsqueda y carrito
- ✅ Cálculo automático de impuestos (IGV 18%)
- ✅ Generación de comprobantes en PDF (formato térmico 80mm)
- ✅ Historial filtrable de entradas y bajas
- ✅ Transacciones atómicas para consistencia de datos
- ✅ Control de acceso basado en roles
- ✅ Auditoría de accesos
- ✅ Configuración de umbrales de alerta

---

**🎉 ¡SISTEMA COMPLETAMENTE FUNCIONAL!**

Todos los módulos de movimientos de inventario y comprobantes están implementados, configurados y listos para usar.
