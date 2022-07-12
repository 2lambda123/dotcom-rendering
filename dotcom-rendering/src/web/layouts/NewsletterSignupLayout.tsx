import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import type { Breakpoint } from '@guardian/source-foundations';
import {
	brandAlt,
	brandBackground,
	brandBorder,
	brandLine,
	neutral,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import {
	Column,
	Columns,
	SvgEnvelope,
	SvgEye,
	SvgGuardianLogo,
} from '@guardian/source-react-components';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { buildAdTargeting } from '../../lib/ad-targeting';
import { AdSlot, MobileStickyContainer } from '../components/AdSlot';
import { ArticleBody } from '../components/ArticleBody';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ContainerLayout } from '../components/ContainerLayout';
import { ElementContainer } from '../components/ElementContainer';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { MainMedia } from '../components/MainMedia';
import { Nav } from '../components/Nav/Nav';
import { NewsletterBadge } from '../components/NewslettersBadge';
import { OnwardsUpper } from '../components/OnwardsUpper.importable';
import { ShareIcons } from '../components/ShareIcons';
import { SubNav } from '../components/SubNav.importable';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decidePalette } from '../lib/decidePalette';
import { getCurrentPillar } from '../lib/layoutHelpers';
import { BannerWrapper, Stuck } from './lib/stickiness';

// This Layout is not currently in use.
// It is an outline of a design for articles with the ArticleDesign.NewsletterSignup
// which are currently rendered using the standard layout.
// The full version of the design is to be implemented by the newsletters team.

// to use this layout, edit ./dotcom-rendering/src/web/layouts/DecideLayout.tsx
// to return is on articles with  ArticleDisplay.Standard && ArticleDesign.NewsletterSignup

const mainColWrapperStyle = css`
	display: flex;
	height: 100%;
	flex-direction: column;
	justify-content: flex-end;
	max-width: 200px;

	${until.wide} {
		max-width: 160px;
	}

	${until.leftCol} {
		justify-content: flex-start;
		max-width: 200px;
	}

	${until.desktop} {
		max-width: 170px;
	}
`;

const mainColGuardianLogoContainerStyle = css`
	svg {
		display: none;

		${until.leftCol} {
			width: 65%;
			display: block;
		}
	}
`;

// the negative bottom values at the two column layout are to
// align the baseline of the text in the newsletters badge svg
// with the guardaina logo in the leftCol, rather than aligning
// the bottom of the SVG frame (design requirement)
const mainColNewsLettersBadgeContainerStyle = css`
	svg {
		width: 100%;
		position: relative;
		bottom: -10px;

		${until.wide} {
			bottom: -9px;
		}

		${until.leftCol} {
			padding-top: ${space[1]}px;
			bottom: 0;
		}
	}
`;

const leftColWrapperStyle = css`
	display: flex;
	justify-content: flex-end;
	margin-top: ${space[2]}px;
	margin-bottom: ${space[9]}px;

	svg {
		max-width: 100%;
	}
`;

const mainGraphicWrapperStyle = css`
	border-radius: ${space[2]}px;
	overflow: hidden;

	& > figcaption {
		display: flex;

		${until.desktop} {
			display: none;
		}

		background-color: ${brandAlt[400]};
		align-items: center;
		padding: ${space[1]}px;
		${textSans.medium({ fontWeight: 'bold', lineHeight: 'tight' })}

		svg {
			margin-right: ${space[1]}px;
			flex-shrink: 0;
		}
	}
`;

interface NewsletterDetailProps {
	text: string;
	showUntil?: Breakpoint;
}
const NewsletterDetail = ({ text, showUntil }: NewsletterDetailProps) => {
	const displayRule = showUntil
		? `
	display: none;
	${until[showUntil]} {
		display: flex;
	}
	`
		: `display: flex;`;

	const containerStyle = css`
		${displayRule}
		align-items: center;
		padding-top: ${space[3]}px;
		padding-bottom: ${space[2]}px;

		svg {
			background-color: ${brandAlt[400]};
			border-radius: 50%;
			padding: 2px;
			margin-right: ${space[2]}px;
		}

		span {
			${textSans.medium({ fontWeight: 'bold' })};
		}
	`;

	return (
		<div css={containerStyle}>
			<SvgEnvelope size="small" />
			<span>{text}</span>
		</div>
	);
};

interface Props {
	CAPIArticle: CAPIArticleType;
	NAV: NavType;
	format: ArticleFormat;
}

