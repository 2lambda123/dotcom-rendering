import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedSmallSlowIII } from './FixedSmallSlowIII';
import { FrontContainer } from './FrontContainer';

export default {
	component: FixedSmallSlowIII,
	title: 'Components/FixedSmallSlowIII',
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
	<FrontContainer title="FixedSmallSlowIII">
		<FixedSmallSlowIII trails={trails} showAge={true} />
	</FrontContainer>
);
Default.story = { name: 'FixedSmallSlowIII' };
