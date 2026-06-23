// Seed: Insertar categorías iniciales
// Ejecutar: node seeders/002_categorias.js

const { PrismaClient } = require('@prisma/client')

const CATEGORIAS = [
  'Electrónica', 'Ropa', 'Alimentos', 'Herramientas',
  'Limpieza', 'Papelería', 'Bebidas', 'Otros',
]

async function main() {
  const prisma = new PrismaClient()

  for (const nombre of CATEGORIAS) {
    await prisma.categoria.upsert({
      where: { nombre },
      create: { nombre },
      update: {},
    })
  }

  console.log(`✅ ${CATEGORIAS.length} categorías insertadas/verificadas`)
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error('❌ Error:', e)
  process.exit(1)
})
