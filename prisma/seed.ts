import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const SEED_VERSION = '2'
const SEED_PASSWORD = process.env.SEED_PASSWORD || 'MiniMarket2026!'

function daysAgo(n: number, hour = 10, minute = 0): Date {
  const d = new Date()
  d.setDate(d.getDate() - n)
  d.setHours(hour, minute, 0, 0)
  return d
}

function calcVenta(lineas: Array<{ precioUnitario: number; cantidad: number }>) {
  const subtotal = lineas.reduce((s, l) => s + l.precioUnitario * l.cantidad, 0)
  const igv = Math.round(subtotal * 0.18 * 100) / 100
  const total = Math.round((subtotal + igv) * 100) / 100
  return { subtotal, igv, total }
}

async function clearSeedData() {
  await prisma.venta.deleteMany({ where: { numero: { startsWith: 'V-SEED-' } } })
  await prisma.entradaMercaderia.deleteMany({
    where: { producto: { codigo: { startsWith: 'PRD-' } } },
  })
  await prisma.bajaInventario.deleteMany({
    where: { producto: { codigo: { startsWith: 'PRD-' } } },
  })
  await prisma.solicitudReposicion.deleteMany({
    where: { producto: { codigo: { startsWith: 'PRD-' } } },
  })
  await prisma.logAcceso.deleteMany({
    where: { accion: { startsWith: '[seed]' } },
  })
}

