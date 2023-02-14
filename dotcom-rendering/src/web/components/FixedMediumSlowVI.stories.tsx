import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedMediumSlowVI } from './FixedMediumSlowVI';
import { FrontContainer } from './FrontContainer';

export default {
	component: FixedMediumSlowVI,
	title: 'Components/FixedMediumSlowVI',
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
	<FrontContainer title="FixedSmallSlowVI">
		<FixedMediumSlowVI trails={trails} showAge={true} />
	</FrontContainer>
);
Default.story = { name: 'FixedSmallSlowVI' };
