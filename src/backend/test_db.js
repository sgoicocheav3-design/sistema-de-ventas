const prisma = require('./src/prisma/client');
prisma.$connect()
  .then(() => { console.log('DB OK'); return prisma.$disconnect(); })
  .catch(e => console.log('FALLO:', e.message));
