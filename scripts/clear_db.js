const { PrismaClient } = require('@prisma/client');

const connectionString = 'postgresql://postgres.aeivjgfdyirsemqstqud:kenivelxd011@aws-1-us-east-2.pooler.supabase.com:5432/postgres';

const prisma = new PrismaClient({
  datasources: {
    db: { url: connectionString }
  }
});

async function main() {
  const tables = [
    'log_accesos', 'auditoria', 'notificaciones', 'proveedores_productos',
    'detalles_venta', 'ventas', 'recepciones_mercaderia', 'solicitudes_reposicion',
    'entradas_mercaderia', 'bajas_inventario', 'productos', 'proveedores',
    'clientes', 'categorias', 'config_sistema'
  ];
  for (const table of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE`);
    console.log(`Truncated ${table}`);
  }
  console.log('Done - all tables cleared except usuarios');
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
