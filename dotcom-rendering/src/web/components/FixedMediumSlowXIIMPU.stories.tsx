import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedMediumSlowXIIMPU } from './FixedMediumSlowXIIMPU';
import { FrontContainer } from './FrontContainer';

export default {
	component: FixedMediumSlowXIIMPU,
	title: 'Components/FixedMediumSlowXIIMPU',
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

export const OneTrail = () => (
	<FrontContainer title="FixedMediumSlowXIIMPU">
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 1)}
			showAge={true}
			index={1}
		/>
	</FrontContainer>
);
OneTrail.story = { name: 'with one trail' };

export const TwoTrails = () => (
	<FrontContainer title="FixedMediumSlowXIIMPU">
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 2)}
			showAge={true}
			index={1}
		/>
	</FrontContainer>
);
TwoTrails.story = { name: 'with two trails' };

export const ThreeTrails = () => (
	<FrontContainer title="FixedMediumSlowXIIMPU">
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 3)}
			showAge={true}
			index={1}
		/>
	</FrontContainer>
);
ThreeTrails.story = { name: 'with three trails' };

export const FourTrails = () => (
	<FrontContainer title="FixedMediumSlowXIIMPU">
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 4)}
			showAge={true}
			index={1}
		/>
	</FrontContainer>
);
FourTrails.story = { name: 'with four trails' };

export const FiveTrails = () => (
	<FrontContainer title="FixedMediumSlowXIIMPU">
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 5)}
			showAge={true}
			index={1}
		/>
	</FrontContainer>
);
FiveTrails.story = { name: 'with five trails' };

export const SixTrails = () => (
	<FrontContainer title="FixedMediumSlowXIIMPU">
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 6)}
			showAge={true}
			index={1}
		/>
	</FrontContainer>
);
SixTrails.story = { name: 'with six trails' };

export const SevenTrails = () => (
	<FrontContainer title="FixedMediumSlowXIIMPU">
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 7)}
			showAge={true}
			index={1}
		/>
	</FrontContainer>
);
SevenTrails.story = { name: 'with seven trails' };

export const EightTrails = () => (
	<FrontContainer title="FixedMediumSlowXIIMPU">
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 8)}
			showAge={true}
			index={1}
		/>
	</FrontContainer>
);
EightTrails.story = { name: 'with eight trails' };

export const NineTrails = () => (
	<FrontContainer title="FixedMediumSlowXIIMPU">
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 9)}
			showAge={true}
			index={1}
		/>
	</FrontContainer>
);
NineTrails.story = { name: 'with nine trails' };
