import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedSmallSlowIV } from './FixedSmallSlowIV';
import { FrontContainer } from './FrontContainer';

export default {
	component: FixedSmallSlowIV,
	title: 'Components/FixedSmallSlowIV',
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
	<FrontContainer title="FixedSmallSlowIV">
		<FixedSmallSlowIV trails={trails} showAge={true} />
	</FrontContainer>
);
Default.story = { name: 'FixedSmallSlowIV' };
