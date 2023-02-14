import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedLargeSlowXIV } from './FixedLargeSlowXIV';
import { FrontContainer } from './FrontContainer';

export default {
	component: FixedLargeSlowXIV,
	title: 'Components/FixedLargeSlowXIV',
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
	<FrontContainer title="FixedLargeSlowXIV">
		<FixedLargeSlowXIV trails={trails} showAge={true} />
	</FrontContainer>
);
Default.story = { name: 'FixedLargeSlowXIV' };
