import { isTuple } from '../lib/tuple';
import type {
	GroupedTrails,
	GroupedTrailsFastMpu,
	GroupedTrailsSlowMpu,
} from '../types/tagFront';

/**
 * Injects an MPU container into a list of grouped trails
 *
 * For both slow & fast tag fronts, containers of certain lengths can receive an MPU slot.
 * The code looks for the first container of the right length and injects the ad slot
 * object (GroupedTrailsSlowMpu / GroupedTrailsFastMpu).
 */
export const injectMpuIntoGroupedTrails = (
	groupedTrails: GroupedTrails[],
	speed: 'slow' | 'fast',
): Array<GroupedTrails | GroupedTrailsFastMpu | GroupedTrailsSlowMpu> => {
	let injected = false;
	return groupedTrails.flatMap((grouped) => {
		if (injected) {
			return grouped;
		}

		if (speed === 'fast') {
			const firstNine = grouped.trails.slice(0, 9);
			if (
				isTuple(firstNine, 2) ||
				isTuple(firstNine, 4) ||
				isTuple(firstNine, 6) ||
				isTuple(firstNine, 9)
			) {
				injected = true;
				const fastMpu: GroupedTrailsFastMpu = {
					...grouped,
					trails: firstNine,
					injected,
					speed,
				};
				return fastMpu;
			} else return [];
		} else {
			if (
				isTuple(grouped.trails, 2) ||
				isTuple(grouped.trails, 4) ||
				isTuple(grouped.trails, 5) ||
				isTuple(grouped.trails, 7)
			) {
				injected = true;
				const groupedSlowMup: GroupedTrailsSlowMpu = {
					...grouped,
					trails: grouped.trails,
					injected,
					speed,
				};
				return groupedSlowMup;
			} else return [];
		}
	});
};
