import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const passwordHash = await bcrypt.hash('admin123', 10)

  const admin = await prisma.usuario.upsert({
    where: { email: 'admin@sistema.com' },
    update: {},
    create: {
      nombre: 'Administrador',
      email: 'admin@sistema.com',
      passwordHash,
      rol: 'ADMIN',
    },
  })
  console.log(`Admin user created: ${admin.email}`)

  const vendedor = await prisma.usuario.upsert({
    where: { email: 'vendedor@sistema.com' },
    update: {},
    create: {
      nombre: 'Vendedor Demo',
      email: 'vendedor@sistema.com',
      passwordHash,
      rol: 'VENDEDOR',
    },
  })
  console.log(`Vendedor user created: ${vendedor.email}`)

  const almacenero = await prisma.usuario.upsert({
    where: { email: 'almacen@sistema.com' },
    update: {},
    create: {
      nombre: 'Almacenero Demo',
      email: 'almacen@sistema.com',
      passwordHash,
      rol: 'ALMACENERO',
    },
  })
  console.log(`Almacenero user created: ${almacenero.email}`)

  const gerente = await prisma.usuario.upsert({
    where: { email: 'gerente@sistema.com' },
    update: {},
    create: {
      nombre: 'Gerente Demo',
      email: 'gerente@sistema.com',
      passwordHash,
      rol: 'GERENTE',
    },
  })
  console.log(`Gerente user created: ${gerente.email}`)

  const categorias = [
    { nombre: 'Abarrotes' },
    { nombre: 'Lácteos' },
    { nombre: 'Bebidas' },
    { nombre: 'Snacks' },
    { nombre: 'Limpieza' },
    { nombre: 'Higiene Personal' },
    { nombre: 'Conservas' },
    { nombre: 'Golosinas' },
  ]

  for (const cat of categorias) {
    await prisma.categoria.upsert({
      where: { nombre: cat.nombre },
      update: {},
      create: cat,
    })
  }
  console.log(`${categorias.length} categories created`)

  const configs = [
    { clave: 'umbral_alerta_visual', valor: '5' },
    { clave: 'umbral_solicitud_reposicion', valor: '5' },
  ]

  for (const cfg of configs) {
    await prisma.configSistema.upsert({
      where: { clave: cfg.clave },
      update: { valor: cfg.valor },
      create: cfg,
    })
  }
  console.log(`${configs.length} config values set`)

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
