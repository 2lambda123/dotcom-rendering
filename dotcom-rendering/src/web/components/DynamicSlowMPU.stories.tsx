import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { DynamicSlowMPU } from './DynamicSlowMPU';
import { FrontContainer } from './FrontContainer';

export default {
	component: DynamicSlowMPU,
	title: 'Components/DynamicSlowMPU',
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

const bigs = trails.slice(0, 3);
const standards = trails.slice(3);

export const NoBigs = () => (
	<FrontContainer title="DynamicSlowMPU">
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: [],
				standard: standards,
			}}
			showAge={true}
			index={1}
		/>
	</FrontContainer>
);
NoBigs.story = { name: 'with no big cards, only standard' };

export const OneBig = () => (
	<FrontContainer title="DynamicSlowMPU">
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: bigs.slice(0, 1),
				standard: standards,
			}}
			showAge={true}
			index={1}
		/>
	</FrontContainer>
);
OneBig.story = { name: 'with just one big' };

export const TwoBigs = () => (
	<FrontContainer title="DynamicSlowMPU">
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: bigs.slice(0, 2),
				standard: standards,
			}}
			showAge={true}
			index={1}
		/>
	</FrontContainer>
);
TwoBigs.story = { name: 'with two bigs' };

export const FirstBigBoosted = () => (
	<FrontContainer title="DynamicSlowMPU">
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: bigs
					.slice(0, 2)
					.map((card, index) =>
						index === 0 ? { ...card, isBoosted: true } : card,
					),
				standard: standards,
			}}
			showAge={true}
			index={1}
		/>
	</FrontContainer>
);
FirstBigBoosted.story = { name: 'with the first of two bigs boosted' };

export const SecondBigBoosted = () => (
	<FrontContainer title="DynamicSlowMPU">
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: bigs
					.slice(0, 2)
					.map((card, index) =>
						index === 1 ? { ...card, isBoosted: true } : card,
					),
				standard: standards,
			}}
			showAge={true}
			index={1}
		/>
	</FrontContainer>
);
SecondBigBoosted.story = { name: 'with the second of two bigs boosted' };

export const ThreeBigs = () => (
	<FrontContainer title="DynamicSlowMPU">
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: bigs.slice(0, 3),
				standard: standards,
			}}
			showAge={true}
			index={1}
		/>
	</FrontContainer>
);
ThreeBigs.story = { name: 'with three bigs' };

export const AllBigs = () => (
	<FrontContainer title="DynamicSlowMPU">
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: standards,
				standard: [],
			}}
			showAge={true}
			index={1}
		/>
	</FrontContainer>
);
AllBigs.story = { name: 'with lots of bigs and no standards' };
