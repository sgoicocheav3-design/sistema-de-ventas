// Seed: Crear usuario administrador inicial
// Ejecutar UNA VEZ al inicializar el proyecto: node seeders/001_admin_user.js
// O mediante: npx tsx seeders/001_admin_user.ts

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

async function main() {
  const prisma = new PrismaClient()

  const hash = await bcrypt.hash('Admin123!', 10)

  const existing = await prisma.usuario.findUnique({ where: { email: 'admin@sistema.com' } })
  if (existing) {
    console.log('ℹ️  El usuario admin ya existe. Saltando seed.')
    await prisma.$disconnect()
    return
  }

  await prisma.usuario.create({
    data: {
      nombre: 'Administrador',
      email: 'admin@sistema.com',
      passwordHash: hash,
      rol: 'ADMIN',
    },
  })

  console.log('✅ Usuario admin creado: admin@sistema.com / Admin123!')
  console.log('⚠️  CAMBIAR CONTRASEÑA DESPUÉS DEL PRIMER LOGIN')

  await prisma.$disconnect()
}

main().catch((e) => {
  console.error('❌ Error:', e)
  process.exit(1)
})