async function main() {
  console.log('Seeding database...')
  const passwordHash = await bcrypt.hash(SEED_PASSWORD, 10)

  const admin = await prisma.usuario.upsert({
    where: { email: 'admin@sistema.com' },
    update: { passwordHash, activo: true },
    create: {
      nombre: 'Administrador',
      email: 'admin@sistema.com',
      passwordHash,
      rol: 'ADMIN',
    },
  })

  const vendedor = await prisma.usuario.upsert({
    where: { email: 'vendedor@sistema.com' },
    update: { passwordHash, activo: true },
    create: {
      nombre: 'Carlos Mendoza',
      email: 'vendedor@sistema.com',
      passwordHash,
      rol: 'VENDEDOR',
    },
  })

  const almacenero = await prisma.usuario.upsert({
    where: { email: 'almacen@sistema.com' },
    update: { passwordHash, activo: true },
    create: {
      nombre: 'María López',
      email: 'almacen@sistema.com',
      passwordHash,
      rol: 'ALMACENERO',
    },
  })

  const gerente = await prisma.usuario.upsert({
    where: { email: 'gerente@sistema.com' },
    update: { passwordHash, activo: true },
    create: {
      nombre: 'Roberto Silva',
      email: 'gerente@sistema.com',
      passwordHash,
      rol: 'GERENTE',
    },
  })

  console.log('Usuarios listos (admin, vendedor, almacén, gerente)')

  const categoriasData = [
    'Abarrotes',
    'Lácteos',
    'Bebidas',
    'Snacks',
    'Limpieza',
    'Higiene Personal',
    'Conservas',
    'Golosinas',
  ]

  const categorias: Record<string, number> = {}
  for (const nombre of categoriasData) {
    const cat = await prisma.categoria.upsert({
      where: { nombre },
      update: {},
      create: { nombre },
    })
    categorias[nombre] = cat.id
  }
  console.log(`${categoriasData.length} categorías`)

  for (const cfg of [
    { clave: 'umbral_alerta_visual', valor: '5' },
    { clave: 'umbral_solicitud_reposicion', valor: '5' },
    { clave: 'seed_version', valor: SEED_VERSION },
  ]) {
    await prisma.configSistema.upsert({
      where: { clave: cfg.clave },
      update: { valor: cfg.valor },
      create: cfg,
    })
  }

  const proveedoresData = [
    { nombre: 'Distribuidora Norte SAC', ruc: '20123456789', contacto: 'Juan Pérez — 987654321' },
    { nombre: 'Alimentos del Valle EIRL', ruc: '20987654321', contacto: 'Ana Torres — 912345678' },
    { nombre: 'Bebidas Refresh SAC', ruc: '20456789123', contacto: 'Luis Ramírez — 998877665' },
  ]

  const proveedores: Record<string, number> = {}
  for (const p of proveedoresData) {
    const prov = await prisma.proveedor.upsert({
      where: { ruc: p.ruc },
      update: { nombre: p.nombre, contacto: p.contacto, activo: true },
      create: p,
    })
    proveedores[p.ruc] = prov.id
  }
  console.log(`${proveedoresData.length} proveedores`)

  const clientesData = [
    { dni: '72345678', nombre: 'Pedro Gutiérrez', email: 'pedro.g@email.com', telefono: '987111222' },
    { dni: '45678901', nombre: 'Lucía Fernández', email: 'lucia.f@email.com', telefono: '987333444' },
    { dni: '78901234', nombre: 'Miguel Castro', email: null, telefono: '987555666' },
    { dni: '23456789', nombre: 'Carmen Vargas', email: 'carmen.v@email.com', telefono: '987777888' },
    { dni: '56789012', nombre: 'Jorge Hinostroza', email: null, telefono: '987999000' },
  ]

  const clientes: Record<string, number> = {}
  for (const c of clientesData) {
    const cli = await prisma.cliente.upsert({
      where: { dni: c.dni },
      update: {
        nombre: c.nombre,
        email: c.email,
        telefono: c.telefono,
        activo: true,
      },
      create: { ...c, activo: true },
    })
    clientes[c.dni] = cli.id
  }
  console.log(`${clientesData.length} clientes`)

  const productosData = [
    { codigo: 'PRD-001', nombre: 'Arroz Extra 1kg', marca: 'Costeño', precio: 4.5, categoria: 'Abarrotes' },
    { codigo: 'PRD-002', nombre: 'Aceite Vegetal 1L', marca: 'Primor', precio: 9.9, categoria: 'Abarrotes' },
    { codigo: 'PRD-003', nombre: 'Azúcar Rubia 1kg', marca: 'Cartavio', precio: 4.2, categoria: 'Abarrotes' },
    { codigo: 'PRD-004', nombre: 'Leche Evaporada 410ml', marca: 'Gloria', precio: 4.8, categoria: 'Lácteos' },
    { codigo: 'PRD-005', nombre: 'Yogurt Griego 150g', marca: 'Laive', precio: 3.5, categoria: 'Lácteos' },
    { codigo: 'PRD-006', nombre: 'Gaseosa Cola 1.5L', marca: 'Coca-Cola', precio: 7.5, categoria: 'Bebidas' },
    { codigo: 'PRD-007', nombre: 'Agua Mineral 625ml', marca: 'San Luis', precio: 2.0, categoria: 'Bebidas' },
    { codigo: 'PRD-008', nombre: 'Papas Fritas 140g', marca: 'Lay\'s', precio: 3.8, categoria: 'Snacks' },
    { codigo: 'PRD-009', nombre: 'Galletas Soda 6 pack', marca: 'Field', precio: 2.5, categoria: 'Snacks' },
    { codigo: 'PRD-010', nombre: 'Detergente Líquido 1L', marca: 'Ariel', precio: 12.5, categoria: 'Limpieza' },
    { codigo: 'PRD-011', nombre: 'Papel Higiénico 4 rollos', marca: 'Elite', precio: 8.9, categoria: 'Higiene Personal' },
    { codigo: 'PRD-012', nombre: 'Atún en Aceite 170g', marca: 'Fanny', precio: 6.5, categoria: 'Conservas' },
    { codigo: 'PRD-013', nombre: 'Chocolates Sublime', marca: 'Nestlé', precio: 2.2, categoria: 'Golosinas' },
    { codigo: 'PRD-014', nombre: 'Fideos Spaghetti 500g', marca: 'Don Vittorio', precio: 3.9, categoria: 'Abarrotes' },
    { codigo: 'PRD-015', nombre: 'Shampoo 400ml', marca: 'Head & Shoulders', precio: 15.9, categoria: 'Higiene Personal' },
    { codigo: 'PRD-016', nombre: 'Cerveza Lager 630ml', marca: 'Cristal', precio: 5.5, categoria: 'Bebidas' },
    { codigo: 'PRD-017', nombre: 'Mantequilla 200g', marca: 'Gloria', precio: 7.2, categoria: 'Lácteos' },
    { codigo: 'PRD-018', nombre: 'Jabón Líquido 900ml', marca: 'Protex', precio: 9.5, categoria: 'Limpieza' },
    { codigo: 'PRD-019', nombre: 'Mantequilla de Maní 340g', marca: 'McColin', precio: 11.0, categoria: 'Snacks' },
    { codigo: 'PRD-020', nombre: 'Leche Condensada 397g', marca: 'Gloria', precio: 5.8, categoria: 'Lácteos', stockBajo: true },
  ]

  const productos: Record<string, { id: number; precio: number }> = {}
  for (const p of productosData) {
    const prod = await prisma.producto.upsert({
      where: { codigo: p.codigo },
      update: {
        nombre: p.nombre,
        marca: p.marca,
        precio: p.precio,
        categoriaId: categorias[p.categoria],
        activo: true,
        stock: 0,
      },
      create: {
        codigo: p.codigo,
        nombre: p.nombre,
        marca: p.marca,
        precio: p.precio,
        stock: 0,
        categoriaId: categorias[p.categoria],
        fechaVencimiento: daysAgo(-180),
      },
    })
    productos[p.codigo] = { id: prod.id, precio: p.precio }
  }
  console.log(`${productosData.length} productos`)

  await clearSeedData()

  const provNorte = proveedores['20123456789']
  const provValle = proveedores['20987654321']
  const provRefresh = proveedores['20456789123']

  const entradasStock: Array<{ codigo: string; cantidad: number; proveedorId: number }> = [
    { codigo: 'PRD-001', cantidad: 120, proveedorId: provNorte },
    { codigo: 'PRD-002', cantidad: 80, proveedorId: provNorte },
    { codigo: 'PRD-003', cantidad: 100, proveedorId: provNorte },
    { codigo: 'PRD-004', cantidad: 90, proveedorId: provValle },
    { codigo: 'PRD-005', cantidad: 60, proveedorId: provValle },
    { codigo: 'PRD-006', cantidad: 72, proveedorId: provRefresh },
    { codigo: 'PRD-007', cantidad: 150, proveedorId: provRefresh },
    { codigo: 'PRD-008', cantidad: 48, proveedorId: provNorte },
    { codigo: 'PRD-009', cantidad: 80, proveedorId: provNorte },
    { codigo: 'PRD-010', cantidad: 40, proveedorId: provValle },
    { codigo: 'PRD-011', cantidad: 55, proveedorId: provValle },
    { codigo: 'PRD-012', cantidad: 70, proveedorId: provNorte },
    { codigo: 'PRD-013', cantidad: 100, proveedorId: provNorte },
    { codigo: 'PRD-014', cantidad: 85, proveedorId: provNorte },
    { codigo: 'PRD-015', cantidad: 35, proveedorId: provValle },
    { codigo: 'PRD-016', cantidad: 48, proveedorId: provRefresh },
    { codigo: 'PRD-017', cantidad: 45, proveedorId: provValle },
    { codigo: 'PRD-018', cantidad: 30, proveedorId: provValle },
    { codigo: 'PRD-019', cantidad: 40, proveedorId: provNorte },
    { codigo: 'PRD-020', cantidad: 4, proveedorId: provValle },
  ]

  for (const e of entradasStock) {
    const productoId = productos[e.codigo].id
    await prisma.$transaction([
      prisma.entradaMercaderia.create({
        data: {
          productoId,
          proveedorId: e.proveedorId,
          cantidad: e.cantidad,
          usuarioId: almacenero.id,
          creadoEn: daysAgo(25, 9, 0),
        },
      }),
      prisma.producto.update({
        where: { id: productoId },
        data: { stock: { increment: e.cantidad } },
      }),
    ])
  }
  console.log(`${entradasStock.length} entradas de mercadería`)

  type VentaSeed = {
    numero: string
    diasAtras: number
    usuarioId: number
    clienteDni?: string
    metodoPago: string
    montoRecibido?: number
    items: Array<{ codigo: string; cantidad: number }>
  }

  const ventasSeed: VentaSeed[] = [
    {
      numero: 'V-SEED-001',
      diasAtras: 18,
      usuarioId: vendedor.id,
      clienteDni: '72345678',
      metodoPago: 'EFECTIVO',
      montoRecibido: 50,
      items: [
        { codigo: 'PRD-001', cantidad: 2 },
        { codigo: 'PRD-007', cantidad: 3 },
        { codigo: 'PRD-013', cantidad: 4 },
      ],
    },
    {
      numero: 'V-SEED-002',
      diasAtras: 12,
      usuarioId: vendedor.id,
      clienteDni: '45678901',
      metodoPago: 'YAPE',
      items: [
        { codigo: 'PRD-006', cantidad: 2 },
        { codigo: 'PRD-008', cantidad: 1 },
      ],
    },
    {
      numero: 'V-SEED-003',
      diasAtras: 7,
      usuarioId: admin.id,
      metodoPago: 'PLIN',
      items: [
        { codigo: 'PRD-004', cantidad: 3 },
        { codigo: 'PRD-005', cantidad: 2 },
        { codigo: 'PRD-017', cantidad: 1 },
      ],
    },
    {
      numero: 'V-SEED-004',
      diasAtras: 3,
      usuarioId: vendedor.id,
      clienteDni: '78901234',
      metodoPago: 'TARJETA',
      items: [
        { codigo: 'PRD-010', cantidad: 1 },
        { codigo: 'PRD-011', cantidad: 2 },
        { codigo: 'PRD-018', cantidad: 1 },
      ],
    },
    {
      numero: 'V-SEED-005',
      diasAtras: 1,
      usuarioId: vendedor.id,
      clienteDni: '23456789',
      metodoPago: 'EFECTIVO',
      montoRecibido: 100,
      items: [
        { codigo: 'PRD-002', cantidad: 1 },
        { codigo: 'PRD-014', cantidad: 2 },
        { codigo: 'PRD-012', cantidad: 3 },
      ],
    },
    {
      numero: 'V-SEED-006',
      diasAtras: 0,
      usuarioId: vendedor.id,
      metodoPago: 'EFECTIVO',
      montoRecibido: 30,
      items: [
        { codigo: 'PRD-007', cantidad: 2 },
        { codigo: 'PRD-009', cantidad: 3 },
        { codigo: 'PRD-016', cantidad: 2 },
      ],
    },
  ]

  for (const v of ventasSeed) {
    await prisma.$transaction(async (tx) => {
      const lineas = v.items.map((item) => {
        const prod = productos[item.codigo]
        return {
          productoId: prod.id,
          cantidad: item.cantidad,
          precioUnitario: prod.precio,
        }
      })

      for (const l of lineas) {
        const p = await tx.producto.findUnique({ where: { id: l.productoId } })
        if (!p || p.stock < l.cantidad) {
          throw new Error(`Stock insuficiente para venta ${v.numero}`)
        }
      }

      const { subtotal, igv, total } = calcVenta(lineas)
      const recibido = v.metodoPago === 'EFECTIVO' ? (v.montoRecibido ?? total) : total
      const vuelto = v.metodoPago === 'EFECTIVO' ? recibido - total : 0

      await tx.venta.create({
        data: {
          numero: v.numero,
          usuarioId: v.usuarioId,
          clienteId: v.clienteDni ? clientes[v.clienteDni] : null,
          subtotal,
          igv,
          total,
          metodoPago: v.metodoPago,
          montoRecibido: recibido,
          vuelto,
          creadoEn: daysAgo(v.diasAtras, 11 + v.diasAtras % 5, 30),
          detalles: {
            create: lineas.map((l) => ({
              productoId: l.productoId,
              cantidad: l.cantidad,
              precioUnitario: l.precioUnitario,
              subtotal: l.precioUnitario * l.cantidad,
            })),
          },
        },
      })

      for (const l of lineas) {
        await tx.producto.update({
          where: { id: l.productoId },
          data: { stock: { decrement: l.cantidad } },
        })
      }
    })
  }
  console.log(`${ventasSeed.length} ventas de demostración`)

  await prisma.bajaInventario.create({
    data: {
      productoId: productos['PRD-008'].id,
      cantidad: 2,
      motivo: 'Producto vencido',
      usuarioId: almacenero.id,
      creadoEn: daysAgo(5, 14, 0),
    },
  })
  await prisma.producto.update({
    where: { id: productos['PRD-008'].id },
    data: { stock: { decrement: 2 } },
  })

  await prisma.solicitudReposicion.create({
    data: {
      productoId: productos['PRD-020'].id,
      cantidad: 50,
      estado: 'PENDIENTE',
      solicitanteId: almacenero.id,
      creadoEn: daysAgo(2, 8, 0),
    },
  })

  await prisma.solicitudReposicion.create({
    data: {
      productoId: productos['PRD-015'].id,
      cantidad: 20,
      estado: 'APROBADA',
      solicitanteId: almacenero.id,
      revisorId: gerente.id,
      revisadoEn: daysAgo(4, 16, 0),
      creadoEn: daysAgo(6, 10, 0),
    },
  })

  await prisma.solicitudReposicion.create({
    data: {
      productoId: productos['PRD-019'].id,
      cantidad: 100,
      estado: 'RECHAZADA',
      solicitanteId: almacenero.id,
      revisorId: gerente.id,
      revisadoEn: daysAgo(3, 15, 0),
      notaRechazo: 'Stock suficiente en almacén central',
      creadoEn: daysAgo(5, 9, 0),
    },
  })
  console.log('Bajas y solicitudes de reposición')

  for (const [usuarioId, accion] of [
    [admin.id, '[seed] Inicio de sesión administrador'],
    [vendedor.id, '[seed] Inicio de sesión vendedor'],
    [vendedor.id, '[seed] Venta registrada en POS'],
    [almacenero.id, '[seed] Entrada de mercadería registrada'],
    [gerente.id, '[seed] Revisión de solicitud de reposición'],
  ] as const) {
    await prisma.logAcceso.create({
      data: {
        usuarioId,
        accion,
        creadoEn: daysAgo(Math.floor(Math.random() * 10), 8, 0),
      },
    })
  }
  console.log('Registros de auditoría')

  console.log('')
  console.log('Seed completado.')
  console.log('Contraseña de todos los usuarios demo:', SEED_PASSWORD)
  console.log('  admin@sistema.com      (ADMIN)')
  console.log('  vendedor@sistema.com   (VENDEDOR)')
  console.log('  almacen@sistema.com    (ALMACENERO)')
  console.log('  gerente@sistema.com    (GERENTE)')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
