import { relations } from 'drizzle-orm';
import { text, int, varchar, datetime, mysqlTableCreator, bigint } from 'drizzle-orm/mysql-core';

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
	instructions: varchar('instructions', { length: 2000 }),
	title: varchar('title', { length: 255 })
});

export const roadmap = createTable('roadmap', {
	id: int('id').primaryKey().autoincrement().unique(),
	description: varchar('description', { length: 2000 })
});

export const roadmapRelations = relations(roadmap, ({ many }) => ({
	steps: many(roadmapStep)
}));

export const roadmapStep = createTable('roadmapStep', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement().unique(),
	roadmapId: int('roadmapId').references(() => roadmap.id),
	stepNumber: int('stepNumber'),
	exerciseId: bigint('exercise_id', { mode: 'number' }).references(() => exercise.id)
});

export const roadmapStepRelations = relations(roadmapStep, ({ one }) => ({
	roadmap: one(roadmap, {
		fields: [roadmapStep.roadmapId],
		references: [roadmap.id]
	}),
	exercise: one(exercise, {
		fields: [roadmapStep.exerciseId],
		references: [exercise.id]
	})
}));

export const roadmapProgress = createTable('roadmapProgress', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement().unique(),
	userId: varchar('user_id', { length: 255 }).references(() => user.id),
	roadmapId: int('roadmap_id').references(() => roadmap.id),
	completedSteps: int('completed_steps')
});

export type Roadmap = typeof roadmap.$inferSelect;

export type RoadmapStep = typeof roadmapStep.$inferSelect;

export type RoadmapProgress = typeof roadmapProgress.$inferSelect;

export type Exercise = typeof exercise.$inferSelect;

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
