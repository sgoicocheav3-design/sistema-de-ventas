// src/jobs/backupJob.js
const cron = require('node-cron');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const BACKUPS_DIR = path.join(__dirname, '..', '..', 'backups');
const RETENTION_DAYS = 30;

/**
 * Asegura que la carpeta de backups exista.
 */
const ensureDir = () => {
  if (!fs.existsSync(BACKUPS_DIR)) {
    fs.mkdirSync(BACKUPS_DIR, { recursive: true });
    console.log(`[BACKUP] Carpeta creada: ${BACKUPS_DIR}`);
  }
};

/**
 * Genera un nombre de archivo con timestamp.
 */
const buildFilename = () => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const ts = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  return `backup_${ts}.sql`;
};

/**
 * Elimina backups con más de RETENTION_DAYS días de antigüedad.
 */
const cleanOldBackups = () => {
  const now = Date.now();
  const maxAge = RETENTION_DAYS * 24 * 60 * 60 * 1000;

  const files = fs.readdirSync(BACKUPS_DIR).filter((f) => f.endsWith('.sql'));
  let removed = 0;

  for (const file of files) {
    const filePath = path.join(BACKUPS_DIR, file);
    const stat = fs.statSync(filePath);
    if (now - stat.mtimeMs > maxAge) {
      fs.unlinkSync(filePath);
      removed++;
      console.log(`[BACKUP] Eliminado backup antiguo: ${file}`);
    }
  }

  if (removed > 0) {
    console.log(`[BACKUP] ${removed} backup(s) antiguos eliminados`);
  }
};

/**
 * Ejecuta pg_dump para crear un backup de la base de datos.
 */
const runBackup = () => {
  ensureDir();

  const filename = buildFilename();
  const outputPath = path.join(BACKUPS_DIR, filename);
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    console.error('[BACKUP] ERROR: DATABASE_URL no definida');
    return;
  }

  const cmd = `pg_dump "${dbUrl}" > "${outputPath}"`;

  console.log(`[BACKUP] ${new Date().toISOString()} - Iniciando backup: ${filename}`);

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`[BACKUP] ERROR al crear backup: ${error.message}`);
      // Eliminar archivo parcial si existe
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
      return;
    }

    if (stderr && !stderr.includes('Warning')) {
      console.warn(`[BACKUP] Advertencia: ${stderr}`);
    }

    const stat = fs.statSync(outputPath);
    const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
    console.log(`[BACKUP] ${new Date().toISOString()} - Backup completado: ${filename} (${sizeMB} MB)`);

    // Limpiar backups antiguos
    cleanOldBackups();
  });
};

/**
 * Inicia el cron job de backup automático a las 2:00 AM diario.
 */
const startBackupCron = () => {
  ensureDir();
  console.log('[BACKUP] Cron job programado: 0 2 * * * (2:00 AM diario)');

  cron.schedule('0 2 * * *', () => {
    runBackup();
  });
};

module.exports = { startBackupCron, runBackup, BACKUPS_DIR };
