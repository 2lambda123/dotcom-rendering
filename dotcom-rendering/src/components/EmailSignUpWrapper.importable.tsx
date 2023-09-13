import { useIsBridgetCompatible } from '../lib/useIsBridgetCompatible';
import { useConfig } from './ConfigContext';
import { EmailSignup, type EmailSignUpProps } from './EmailSignup';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';

interface EmailSignUpWrapperProps extends EmailSignUpProps {
	index: number;
}

export const EmailSignUpWrapper = ({
	index,
	...emailSignUpProps
}: EmailSignUpWrapperProps) => {
	const { renderingTarget } = useConfig();
	const isCompatible = useIsBridgetCompatible();

	if (renderingTarget === 'Apps' && !isCompatible) {
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
