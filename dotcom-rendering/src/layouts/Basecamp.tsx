import { css } from '@emotion/react';
import {
	brandBackground,
	brandBorder,
	fonts,
	space,
} from '@guardian/source-foundations';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Section } from '../components/Section';
import { getContributionsServiceUrl } from '../lib/contributions';
import type { NavType } from '../model/extract-nav';
import type { FEArticleType } from '../types/frontend';

interface Props {
	article: FEArticleType;
	format: ArticleFormat;
	NAV: NavType;
}

export const Basecamp = ({ article, format, NAV }: Props) => {
	const isInEuropeTest =
		article.config.abTests.europeNetworkFrontVariant === 'variant';
	return (
		<>
			<Section
				fullWidth={true}
				showTopBorder={false}
				showSideBorders={false}
				padSides={false}
				shouldCenter={false}
				backgroundColour={brandBackground.primary}
				element="header"
			>
				<Header
					editionId={article.editionId}
					idUrl={article.config.idUrl}
					mmaUrl={article.config.mmaUrl}
					discussionApiUrl={article.config.discussionApiUrl}
					urls={article.nav.readerRevenueLinks.header}
					remoteHeader={!!article.config.switches.remoteHeader}
					contributionsServiceUrl={getContributionsServiceUrl(
						article,
					)}
					idApiUrl={article.config.idApiUrl}
					isInEuropeTest={isInEuropeTest}
					headerTopBarSearchCapiSwitch={
						!!article.config.switches.headerTopBarSearchCapi
					}
				/>
			</Section>
			<Section>
				<main
					css={css`
						padding: ${space[2]}px;
						font-family: ${fonts.body};
						max-width: 1300px;
					`}
				>
					This is the temporary Basecampe example
				</main>
			</Section>
			<Section
				fullWidth={true}
				padSides={false}
				backgroundColour={brandBackground.primary}
				borderColour={brandBorder.primary}
				showSideBorders={false}
				element="footer"
			>
				<Footer
					pageFooter={article.pageFooter}
					selectedPillar={NAV.selectedPillar}
					pillars={NAV.pillars}
					urls={article.nav.readerRevenueLinks.header}
					editionId={article.editionId}
					contributionsServiceUrl={article.contributionsServiceUrl}
				/>
			</Section>
		</>
	);
};
