import mysql from "mysql2/promise";

export function getDbConfig() {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, NODE_ENV } = process.env;
  // The root/empty-password default is only for a local Laragon setup.
  if (NODE_ENV === "production" && (!DB_USER || !DB_PASSWORD)) {
    throw new Error("DB_USER and DB_PASSWORD must be set in production");
  }
  return {
    host: DB_HOST || "127.0.0.1",
    port: Number(DB_PORT) || 3306,
    user: DB_USER || "root",
    password: DB_PASSWORD || "",
    database: DB_NAME || "tpitgroup_db",
  };
}

let pool: mysql.Pool | null = null;

export function getDbPool(): mysql.Pool {
  pool ??= mysql.createPool({
    ...getDbConfig(),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 100,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });
  return pool;
}

export async function query<T = any>(sql: string, params: any[] = []): Promise<T> {
  const [rows] = await getDbPool().execute(sql, params);
  return rows as T;
}
