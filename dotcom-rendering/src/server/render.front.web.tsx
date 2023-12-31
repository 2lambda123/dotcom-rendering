import { isString, Pillar } from '@guardian/libs';
import { ConfigProvider } from '../components/ConfigContext';
import { FrontPage } from '../components/FrontPage';
import { TagFrontPage } from '../components/TagFrontPage';
import {
	generateScriptTags,
	getModulesBuild,
	getPathFromManifest,
} from '../lib/assets';
import { renderToStringWithEmotion } from '../lib/emotion';
import { getHttp3Url } from '../lib/getHttp3Url';
import { polyfillIO } from '../lib/polyfill.io';
import { themeToPillar } from '../lib/themeToPillar';
import type { NavType } from '../model/extract-nav';
import { extractNAV } from '../model/extract-nav';
import { createGuardian } from '../model/guardian';
import type { Config } from '../types/configContext';
import type { DCRFrontType } from '../types/front';
import type { DCRTagFrontType } from '../types/tagFront';
import { htmlPageTemplate } from './htmlPageTemplate';

interface Props {
	front: DCRFrontType;
}

const extractFrontNav = (front: DCRFrontType): NavType => {
	const NAV = extractNAV(front.nav);
	const { currentNavLink } = NAV;

	// Is the `currentNavLink` a pillar?
	const pillarFromCurrentLink = (() => {
		switch (currentNavLink) {
			// The pillar name is "arts" in CAPI, but "culture" everywhere else
			case 'Arts':
			case 'Culture':
				return Pillar.Culture;
			case 'Opinion':
				return Pillar.Opinion;
			case 'News':
				return Pillar.News;
			case 'Sport':
				return Pillar.Sport;
			case 'Lifestyle':
				return Pillar.Lifestyle;
			default:
				return undefined;
		}
	})();

	// Is the `currentNavLink` in one of the children of the pillar?
	const themeFromSubNav = NAV.pillars.find((pillar) => {
		// Annoyingly "Football" appears in "News" and "Sport" pillars, so we exclude this case in "News"
		// As "Football" is always "Sport". You can see the corresponding `frontend` code here:
		// https://github.com/guardian/frontend/blob/main/common/app/navigation/Navigation.scala#L141-L143
		if (pillar.pillar === Pillar.News && currentNavLink === 'Football') {
			return false;
		}

		return pillar.children?.some((child) => {
			return child.title === currentNavLink;
		});
	})?.pillar;

	const pillarFromSubNav = themeToPillar(themeFromSubNav);

	const selectedPillar = pillarFromCurrentLink ?? pillarFromSubNav;

	return {
		...NAV,
		selectedPillar,
	};
};

export const renderFront = ({
	front,
}: Props): { html: string; prefetchScripts: string[] } => {
	const title = front.webTitle;
	const NAV = extractFrontNav(front);

	// Fronts are not supported in Apps
	const config: Config = { renderingTarget: 'Web', darkModeAvailable: false };

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<FrontPage front={front} NAV={NAV} />
		</ConfigProvider>,
	);

	// Evaluating the performance of HTTP3 over HTTP2
	// See: https://github.com/guardian/dotcom-rendering/pull/5394
	const { offerHttp3 = false } = front.config.switches;

	const build = getModulesBuild({
		switches: front.config.switches,
		tests: front.config.abTests,
	});

	/**
	 * The highest priority scripts.
	 * These scripts have a considerable impact on site performance.
	 * Only scripts critical to application execution may go in here.
	 * Please talk to the dotcom platform team before adding more.
	 * Scripts will be executed in the order they appear in this array
	 */
	const prefetchScripts = [
		polyfillIO,
		getPathFromManifest(build, 'frameworks.js'),
		getPathFromManifest(build, 'index.js'),
		process.env.COMMERCIAL_BUNDLE_URL ?? front.config.commercialBundleUrl,
	]
		.filter(isString)
		.map((script) => (offerHttp3 ? getHttp3Url(script) : script));

	const legacyScripts = [
		getPathFromManifest('web.legacy', 'frameworks.js'),
		getPathFromManifest('web.legacy', 'index.js'),
	].map((script) => (offerHttp3 ? getHttp3Url(script) : script));
	const scriptTags = generateScriptTags([
		...prefetchScripts,
		...legacyScripts,
	]);

	const guardian = createGuardian({
		editionId: front.editionId,
		stage: front.config.stage,
		frontendAssetsFullURL: front.config.frontendAssetsFullURL,
		revisionNumber: front.config.revisionNumber,
		sentryPublicApiKey: front.config.sentryPublicApiKey,
		sentryHost: front.config.sentryHost,
		keywordIds: front.config.keywordIds,
		dfpAccountId: front.config.dfpAccountId,
		adUnit: front.config.adUnit,
		ajaxUrl: front.config.ajaxUrl,
		googletagUrl: front.config.googletagUrl,
		switches: front.config.switches,
		abTests: front.config.abTests,
		brazeApiKey: front.config.brazeApiKey,
		googleRecaptchaSiteKey: front.config.googleRecaptchaSiteKey,
		// Until we understand exactly what config we need to make available client-side,
		// add everything we haven't explicitly typed as unknown config
		unknownConfig: front.config,
	});

	const keywords = front.config.keywords;

	const pageHtml = htmlPageTemplate({
		scriptTags,
		css: extractedCss,
		html,
		title,
		description: front.pressedPage.seoData.description,
		guardian,
		keywords,
		offerHttp3,
		renderingTarget: 'Web',
		hasPageSkin: front.config.hasPageSkin,
		weAreHiring: !!front.config.switches.weAreHiring,
	});

	return {
		html: pageHtml,
		prefetchScripts,
	};
};

