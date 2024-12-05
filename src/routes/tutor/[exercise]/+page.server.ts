import { getDb } from '$lib/server/db';
import { exercise } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function load({ params }) {
	console.log('params', params);
	const db = await getDb();
	const exe = await db
		.select()
		.from(exercise)
		.where(eq(exercise.id, Number(params.exercise)));
	if (!exe.length) {
		error(404, {
			message: 'Not found'
		});
	}
	return {
		exercise: exe[0]
	};
}
