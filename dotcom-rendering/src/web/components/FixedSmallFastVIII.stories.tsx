import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedSmallFastVIII } from './FixedSmallFastVIII';
import { FrontContainer } from './FrontContainer';

export default {
	component: FixedSmallFastVIII,
	title: 'Components/FixedSmallFastVIII',
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
	<FrontContainer title="FixedSmallFastVIII">
		<FixedSmallFastVIII trails={trails} showAge={true} />
	</FrontContainer>
);
Default.story = { name: 'FixedSmallFastVIII' };
