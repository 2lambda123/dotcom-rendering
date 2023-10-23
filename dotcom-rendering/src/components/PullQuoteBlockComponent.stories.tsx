import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { decidePalette } from '../lib/decidePalette';
import { PullQuoteBlockComponent } from './PullQuoteBlockComponent';
import { Section } from './Section';

export default {
	component: PullQuoteBlockComponent,
	title: 'Components/PullQuoteBlockComponent',
};

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

const photoEssayNews = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.PhotoEssay,
	theme: Pillar.News,
};

// Inline
export const SportInline = () => {
	const format = {
		...defaultFormat,
		theme: Pillar.Sport,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
SportInline.storyName = 'Sport, inline, Article';
SportInline.decorators = [
	splitTheme({
		...defaultFormat,
		theme: Pillar.Sport,
	}),
];

export const LabsInline = () => {
	const format = {
		...defaultFormat,
		theme: ArticleSpecial.Labs,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
LabsInline.storyName = 'Labs, inline, Article';
LabsInline.decorators = [
	splitTheme({
		...defaultFormat,
		theme: ArticleSpecial.Labs,
	}),
];

export const LifestyleInline = () => {
	const format = {
		...defaultFormat,
		theme: Pillar.Lifestyle,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
LifestyleInline.storyName = 'Lifestyle, inline, Article';
LifestyleInline.decorators = [
	splitTheme({
		...defaultFormat,
		theme: Pillar.Lifestyle,
	}),
];

export const CultureInline = () => {
	const format = {
		...defaultFormat,
		theme: Pillar.Culture,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
CultureInline.storyName = 'Culture, inline, Article';
CultureInline.decorators = [
	splitTheme({
		...defaultFormat,
		theme: Pillar.Culture,
	}),
];

export const NewsInline = () => {
	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={defaultFormat}
				palette={decidePalette(defaultFormat)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
NewsInline.storyName = 'News, inline, Article';
NewsInline.decorators = [splitTheme(defaultFormat)];

export const OpinionInline = () => {
	const format = {
		...defaultFormat,
		design: ArticleDesign.Comment,
		theme: Pillar.Opinion,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
OpinionInline.storyName = 'Opinion, inline, Comment';
OpinionInline.decorators = [
	splitTheme({
		...defaultFormat,
		design: ArticleDesign.Comment,
		theme: Pillar.Opinion,
	}),
];

export const SpecialReportInline = () => {
	const format = {
		...defaultFormat,
		theme: ArticleSpecial.SpecialReport,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
SpecialReportInline.storyName = 'SpecialReport, inline, Article';
SpecialReportInline.decorators = [
	splitTheme({
		...defaultFormat,
		theme: ArticleSpecial.SpecialReport,
	}),
];

// Supporting
export const SportSupporting = () => {
	const format = {
		...defaultFormat,
		theme: Pillar.Sport,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
SportSupporting.storyName = 'Sport, supporting, Article';
SportSupporting.decorators = [
	splitTheme({
		...defaultFormat,
		theme: Pillar.Sport,
	}),
];

export const LabsSupporting = () => {
	const format = {
		...defaultFormat,
		theme: ArticleSpecial.Labs,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
LabsSupporting.storyName = 'Labs, supporting, Article';
LabsSupporting.decorators = [
	splitTheme({
		...defaultFormat,
		theme: ArticleSpecial.Labs,
	}),
];

export const LifestyleSupporting = () => {
	const format = {
		...defaultFormat,
		theme: Pillar.Lifestyle,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
LifestyleSupporting.storyName = 'Lifestyle, supporting, Article';
LifestyleSupporting.decorators = [
	splitTheme({
		...defaultFormat,
		theme: Pillar.Lifestyle,
	}),
];

export const CultureSupporting = () => {
	const format = {
		...defaultFormat,
		theme: Pillar.Culture,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
CultureSupporting.storyName = 'Culture, supporting, Article';
CultureSupporting.decorators = [
	splitTheme({
		...defaultFormat,
		theme: Pillar.Culture,
	}),
];

export const NewsSupporting = () => {
	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={defaultFormat}
				palette={decidePalette(defaultFormat)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
NewsSupporting.storyName = 'News, supporting, Article';
NewsSupporting.decorators = [splitTheme(defaultFormat)];

export const OpinionSupporting = () => {
	const format = {
		...defaultFormat,
		design: ArticleDesign.Comment,
		theme: Pillar.Opinion,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
OpinionSupporting.storyName = 'Opinion, supporting, Comment';
OpinionSupporting.decorators = [
	splitTheme({
		...defaultFormat,
		design: ArticleDesign.Comment,
		theme: Pillar.Opinion,
	}),
];

export const SpecialReportSupporting = () => {
	const format = {
		...defaultFormat,
		theme: ArticleSpecial.SpecialReport,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
SpecialReportSupporting.storyName = 'SpecialReport, supporting, Article';
SpecialReportSupporting.decorators = [
	splitTheme({
		...defaultFormat,
		theme: ArticleSpecial.SpecialReport,
	}),
];

export const SpecialReportAltInline = () => {
	const format = {
		...defaultFormat,
		theme: ArticleSpecial.SpecialReportAlt,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
SpecialReportAltInline.storyName = 'SpecialReportAlt, inline, Article';
SpecialReportAltInline.decorators = [
	splitTheme({
		...defaultFormat,
		theme: ArticleSpecial.SpecialReportAlt,
	}),
];

export const SpecialReportAltSupporting = () => {
	const format = {
		...defaultFormat,
		theme: ArticleSpecial.SpecialReportAlt,
	};

	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={format}
				palette={decidePalette(format)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
SpecialReportAltSupporting.storyName = 'SpecialReportAlt, supporting, Article';
SpecialReportAltSupporting.decorators = [
	splitTheme({
		...defaultFormat,
		theme: ArticleSpecial.SpecialReportAlt,
	}),
];

// PhotoEssay
export const PhotoEssayInline = () => {
	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={photoEssayNews}
				palette={decidePalette(photoEssayNews)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="inline"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
PhotoEssayInline.storyName = 'News, inline, PhotoEssay';
PhotoEssayInline.decorators = [splitTheme(photoEssayNews)];

export const PhotoEssaySupporting = () => {
	return (
		<Section
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
			<PullQuoteBlockComponent
				format={photoEssayNews}
				palette={decidePalette(photoEssayNews)}
				html="Even if part of my job is filthy, I still love it – it’s my work"
				role="supporting"
				attribution="Julie-Lou Dubreuilh"
			/>
		</Section>
	);
};
PhotoEssaySupporting.storyName = 'News, supporting, PhotoEssay';
PhotoEssaySupporting.decorators = [splitTheme(photoEssayNews)];
