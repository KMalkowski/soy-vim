import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';

let db: ReturnType<typeof drizzle>;

export async function getDb() {
	if (!db) {
		if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
		const client = await mysql.createConnection(env.DATABASE_URL);
		db = drizzle(client);
	}
	return db;
}