export const renderTagFront = ({
	tagFront,
}: {
	tagFront: DCRTagFrontType;
}): { html: string; prefetchScripts: string[] } => {
	const title = tagFront.webTitle;
	const NAV = extractNAV(tagFront.nav);

	// Fronts are not supported in Apps
	const config: Config = { renderingTarget: 'Web', darkModeAvailable: false };

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<TagFrontPage tagFront={tagFront} NAV={NAV} />
		</ConfigProvider>,
	);

	// Evaluating the performance of HTTP3 over HTTP2
	// See: https://github.com/guardian/dotcom-rendering/pull/5394
	const { offerHttp3 = false } = tagFront.config.switches;

	const build = getModulesBuild({
		switches: tagFront.config.switches,
		tests: tagFront.config.abTests,
	});

	/**
	 * The highest priority scripts.
	 * These scripts have a considerable impact on site performance.
	 * Only scripts critical to application execution may go in here.
	 * Please talk to the dotcom platform team before adding more.
	 * Scripts will be executed in the order they appear in this array
	 */
	const prefetchScripts = [
		polyfillIO,
		getPathFromManifest(build, 'frameworks.js'),
		getPathFromManifest(build, 'index.js'),
		process.env.COMMERCIAL_BUNDLE_URL ??
			tagFront.config.commercialBundleUrl,
	]
		.filter(isString)
		.map((script) => (offerHttp3 ? getHttp3Url(script) : script));

	const legacyScripts = [
		getPathFromManifest('web.legacy', 'frameworks.js'),
		getPathFromManifest('web.legacy', 'index.js'),
	].map((script) => (offerHttp3 ? getHttp3Url(script) : script));
	const scriptTags = generateScriptTags([
		...prefetchScripts,
		...legacyScripts,
	]);

	const guardian = createGuardian({
		editionId: tagFront.editionId,
		stage: tagFront.config.stage,
		frontendAssetsFullURL: tagFront.config.frontendAssetsFullURL,
		revisionNumber: tagFront.config.revisionNumber,
		sentryPublicApiKey: tagFront.config.sentryPublicApiKey,
		sentryHost: tagFront.config.sentryHost,
		keywordIds: tagFront.config.keywordIds,
		dfpAccountId: tagFront.config.dfpAccountId,
		adUnit: tagFront.config.adUnit,
		ajaxUrl: tagFront.config.ajaxUrl,
		googletagUrl: tagFront.config.googletagUrl,
		switches: tagFront.config.switches,
		abTests: tagFront.config.abTests,
		brazeApiKey: tagFront.config.brazeApiKey,
		googleRecaptchaSiteKey: tagFront.config.googleRecaptchaSiteKey,
		// Until we understand exactly what config we need to make available client-side,
		// add everything we haven't explicitly typed as unknown config
		unknownConfig: tagFront.config,
	});

	const keywords = tagFront.config.keywords;

	const pageHtml = htmlPageTemplate({
		scriptTags,
		css: extractedCss,
		html,
		title,
		description: tagFront.header.description,
		guardian,
		keywords,
		offerHttp3,
		renderingTarget: 'Web',
		weAreHiring: !!tagFront.config.switches.weAreHiring,
	});
	return {
		html: pageHtml,
		prefetchScripts,
	};
};
