import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import type { DCRGroupedTrails } from '../../types/front';
import { DynamicPackage } from './DynamicPackage';
import { FrontContainer } from './FrontContainer';

const defaultGroupedTrails: DCRGroupedTrails = {
	huge: [],
	veryBig: [],
	big: [],
	standard: [],
	snap: [],
};

export default {
	component: DynamicPackage,
	title: 'Components/DynamicPackage',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
};

export const One = () => (
	<FrontContainer title="DynamicPackage">
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 1),
			}}
			containerPalette="LongRunningPalette"
		/>
	</FrontContainer>
);
One.story = {
	name: 'With one standard card',
};

export const Two = () => (
	<FrontContainer title="DynamicPackage">
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 2),
			}}
			containerPalette="LongRunningPalette"
		/>
	</FrontContainer>
);
Two.story = {
	name: 'With two standard cards',
};

export const Three = () => (
	<FrontContainer title="DynamicPackage">
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 3),
			}}
			containerPalette="LongRunningPalette"
		/>
	</FrontContainer>
);
Three.story = {
	name: 'With three standard cards',
};

export const Four = () => (
	<FrontContainer title="DynamicPackage">
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 4),
			}}
			containerPalette="LongRunningPalette"
		/>
	</FrontContainer>
);
Four.story = {
	name: 'With four standard cards',
};

export const Five = () => (
	<FrontContainer title="DynamicPackage">
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 5),
			}}
			containerPalette="LongRunningPalette"
		/>
	</FrontContainer>
);
Five.story = {
	name: 'With five standard cards',
};

export const Six = () => (
	<FrontContainer title="DynamicPackage">
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 6),
			}}
			containerPalette="LongRunningPalette"
		/>
	</FrontContainer>
);
Six.story = {
	name: 'With six standard cards',
};

export const Seven = () => (
	<FrontContainer title="DynamicPackage">
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 7),
			}}
			containerPalette="LongRunningPalette"
		/>
	</FrontContainer>
);
Seven.story = {
	name: 'With seven standard cards',
};

export const Eight = () => (
	<FrontContainer title="DynamicPackage">
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 8),
			}}
			containerPalette="LongRunningPalette"
		/>
	</FrontContainer>
);
Eight.story = {
	name: 'With eight standard cards',
};

export const Nine = () => (
	<FrontContainer title="DynamicPackage">
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 9),
			}}
			containerPalette="LongRunningPalette"
		/>
	</FrontContainer>
);
Nine.story = {
	name: 'With nine standard cards',
};

export const Boosted1 = () => {
	const primary = trails[0];

	return (
		<FrontContainer title="DynamicPackage">
			<DynamicPackage
				groupedTrails={{
					...defaultGroupedTrails,
					snap: [],
					standard: [{ ...primary, isBoosted: true }],
				}}
				showAge={true}
				containerPalette="LongRunningPalette"
			/>
		</FrontContainer>
	);
};
Boosted1.story = {
	name: 'With one standard card - boosted',
};

export const Boosted2 = () => {
	const primary = trails[0];
	const remaining = trails.slice(1, 2);

	return (
		<FrontContainer title="DynamicPackage">
			<DynamicPackage
				groupedTrails={{
					...defaultGroupedTrails,
					snap: [],
					standard: [{ ...primary, isBoosted: true }, ...remaining],
				}}
				showAge={true}
				containerPalette="LongRunningPalette"
			/>
		</FrontContainer>
	);
};
Boosted2.story = {
	name: 'With two standard cards - boosted',
};

export const Boosted3 = () => {
	const primary = trails[0];
	const remaining = trails.slice(1, 3);

	return (
		<FrontContainer title="DynamicPackage">
			<DynamicPackage
				groupedTrails={{
					...defaultGroupedTrails,
					snap: [],
					standard: [{ ...primary, isBoosted: true }, ...remaining],
				}}
				showAge={true}
				containerPalette="LongRunningPalette"
			/>
		</FrontContainer>
	);
};
Boosted3.story = {
	name: 'With three standard cards - boosted',
};

export const Boosted4 = () => {
	const primary = trails[0];
	const remaining = trails.slice(1, 4);

	return (
		<FrontContainer title="DynamicPackage">
			<DynamicPackage
				groupedTrails={{
					...defaultGroupedTrails,
					snap: [],
					standard: [{ ...primary, isBoosted: true }, ...remaining],
				}}
				showAge={true}
				containerPalette="LongRunningPalette"
			/>
		</FrontContainer>
	);
};
Boosted4.story = {
	name: 'With four standard cards - boosted',
};

export const Boosted5 = () => {
	const primary = trails[0];
	const remaining = trails.slice(1, 5);

	return (
		<FrontContainer title="DynamicPackage">
			<DynamicPackage
				groupedTrails={{
					...defaultGroupedTrails,
					snap: [],
					standard: [{ ...primary, isBoosted: true }, ...remaining],
				}}
				showAge={true}
				containerPalette="LongRunningPalette"
			/>
		</FrontContainer>
	);
};
Boosted5.story = {
	name: 'With five standard cards - boosted',
};

export const Boosted8 = () => {
	const primary = trails[0];
	const remaining = trails.slice(1, 8);

	return (
		<FrontContainer title="DynamicPackage">
			<DynamicPackage
				groupedTrails={{
					...defaultGroupedTrails,
					snap: [],
					standard: [{ ...primary, isBoosted: true }, ...remaining],
				}}
				showAge={true}
				containerPalette="LongRunningPalette"
			/>
		</FrontContainer>
	);
};
Boosted8.story = {
	name: 'With eight standard cards - boosted',
};

export const Boosted9 = () => {
	const primary = trails[0];
	const remaining = trails.slice(1, 9);

	return (
		<FrontContainer title="DynamicPackage">
			<DynamicPackage
				groupedTrails={{
					...defaultGroupedTrails,
					snap: [],
					standard: [{ ...primary, isBoosted: true }, ...remaining],
				}}
				showAge={true}
				containerPalette="LongRunningPalette"
			/>
		</FrontContainer>
	);
};
Boosted9.story = {
	name: 'With nine standard cards - boosted',
};

export const OneSnapThreeStandard = () => (
	<FrontContainer title="DynamicPackage">
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [trails[0]],
				standard: trails.slice(1, 4),
			}}
			containerPalette="LongRunningPalette"
		/>
	</FrontContainer>
);
OneSnapThreeStandard.story = {
	name: 'With one snap - three standard cards',
};

export const ThreeSnapTwoStandard = () => (
	<FrontContainer title="DynamicPackage">
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: trails.slice(0, 3),
				standard: trails.slice(3, 5),
			}}
			containerPalette="LongRunningPalette"
		/>
	</FrontContainer>
);
ThreeSnapTwoStandard.story = {
	name: 'With three snaps - two standard cards',
};

export const ThreeSnapTwoStandard2ndBoosted = () => (
	<FrontContainer title="DynamicPackage">
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [trails[0], { ...trails[1], isBoosted: true }, trails[2]],
				standard: trails.slice(3, 5),
			}}
			containerPalette="LongRunningPalette"
		/>
	</FrontContainer>
);
ThreeSnapTwoStandard2ndBoosted.story = {
	name: 'With three snaps (2nd boosted) - two standard cards',
};
