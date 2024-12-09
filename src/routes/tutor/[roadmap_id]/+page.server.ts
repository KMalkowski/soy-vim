import { db } from '$lib/server/db';
import { exercise } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function load(attrs) {
	if (!attrs.url.searchParams.get('step')) {
		error(404, {
			message: 'Not found'
		});
	}

	const exe = await db
		.select()
		.from(exercise)
		.where(eq(exercise.id, Number(attrs.url.searchParams.get('step'))));

	if (!exe.length) {
		error(404, {
			message: 'Not found'
		});
	}
	return {
		exercise: exe[0]
	};
}
