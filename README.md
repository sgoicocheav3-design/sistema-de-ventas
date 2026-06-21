# 🛒 Minimarket System

Sistema de gestión para minimarket con módulos de ventas, inventario, reportes y control de acceso por roles.

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Backend | Node.js + Express + Prisma v7 |
| Base de Datos | PostgreSQL |
| Frontend | React + Vite + Tailwind CSS v4 |
| UI Components | shadcn/ui (Radix) |
| Auth | JWT (jsonwebtoken) |

## Roles de Usuario

| Rol | Permisos |
|-----|---------|
| **ADMIN** | Acceso total al sistema |
| **GERENTE** | Reportes, aprobación de solicitudes, configuración |
| **VENDEDOR** | Registro de ventas, búsqueda de productos/clientes |
| **ALMACENERO** | Inventario, entradas, bajas, solicitudes de reposición |

## Requisitos Previos

- Node.js >= 18
- PostgreSQL >= 14
- npm >= 9

## Configuración

### 1. Clonar y configurar Backend

```bash
cd backend
# Editar .env con tus credenciales de PostgreSQL
# DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/minimarket_db"
```

### 2. Crear la base de datos PostgreSQL

```sql
CREATE DATABASE minimarket_db;
```

### 3. Ejecutar migración y seed

```bash
cd backend
npx prisma migrate dev --name init
node src/prisma/seed.js
```

### 4. Iniciar el backend

```bash
cd backend
npm run dev       # Servidor en http://localhost:4000
```

### 5. Iniciar el frontend

```bash
cd frontend
npm run dev       # App en http://localhost:5173
```

## Credenciales Iniciales (Seed)

> ⚠️ **Cambiar en producción**

| Usuario | Email | Contraseña |
|---------|-------|-----------|
| Administrador | admin@minimarket.com | Admin1234! |
| Gerente General | gerente@minimarket.com | Gerente1234! |

## Estructura del Proyecto

```
sistema de ventas/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Lógica de negocio
│   │   ├── routes/         # Endpoints Express
│   │   ├── middlewares/    # Auth, roles, error handler
│   │   └── prisma/
│   │       ├── schema.prisma
│   │       ├── client.js
│   │       ├── migrations/
│   │       └── seed.js
│   ├── prisma.config.ts    # Prisma v7 config
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/     # shadcn/ui + custom
    │   ├── pages/          # Vistas por módulo
    │   ├── hooks/          # Custom hooks
    │   ├── lib/            # axios, utils
    │   ├── routes/         # React Router
    │   └── store/          # AuthContext
    └── .env
```

## Variables de Entorno — Backend

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/minimarket_db"
JWT_SECRET="tu_secreto"
JWT_EXPIRES_IN=8h
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=correo@gmail.com
SMTP_PASS=app_password
PORT=4000
```
