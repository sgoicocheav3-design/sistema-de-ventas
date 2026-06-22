// src/controllers/backup.controller.js
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { BACKUPS_DIR } = require('../jobs/backupJob');

/**
 * GET /api/admin/backups
 * Lista archivos de backup con nombre, tamaño y fecha.
 */
const listar = async (req, res, next) => {
  try {
    // Asegurar que la carpeta exista
    if (!fs.existsSync(BACKUPS_DIR)) {
      fs.mkdirSync(BACKUPS_DIR, { recursive: true });
      return res.json([]);
    }

    const files = fs.readdirSync(BACKUPS_DIR)
      .filter((f) => f.endsWith('.sql'))
      .map((f) => {
        const filePath = path.join(BACKUPS_DIR, f);
        const stat = fs.statSync(filePath);
        return {
          nombre: f,
          tamanoMB: parseFloat((stat.size / (1024 * 1024)).toFixed(2)),
          fecha: stat.birthtime || stat.ctime,
        };
      })
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    res.json(files);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/admin/backups/restaurar
 * Body: { archivo: "backup_YYYYMMDD_HHMMSS.sql" }
 * Restaura la base de datos desde un archivo de backup.
 */
const restaurar = async (req, res, next) => {
  try {
    const { archivo } = req.body;

    if (!archivo) {
      return res.status(400).json({ message: 'El campo "archivo" es requerido' });
    }

    // Sanitizar nombre del archivo para evitar path traversal
    const safeFilename = path.basename(archivo);
    if (!safeFilename.endsWith('.sql')) {
      return res.status(400).json({ message: 'Solo se permiten archivos .sql' });
    }

    const filePath = path.join(BACKUPS_DIR, safeFilename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: `Archivo de backup no encontrado: ${safeFilename}` });
    }

    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      return res.status(500).json({ message: 'DATABASE_URL no configurada' });
    }

    const cmd = `psql "${dbUrl}" < "${filePath}"`;

    console.log(`[BACKUP] Restaurando desde: ${safeFilename}...`);

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`[BACKUP] Error en restauración: ${error.message}`);
        return res.status(500).json({
          message: `Error al restaurar: ${error.message}`,
        });
      }

      console.log(`[BACKUP] Restauración completada desde: ${safeFilename}`);
      res.json({
        message: `Base de datos restaurada exitosamente desde ${safeFilename}`,
        archivo: safeFilename,
      });
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { listar, restaurar };
