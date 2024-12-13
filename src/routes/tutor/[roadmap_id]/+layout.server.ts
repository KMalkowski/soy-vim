import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: LayoutServerLoad = async ({ params, locals }) => {
	return {
		roadmap: await db.query.roadmap.findFirst({
			where: (r, { eq }) => eq(r.id, Number(params.roadmap_id)),
			with: {
				steps: {
					with: {
						exercise: true
					}
				}
			}
		}),
		roadmapProgress: locals.user?.id
			? await db.query.roadmapProgress.findFirst({
					where: (rp, { eq, and }) =>
						and(eq(rp.roadmapId, Number(params.roadmap_id)), eq(rp.userId, locals.user?.id || ''))
				})
			: undefined
	};
};
