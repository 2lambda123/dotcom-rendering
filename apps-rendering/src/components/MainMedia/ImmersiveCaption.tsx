// ----- Imports ----- //

import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	from,
	neutral,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { OptionKind } from '@guardian/types';
import Caption from 'components/caption';
import { grid } from 'grid/grid';
import { maybeRender } from 'lib';
import type { MainMedia } from 'mainMedia';
import { MainMediaKind } from 'mainMedia';
import type { FC } from 'react';
import { immersiveCaptionId } from './MainMedia.defaults';

// ----- Component ----- //

const styles = css`
	${textSans.xxsmall()}
	color: ${neutral[46]};
	${grid.column.centre}

	${from.leftCol} {
		${grid.column.left}
		grid-row: 4;
		padding-top: ${remSpace[1]};
	}
`;

type Props = {
	mainMedia: Option<MainMedia>;
	format: ArticleFormat;
};

const ImmersiveCaption: FC<Props> = ({ mainMedia, format }) =>
	maybeRender(mainMedia, (media) => {
		if (media.kind === MainMediaKind.Video) {
			return null;
		}

		const { caption, credit } = media.image;

		if (
			caption.kind === OptionKind.None &&
			credit.kind === OptionKind.None
		) {
			return null;
		}

		return (
			<p id={immersiveCaptionId} css={styles}>
				{maybeRender(caption, (cap) => (
					<Caption caption={cap} format={format} />
				))}{' '}
				{maybeRender(credit, (cred) => (
					<>{cred}</>
				))}
			</p>
		);
	});

// ----- Exports ----- //

export default ImmersiveCaption;
