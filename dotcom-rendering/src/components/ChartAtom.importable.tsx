import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';

interface Props {
	id: string;
	html: string;
}

const chartAtomStyles = css`
	padding-bottom: ${space[1]}px;
`;

export const ChartAtom = ({ id, html }: Props) => {
	return (
		<div
			data-atom-id={id}
			data-testid="chart"
			data-atom-type="chart"
			data-snippet-type="chart"
			css={chartAtomStyles}
		>
			<iframe
				title="chart"
				className="atom__iframe"
				name={id}
				srcDoc={html}
				width="100%"
				frameBorder="0"
			></iframe>
		</div>
	);
};
