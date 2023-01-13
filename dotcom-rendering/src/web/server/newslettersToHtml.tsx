import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { renderToString } from 'react-dom/server';
import type { DCRNewslettersPageType } from '../../types/newslettersPage';
import { NewslettersList } from '../components/NewslettersList';
import { StandAlonePage } from '../layouts/StandAlonePage';
import { populatePageTemplate } from './populatePageTemplate';

export const newslettersToHtml = (model: DCRNewslettersPageType): string => {
	const key = 'dcr';
	const cache = createCache({ key });
	const html = renderToString(
		<CacheProvider value={cache}>
			<StandAlonePage {...model}>
				<NewslettersList
					newsletters={model.newsletters}
					headingText={model.webTitle}
					mmaUrl={model.config.mmaUrl}
				/>
			</StandAlonePage>
		</CacheProvider>,
	);

	return populatePageTemplate(model, html, cache);
};
