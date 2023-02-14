import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedSmallSlowVMPU } from './FixedSmallSlowVMPU';
import { FrontContainer } from './FrontContainer';

export default {
	component: FixedSmallSlowVMPU,
	title: 'Components/FixedSmallSlowVMPU',
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

export const FourCards = () => (
	<FrontContainer title="FixedSmallSlowVMPU">
		<FixedSmallSlowVMPU
			trails={trails.slice(0, 4)}
			showAge={true}
			index={1}
		/>
	</FrontContainer>
);

FourCards.story = { name: 'With 4 cards' };

export const ThreeCards = () => (
	<FrontContainer title="FixedSmallSlowVMPU">
		<FixedSmallSlowVMPU
			trails={trails.slice(0, 3)}
			showAge={true}
			index={1}
		/>
	</FrontContainer>
);

ThreeCards.story = { name: 'With 3 cards' };

export const TwoCards = () => (
	<FrontContainer title="FixedSmallSlowVMPU">
		<FixedSmallSlowVMPU
			trails={trails.slice(0, 2)}
			showAge={true}
			index={1}
		/>
	</FrontContainer>
);

TwoCards.story = { name: 'With 2 cards' };

export const OneCard = () => (
	<FrontContainer title="FixedSmallSlowVMPU">
		<FixedSmallSlowVMPU
			trails={trails.slice(0, 1)}
			showAge={true}
			index={1}
		/>
	</FrontContainer>
);

OneCard.story = { name: 'With 1 card' };
