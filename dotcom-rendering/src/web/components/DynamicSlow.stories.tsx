import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import type { DCRGroupedTrails } from '../../types/front';
import { DynamicSlow } from './DynamicSlow';
import { FrontContainer } from './FrontContainer';

const defaultGroupedTrails: DCRGroupedTrails = {
	huge: [],
	veryBig: [],
	big: [],
	standard: [],
	snap: [],
};

export default {
	component: DynamicSlow,
	title: 'Components/DynamicSlow',
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

/* With Avatars */
export const Avatar = () => {
	const avatarTrails = trails.map((trail) => {
		return {
			...trail,
			trailText: 'This is the trail text',
			avatarUrl:
				'https://uploads.guim.co.uk/2017/10/06/George-Monbiot,-L.png',
			format: {
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
				theme: ArticlePillar.Opinion,
			},
		};
	});
	return (
		<FrontContainer title="DynamicSlow">
			<DynamicSlow
				groupedTrails={{
					...defaultGroupedTrails,
					veryBig: avatarTrails
						.slice(0, 2)
						.map((card, index) =>
							index === 0 ? { ...card, isBoosted: true } : card,
						),
					big: avatarTrails.slice(2, 4),
					standard: avatarTrails.slice(4, 8),
				}}
				showAge={true}
			/>
		</FrontContainer>
	);
};
Avatar.story = { name: 'With avatars' };

/* First Slice Variants */
export const OneHugeTwoBigsFourStandards = () => (
	<FrontContainer
		title="DynamicSlow"
		description={`first slice: oneHuge</br>second slice: twoBigs`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				huge: [trails[0]],
				big: trails.slice(1, 3),
				standard: trails.slice(3, 7),
			}}
			showAge={true}
		/>
	</FrontContainer>
);
OneHugeTwoBigsFourStandards.story = {
	name: 'With 1 huge card, 2 bigs, 4 standards',
};

export const OneVeryBigTwoBigsFourStandards = () => (
	<FrontContainer
		title="DynamicSlow"
		description={`first slice: oneVeryBig</br>second slice: twoBigs`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0]],
				big: trails.slice(1, 3),
				standard: trails.slice(3, 7),
			}}
			showAge={true}
		/>
	</FrontContainer>
);
OneVeryBigTwoBigsFourStandards.story = {
	name: 'with 1 very big card, 2 bigs, 4 standards',
};

export const TwoVeryBigsTwoBigsFourStandards = () => (
	<FrontContainer
		title="DynamicSlow"
		description={`first slice: twoVeryBigs</br>second slice: twoBigs`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				big: trails.slice(2, 4),
				standard: trails.slice(4, 8),
			}}
			showAge={true}
		/>
	</FrontContainer>
);
TwoVeryBigsTwoBigsFourStandards.story = {
	name: 'with 2 very big cards, 2 bigs, 4 standards',
};

export const TwoVeryBigs1stBoostedTwoBigsFourStandards = () => (
	<FrontContainer
		title="DynamicSlow"
		description={`first slice: twoVeryBigsFirstBoosted</br>second slice: twoBigs`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [{ ...trails[0], isBoosted: true }, trails[1]],
				big: trails.slice(2, 4),
				standard: trails.slice(4, 8),
			}}
			showAge={true}
		/>
	</FrontContainer>
);
TwoVeryBigs1stBoostedTwoBigsFourStandards.story = {
	name: 'with 2 very big cards (1st boosted), 2 bigs, 4 standards',
};

export const TwoVeryBigs2ndBoostedTwoBigsFourStandards = () => (
	<FrontContainer
		title="DynamicSlow"
		description={`first slice: twoVeryBigsSecondBoosted</br>second slice: twoBigs`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: [trails[0], { ...trails[1], isBoosted: true }],
				big: trails.slice(2, 4),
				standard: trails.slice(4, 8),
			}}
			showAge={true}
		/>
	</FrontContainer>
);
TwoVeryBigs2ndBoostedTwoBigsFourStandards.story = {
	name: 'with 2 very big cards (2nd boosted), 2 bigs, 4 standards',
};

