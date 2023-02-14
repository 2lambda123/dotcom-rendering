import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../../fixtures/manual/trails';
import { FixedMediumFastXII } from './FixedMediumFastXII';
import { FrontContainer } from './FrontContainer';

export default {
	component: FixedMediumFastXII,
	title: 'Components/FixedMediumFastXII',
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
	<FrontContainer title="FixedMediumFastXII">
		<FixedMediumFastXII trails={trails} showAge={true} />
	</FrontContainer>
);
Default.story = { name: 'FixedMediumFastXII' };
