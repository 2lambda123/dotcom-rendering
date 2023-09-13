import { AppEmailSignUpWrapper } from './AppEmailSignUp.importable';
import { useConfig } from './ConfigContext';
import { EmailSignup, type EmailSignUpProps } from './EmailSignup';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
import { Island } from './Island';

interface EmailSignUpSwitcherProps extends EmailSignUpProps {
	index: number;
}

export const EmailSignUpSwitcher = ({
	index,
	...emailSignUpProps
}: EmailSignUpSwitcherProps) => {
	const { renderingTarget } = useConfig();

	return renderingTarget === 'Apps' ? (
		<Island clientOnly={true} deferUntil={'idle'}>
			<AppEmailSignUpWrapper index={index} {...emailSignUpProps} />
		</Island>
	) : (
		<InlineSkipToWrapper
			id={`EmailSignup-skip-link-${index}`}
			blockDescription="newsletter promotion"
		>
			<EmailSignup {...emailSignUpProps} />
		</InlineSkipToWrapper>
	);
};
