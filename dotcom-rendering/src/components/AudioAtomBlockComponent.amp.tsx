import type { AudioAtomBlockElement } from '../types/content';

type Props = {
	element: AudioAtomBlockElement;
};

export const AudioAtomBlockComponent = ({ element }: Props) => {
	return (
		<amp-audio src={element.trackUrl} title={element.kicker}>
			<div fallback="">
				<p>
					We&apos;re unable to serve this media because your browser
					does not support HTML 5 audio.
				</p>
			</div>
		</amp-audio>
	);
};
