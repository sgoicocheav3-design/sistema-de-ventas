// src/swagger.js
/**
 * Swagger/OpenAPI documentation for MiniMarket ERP API.
 * Uses swagger-ui-express with an inline spec (no YAML file needed).
 */
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = {
  openapi: '3.0.3',
  info: {
    title: 'MiniMarket ERP — API',
    version: '1.0.0',
    description:
      'API RESTful del Sistema ERP MiniMarket. Incluye autenticación JWT, gestión de usuarios, productos, inventario, ventas, reportes, auditoría y backups.',
    contact: { name: 'Equipo MiniMarket' },
  },
  servers: [
    { url: 'http://localhost:4000', description: 'Servidor local de desarrollo' },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Error: {
        type: 'object',
        properties: { message: { type: 'string' } },
      },
    },
  },
  security: [{ BearerAuth: [] }],
  tags: [
    { name: 'Auth', description: 'Autenticación y recuperación de contraseña' },
    { name: 'Dashboard', description: 'Estadísticas generales' },
    { name: 'Usuarios', description: 'Gestión de usuarios (ADMIN)' },
    { name: 'Proveedores', description: 'Gestión de proveedores (ADMIN)' },
    { name: 'Categorías', description: 'Categorías de producto' },
    { name: 'Productos', description: 'Gestión de productos (ALMACENERO/ADMIN)' },
    { name: 'Entradas', description: 'Entradas de mercadería' },
    { name: 'Bajas', description: 'Bajas de inventario' },
    { name: 'Solicitudes', description: 'Solicitudes de reposición (ALMACENERO)' },
    { name: 'Recepciones', description: 'Recepciones pendientes (ALMACENERO)' },
    { name: 'Gerencia - Solicitudes', description: 'Aprobación/rechazo (GERENTE)' },
    { name: 'Gerencia - Dashboard', description: 'KPIs y gráficos gerenciales' },
    { name: 'Ventas', description: 'Punto de venta' },
    { name: 'Clientes', description: 'Gestión de clientes' },
    { name: 'Reportes Admin', description: 'Reportes de ventas (ADMIN)' },
    { name: 'Reportes Gerencia', description: 'Cierre de caja (GERENTE)' },
    { name: 'Auditoría', description: 'Log de accesos (GERENTE/ADMIN)' },
    { name: 'Configuración', description: 'Configuración del sistema (ADMIN)' },
    { name: 'Backups', description: 'Backup y restauración (ADMIN)' },
  ],
  paths: {
    // ─── AUTH ──────────────────────────────────────────────────────────────
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Iniciar sesión',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Token JWT y datos del usuario' },
          401: { description: 'Credenciales inválidas' },
        },
      },
    },
    '/api/auth/forgot-password': {
      post: {
        tags: ['Auth'],
        summary: 'Solicitar código de recuperación',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email'],
                properties: { email: { type: 'string', format: 'email' } },
              },
            },
          },
        },
        responses: { 200: { description: 'Código enviado al email registrado' } },
      },
    },
    '/api/auth/reset-password': {
      post: {
        tags: ['Auth'],
        summary: 'Restablecer contraseña con código',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'code', 'newPassword'],
                properties: {
                  email: { type: 'string' },
                  code: { type: 'string' },
                  newPassword: { type: 'string' },
                },
              },
            },
          },
        },
        responses: { 200: { description: 'Contraseña actualizada' } },
      },
    },

    // ─── DASHBOARD ────────────────────────────────────────────────────────
    '/api/dashboard/stats': {
      get: {
        tags: ['Dashboard'],
        summary: 'Estadísticas generales del dashboard',
        responses: { 200: { description: 'Estadísticas' } },
      },
    },
    '/api/dashboard/chart': {
      get: {
        tags: ['Dashboard'],
        summary: 'Datos para gráfico del dashboard',
        responses: { 200: { description: 'Datos de gráfico' } },
      },
    },

    // ─── USUARIOS ─────────────────────────────────────────────────────────
    '/api/admin/usuarios': {
      get: {
        tags: ['Usuarios'],
        summary: 'Listar usuarios activos',
        responses: { 200: { description: 'Lista de usuarios' } },
      },
      post: {
        tags: ['Usuarios'],
        summary: 'Crear usuario',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['nombre', 'email', 'password', 'rol'],
                properties: {
                  nombre: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string', minLength: 6 },
                  rol: { type: 'string', enum: ['ADMIN', 'GERENTE', 'VENDEDOR', 'ALMACENERO'] },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Usuario creado' },
          409: { description: 'Email duplicado' },
        },
      },
    },
    '/api/admin/usuarios/{id}': {
      put: {
        tags: ['Usuarios'],
        summary: 'Editar usuario',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Usuario actualizado' } },
      },
      delete: {
        tags: ['Usuarios'],
        summary: 'Desactivar usuario (soft delete)',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Usuario desactivado' } },
      },
    },

    // ─── PROVEEDORES ──────────────────────────────────────────────────────
    '/api/admin/proveedores': {
      get: { tags: ['Proveedores'], summary: 'Listar proveedores', responses: { 200: { description: 'Lista' } } },
      post: { tags: ['Proveedores'], summary: 'Crear proveedor', responses: { 201: { description: 'Creado' } } },
    },
    '/api/admin/proveedores/{id}': {
      put: {
        tags: ['Proveedores'],
        summary: 'Editar proveedor',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Actualizado' } },
      },
      delete: {
        tags: ['Proveedores'],
        summary: 'Desactivar proveedor',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Desactivado' } },
      },
    },

    // ─── CATEGORÍAS ───────────────────────────────────────────────────────
    '/api/categorias': {
      get: {
        tags: ['Categorías'],
        summary: 'Listar categorías (requiere autenticación)',
        responses: { 200: { description: 'Lista de categorías' } },
      },
    },

    // ─── PRODUCTOS ────────────────────────────────────────────────────────
    '/api/almacen/productos': {
      get: {
        tags: ['Productos'],
        summary: 'Listar productos activos',
        parameters: [
          { name: 'categoria', in: 'query', schema: { type: 'integer' } },
          { name: 'marca', in: 'query', schema: { type: 'string' } },
          { name: 'stockBajo', in: 'query', schema: { type: 'string', enum: ['true', 'false'] } },
        ],
        responses: { 200: { description: 'Lista de productos con umbral' } },
      },
      post: {
        tags: ['Productos'],
        summary: 'Crear producto',
        responses: { 201: { description: 'Producto creado' } },
      },
    },
    '/api/almacen/productos/inactivos': {
      get: { tags: ['Productos'], summary: 'Listar productos inactivos', responses: { 200: { description: 'Lista' } } },
    },
    '/api/almacen/productos/vencimiento-proximo': {
      get: {
        tags: ['Productos'],
        summary: 'Productos con vencimiento próximo',
        parameters: [{ name: 'dias', in: 'query', schema: { type: 'integer', default: 7 } }],
        responses: { 200: { description: 'Lista' } },
      },
    },
    '/api/almacen/productos/{id}': {
      put: {
        tags: ['Productos'],
        summary: 'Editar producto',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Actualizado' } },
      },
      delete: {
        tags: ['Productos'],
        summary: 'Desactivar producto (soft delete)',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Desactivado' } },
      },
    },
    '/api/almacen/productos/{id}/reactivar': {
      patch: {
        tags: ['Productos'],
        summary: 'Reactivar producto',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Reactivado' } },
      },
    },

    // ─── ENTRADAS ─────────────────────────────────────────────────────────
    '/api/almacen/entradas': {
      get: {
        tags: ['Entradas'],
        summary: 'Historial de entradas de mercadería',
        parameters: [
          { name: 'desde', in: 'query', schema: { type: 'string', format: 'date' } },
          { name: 'hasta', in: 'query', schema: { type: 'string', format: 'date' } },
          { name: 'productoId', in: 'query', schema: { type: 'integer' } },
        ],
        responses: { 200: { description: 'Lista de entradas' } },
      },
      post: {
        tags: ['Entradas'],
        summary: 'Registrar entrada de mercadería',
        responses: { 201: { description: 'Entrada registrada (stock incrementado)' } },
      },
    },

    // ─── BAJAS ────────────────────────────────────────────────────────────
    '/api/almacen/bajas': {
      get: {
        tags: ['Bajas'],
        summary: 'Historial de bajas de inventario',
        parameters: [
          { name: 'desde', in: 'query', schema: { type: 'string', format: 'date' } },
          { name: 'hasta', in: 'query', schema: { type: 'string', format: 'date' } },
        ],
        responses: { 200: { description: 'Lista de bajas' } },
      },
      post: {
        tags: ['Bajas'],
        summary: 'Registrar baja de inventario',
        responses: { 201: { description: 'Baja registrada (stock decrementado)' } },
      },
    },

    // ─── SOLICITUDES (ALMACENERO) ─────────────────────────────────────────
    '/api/almacen/solicitudes': {
      post: {
        tags: ['Solicitudes'],
        summary: 'Crear solicitud de reposición',
        responses: { 201: { description: 'Solicitud creada' } },
      },
    },
    '/api/almacen/solicitudes/historial': {
      get: {
        tags: ['Solicitudes'],
        summary: 'Historial de solicitudes del almacenero',
        parameters: [
          { name: 'estado', in: 'query', schema: { type: 'string' } },
        ],
        responses: { 200: { description: 'Lista de solicitudes' } },
      },
    },
    '/api/almacen/solicitudes/{id}/completar': {
      patch: {
        tags: ['Solicitudes'],
        summary: 'Completar solicitud aprobada (incrementa stock)',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Solicitud completada' } },
      },
    },

    // ─── RECEPCIONES ──────────────────────────────────────────────────────
    '/api/almacen/recepciones/pendientes': {
      get: { tags: ['Recepciones'], summary: 'Recepciones pendientes', responses: { 200: { description: 'Lista' } } },
    },
    '/api/almacen/recepciones/pendientes/count': {
      get: { tags: ['Recepciones'], summary: 'Conteo de recepciones pendientes', responses: { 200: { description: '{ count }' } } },
    },

    // ─── GERENCIA - SOLICITUDES ───────────────────────────────────────────
    '/api/gerencia/solicitudes': {
      get: {
        tags: ['Gerencia - Solicitudes'],
        summary: 'Listar todas las solicitudes (GERENTE/ADMIN)',
        parameters: [{ name: 'estado', in: 'query', schema: { type: 'string' } }],
        responses: { 200: { description: 'Lista' } },
      },
    },
    '/api/gerencia/solicitudes/proveedores': {
      get: { tags: ['Gerencia - Solicitudes'], summary: 'Listar proveedores activos', responses: { 200: { description: 'Lista' } } },
    },
    '/api/gerencia/solicitudes/{id}/aprobar': {
      patch: {
        tags: ['Gerencia - Solicitudes'],
        summary: 'Aprobar solicitud',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Aprobada' } },
      },
    },
    '/api/gerencia/solicitudes/{id}/rechazar': {
      patch: {
        tags: ['Gerencia - Solicitudes'],
        summary: 'Rechazar solicitud',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Rechazada' } },
      },
    },

    // ─── GERENCIA - DASHBOARD ─────────────────────────────────────────────
    '/api/gerencia/dashboard/kpis': {
      get: { tags: ['Gerencia - Dashboard'], summary: 'KPIs gerenciales', responses: { 200: { description: 'KPIs' } } },
    },
    '/api/gerencia/dashboard/graficos': {
      get: { tags: ['Gerencia - Dashboard'], summary: 'Gráficos gerenciales', responses: { 200: { description: 'Datos' } } },
    },

    // ─── VENTAS ───────────────────────────────────────────────────────────
    '/api/ventas': {
      post: {
        tags: ['Ventas'],
        summary: 'Crear venta (transacción atómica)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['items', 'metodoPago'],
                properties: {
                  items: { type: 'array', items: { type: 'object', properties: { productoId: { type: 'integer' }, cantidad: { type: 'integer' } } } },
                  metodoPago: { type: 'string', enum: ['EFECTIVO', 'YAPE', 'PLIN', 'TARJETA', 'CHEQUE', 'TRANSFERENCIA'] },
                  montoRecibido: { type: 'number' },
                  clienteId: { type: 'integer' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Venta creada' },
          400: { description: 'Validación fallida o stock insuficiente' },
        },
      },
    },
    '/api/ventas/productos/buscar': {
      get: {
        tags: ['Ventas'],
        summary: 'Buscar productos para POS',
        parameters: [
          { name: 'q', in: 'query', schema: { type: 'string' } },
          { name: 'categoria', in: 'query', schema: { type: 'integer' } },
        ],
        responses: { 200: { description: 'Lista de productos' } },
      },
    },
    '/api/ventas/{id}/comprobante': {
      get: {
        tags: ['Ventas'],
        summary: 'Obtener comprobante de venta',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Venta con detalles' } },
      },
    },

    // ─── CLIENTES ─────────────────────────────────────────────────────────
    '/api/clientes': {
      get: { tags: ['Clientes'], summary: 'Listar clientes', responses: { 200: { description: 'Lista' } } },
      post: { tags: ['Clientes'], summary: 'Crear cliente', responses: { 201: { description: 'Creado' } } },
    },
    '/api/clientes/buscar-dni/{dni}': {
      get: {
        tags: ['Clientes'],
        summary: 'Buscar cliente por DNI',
        parameters: [{ name: 'dni', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Cliente encontrado' } },
      },
    },
    '/api/clientes/exportar': {
      get: { tags: ['Clientes'], summary: 'Exportar clientes a CSV', responses: { 200: { description: 'Archivo CSV' } } },
    },

    // ─── REPORTES ADMIN ───────────────────────────────────────────────────
    '/api/admin/reportes/ventas': {
      get: {
        tags: ['Reportes Admin'],
        summary: 'Reporte de ventas (JSON o CSV)',
        parameters: [
          { name: 'desde', in: 'query', schema: { type: 'string', format: 'date' } },
          { name: 'hasta', in: 'query', schema: { type: 'string', format: 'date' } },
          { name: 'metodoPago', in: 'query', schema: { type: 'string' } },
          { name: 'formato', in: 'query', schema: { type: 'string', enum: ['json', 'csv'] } },
        ],
        responses: { 200: { description: 'Reporte' } },
      },
    },

    // ─── REPORTES GERENCIA ────────────────────────────────────────────────
    '/api/gerencia/reportes/cierre-caja': {
      get: {
        tags: ['Reportes Gerencia'],
        summary: 'Cierre de caja por fecha',
        parameters: [{ name: 'fecha', in: 'query', schema: { type: 'string', format: 'date' } }],
        responses: { 200: { description: 'Desglose del cierre de caja' } },
      },
    },

    // ─── AUDITORÍA ────────────────────────────────────────────────────────
    '/api/gerencia/auditoria': {
      get: {
        tags: ['Auditoría'],
        summary: 'Listar log de accesos',
        parameters: [
          { name: 'pagina', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limite', in: 'query', schema: { type: 'integer', default: 20 } },
        ],
        responses: { 200: { description: 'Logs paginados' } },
      },
    },
    '/api/gerencia/auditoria/archivar': {
      patch: {
        tags: ['Auditoría'],
        summary: 'Archivar logs anteriores a una fecha',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['hasta'],
                properties: { hasta: { type: 'string', format: 'date' } },
              },
            },
          },
        },
        responses: { 200: { description: 'Logs archivados' } },
      },
    },

    // ─── CONFIGURACIÓN ───────────────────────────────────────────────────
    '/api/admin/config': {
      get: {
        tags: ['Configuración'],
        summary: 'Leer configuración del sistema',
        responses: { 200: { description: 'Configuración actual' } },
      },
      put: {
        tags: ['Configuración'],
        summary: 'Actualizar umbrales de configuración',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  umbral_alerta_visual: { type: 'integer', minimum: 0 },
                  umbral_solicitud_reposicion: { type: 'integer', minimum: 0 },
                },
              },
            },
          },
        },
        responses: { 200: { description: 'Configuración actualizada' } },
      },
    },

    // ─── BACKUPS ──────────────────────────────────────────────────────────
    '/api/admin/backups': {
      get: {
        tags: ['Backups'],
        summary: 'Listar archivos de backup',
        responses: { 200: { description: 'Lista de backups con nombre, tamaño y fecha' } },
      },
    },
    '/api/admin/backups/restaurar': {
      post: {
        tags: ['Backups'],
        summary: 'Restaurar base de datos desde backup',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['archivo'],
                properties: {
                  archivo: { type: 'string', description: 'Nombre del archivo SQL a restaurar' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Restauración exitosa' },
          404: { description: 'Archivo no encontrado' },
        },
      },
    },
  },
};

/**
 * Monta Swagger UI en la app Express.
 * @param {import('express').Express} app
 */
const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'MiniMarket ERP — API Docs',
  }));
  console.log('📄 Swagger UI disponible en /api-docs');
};

module.exports = { setupSwagger };