/* Second Slice Variants */
export const TwoVeryBigs8Standards = () => (
	<FrontContainer
		title="DynamicSlow"
		description={`first slice: twoVeryBigs</br>second slice: noBigs`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				standard: trails.slice(2, 10),
			}}
			showAge={true}
		/>
	</FrontContainer>
);
TwoVeryBigs8Standards.story = {
	name: 'with 2 very bigs, 8 standards',
};

export const TwoVeryBigsOneBig4Standards = () => (
	<FrontContainer
		title="DynamicSlow"
		description={`first slice: twoVeryBigs</br>second slice: oneBig`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				big: trails.slice(2, 3),
				standard: trails.slice(3, 7),
			}}
			showAge={true}
		/>
	</FrontContainer>
);

TwoVeryBigsOneBig4Standards.story = {
	name: 'with 2 very bigs, 1 big, 8 standards',
};

export const TwoVeryBigsTwoBigs4Standards = () => (
	<FrontContainer
		title="DynamicSlow"
		description={`first slice: twoVeryBigs</br>second slice: twoBigs`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				big: trails.slice(2, 4),
				standard: trails.slice(4, 8),
			}}
			showAge={true}
		/>
	</FrontContainer>
);
TwoVeryBigsTwoBigs4Standards.story = {
	name: 'with 2 very bigs, 2 bigs, 8 standards',
};

/* Edge cases */

// Uneven number of Standards with no bigs
export const TwoVeryBigsFiveStandards = () => (
	<FrontContainer
		title="DynamicSlow"
		description={`first slice: twoVeryBigs</br>second slice: noBigs`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				standard: trails.slice(2, 7),
			}}
			showAge={true}
		/>
	</FrontContainer>
);
TwoVeryBigsFiveStandards.story = {
	name: 'with 2 very bigs, 5 standards',
};

// Demote a very big to a big & fifth standard is not shown
export const ThreeVeryBigsFiveStandards = () => (
	<FrontContainer
		title="DynamicSlow"
		description={`first slice: twoVeryBigs</br>second slice: oneBig`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 3),
				standard: trails.slice(3, 8),
			}}
			showAge={true}
		/>
	</FrontContainer>
);
ThreeVeryBigsFiveStandards.story = {
	name: 'with 3 very bigs, 5 standards',
};

// No standards were provided
export const TwoVeryBigsOneBig = () => (
	<FrontContainer
		title="DynamicSlow"
		description={`first slice: twoVeryBigs</br>second slice: oneBig`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				big: trails.slice(2, 3),
			}}
			showAge={true}
		/>
	</FrontContainer>
);
TwoVeryBigsOneBig.story = {
	name: 'with 2 very bigs, 1 big',
};

// No first slice
export const TwoBigsThreeStandards = () => (
	<FrontContainer
		title="DynamicSlow"
		description={`first slice: undefined</br>second slice: twoBigs`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				big: trails.slice(0, 2),
				standard: trails.slice(2, 5),
			}}
			showAge={true}
		/>
	</FrontContainer>
);
TwoBigsThreeStandards.story = {
	name: 'with 2 bigs, 3 standards',
};

// Just 1 standard
export const OneVeryBigTwoBigsOneStandard = () => (
	<FrontContainer
		title="DynamicSlow"
		description={`first slice: twoVeryBigs</br>second slice: twoBigs`}
	>
		<DynamicSlow
			groupedTrails={{
				...defaultGroupedTrails,
				veryBig: trails.slice(0, 2),
				big: trails.slice(2, 4),
				standard: trails.slice(4, 5),
			}}
			showAge={true}
		/>
	</FrontContainer>
);
OneVeryBigTwoBigsOneStandard.story = {
	name: 'with 2 very bigs, two bigs, 1 standard',
};
