import mysql from 'mysql2/promise';
import { ensureDatabaseAndSchema } from './db-schema.ts';

let pool: mysql.Pool | null = null;
let initialized = false;

export function getDbPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'tpitgroup_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });

    // Auto-trigger schema migration asynchronously on pool initialization
    if (!initialized) {
      initialized = true;
      ensureDatabaseAndSchema().catch((err) => {
        console.error('[MySQL Auto-Init Warning]', err);
      });
    }
  }
  return pool;
}

export async function query<T = any>(sql: string, params: any[] = []): Promise<T> {
  const p = getDbPool();
  try {
    const [rows] = await p.execute(sql, params);
    return rows as T;
  } catch (err: any) {
    // If error indicates table doesn't exist or unknown column, run auto-migration and retry once!
    if (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR') {
      console.warn(`[MySQL Auto-Healing] Detected ${err.code}. Synchronizing schema and retrying...`);
      await ensureDatabaseAndSchema(true);
      const [rows] = await p.execute(sql, params);
      return rows as T;
    }
    throw err;
  }
}

export async function checkDbHealth(): Promise<{
  connected: boolean;
  database: string;
  tables: string[];
  counts: Record<string, number>;
}> {
  try {
    await ensureDatabaseAndSchema();
    const p = getDbPool();
    const [tableRows] = await p.query<any[]>('SHOW TABLES');
    const tables: string[] = tableRows.map((r: any) => Object.values(r)[0] as string);
    const counts: Record<string, number> = {};

    for (const t of tables) {
      try {
        const [c] = await p.query<any[]>(`SELECT count(*) as count FROM \`${t}\``);
        counts[t] = c[0]?.count || 0;
      } catch {
        counts[t] = 0;
      }
    }

    return {
      connected: true,
      database: process.env.DB_NAME || 'tpitgroup_db',
      tables,
      counts,
    };
  } catch (err) {
    return {
      connected: false,
      database: process.env.DB_NAME || 'tpitgroup_db',
      tables: [],
      counts: {},
    };
  }
}
