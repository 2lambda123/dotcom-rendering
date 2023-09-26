import { css } from '@emotion/react';
import { palette, remSpace, textSans } from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';

interface Props {
	onClickSupport: () => void;
}
const supportBannerStyles = css`
	padding: ${remSpace[3]};
	background-color: ${palette.neutral[93]};

	p {
		${textSans.small()};
		color: ${palette.brand[400]};
		font-weight: bold;
		margin-top: 0;
	}

	button {
		margin-top: ${remSpace[2]};
	}
`;

/**
 * Support banner component, used at the bottom of the ad slot
 *
 * @todo Allow this to be used with web ad slots
 * @todo Style for dark mode in apps
 */
export const AdSupportBanner = ({ onClickSupport }: Props) => (
	<div css={supportBannerStyles}>
		<p>Enjoy the Guardian ad-free</p>
		<Button size="xsmall" priority="primary" onClick={onClickSupport}>
			Support the Guardian
		</Button>
	</div>
);
