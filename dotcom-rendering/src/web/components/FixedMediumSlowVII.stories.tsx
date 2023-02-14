import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedMediumSlowVII } from './FixedMediumSlowVII';
import { FrontContainer } from './FrontContainer';

export default {
	component: FixedMediumSlowVII,
	title: 'Components/FixedMediumSlowVII',
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

export const Default = () => (
	<FrontContainer title="FixedMediumSlowVII">
		<FixedMediumSlowVII trails={trails} showAge={true} />
	</FrontContainer>
);
Default.story = { name: 'FixedMediumSlowVII' };
