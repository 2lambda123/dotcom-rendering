import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedSmallSlowVThird } from './FixedSmallSlowVThird';
import { FrontContainer } from './FrontContainer';

export default {
	component: FixedSmallSlowVThird,
	title: 'Components/FixedSmallSlowVThird',
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
	<FrontContainer title="FixedSmallSlowVThird">
		<FixedSmallSlowVThird trails={trails} showAge={true} />
	</FrontContainer>
);
Default.story = { name: 'FixedSmallSlowVThird' };
