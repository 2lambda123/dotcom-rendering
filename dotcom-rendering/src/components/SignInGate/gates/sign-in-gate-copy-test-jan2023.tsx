import { startPerformanceMeasure } from '@guardian/libs';
import React, { Suspense } from 'react';
import { Lazy } from '../../Lazy';
import { canShowSignInGate } from '../displayRule';
import type { SignInGateComponent } from '../types';

const SignInGateCopyTestJan2023 = React.lazy(() => {
	const { endPerformanceMeasure } = startPerformanceMeasure(
		'identity',
		'SignInGateCopyTestJan2023',
	);
	return import(
		/* webpackChunkName: "SignInGateMain" */ '../gateDesigns/SignInGateCopyTestJan2023'
	).then((module) => {
		endPerformanceMeasure();
		return { default: module.SignInGateCopyTestJan2023 };
	});
});

export const signInGateCopyTestJan2023Component: SignInGateComponent = {
	gate: ({
		ophanComponentId,
		dismissGate,
		guUrl,
		signInUrl,
		registerUrl,
		abTest,
	}) => (
		<Lazy margin={300}>
			<Suspense fallback={<></>}>
				<SignInGateCopyTestJan2023
					ophanComponentId={ophanComponentId}
					dismissGate={dismissGate}
					guUrl={guUrl}
					signInUrl={signInUrl}
					registerUrl={registerUrl}
					abTest={abTest}
				/>
			</Suspense>
		</Lazy>
	),
	canShow: canShowSignInGate,
};