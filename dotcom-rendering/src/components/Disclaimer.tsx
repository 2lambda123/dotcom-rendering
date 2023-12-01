import { css } from '@emotion/react';
import { body } from '@guardian/source-foundations';

const disclaimerStyles = css`
	${body.small()};

	sup {
		font-size: 85%;
	}

	margin-bottom: 16px;
`;

type Props = {
	html: string;
};

export const Disclaimer = ({ html }: Props) => (
	<footer
		css={disclaimerStyles}
		data-testid="affiliate-disclaimer"
		dangerouslySetInnerHTML={{
			__html: html,
		}}
	/>
);
