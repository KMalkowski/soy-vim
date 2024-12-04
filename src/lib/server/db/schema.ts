import {
	serial,
	text,
	int,
	varchar,
	datetime,
	mysqlTableCreator,
	bigint
} from 'drizzle-orm/mysql-core';

export const createTable = mysqlTableCreator((name) => `vim_tutor_${name}`);

export const user = createTable('user', {
	id: varchar('id', { length: 255 }).primaryKey(),
	age: int('age'),
	username: varchar('username', { length: 32 }).notNull().unique(),
	passwordHash: varchar('password_hash', { length: 255 }).notNull()
});

export const session = createTable('session', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	expiresAt: datetime('expires_at').notNull()
});

export const exercise = createTable('exercise', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement().unique(),
	code: text('code'),
	instructions: varchar('instructions', { length: 2000 })
});

export type Exercise = typeof exercise.$inferSelect;

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
