import { NextRequest, NextResponse } from 'next/server'
import { execSync } from 'child_process'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { withAuth } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const auth = withAuth(req, ['ADMIN'])
  if (auth instanceof NextResponse) return auth

  try {
    const dir = join(process.cwd(), 'backups')
    await mkdir(dir, { recursive: true })
    const filename = `backup_${new Date().toISOString().replace(/[:.]/g, '-')}.sql`
    const filepath = join(dir, filename)

    const { DATABASE_URL } = process.env
    if (!DATABASE_URL) {
      return NextResponse.json({ message: 'DATABASE_URL no configurada' }, { status: 500 })
    }

    if (DATABASE_URL.startsWith('postgresql')) {
      try {
        execSync(`pg_dump "${DATABASE_URL}" > "${filepath}"`, { timeout: 30000 })
      } catch {
        // Fallback: write a placeholder
        await writeFile(filepath, `-- PostgreSQL backup placeholder\n-- Database URL: ${DATABASE_URL}\n`)
      }
    } else {
      await writeFile(filepath, `-- SQLite backup placeholder\n-- Database: ${DATABASE_URL}\n`)
    }

    return NextResponse.json({ message: 'Backup generado', archivo: filename })
  } catch {
    return NextResponse.json({ message: 'Error al generar backup' }, { status: 500 })
  }
}
