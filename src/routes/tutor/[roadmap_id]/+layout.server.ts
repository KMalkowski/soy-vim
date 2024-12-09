import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ params, locals }) => {
	if (!locals.user?.id) {
		return redirect(302, '/demo/lucia/login');
	}

	return {
		roadmap: await db.query.roadmap.findFirst({
			where: (r, { eq }) => eq(r.id, Number(params.roadmap_id)),
			with: {
				steps: true
			}
		}),
		roadmapProgress: await db.query.roadmapProgress.findFirst({
			where: (rp, { eq }) => eq(rp.roadmapId, Number(params.roadmap_id))
		})
	};
};
