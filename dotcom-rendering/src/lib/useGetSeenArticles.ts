import { useEffect, useState } from 'react';
import type { RenderingTarget } from '../types/renderingTarget';
import { getUserClient } from './bridgetApi';

export const useGetSeenArticles = (
	urls: string[],
	renderingTarget: RenderingTarget = 'Web',
): string[] => {
	const [seenUrls, setSeenUrls] = useState<string[]>([]);

	// TODO: Infinite rerender we need to fix
	useEffect(() => {
		if (renderingTarget === 'Apps') {
			void getUserClient()
				.filterSeenArticles(urls)
				.then((seen) => {
					// TODO: This is hacky - do we have a way to split the url param instead?
					// We'd need to call the helper on the comparison in carousel too
					const surls = seen.map(
						(id) => `https://www.theguardian.com/${id}`,
					);
					setSeenUrls(surls);
				})
				.catch((error) => {
					console.log('filterSeenArticles', { error });
				});
		}
	}, [urls, renderingTarget]);

	return seenUrls;
};
