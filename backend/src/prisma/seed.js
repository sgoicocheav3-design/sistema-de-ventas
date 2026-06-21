// backend/src/prisma/seed.js
const prisma = require('./client');
const bcrypt = require('bcryptjs');

async function main() {
  console.log('🌱 Iniciando seed...');

  // ─── ConfigSistema ────────────────────────────────────────────────────────
  await prisma.configSistema.upsert({
    where: { clave: 'umbral_alerta_visual' },
    update: {},
    create: { clave: 'umbral_alerta_visual', valor: '5' },
  });
  await prisma.configSistema.upsert({
    where: { clave: 'umbral_solicitud_reposicion' },
    update: {},
    create: { clave: 'umbral_solicitud_reposicion', valor: '15' },
  });
  console.log('✅ ConfigSistema creada');

  // ─── Categorías ───────────────────────────────────────────────────────────
  const categorias = ['Bebidas', 'Snacks', 'Lácteos', 'Limpieza', 'Panadería'];
  for (const nombre of categorias) {
    await prisma.categoria.upsert({
      where: { nombre },
      update: {},
      create: { nombre },
    });
  }
  console.log('✅ Categorías creadas:', categorias.join(', '));

  // ─── Usuarios ─────────────────────────────────────────────────────────────
  const adminHash = await bcrypt.hash('Admin1234!', 10);
  const gerenteHash = await bcrypt.hash('Gerente1234!', 10);
  const vendedorHash = await bcrypt.hash('Vendedor1234!', 10);
  const almaceneroHash = await bcrypt.hash('Almacen1234!', 10);

  await prisma.usuario.upsert({
    where: { email: 'admin@minimarket.com' },
    update: {},
    create: {
      nombre: 'Administrador',
      email: 'admin@minimarket.com',
      passwordHash: adminHash,
      rol: 'ADMIN',
      activo: true,
    },
  });

  await prisma.usuario.upsert({
    where: { email: 'gerente@minimarket.com' },
    update: {},
    create: {
      nombre: 'Gerente General',
      email: 'gerente@minimarket.com',
      passwordHash: gerenteHash,
      rol: 'GERENTE',
      activo: true,
    },
  });

  await prisma.usuario.upsert({
    where: { email: 'vendedor@minimarket.com' },
    update: {},
    create: {
      nombre: 'Juan Vendedor',
      email: 'vendedor@minimarket.com',
      passwordHash: vendedorHash,
      rol: 'VENDEDOR',
      activo: true,
    },
  });

  await prisma.usuario.upsert({
    where: { email: 'maria@minimarket.com' },
    update: {},
    create: {
      nombre: 'María Vendedor',
      email: 'maria@minimarket.com',
      passwordHash: vendedorHash,
      rol: 'VENDEDOR',
      activo: true,
    },
  });

  await prisma.usuario.upsert({
    where: { email: 'almacenero@minimarket.com' },
    update: {},
    create: {
      nombre: 'Carlos Almacenero',
      email: 'almacenero@minimarket.com',
      passwordHash: almaceneroHash,
      rol: 'ALMACENERO',
      activo: true,
    },
  });

  console.log('✅ Usuarios creados:');
  console.log('   👤 admin@minimarket.com       / Admin1234!');
  console.log('   👤 gerente@minimarket.com     / Gerente1234!');
  console.log('   👤 vendedor@minimarket.com    / Vendedor1234!');
  console.log('   👤 maria@minimarket.com       / Vendedor1234!');
  console.log('   👤 almacenero@minimarket.com  / Almacen1234!');

  // ─── Proveedores ──────────────────────────────────────────────────────────
  const proveedores = [
    { nombre: 'Bebidas del Perú S.A.', ruc: '20123456789', contacto: '+51 990123456' },
    { nombre: 'Snacks Premium Ltd.', ruc: '20234567890', contacto: '+51 990234567' },
    { nombre: 'Lacteos Andinos', ruc: '20345678901', contacto: '+51 990345678' },
  ];
  
  for (const prov of proveedores) {
    await prisma.proveedor.upsert({
      where: { ruc: prov.ruc },
      update: {},
      create: prov,
    });
  }
  console.log('✅ Proveedores creados: 3');

  // ─── Productos ────────────────────────────────────────────────────────────
  const productos = [
    { nombre: 'Coca Cola 2L', marca: 'Coca Cola', categoriaId: 1, precio: 8.50, stock: 25 },
    { nombre: 'Inca Kola 2L', marca: 'Inca Kola', categoriaId: 1, precio: 7.50, stock: 30 },
    { nombre: 'Sprite 2L', marca: 'Sprite', categoriaId: 1, precio: 8.00, stock: 20 },
    { nombre: 'Doritos 120g', marca: 'Doritos', categoriaId: 2, precio: 3.50, stock: 50 },
    { nombre: 'Lay\'s 100g', marca: 'Lay\'s', categoriaId: 2, precio: 3.00, stock: 60 },
    { nombre: 'Leche Gloria 1L', marca: 'Gloria', categoriaId: 3, precio: 4.50, stock: 35 },
    { nombre: 'Queso Fresco 500g', marca: 'Freski', categoriaId: 3, precio: 12.00, stock: 15 },
    { nombre: 'Detergente Ariel 2kg', marca: 'Ariel', categoriaId: 4, precio: 18.50, stock: 20 },
    { nombre: 'Desinfectante Sapolio', marca: 'Sapolio', categoriaId: 4, precio: 5.50, stock: 30 },
    { nombre: 'Pan de Molde', marca: 'Bimbo', categoriaId: 5, precio: 6.50, stock: 25 },
  ];

  for (const prod of productos) {
    const existe = await prisma.producto.findFirst({
      where: { nombre: prod.nombre, activo: true },
    });
    
    if (!existe) {
      await prisma.producto.create({
        data: {
          nombre: prod.nombre,
          marca: prod.marca,
          categoriaId: prod.categoriaId,
          precio: prod.precio,
          stock: prod.stock,
          activo: true,
        },
      });
    } else {
      await prisma.producto.update({
        where: { id: existe.id },
        data: { stock: prod.stock },
      });
    }
  }
  console.log('✅ Productos creados: 10');

  console.log('\n🎉 Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
