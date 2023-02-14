import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedSmallSlowI } from './FixedSmallSlowI';
import { FrontContainer } from './FrontContainer';

export default {
	component: FixedSmallSlowI,
	title: 'Components/FixedSmallSlowI',
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
	<FrontContainer title="FixedSmallSlowI">
		<FixedSmallSlowI trails={trails} showAge={true} />
	</FrontContainer>
);
Default.story = { name: 'FixedSmallSlowI' };