export const NewsletterSignupLayout = ({ CAPIArticle, NAV, format }: Props) => {
	const {
		config: { host },
	} = CAPIArticle;

	const adTargeting: AdTargeting = buildAdTargeting({
		isAdFreeUser: CAPIArticle.isAdFreeUser,
		isSensitive: CAPIArticle.config.isSensitive,
		videoDuration: CAPIArticle.config.videoDuration,
		edition: CAPIArticle.config.edition,
		section: CAPIArticle.config.section,
		sharedAdTargeting: CAPIArticle.config.sharedAdTargeting,
		adUnit: CAPIArticle.config.adUnit,
	});
	const contributionsServiceUrl = getContributionsServiceUrl(CAPIArticle);

	const palette = decidePalette(format);

	return (
		<>
			<div data-print-layout="hide" id="bannerandheader">
				<Stuck>
					<ElementContainer
						showTopBorder={false}
						showSideBorders={false}
						padded={false}
						shouldCenter={false}
					>
						<HeaderAdSlot
							isAdFreeUser={CAPIArticle.isAdFreeUser}
							shouldHideAds={CAPIArticle.shouldHideAds}
							display={format.display}
						/>
					</ElementContainer>
				</Stuck>
				<ElementContainer
					showTopBorder={false}
					showSideBorders={false}
					padded={false}
					backgroundColour={brandBackground.primary}
					element="header"
				>
					<Header
						editionId={CAPIArticle.editionId}
						idUrl={CAPIArticle.config.idUrl}
						mmaUrl={CAPIArticle.config.mmaUrl}
						supporterCTA={
							CAPIArticle.nav.readerRevenueLinks.header.supporter
						}
						discussionApiUrl={CAPIArticle.config.discussionApiUrl}
						urls={CAPIArticle.nav.readerRevenueLinks.header}
						remoteHeader={CAPIArticle.config.switches.remoteHeader}
						contributionsServiceUrl={contributionsServiceUrl}
					/>
				</ElementContainer>
				<ElementContainer
					showSideBorders={true}
					borderColour={brandLine.primary}
					showTopBorder={false}
					padded={false}
					backgroundColour={brandBackground.primary}
					element="nav"
				>
					<Nav
						nav={NAV}
						format={{
							...format,
							theme: getCurrentPillar(CAPIArticle),
						}}
						subscribeUrl={
							CAPIArticle.nav.readerRevenueLinks.header.subscribe
						}
						editionId={CAPIArticle.editionId}
					/>
				</ElementContainer>

				{NAV.subNavSections && (
					<>
						<ElementContainer
							backgroundColour={palette.background.article}
							padded={false}
							element="aside"
						>
							<Island deferUntil="idle">
								<SubNav
									subNavSections={NAV.subNavSections}
									currentNavLink={NAV.currentNavLink}
									format={format}
								/>
							</Island>
						</ElementContainer>
						<ElementContainer
							backgroundColour={palette.background.article}
							padded={false}
							showTopBorder={false}
						>
							<StraightLines
								count={4}
								cssOverrides={css`
									display: block;
								`}
							/>
						</ElementContainer>
					</>
				)}
			</div>

			{CAPIArticle.config.switches.surveys && (
				<AdSlot position="survey" display={format.display} />
			)}

			<main>
				<ContainerLayout
					innerBackgroundColour={brandBackground.primary}
					leftContent={
						<div css={leftColWrapperStyle}>
							<SvgGuardianLogo
								textColor={neutral[100]}
								width={200}
							/>
						</div>
					}
				>
					<div css={mainColWrapperStyle}>
						<span css={mainColGuardianLogoContainerStyle}>
							<SvgGuardianLogo
								textColor={neutral[100]}
								width={200}
							/>
						</span>
						<span css={mainColNewsLettersBadgeContainerStyle}>
							<NewsletterBadge />
						</span>
					</div>
				</ContainerLayout>
				<ContainerLayout
					centralBorder="full"
					sideBorders={true}
					stretchRight={true}
					leftContent={<NewsletterDetail text="UK Focused" />}
				>
					<Columns collapseUntil="desktop">
						<Column width={[1, 1, 5 / 8, 4 / 8, 4 / 8]}>
							<NewsletterDetail
								text="UK Focused"
								showUntil="leftCol"
							/>
							<div>
								<ArticleHeadline
									format={format}
									headlineString={CAPIArticle.headline}
									tags={CAPIArticle.tags}
									byline={CAPIArticle.author.byline}
									webPublicationDateDeprecated={
										CAPIArticle.webPublicationDateDeprecated
									}
								/>
							</div>
							<ArticleBody
								format={format}
								blocks={CAPIArticle.blocks}
								adTargeting={adTargeting}
								host={host}
								pageId={CAPIArticle.pageId}
								webTitle={CAPIArticle.webTitle}
								ajaxUrl={CAPIArticle.config.ajaxUrl}
								switches={CAPIArticle.config.switches}
								isSensitive={CAPIArticle.config.isSensitive}
								isAdFreeUser={CAPIArticle.isAdFreeUser}
								section={CAPIArticle.config.section}
								shouldHideReaderRevenue={
									CAPIArticle.shouldHideReaderRevenue
								}
								tags={CAPIArticle.tags}
								isPaidContent={
									!!CAPIArticle.config.isPaidContent
								}
								contributionsServiceUrl={
									contributionsServiceUrl
								}
								contentType={CAPIArticle.contentType}
								sectionName={CAPIArticle.sectionName || ''}
								isPreview={CAPIArticle.config.isPreview}
								idUrl={CAPIArticle.config.idUrl || ''}
								isDev={!!CAPIArticle.config.isDev}
							/>
							<div
								css={css`
									display: flex;
									align-items: center;
								`}
							>
								<span
									css={css`
										${textSans.medium({
											fontWeight: 'bold',
										})};
										margin-right: ${space[4]}px;
									`}
								>
									Tell your friends
								</span>
								<div>
									<ShareIcons
										pageId={CAPIArticle.pageId}
										webTitle={CAPIArticle.webTitle}
										format={format}
										displayIcons={[
											'facebook',
											'twitter',
											'email',
										]}
										size="medium"
										context="ArticleMeta"
									/>
								</div>
							</div>
						</Column>
						<Column width={[1, 1, 3 / 8, 4 / 8, 4 / 8]}>
							<div css={mainGraphicWrapperStyle}>
								<figcaption>
									<SvgEye size="small" />
									<span>
										Click here to see the latest version of
										this newsletter
									</span>
								</figcaption>
								<MainMedia
									format={format}
									elements={CAPIArticle.mainMediaElements}
									adTargeting={adTargeting}
									host={host}
									pageId={CAPIArticle.pageId}
									webTitle={CAPIArticle.webTitle}
									ajaxUrl={CAPIArticle.config.ajaxUrl}
									switches={CAPIArticle.config.switches}
									isAdFreeUser={CAPIArticle.isAdFreeUser}
									isSensitive={CAPIArticle.config.isSensitive}
									hideCaption={true}
								/>
							</div>
						</Column>
					</Columns>
				</ContainerLayout>

				<Island
					clientOnly={true}
					deferUntil="idle"
					placeholderHeight={304}
				>
					<OnwardsUpper
						ajaxUrl={CAPIArticle.config.ajaxUrl}
						hasRelated={CAPIArticle.hasRelated}
						hasStoryPackage={CAPIArticle.hasStoryPackage}
						isAdFreeUser={CAPIArticle.isAdFreeUser}
						pageId={CAPIArticle.pageId}
						isPaidContent={
							CAPIArticle.config.isPaidContent || false
						}
						showRelatedContent={
							CAPIArticle.config.showRelatedContent
						}
						keywordIds={CAPIArticle.config.keywordIds}
						contentType={CAPIArticle.contentType}
						tags={CAPIArticle.tags}
						format={format}
						pillar={format.theme}
						editionId={CAPIArticle.editionId}
						shortUrlId={CAPIArticle.config.shortUrlId}
					/>
				</Island>
			</main>

			<ElementContainer
				data-print-layout="hide"
				padded={false}
				backgroundColour={brandBackground.primary}
				borderColour={brandBorder.primary}
				showSideBorders={false}
				element="footer"
			>
				<Footer
					pageFooter={CAPIArticle.pageFooter}
					pillar={format.theme}
					pillars={NAV.pillars}
					urls={CAPIArticle.nav.readerRevenueLinks.header}
					editionId={CAPIArticle.editionId}
					contributionsServiceUrl={
						CAPIArticle.contributionsServiceUrl
					}
				/>
			</ElementContainer>

			<BannerWrapper data-print-layout="hide" />
			<MobileStickyContainer data-print-layout="hide" />
		</>
	);
};
