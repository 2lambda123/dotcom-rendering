import { useIsBridgetCompatible } from '../lib/useIsBridgetCompatible';
import type { EmailSignUpProps } from './EmailSignup';
import { EmailSignup } from './EmailSignup';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
interface AppEmailSignUpWrapperProps extends EmailSignUpProps {
	index: number;
}

export const AppEmailSignUpWrapper = ({
	index,
	...emailSignUpProps
}: AppEmailSignUpWrapperProps) => {
	const isCompatible = useIsBridgetCompatible();

	if (!isCompatible) {
		return null;
	}

	return (
		<InlineSkipToWrapper
			id={`EmailSignup-skip-link-${index}`}
			blockDescription="newsletter promotion"
		>
			<EmailSignup {...emailSignUpProps} />
		</InlineSkipToWrapper>
	);
};
