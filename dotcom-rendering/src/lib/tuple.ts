/** A tuple of up to 12 items. Larger tuples will not be narrowed */
export type Tuple<T, N extends number> = N extends 12
	? [T, T, T, T, T, T, T, T, T, T, T, T]
	: N extends 11
	? [T, T, T, T, T, T, T, T, T, T, T]
	: N extends 10
	? [T, T, T, T, T, T, T, T, T, T]
	: N extends 9
	? [T, T, T, T, T, T, T, T, T]
	: N extends 8
	? [T, T, T, T, T, T, T, T]
	: N extends 7
	? [T, T, T, T, T, T, T]
	: N extends 6
	? [T, T, T, T, T, T]
	: N extends 5
	? [T, T, T, T, T]
	: N extends 4
	? [T, T, T, T]
	: N extends 3
	? [T, T, T]
	: N extends 2
	? [T, T]
	: N extends 1
	? [T]
	: N extends 0
	? []
	: [T, T, T, T, T, T, T, T, T, T, T, T, ...T[]];

/**
 * Type-guard for whether an array is a tuple of exact length.
 *
 * Only tuples of 12 elements or less will be narrowed.
 */
export const isTuple = <T, N extends number>(
	arr: Array<T> | ReadonlyArray<T>,
	count: N,
): arr is Tuple<T, N> => arr.length === count;
