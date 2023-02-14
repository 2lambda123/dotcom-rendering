import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedMediumFastXI } from './FixedMediumFastXI';
import { FrontContainer } from './FrontContainer';

export default {
	component: FixedMediumFastXI,
	title: 'Components/FixedMediumFastXI',
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
	<FrontContainer title="FixedMediumFastXI">
		<FixedMediumFastXI trails={trails.slice(0, 1)} />
	</FrontContainer>
);
OneTrail.story = { name: 'with one trail' };

export const TwoTrails = () => (
	<FrontContainer title="FixedMediumFastXI">
		<FixedMediumFastXI trails={trails.slice(0, 2)} />
	</FrontContainer>
);
TwoTrails.story = { name: 'with two trails' };

export const ThreeTrails = () => (
	<FrontContainer title="FixedMediumFastXI">
		<FixedMediumFastXI trails={trails.slice(0, 3)} />
	</FrontContainer>
);
ThreeTrails.story = { name: 'with three trails' };

export const FourTrails = () => (
	<FrontContainer title="FixedMediumFastXI">
		<FixedMediumFastXI trails={trails.slice(0, 4)} />
	</FrontContainer>
);
FourTrails.story = { name: 'with four trails' };

export const FiveTrails = () => (
	<FrontContainer title="FixedMediumFastXI">
		<FixedMediumFastXI trails={trails.slice(0, 5)} />
	</FrontContainer>
);
FiveTrails.story = { name: 'with five trails' };

export const SixTrails = () => (
	<FrontContainer title="FixedMediumFastXI">
		<FixedMediumFastXI trails={trails.slice(0, 6)} />
	</FrontContainer>
);
SixTrails.story = { name: 'with six trails' };

export const SevenTrails = () => (
	<FrontContainer title="FixedMediumFastXI">
		<FixedMediumFastXI trails={trails.slice(0, 7)} />
	</FrontContainer>
);
SevenTrails.story = { name: 'with seven trails' };

export const EightTrails = () => (
	<FrontContainer title="FixedMediumFastXI">
		<FixedMediumFastXI trails={trails.slice(0, 8)} />
	</FrontContainer>
);
EightTrails.story = { name: 'with eight trails' };

export const NineTrails = () => (
	<FrontContainer title="FixedMediumFastXI">
		<FixedMediumFastXI trails={trails.slice(0, 9)} />
	</FrontContainer>
);
NineTrails.story = { name: 'with nine trails' };

export const TenTrails = () => (
	<FrontContainer title="FixedMediumFastXI">
		<FixedMediumFastXI trails={trails.slice(0, 10)} />
	</FrontContainer>
);
TenTrails.story = { name: 'with ten trails' };

export const ElevenTrails = () => (
	<FrontContainer title="FixedMediumFastXI">
		<FixedMediumFastXI trails={trails.slice(0, 11)} />
	</FrontContainer>
);
ElevenTrails.story = { name: 'with eleven trails' };
