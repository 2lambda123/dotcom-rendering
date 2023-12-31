import { css } from '@emotion/react';

const base = css`
	height: 0.7em;
	width: auto;
	vertical-align: baseline;
	margin-right: 4px;
`;
type Props = {
	colour: string;
};

/**
 * An inline quote icon (“) sized to match the font size.
 */
export const QuoteIcon = ({ colour }: Props) => (
	/* This viewBox is narrower than Source’s SvgQuote */
	<svg viewBox="0 0 22 14" css={base} style={{ fill: colour }}>
		<path d="M5.255 0h4.75c-.572 4.53-1.077 8.972-1.297 13.941H0C.792 9.104 2.44 4.53 5.255 0Zm11.061 0H21c-.506 4.53-1.077 8.972-1.297 13.941h-8.686c.902-4.837 2.485-9.411 5.3-13.941Z" />
	</svg>
);
