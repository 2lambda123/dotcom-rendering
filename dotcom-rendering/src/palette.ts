// ----- Imports ----- //

import type { ArticleFormat, ArticleTheme } from '@guardian/libs';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { palette as sourcePalette } from '@guardian/source-foundations';
import { buttonThemeDefault } from '@guardian/source-react-components';
import { transparentColour } from './lib/transparentColour';

// ----- Palette Functions ----- //
/**
 * Picks a lightness of colour for a palette corresponding to the given pillar
 * N.b. it does not handle non-pillar themes
 * @param pillar
 * @param lightness
 */
const pillarPalette = (
	pillar: Pillar,
	lightness: 100 | 200 | 300 | 400 | 500 | 600 | 800,
): string => {
	switch (pillar) {
		case Pillar.News:
			return sourcePalette.news[lightness];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[lightness];
		case Pillar.Sport:
			return sourcePalette.sport[lightness];
		case Pillar.Culture:
			return sourcePalette.culture[lightness];
		case Pillar.Opinion:
			return sourcePalette.opinion[lightness];
	}
};

const headlineColourLight: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.Feature:
			return sourcePalette.news[300];
		default:
			return sourcePalette.neutral[10];
	}
};
const headlineColourDark: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.Feature:
			return sourcePalette.news[600];
		default:
			return sourcePalette.neutral[97];
	}
};
const headlineBackgroundLight: PaletteFunction = ({
	display,
	design,
	theme,
}) => {
	switch (display) {
		case ArticleDisplay.Immersive:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				default:
					return sourcePalette.neutral[7];
			}
		case ArticleDisplay.Showcase:
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Standard:
			switch (design) {
				case ArticleDesign.Interview:
					return sourcePalette.neutral[7];
				default:
					return 'transparent';
			}
		default:
			return 'transparent';
	}
};

const headlineBackgroundDark: PaletteFunction = ({
	design,
	display,
	theme,
}) => {
	if (display === ArticleDisplay.Immersive) return sourcePalette.neutral[7];

	switch (design) {
		case ArticleDesign.DeadBlog:
			return sourcePalette.neutral[7];
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case ArticleSpecial.Labs:
				case ArticleSpecial.SpecialReport:
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[200];
				default:
					return pillarPalette(theme, 200);
			}
		case ArticleDesign.Interview:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.neutral[7];
				default:
					return sourcePalette.neutral[20];
			}
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				default:
					return sourcePalette.neutral[10];
			}
		default:
			return sourcePalette.neutral[10];
	}
};

const headlineBlogBackgroundLight: PaletteFunction = ({
	design,
	display,
	theme,
}) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case Pillar.News:
				case ArticleSpecial.SpecialReportAlt:
				case ArticleSpecial.Labs:
					return sourcePalette.news[300];
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case Pillar.Sport:
					return sourcePalette.sport[300];
				case Pillar.Culture:
					return sourcePalette.culture[300];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[700];
			}
		default:
			return articleBackgroundLight({ design, display, theme });
	}
};

const headlineBlogBackgroundDark: PaletteFunction = ({
	design,
	display,
	theme,
}) => {
	return headlineBackgroundDark({ design, display, theme });
};

const bylineLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Analysis:
			return sourcePalette.neutral[46];
		case ArticleDesign.Picture:
			return sourcePalette.neutral[86];
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			switch (theme) {
				case Pillar.News:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 400);
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.neutral[46];
			}
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.Interactive:
		case ArticleDesign.Interview:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.Review:
		case ArticleDesign.Letter:
		case ArticleDesign.Standard:
			switch (theme) {
				case Pillar.News:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 400);
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
			}
		default:
			switch (theme) {
				case Pillar.News:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 400);
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[400];
			}
	}
};

const bylineDark: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Letter:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
				default:
					return sourcePalette.neutral[60];
			}
		default:
			return sourcePalette.neutral[60];
	}
};

const bylineBackgroundLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Analysis:
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.Interactive:
		case ArticleDesign.Interview:
		case ArticleDesign.Letter:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.Review:
		case ArticleDesign.Standard:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
				default:
					return sourcePalette.brandAlt[400];
			}
		default:
			return sourcePalette.brandAlt[400];
	}
};

const bylineBackgroundDark: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Analysis:
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.Interactive:
		case ArticleDesign.Interview:
		case ArticleDesign.Letter:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.Review:
		case ArticleDesign.Standard:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
				default:
					return sourcePalette.brandAlt[200];
			}
		default:
			return sourcePalette.brandAlt[200];
	}
};

const bylineAnchorLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.News:
				case Pillar.Lifestyle:
				case Pillar.Sport:
				case Pillar.Culture:
					return pillarPalette(theme, 300);
				case Pillar.Opinion:
					return sourcePalette.opinion[400];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.brandAlt[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				default:
					return sourcePalette.news[300];
			}
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 400);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.Interactive:
		case ArticleDesign.Interview:
		case ArticleDesign.Letter:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.Review:
		case ArticleDesign.Standard:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 400);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
			}
		case ArticleDesign.Picture:
			return sourcePalette.neutral[86];
		default:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 400);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[400];
			}
	}
};

const bylineAnchorDark: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
				case ArticleSpecial.SpecialReport:
				case ArticleSpecial.Labs:
					return sourcePalette.news[500];
			}
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Letter:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
			}
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[300];
			}
		case ArticleDesign.Picture:
			return sourcePalette.neutral[60];
		default:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[500];
			}
	}
};

const bylineHoverLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 200);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[200];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.brandAlt[200];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 300);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[200];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
			}
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.Interactive:
		case ArticleDesign.Interview:
		case ArticleDesign.Letter:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.Review:
		case ArticleDesign.Standard:
			switch (theme) {
				case Pillar.News:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 300);
				case Pillar.Opinion:
					return sourcePalette.opinion[200];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[200];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
		default:
			switch (theme) {
				case Pillar.News:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 300);
				case Pillar.Opinion:
					return sourcePalette.opinion[200];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[200];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[200];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[300];
			}
	}
};

const bylineHoverDark: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 600);
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
				case ArticleSpecial.SpecialReport:
				case ArticleSpecial.Labs: {
					return sourcePalette.news[600];
				}
			}
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Letter:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 600);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
			}
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 600);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
			}
		default:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 600);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[700];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[600];
			}
	}
};

const bylineUnderline: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[60];
		default:
			return 'inherit';
	}
};

const datelineLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				default:
					return sourcePalette.neutral[20];
			}
		case ArticleDesign.Analysis:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.Interactive:
		case ArticleDesign.Interview:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.Review:
		case ArticleDesign.Standard:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				default:
					return sourcePalette.neutral[46];
			}
		default:
			return sourcePalette.neutral[46];
	}
};

const datelineDark: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.neutral[93];
				default:
					return sourcePalette.neutral[60];
			}
		default:
			return sourcePalette.neutral[60];
	}
};

const headlineBorder: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			return 'rgba(255,255,255, 0.2)';
		case ArticleDesign.DeadBlog:
			return '#CDCDCD';
		default:
			return sourcePalette.neutral[86];
	}
};

const avatarLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[800];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[300];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.News:
					return sourcePalette.news[500];
			}
		default:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[800];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[500];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.News:
					return sourcePalette.news[500];
			}
	}
};

const avatarDark: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.neutral[46];
				default:
					return sourcePalette.neutral[20];
			}
		default:
			return sourcePalette.neutral[20];
	}
};

const followTextLight: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.Gallery:
			return sourcePalette.neutral[86];
		case ArticleDesign.LiveBlog:
		case ArticleDesign.Picture:
			return sourcePalette.neutral[97];
		default:
			return sourcePalette.neutral[7];
	}
};
const followTextDark: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return sourcePalette.neutral[100];
		case ArticleDesign.Gallery:
			return sourcePalette.neutral[86];
		default:
			return sourcePalette.neutral[86];
	}
};

const followIconBackgroundLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[200];
				case Pillar.Sport:
					return sourcePalette.sport[200];
				case Pillar.Culture:
					return sourcePalette.culture[200];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[200];
				case Pillar.News:
				default:
					return sourcePalette.news[200];
			}
		case ArticleDesign.Analysis:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
				default:
					return sourcePalette.news[800];
			}
		case ArticleDesign.Gallery:
			return sourcePalette.neutral[7];
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
				default:
					return sourcePalette.opinion[800];
			}
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
				default:
					return sourcePalette.neutral[100];
			}
		default:
			return sourcePalette.neutral[100];
	}
};
const followIconBackgroundDark: PaletteFunction = ({ theme, design }) => {
	switch (design) {
		case ArticleDesign.DeadBlog:
			return sourcePalette.neutral[7];
		case ArticleDesign.LiveBlog:
			return sourcePalette.neutral[0];
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				default:
					return sourcePalette.neutral[10];
			}
		default:
			return sourcePalette.neutral[10];
	}
};

const followIconFillLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Gallery:
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[300];
				case Pillar.News:
				default:
					return sourcePalette.news[500];
			}
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[600];
				case Pillar.Sport:
					return sourcePalette.sport[600];
				case Pillar.Culture:
					return sourcePalette.culture[600];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[600];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case Pillar.News:
				default:
					return sourcePalette.news[600];
			}
		case ArticleDesign.Standard: {
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				case Pillar.News:
				default:
					return sourcePalette.news[400];
			}
		}
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				case Pillar.News:
				default:
					return sourcePalette.news[400];
			}
		default:
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				case Pillar.News:
				default:
					return sourcePalette.news[400];
			}
	}
};
const followIconFillDark: PaletteFunction = ({ theme, design }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			return sourcePalette.neutral[93];
		case ArticleDesign.Standard:
			switch (theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[700];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
				case Pillar.News:
				default:
					return sourcePalette.news[500];
			}
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[700];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
				case Pillar.News:
				default:
					return sourcePalette.news[500];
			}
		default:
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[700];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
				case Pillar.News:
				default:
					return sourcePalette.news[500];
			}
	}
};

const starRatingFillColourLight: PaletteFunction = () =>
	sourcePalette.neutral[7];
const starRatingFillColourDark: PaletteFunction = () =>
	sourcePalette.neutral[0];
const starRatingBackgroundColourLight: PaletteFunction = () =>
	sourcePalette.brandAlt[400];
const starRatingBackgroundColourDark: PaletteFunction = () =>
	sourcePalette.brandAlt[200];

const blockQuoteFillLight: PaletteFunction = (format: ArticleFormat) => {
	if (format.theme === ArticleSpecial.Labs) {
		return sourcePalette.labs[300];
	}

	switch (format.design) {
		case ArticleDesign.DeadBlog:
		case ArticleDesign.LiveBlog: {
			switch (format.theme) {
				case Pillar.News:
					return sourcePalette.neutral[46];
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(format.theme, 200);
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[200];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
		}
		case ArticleDesign.Obituary:
		case ArticleDesign.Standard:
		case ArticleDesign.Profile:
		case ArticleDesign.Explainer:
		case ArticleDesign.Timeline: {
			return sourcePalette.neutral[46];
		}
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review: {
			switch (format.theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(format.theme, 200);
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[200];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
		}
		default: {
			switch (format.theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case Pillar.News:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(format.theme, 400);
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
		}
	}
};

const blockQuoteFillDark: PaletteFunction = ({
	design,
	theme,
}: ArticleFormat) => {
	if (theme === ArticleSpecial.Labs) {
		return sourcePalette.labs[400];
	}

	switch (design) {
		case ArticleDesign.DeadBlog:
		case ArticleDesign.LiveBlog: {
			switch (theme) {
				case Pillar.News:
					return sourcePalette.neutral[60];
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[300];
			}
		}
		case ArticleDesign.Obituary:
		case ArticleDesign.Standard:
		case ArticleDesign.Profile:
		case ArticleDesign.Explainer:
		case ArticleDesign.Timeline: {
			return sourcePalette.neutral[60];
		}
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review: {
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[300];
			}
		}
		default:
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case Pillar.News:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 400);
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
	}
};
const blockquoteTextLight: PaletteFunction = (format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.Obituary:
		case ArticleDesign.Standard:
		case ArticleDesign.Profile:
		case ArticleDesign.Explainer:
		case ArticleDesign.Timeline:
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
		case ArticleDesign.Analysis:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review:
			switch (format.theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[46];
				default:
					return sourcePalette.neutral[7];
			}
		default:
			switch (format.theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.neutral[7];
				default:
					return sourcePalette.neutral[46];
			}
	}
};
const blockquoteTextDark: PaletteFunction = (format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.Obituary:
		case ArticleDesign.Standard:
		case ArticleDesign.Profile:
		case ArticleDesign.Explainer:
		case ArticleDesign.Timeline:
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
		case ArticleDesign.Analysis:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review:
			switch (format.theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[100];
				default:
					return sourcePalette.neutral[60];
			}
		default:
			return sourcePalette.neutral[100];
	}
};

const blockQuoteLinkLight: PaletteFunction = (format: ArticleFormat) => {
	switch (format.theme) {
		case Pillar.News:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Lifestyle:
		case Pillar.Opinion:
			return pillarPalette(format.theme, 400);
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[200];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[300];
	}
};

const blockQuoteLinkDark: PaletteFunction = (format: ArticleFormat) => {
	switch (format.theme) {
		case Pillar.News:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Lifestyle:
		case Pillar.Opinion:
			return pillarPalette(format.theme, 500);
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[300];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
	}
};

const accordionTitleRowFillLight: PaletteFunction = () =>
	sourcePalette.neutral[46];
const accordionTitleRowFillDark: PaletteFunction = () =>
	sourcePalette.neutral[60];
const accordionTitleRowBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[100];
const accordionTitleRowBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[10];
const accordionTitleRowBorderTopLight: PaletteFunction = () =>
	sourcePalette.neutral[86];
const accordionTitleRowBorderTopDark: PaletteFunction = () =>
	sourcePalette.neutral[20];
const accordionTitleLight: PaletteFunction = () => sourcePalette.neutral[7];
const accordionTitleDark: PaletteFunction = () => sourcePalette.neutral[86];
const accordionKeyEventsBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[100];
const accordionBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[10];
const accordionLiveFeedBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[97];

const tableOfContentsLight: PaletteFunction = () => sourcePalette.neutral[7];
const tableOfContentsDark: PaletteFunction = () => sourcePalette.neutral[86];
const tableOfContentsBorderLight: PaletteFunction = () =>
	sourcePalette.neutral[86];
const tableOfContentsBorderDark: PaletteFunction = () =>
	sourcePalette.neutral[20];

const adLabelsTextLight: PaletteFunction = () => {
	return sourcePalette.neutral[20];
};
const adLabelsTextDark: PaletteFunction = () => {
	return sourcePalette.neutral[100];
};
const adBackgroundLight: PaletteFunction = () => {
	return sourcePalette.neutral[97];
};
const adBackgroundDark: PaletteFunction = () => {
	return sourcePalette.neutral[20];
};
const adSupportBannerBackgroundLight: PaletteFunction = () => {
	return sourcePalette.neutral[93];
};
const adSupportBannerBackgroundDark: PaletteFunction = () => {
	return sourcePalette.neutral[46];
};
const adSupportBannerButtonBackgroundLight: PaletteFunction = () => {
	return sourcePalette.brand[400];
};
const adSupportBannerButtonBackgroundDark: PaletteFunction = () => {
	return sourcePalette.neutral[100];
};
const adSupportBannerButtonTextLight: PaletteFunction = () => {
	return sourcePalette.neutral[100];
};
const adSupportBannerButtonTextDark: PaletteFunction = () => {
	return sourcePalette.neutral[0];
};
const adSupportBannerTextLight: PaletteFunction = () => {
	return sourcePalette.brand[400];
};
const adSupportBannerTextDark: PaletteFunction = () => {
	return sourcePalette.neutral[100];
};

const appsFooterLinksTextLight: PaletteFunction = () =>
	sourcePalette.neutral[7];
const appsFooterLinksTextDark: PaletteFunction = () =>
	sourcePalette.neutral[60];
const appsFooterLinksTextHoverLight: PaletteFunction = () =>
	sourcePalette.neutral[10];
const appsFooterLinksTextHoverDark: PaletteFunction = () =>
	sourcePalette.neutral[46];
const appsFooterBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[97];
const appsFooterBackgroundDark: PaletteFunction = (format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.Gallery:
			return sourcePalette.neutral[10];
		default:
			return sourcePalette.neutral[0];
	}
};
const clickToViewBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[97];
const clickToViewBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[20];
const clickToViewBorderLight: PaletteFunction = () => sourcePalette.neutral[86];
const clickToViewBorderDark: PaletteFunction = () => sourcePalette.neutral[46];
const clickToViewButtonLight: PaletteFunction = () => sourcePalette.brand[400];
const clickToViewButtonDark: PaletteFunction = () => sourcePalette.neutral[97];
const clickToViewButtonTextLight: PaletteFunction = () =>
	buttonThemeDefault.button.textPrimary;
const clickToViewButtonTextDark: PaletteFunction = () =>
	sourcePalette.neutral[7];
const clickToViewButtonHoverLight: PaletteFunction = () =>
	buttonThemeDefault.button.backgroundPrimaryHover;
const clickToViewButtonHoverDark: PaletteFunction = () =>
	sourcePalette.neutral[86];

const brandingLabelLight: PaletteFunction = () => sourcePalette.neutral[20];
const brandingLabelDark: PaletteFunction = () => sourcePalette.neutral[86];
const brandingLinkLight: PaletteFunction = ({ design, theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[7];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[400];
		case Pillar.News:
			switch (design) {
				case ArticleDesign.Analysis:
					return sourcePalette.news[300];
				default:
					return sourcePalette.news[400];
			}
		default:
			return pillarPalette(theme, 400);
	}
};
const brandingLinkDark: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
				case ArticleSpecial.Labs:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
			}
		default:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
				case ArticleSpecial.Labs:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[500];
			}
	}
};

const standfirstBulletDark: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.DeadBlog:
			return sourcePalette.neutral[46];
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[550];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.News:
					return sourcePalette.news[550];
				default:
					return sourcePalette.neutral[46];
			}
		case ArticleDesign.Picture:
			return sourcePalette.neutral[86];
		default:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				default:
					return sourcePalette.neutral[46];
			}
	}
};

const standfirstBulletLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.DeadBlog:
		case ArticleDesign.Analysis:
			return sourcePalette.neutral[60];
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[600];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.Sport:
					return sourcePalette.sport[600];
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case ArticleSpecial.Labs:
					return sourcePalette.news[600];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[700];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[600];
			}
		default:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				default:
					return sourcePalette.neutral[86];
			}
	}
};

const standfirstLinkBorderLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[600];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.Sport:
					return sourcePalette.sport[600];
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case ArticleSpecial.Labs:
					return sourcePalette.news[600];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[450];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[600];
			}
		default:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return transparentColour(sourcePalette.neutral[60], 0.3);
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[60];
				default:
					return sourcePalette.neutral[86];
			}
	}
};
const standfirstLinkBorderDark: PaletteFunction = () => {
	return sourcePalette.neutral[46];
};

const standfirstBackgroundLight: PaletteFunction = ({
	design,
	display,
	theme,
}) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case Pillar.Sport:
					return sourcePalette.sport[100];
				case ArticleSpecial.Labs:
					return sourcePalette.news[200];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[200];
				default:
					return pillarPalette(theme, 200);
			}
		case ArticleDesign.DeadBlog:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[700];
				default:
					return sourcePalette.neutral[93];
			}
		default:
			return articleBackgroundLight({ design, display, theme });
	}
};

const standfirstBackgroundDark: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.DeadBlog:
			return sourcePalette.neutral[10];
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[100];
				case Pillar.Sport:
					return sourcePalette.sport[100];
				case Pillar.Culture:
					return sourcePalette.culture[100];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[100];
				case Pillar.News:
				default:
					return sourcePalette.news[100];
			}
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				default:
					return sourcePalette.neutral[10];
			}
		default:
			return sourcePalette.neutral[10];
	}
};

const standfirstBorder: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			return 'rgba(255,255,255, 0.2)';
		case ArticleDesign.DeadBlog:
			return '#BDBDBD';
		default:
			return sourcePalette.neutral[86];
	}
};

const standfirstLinkTextLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			return sourcePalette.neutral[100];
		case ArticleDesign.DeadBlog:
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[200];
				case Pillar.News:
					return sourcePalette.news[400];
				case Pillar.Culture:
					return sourcePalette.culture[300];
				case Pillar.Sport:
					return sourcePalette.sport[300];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[300];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
			}
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[200];
				case Pillar.Culture:
				case Pillar.News:
					return sourcePalette.news[300];
				case Pillar.Sport:
					return sourcePalette.sport[300];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[300];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
			}

		case ArticleDesign.Picture:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[500];
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[300];
			}
		default:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				case Pillar.Opinion:
					return sourcePalette.opinion[400];
				case Pillar.Culture:
					return sourcePalette.culture[300];
				case Pillar.News:
					return sourcePalette.news[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
			}
	}
};
const standfirstLinkTextDark: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return sourcePalette.neutral[100];
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Picture:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[500];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[500];
			}
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
				default:
					return sourcePalette.neutral[60];
			}
		default: {
			return sourcePalette.neutral[60];
		}
	}
};

const standfirstTextLight: PaletteFunction = (format) => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return sourcePalette.neutral[100];
		case ArticleDesign.Picture:
			return sourcePalette.neutral[86];
		default:
			if (
				format.theme === ArticleSpecial.SpecialReportAlt &&
				format.design !== ArticleDesign.DeadBlog
			) {
				return sourcePalette.specialReportAlt[100];
			}
			return sourcePalette.neutral[0];
	}
};

const standfirstTextDark: PaletteFunction = ({ design, display, theme }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return sourcePalette.neutral[93];
		case ArticleDesign.Gallery:
		case ArticleDesign.Picture:
			return sourcePalette.neutral[86];
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
			if (display === ArticleDisplay.Immersive) {
				switch (theme) {
					case ArticleSpecial.SpecialReportAlt:
						return sourcePalette.neutral[93];
					default:
						return sourcePalette.neutral[60];
				}
			}

			return sourcePalette.neutral[60];
		default:
			return sourcePalette.neutral[60];
	}
};

const twitterHandleLight: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[0];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[100];
		default:
			return sourcePalette.neutral[46];
	}
};

const twitterHandleDark: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[86];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[700];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[700];
		default:
			return sourcePalette.neutral[60];
	}
};

const cardBorderTopLight: PaletteFunction = ({ theme, design }) => {
	if (theme === ArticleSpecial.SpecialReportAlt)
		return sourcePalette.neutral[60];
	if (theme === ArticleSpecial.SpecialReport)
		return sourcePalette.brandAlt[400];
	if (theme === ArticleSpecial.Labs) return sourcePalette.labs[400];
	if (design === ArticleDesign.Analysis) {
		switch (theme) {
			case Pillar.News:
			case Pillar.Opinion:
				return pillarPalette(theme, 300);
			case Pillar.Lifestyle:
			case Pillar.Culture:
			case Pillar.Sport:
				return pillarPalette(theme, 400);
		}
	}
	switch (theme) {
		case Pillar.Opinion:
			return sourcePalette.opinion[300];
		case Pillar.News:
		case Pillar.Lifestyle:
		case Pillar.Culture:
		case Pillar.Sport:
			return pillarPalette(theme, 400);
	}
};

const cardBorderTopDark = (): string => {
	return sourcePalette.neutral[20];
};
const cardAgeTextLight: PaletteFunction = (format) => {
	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return sourcePalette.specialReportAlt[100];

	switch (format.design) {
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
			switch (format.theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.neutral[86];
				default:
					return sourcePalette.neutral[46];
			}
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				default:
					return sourcePalette.neutral[100];
			}
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			return sourcePalette.neutral[86];
		default:
			switch (format.theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.brandAlt[400];
				default:
					return sourcePalette.neutral[46];
			}
	}
};
const cardAgeTextDark = (): string => {
	return sourcePalette.neutral[60];
};
const cardBackgroundLight: PaletteFunction = (format) => {
	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return sourcePalette.specialReportAlt[700];
	if (format.theme === ArticleSpecial.SpecialReport)
		return sourcePalette.specialReport[300];
	switch (format.design) {
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return sourcePalette.opinion[800];
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			return sourcePalette.neutral[20];
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case Pillar.News:
				case Pillar.Sport:
				case Pillar.Opinion:
				case Pillar.Lifestyle:
				case Pillar.Culture:
					return pillarPalette(format.theme, 300);
			}
		default:
			return sourcePalette.neutral[97];
	}
};
const cardBackgroundDark: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case Pillar.Lifestyle:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Opinion:
					return pillarPalette(theme, 100);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[200];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[100];
				case Pillar.News:
				case ArticleSpecial.SpecialReportAlt:
				default:
					return sourcePalette.news[100];
			}
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Picture:
		case ArticleDesign.Gallery:
			return sourcePalette.neutral[10];
		default:
			return sourcePalette.neutral[0];
	}
};
const cardHeadlineTextLight: PaletteFunction = (format) => {
	if (format.theme === ArticleSpecial.SpecialReport)
		return sourcePalette.neutral[100];

	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return sourcePalette.specialReportAlt[100];

	if (
		format.design !== ArticleDesign.Gallery &&
		format.display === ArticleDisplay.Immersive
	) {
		return sourcePalette.neutral[7];
	}

	switch (format.design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			return sourcePalette.neutral[100];
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				case Pillar.News:
				case Pillar.Sport:
				case Pillar.Opinion:
				case Pillar.Culture:
				case Pillar.Lifestyle:
				default:
					return sourcePalette.neutral[100];
			}
		default:
			return sourcePalette.neutral[7];
	}
};
const cardTextDark = (): string => {
	return sourcePalette.neutral[86];
};

const cardBylineKickerTextDark: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Opinion:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
				case Pillar.News:
				default:
					return sourcePalette.news[500];
			}
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Letter:
			switch (theme) {
				case Pillar.News:
				case Pillar.Lifestyle:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Opinion:
					return pillarPalette(theme, 500);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
			}
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			switch (theme) {
				case Pillar.News:
				case Pillar.Lifestyle:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Opinion:
					return pillarPalette(theme, 500);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[300];
			}
		default:
			switch (theme) {
				case Pillar.News:
				case Pillar.Lifestyle:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Opinion:
					return pillarPalette(theme, 500);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[500];
			}
	}
};
const cardKickerTextLight: PaletteFunction = (format) => {
	if (
		format.theme === ArticleSpecial.SpecialReport &&
		(format.design === ArticleDesign.Comment ||
			format.design === ArticleDesign.Letter)
	)
		return sourcePalette.brandAlt[400];
	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return sourcePalette.neutral[7];

	if (format.theme === ArticleSpecial.SpecialReport)
		return sourcePalette.brandAlt[400];

	switch (format.design) {
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				case Pillar.News:
					return sourcePalette.news[600];
				case Pillar.Sport:
					return sourcePalette.sport[600];
				default:
					return sourcePalette.neutral[100];
			}
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			switch (format.theme) {
				case Pillar.News:
					return sourcePalette.news[550];
				case Pillar.Sport:
					return sourcePalette.sport[600];
				case Pillar.Opinion:
					return sourcePalette.opinion[550];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
			}
		default:
			switch (format.theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.labs[200];
				case Pillar.Opinion:
					return pillarPalette(format.theme, 300);
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
				case Pillar.News:
					return pillarPalette(format.theme, 400);
			}
	}
};

const cardBackgroundHoverLight: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			/* TODO: This colour is hard coded here because it does not yet
		exist in source-foundations. Once it's been added, please
		remove this. @siadcock is aware. */
			/* stylelint-disable-next-line color-no-hex */
			return '#fdf0e8';
		default:
			return sourcePalette.neutral[93];
	}
};

const captionTextLight: PaletteFunction = ({ design, theme }) => {
	switch (theme) {
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[100];
		case ArticleSpecial.SpecialReportAlt:
			switch (design) {
				case ArticleDesign.PhotoEssay:
					return sourcePalette.news[100];
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return sourcePalette.neutral[46];
				default:
					return sourcePalette.neutral[7];
			}
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[20];
		default:
			switch (design) {
				case ArticleDesign.PhotoEssay:
					switch (theme as ArticleTheme) {
						case Pillar.News:
							return sourcePalette.news[300];
						case Pillar.Opinion:
							return sourcePalette.opinion[300];
						case Pillar.Sport:
							return sourcePalette.sport[300];
						case Pillar.Culture:
							return sourcePalette.culture[300];
						case Pillar.Lifestyle:
							return sourcePalette.lifestyle[300];
						case ArticleSpecial.Labs:
							return sourcePalette.labs[300];
						case ArticleSpecial.SpecialReport:
							return sourcePalette.specialReport[300];
						case ArticleSpecial.SpecialReportAlt:
							return sourcePalette.news[100];
					}

				case ArticleDesign.Picture:
					return sourcePalette.neutral[86];
				default:
					return sourcePalette.neutral[46];
			}
	}
};

const captionTextDark: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
				default:
					return sourcePalette.neutral[60];
			}
		default:
			return sourcePalette.neutral[60];
	}
};

const captionLink: PaletteFunction = ({ design, theme }) => {
	if (design === ArticleDesign.NewsletterSignup)
		return sourcePalette.neutral[0];
	if (design === ArticleDesign.Analysis && theme === Pillar.News)
		return sourcePalette.news[300];
	switch (theme) {
		case Pillar.News:
			return sourcePalette.news[400];
		case Pillar.Opinion:
			return sourcePalette.opinion[400];
		case Pillar.Sport:
			return sourcePalette.sport[300];
		case Pillar.Culture:
			return sourcePalette.culture[400];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[400];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[200];
	}
};

const captionOverlayText: PaletteFunction = () => {
	return sourcePalette.neutral[100];
};

const keyEventBulletLight: PaletteFunction = () => sourcePalette.neutral[46];
const keyEventBulletDark: PaletteFunction = () => sourcePalette.neutral[60];

const keyEventBulletHoverLight: PaletteFunction = () =>
	sourcePalette.neutral[0];
const keyEventBulletHoverDark: PaletteFunction = () =>
	sourcePalette.neutral[86];

const keyEventTitleLight: PaletteFunction = () => sourcePalette.neutral[7];
const keyEventTitleDark: PaletteFunction = () => sourcePalette.neutral[86];

const keyEventTextLight: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.News:
			return sourcePalette.news[300];
		case Pillar.Sport:
			return sourcePalette.sport[300];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[300];
		case Pillar.Culture:
			return sourcePalette.culture[300];
		case Pillar.Opinion:
			return sourcePalette.opinion[300];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[300];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[300];
	}
};
const keyEventTextDark: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.News:
			return sourcePalette.news[500];
		case Pillar.Opinion:
			return sourcePalette.opinion[500];
		case Pillar.Sport:
			return sourcePalette.sport[500];
		case Pillar.Culture:
			return sourcePalette.culture[500];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[500];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[500];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[300];
	}
};

const keyEventBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[97];
const keyEventBackgroundDark: PaletteFunction = () => sourcePalette.neutral[10];

const keyEventBackgroundDesktopLight: PaletteFunction = () =>
	sourcePalette.neutral[93];
const keyEventBackgroundDesktopDark: PaletteFunction = () =>
	sourcePalette.neutral[7];

const keyEventBorderLight: PaletteFunction = () => sourcePalette.neutral[46];
const keyEventBorderDark: PaletteFunction = () => sourcePalette.neutral[60];
const keyEventButtonLight: PaletteFunction = () => sourcePalette.neutral[7];
const keyEventButtonDark: PaletteFunction = () => sourcePalette.neutral[86];
const keyEventButtonHoverLight: PaletteFunction = () =>
	sourcePalette.brandAlt[300];
const keyEventButtonHoverDark: PaletteFunction = () =>
	sourcePalette.neutral[60];
const keyEventButtonFillLight: PaletteFunction = () =>
	sourcePalette.neutral[100];
const keyEventButtonFillDark: PaletteFunction = () => sourcePalette.neutral[7];

const summaryEventBulletLight: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.News:
			return sourcePalette.news[400];
		case Pillar.Sport:
			return sourcePalette.sport[400];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[400];
		case Pillar.Culture:
			return sourcePalette.culture[400];
		case Pillar.Opinion:
			return sourcePalette.opinion[400];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[400];
	}
};
const summaryEventBulletDark: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.News:
			return sourcePalette.news[500];
		case Pillar.Sport:
			return sourcePalette.sport[500];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[500];
		case Pillar.Culture:
			return sourcePalette.culture[500];
		case Pillar.Opinion:
			return sourcePalette.opinion[500];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[500];
	}
};
const summaryEventBulletHoverLight: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.News:
			return sourcePalette.news[200];
		case Pillar.Sport:
			return sourcePalette.sport[200];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[200];
		case Pillar.Culture:
			return sourcePalette.culture[200];
		case Pillar.Opinion:
			return sourcePalette.opinion[200];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[200];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[200];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[200];
	}
};
const summaryEventBulletHoverDark: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.News:
			return sourcePalette.news[550];
		case Pillar.Sport:
			return sourcePalette.sport[600];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[600];
		case Pillar.Culture:
			return sourcePalette.culture[600];
		case Pillar.Opinion:
			return sourcePalette.opinion[550];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[600];
	}
};

const articleBackgroundLight: PaletteFunction = ({
	design,
	display,
	theme,
}) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[800];
				default:
					return sourcePalette.neutral[97];
			}
		// Order matters. We want comment special report pieces to have the opinion background
		case ArticleDesign.Letter:
			return sourcePalette.opinion[800];
		case ArticleDesign.Comment:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
				default:
					return sourcePalette.opinion[800];
			}
		case ArticleDesign.Editorial:
			return sourcePalette.opinion[800];
		case ArticleDesign.Analysis:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
				default:
					return sourcePalette.news[800];
			}
		case ArticleDesign.Picture: {
			return sourcePalette.neutral[0];
		}
		default:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[800];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
				case ArticleSpecial.Labs:
					switch (display) {
						case ArticleDisplay.Immersive:
							return 'transparent';
						default:
							return sourcePalette.neutral[97];
					}
				default:
					return 'transparent';
			}
	}
};

const articleBackgroundDark: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.DeadBlog:
			return sourcePalette.neutral[7];
		case ArticleDesign.LiveBlog:
			return sourcePalette.neutral[0];
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				default:
					return sourcePalette.neutral[10];
			}
		default:
			return sourcePalette.neutral[10];
	}
};

const articleSectionBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[100];

const articleSectionBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[10];

const articleSectionTitleLight: PaletteFunction = () =>
	sourcePalette.neutral[0];

const articleSectionTitleDark: PaletteFunction = () =>
	sourcePalette.neutral[86];

const articleLinkTextLight: PaletteFunction = ({ design, theme }) => {
	if (design === ArticleDesign.Analysis) return sourcePalette.news[300];
	switch (theme) {
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[300];
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[7];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[400];
		default:
			return pillarPalette(theme, 400);
	}
};

const articleLinkTextDark: PaletteFunction = () => sourcePalette.neutral[86];

const articleLinkBorderLight: PaletteFunction = ({ design, theme }) => {
	if (theme === ArticleSpecial.Labs) return sourcePalette.neutral[60];

	if (theme === ArticleSpecial.SpecialReport)
		return sourcePalette.specialReport[300];

	if (
		theme === ArticleSpecial.SpecialReportAlt &&
		design !== ArticleDesign.DeadBlog &&
		design !== ArticleDesign.LiveBlog
	)
		return transparentColour(sourcePalette.neutral[60], 0.3);

	return sourcePalette.neutral[86];
};

const articleLinkBorderDark: PaletteFunction = () => sourcePalette.neutral[46];

const articleLinkHoverLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.DeadBlog:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[400];
				case Pillar.Culture:
					return sourcePalette.culture[350];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[100];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[400];
			}
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[300];
				case Pillar.Culture:
					return sourcePalette.culture[350];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[100];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
		default:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[400];
				case Pillar.Culture:
					return sourcePalette.culture[300];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[100];
				case ArticleSpecial.SpecialReportAlt:
					switch (design) {
						case ArticleDesign.LiveBlog:
							return sourcePalette.specialReportAlt[200];
						default:
							return sourcePalette.specialReportAlt[200];
					}
			}
	}
};

const articleLinkHoverDark: PaletteFunction = (f) => articleLinkTextDark(f);

const articleLinkBorderHoverLight: PaletteFunction = ({ design, theme }) => {
	if (theme === ArticleSpecial.Labs) return sourcePalette.neutral[7];
	if (theme === ArticleSpecial.SpecialReport)
		return sourcePalette.specialReport[100];

	if (
		theme === ArticleSpecial.SpecialReportAlt &&
		design !== ArticleDesign.LiveBlog &&
		design !== ArticleDesign.DeadBlog
	)
		return sourcePalette.specialReportAlt[200];

	if (design === ArticleDesign.Analysis && theme === Pillar.News) {
		return sourcePalette.news[300];
	}
	if (theme === ArticleSpecial.SpecialReportAlt)
		return sourcePalette.specialReportAlt[200];
	return pillarPalette(theme, 400);
};

const articleLinkBorderHoverDark: PaletteFunction = (f) =>
	articleLinkTextDark(f);

const articleBorder: PaletteFunction = ({ design, theme }) => {
	switch (theme) {
		case ArticleSpecial.SpecialReportAlt:
			return transparentColour(sourcePalette.neutral[60], 0.3);
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[60];
		default:
			switch (design) {
				case ArticleDesign.Picture:
					return transparentColour(sourcePalette.neutral[60], 0.5);
				default:
					return sourcePalette.neutral[86];
			}
	}
};

const articleBorderSecondary: PaletteFunction = (format) => {
	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return transparentColour(sourcePalette.neutral[60], 0.3);
	if (format.design === ArticleDesign.Picture)
		return transparentColour(sourcePalette.neutral[60], 0.5);
	return sourcePalette.neutral[86];
};

const subNavBorder: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[300];
				case Pillar.Opinion:
					return sourcePalette.opinion[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
		default:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
	}
};
const subNavLink = (format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.Picture:
			return sourcePalette.neutral[100];
		default:
			return sourcePalette.neutral[7];
	}
};

const pullQuoteTextLight: PaletteFunction = ({
	design,
	theme,
}: ArticleFormat) => {
	switch (design) {
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
		case ArticleDesign.Analysis:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review:
		case ArticleDesign.PhotoEssay:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 200);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[200];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[200];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
		default:
			return sourcePalette.neutral[7];
	}
};

const pullQuoteTextDark: PaletteFunction = ({
	design,
	theme,
}: ArticleFormat) => {
	switch (design) {
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
		case ArticleDesign.Analysis:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review:
		case ArticleDesign.PhotoEssay:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
			}
		default:
			return sourcePalette.neutral[97];
	}
};

const pullQuoteBackgroundLight: PaletteFunction = (format: ArticleFormat) => {
	const articleBackground = articleBackgroundLight(format);
	if (articleBackground === 'transparent') return sourcePalette.neutral[100];
	return articleBackground;
};

const pullQuoteBackgroundDark: PaletteFunction = (format: ArticleFormat) => {
	const articleBackground = articleBackgroundLight(format);
	if (articleBackground === 'transparent') return sourcePalette.neutral[0];
	return articleBackground;
};

const pullQuoteBorderLight: PaletteFunction = () => sourcePalette.neutral[86];
const pullQuoteBorderDark: PaletteFunction = () => sourcePalette.neutral[60];

const pullQuoteIconLight: PaletteFunction = (format: ArticleFormat) => {
	const text = pullQuoteTextLight(format);
	return text === sourcePalette.neutral[7]
		? pullQuoteBorderDark(format)
		: text;
};
const pullQuoteIconDark: PaletteFunction = (format: ArticleFormat) => {
	const text = pullQuoteTextDark(format);
	return text === sourcePalette.neutral[97]
		? pullQuoteBorderLight(format)
		: text;
};

const shareIconFillLight: PaletteFunction = ({ design, theme, display }) => {
	switch (design) {
		case ArticleDesign.DeadBlog:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[400];
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				default:
					return pillarPalette(theme, 400);
			}
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[300];
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				default:
					return pillarPalette(theme, 400);
			}
		case ArticleDesign.Picture:
			return sourcePalette.neutral[86];
		default:
			switch (theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				default:
					if (
						design === ArticleDesign.NewsletterSignup &&
						display === ArticleDisplay.Standard
					) {
						return sourcePalette.neutral[7];
					}
					if (
						theme === ArticleSpecial.SpecialReportAlt &&
						design !== ArticleDesign.LiveBlog
					) {
						return sourcePalette.specialReportAlt[100];
					}
					if (theme === ArticleSpecial.SpecialReportAlt)
						return sourcePalette.news[400];
					return pillarPalette(theme, 400);
			}
	}
};

const shareIconFillDark: PaletteFunction = () => sourcePalette.neutral[60];

const shareIconFillBlogLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			switch (theme) {
				case Pillar.News:
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				default:
					return pillarPalette(theme, 300);
			}
		default:
			switch (theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[300];
				default:
					return pillarPalette(theme, 300);
			}
	}
};

const shareIconFillBlogDark: PaletteFunction = () => sourcePalette.neutral[60];
const matchNavBackground: PaletteFunction = () => sourcePalette.brandAlt[400];

const liveBlockContainerBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[100];
const liveBlockContainerBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[10];

const liveBlockBorderTopLight: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[200];
		default:
			return pillarPalette(theme, 400);
	}
};

const liveBlockBorderTopDark: PaletteFunction = () => sourcePalette.neutral[60];

const liveBlockBorderBottomLight: PaletteFunction = () =>
	sourcePalette.neutral[86];
const liveBlockBorderBottomDark: PaletteFunction = () =>
	sourcePalette.neutral[46];

const subMetaLabelTextLight: PaletteFunction = ({ theme, design }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[7];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			switch (design) {
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return sourcePalette.neutral[46];
				default:
					return sourcePalette.specialReportAlt[100];
			}
		default:
			switch (design) {
				case ArticleDesign.Picture:
					return sourcePalette.neutral[60];
				default:
					return sourcePalette.neutral[46];
			}
	}
};
const subMetaLabelTextDark: PaletteFunction = () => {
	return sourcePalette.neutral[86];
};
const subMetaBackgroundLight: PaletteFunction = ({
	design,
	theme,
	display,
}) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			switch (theme) {
				// specialreport blogs should have specialreport background
				case ArticleSpecial.SpecialReport:
					return sourcePalette.neutral[100];
				default:
					return sourcePalette.neutral[97];
			}
		case ArticleDesign.Letter:
			return sourcePalette.opinion[800];
		case ArticleDesign.Comment:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
				default:
					return sourcePalette.opinion[800];
			}
		case ArticleDesign.Editorial:
			return sourcePalette.opinion[800];
		case ArticleDesign.Analysis:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
				default:
					return sourcePalette.news[800];
			}
		case ArticleDesign.Picture:
			return sourcePalette.neutral[7];
		default:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[800];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
				case ArticleSpecial.Labs:
					switch (display) {
						case ArticleDisplay.Immersive:
							return sourcePalette.neutral[100];
						default:
							return sourcePalette.neutral[97];
					}
				default:
					return sourcePalette.neutral[100];
			}
	}
};

const subMetaBackgroundDark: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.DeadBlog:
			return sourcePalette.neutral[7];
		case ArticleDesign.LiveBlog:
			return sourcePalette.neutral[0];
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				default:
					return sourcePalette.neutral[10];
			}
		default:
			return sourcePalette.neutral[10];
	}
};

const subMetaTextLight: PaletteFunction = ({ design, theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[7];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[100];
		default:
			switch (design) {
				case ArticleDesign.Picture:
					return sourcePalette.neutral[86];
				case ArticleDesign.DeadBlog:
				case ArticleDesign.LiveBlog:
					switch (theme) {
						case Pillar.News:
							return sourcePalette.news[400];
						case ArticleSpecial.SpecialReportAlt:
							return sourcePalette.news[400];
						default:
							return pillarPalette(theme, 300);
					}
				case ArticleDesign.Analysis:
					switch (theme) {
						case Pillar.News:
							return sourcePalette.news[300];
						default:
							switch (theme) {
								case Pillar.Opinion:
									return sourcePalette.opinion[300];
								case ArticleSpecial.SpecialReportAlt:
									return sourcePalette.specialReportAlt[200];
								default:
									return pillarPalette(theme, 400);
							}
					}
				default:
					switch (theme) {
						case Pillar.Opinion:
							return sourcePalette.opinion[300];
						case ArticleSpecial.SpecialReportAlt:
							return sourcePalette.specialReportAlt[200];
						default:
							return pillarPalette(theme, 400);
					}
			}
	}
};

const subMetaTextDark: PaletteFunction = ({ design, theme }) => {
	switch (theme) {
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[700];

		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];

		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[300];
		default:
			if (design === ArticleDesign.Picture) {
				return sourcePalette.neutral[86];
			} else {
				return pillarPalette(theme, 500);
			}
	}
};

const subMetaTextHoverLight: PaletteFunction = () => sourcePalette.neutral[100];

const syndicationButtonText: PaletteFunction = ({ design, theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[7];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[100];
		case ArticleSpecial.SpecialReportAlt:
			switch (design) {
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return sourcePalette.neutral[46];
				default:
					return sourcePalette.specialReportAlt[100];
			}
		default:
			return sourcePalette.neutral[46];
	}
};

const syndicationButtonBorder: PaletteFunction = ({ design, theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[60];
		case ArticleSpecial.SpecialReportAlt:
			switch (design) {
				case ArticleDesign.DeadBlog:
				case ArticleDesign.LiveBlog:
					return sourcePalette.neutral[86];
				default:
					return sourcePalette.specialReportAlt[100];
			}
		default:
			return sourcePalette.neutral[86];
	}
};
const interactiveBlockBackground = () => sourcePalette.neutral[100];

const mostViewedHeadlineLight = (): string => sourcePalette.neutral[7];
const mostViewedHeadlineDark = (): string => sourcePalette.neutral[86];

const dropCapLight: PaletteFunction = (format) => {
	switch (format.design) {
		case ArticleDesign.Analysis: {
			switch (format.theme) {
				case Pillar.News:
				case Pillar.Opinion:
					return pillarPalette(format.theme, 300);
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(format.theme, 400);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReport[200];
			}
		}
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			switch (format.theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[400];
				case Pillar.News:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(format.theme, 300);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReport[100];
			}

		default:
			switch (format.theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(format.theme, 300);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReport[100];
			}
	}
};

const richLinkFillDark: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.Opinion:
				case Pillar.Culture:
				case Pillar.Lifestyle:
				case Pillar.Sport:
				case Pillar.News:
					return pillarPalette(theme, 500);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
			}
		default:
			switch (theme) {
				case Pillar.Opinion:
				case Pillar.Culture:
				case Pillar.Lifestyle:
				case Pillar.Sport:
				case Pillar.News:
					return pillarPalette(theme, 500);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[500];
			}
	}
};

const appsEpicBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[97];
const appsEpicBackgroundDark: PaletteFunction = () => sourcePalette.neutral[20];

const appsEpicBorderLight: PaletteFunction = () => sourcePalette.brandAlt[400];
const appsEpicBorderDark: PaletteFunction = () => sourcePalette.brandAlt[200];

const linkKickerTextLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[300];
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
		default:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
	}
};

const linkKickerTextDark: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.News:
			return sourcePalette.news[500];
		case Pillar.Opinion:
			return sourcePalette.opinion[500];
		case Pillar.Sport:
			return sourcePalette.sport[500];
		case Pillar.Culture:
			return sourcePalette.culture[500];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[500];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.news[500];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[200];
	}
};

const ageWarningBackground: PaletteFunction = (format) => {
	switch (format.design) {
		case ArticleDesign.Interview:
			return articleBackgroundLight(format);
		default:
			return headlineBackgroundLight(format);
	}
};
const articleTextLight: PaletteFunction = () => sourcePalette.neutral[7];
const articleTextDark: PaletteFunction = () => sourcePalette.neutral[86];

const mostViewedFooterHoverLight: PaletteFunction = () =>
	sourcePalette.neutral[97];
const mostViewedFooterHoverDark: PaletteFunction = () =>
	sourcePalette.neutral[20];

const richLinkTextLight: PaletteFunction = ({ design, theme }) => {
	if (design === ArticleDesign.Analysis) return sourcePalette.news[300];
	switch (theme) {
		case Pillar.News:
			return sourcePalette.news[400];
		case Pillar.Culture:
			return sourcePalette.culture[350];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[300];
		case Pillar.Sport:
			return sourcePalette.sport[400];
		case Pillar.Opinion:
			return sourcePalette.opinion[300];
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[7];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[400];
	}
};
const richLinkTextDark: PaletteFunction = () => sourcePalette.neutral[86];
const richLinkBackgroundLight: PaletteFunction = ({ design }) => {
	return design === ArticleDesign.Analysis
		? '#F2E8E6'
		: sourcePalette.neutral[97];
};
const richLinkBackgroundDark: PaletteFunction = () => sourcePalette.neutral[20];
const richLinkFillLight: PaletteFunction = ({ design, theme }) => {
	if (design === ArticleDesign.Analysis) return sourcePalette.news[400];
	switch (theme) {
		case Pillar.News:
			return sourcePalette.news[400];
		case Pillar.Culture:
			return sourcePalette.culture[350];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[300];
		case Pillar.Sport:
			return sourcePalette.sport[400];
		case Pillar.Opinion:
			return sourcePalette.opinion[300];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[400];
	}
};
const richLinkBackgroundHoverLight: PaletteFunction = ({ design }) => {
	return design === ArticleDesign.Analysis
		? '#e9d9d5' //not available in colour palette. Check with design to update or change.
		: sourcePalette.neutral[93];
};
const richLinkBackgroundHoverDark: PaletteFunction = () =>
	sourcePalette.neutral[10];
const richLinkHeaderLight: PaletteFunction = () => sourcePalette.neutral[0];
const richLinkHeaderDark: PaletteFunction = () => sourcePalette.neutral[100];
const richLinkBrandingTextLight: PaletteFunction = () =>
	sourcePalette.neutral[46];
const richLinkBorderLight: PaletteFunction = ({ design, theme }) => {
	switch (theme) {
		case Pillar.News:
			return design === ArticleDesign.Analysis
				? sourcePalette.news[300]
				: sourcePalette.news[400];
		case Pillar.Culture:
			return sourcePalette.culture[350];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[300];
		case Pillar.Sport:
			return sourcePalette.sport[400];
		case Pillar.Opinion:
			return sourcePalette.opinion[300];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[400];
	}
};
const richLinkBorderDark: PaletteFunction = () => sourcePalette.neutral[60];
const richLinkQuoteFillLight: PaletteFunction = ({ design, theme }) => {
	if (design === ArticleDesign.Analysis && theme === Pillar.News)
		return sourcePalette.news[300];
	switch (theme) {
		case Pillar.Opinion:
			return sourcePalette.opinion[300];
		case Pillar.News:
		case Pillar.Lifestyle:
		case Pillar.Culture:
		case Pillar.Sport:
			return pillarPalette(theme, 400);
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[200];
	}
};
// '--most-viewed-footer-tab
// ----- Palette ----- //

/**
 * A template literal type used to make sure the keys of the palette use the
 * correct CSS custom property syntax.
 */
type CSSCustomProperty = `--${string}`;
/**
 * Ensures that all palette functions provide the same API, deriving a palette
 * colour from an {@linkcode ArticleFormat}.
 */
type PaletteFunction = (f: ArticleFormat) => string;
/**
 * Used to validate that the palette object always has the correct shape,
 * without changing its type.
 */
type PaletteColours = Record<
	CSSCustomProperty,
	{
		light: PaletteFunction;
		dark: PaletteFunction;
	}
>;

/**
 * Maps palette colour names (which are also CSS custom property names) to
 * a pair of palette functions, which can be used to derive both light and dark
 * mode colours from an {@linkcode ArticleFormat}.
 *
 * This is not accessed directly in components; the {@linkcode palette} function
 * is used instead.
 */
const paletteColours = {
	'--byline': {
		light: bylineLight,
		dark: bylineDark,
	},
	'--byline-background': {
		light: bylineBackgroundLight,
		dark: bylineBackgroundDark,
	},
	'--byline-anchor': {
		light: bylineAnchorLight,
		dark: bylineAnchorDark,
	},
	'--byline-underline': {
		light: bylineUnderline,
		dark: bylineUnderline,
	},
	'--byline-hover': {
		light: bylineHoverLight,
		dark: bylineHoverDark,
	},
	'--dateline': {
		light: datelineLight,
		dark: datelineDark,
	},
	'--headline-colour': {
		light: headlineColourLight,
		dark: headlineColourDark,
	},
	'--headline-border': {
		light: headlineBorder,
		dark: headlineBorder,
	},
	'--headline-background': {
		light: headlineBackgroundLight,
		dark: headlineBackgroundDark,
	},
	'--headline-blog-background': {
		light: headlineBlogBackgroundLight,
		dark: headlineBlogBackgroundDark,
	},
	'--star-rating-fill': {
		light: starRatingFillColourLight,
		dark: starRatingFillColourDark,
	},
	'--star-rating-background': {
		light: starRatingBackgroundColourLight,
		dark: starRatingBackgroundColourDark,
	},
	'--twitter-handle': {
		light: twitterHandleLight,
		dark: twitterHandleDark,
	},
	'--block-quote-fill': {
		light: blockQuoteFillLight,
		dark: blockQuoteFillDark,
	},
	'--block-quote-text': {
		light: blockquoteTextLight,
		dark: blockquoteTextDark,
	},
	'--block-quote-link': {
		light: blockQuoteLinkLight,
		dark: blockQuoteLinkDark,
	},
	'--accordion-title-row-fill': {
		light: accordionTitleRowFillLight,
		dark: accordionTitleRowFillDark,
	},
	'--accordion-title-row-background': {
		light: accordionTitleRowBackgroundLight,
		dark: accordionTitleRowBackgroundDark,
	},
	'--accordion-title-row-border-top': {
		light: accordionTitleRowBorderTopLight,
		dark: accordionTitleRowBorderTopDark,
	},
	'--accordion-title': {
		light: accordionTitleLight,
		dark: accordionTitleDark,
	},
	'--accordion-key-events-background': {
		light: accordionKeyEventsBackgroundLight,
		dark: accordionBackgroundDark,
	},
	'--accordion-live-feed-background': {
		light: accordionLiveFeedBackgroundLight,
		dark: accordionBackgroundDark,
	},
	'--table-of-contents': {
		light: tableOfContentsLight,
		dark: tableOfContentsDark,
	},
	'--table-of-contents-border': {
		light: tableOfContentsBorderLight,
		dark: tableOfContentsBorderDark,
	},
	'--ad-background': {
		light: adBackgroundLight,
		dark: adBackgroundDark,
	},
	'--ad-labels-text': {
		light: adLabelsTextLight,
		dark: adLabelsTextDark,
	},
	'--ad-support-banner-button-background': {
		light: adSupportBannerButtonBackgroundLight,
		dark: adSupportBannerButtonBackgroundDark,
	},
	'--ad-support-banner-background': {
		light: adSupportBannerBackgroundLight,
		dark: adSupportBannerBackgroundDark,
	},
	'--ad-support-banner-button-text': {
		light: adSupportBannerButtonTextLight,
		dark: adSupportBannerButtonTextDark,
	},
	'--ad-support-banner-text': {
		light: adSupportBannerTextLight,
		dark: adSupportBannerTextDark,
	},
	'--apps-footer-links-text': {
		light: appsFooterLinksTextLight,
		dark: appsFooterLinksTextDark,
	},
	'--apps-footer-links-text-hover': {
		light: appsFooterLinksTextHoverLight,
		dark: appsFooterLinksTextHoverDark,
	},
	'--apps-footer-background': {
		light: appsFooterBackgroundLight,
		dark: appsFooterBackgroundDark,
	},
	'--click-to-view-background': {
		light: clickToViewBackgroundLight,
		dark: clickToViewBackgroundDark,
	},
	'--click-to-view-border': {
		light: clickToViewBorderLight,
		dark: clickToViewBorderDark,
	},
	'--click-to-view-button': {
		light: clickToViewButtonLight,
		dark: clickToViewButtonDark,
	},
	'--click-to-view-button-text': {
		light: clickToViewButtonTextLight,
		dark: clickToViewButtonTextDark,
	},
	'--click-to-view-button-hover': {
		light: clickToViewButtonHoverLight,
		dark: clickToViewButtonHoverDark,
	},
	'--avatar-background': {
		light: avatarLight,
		dark: avatarDark,
	},
	'--standfirst-text': {
		light: standfirstTextLight,
		dark: standfirstTextDark,
	},
	'--standfirst-bullet': {
		light: standfirstBulletLight,
		dark: standfirstBulletDark,
	},
	'--standfirst-link-text': {
		light: standfirstLinkTextLight,
		dark: standfirstLinkTextDark,
	},
	'--standfirst-link-border': {
		light: standfirstLinkBorderLight,
		dark: standfirstLinkBorderDark,
	},
	'--follow-icon-fill': {
		light: followIconFillLight,
		dark: followIconFillDark,
	},
	'--follow-icon-background': {
		light: followIconBackgroundLight,
		dark: followIconBackgroundDark,
	},
	'--follow-text': {
		light: followTextLight,
		dark: followTextDark,
	},
	'--standfirst-border': {
		light: standfirstBorder,
		dark: standfirstBorder,
	},
	'--standfirst-background': {
		light: standfirstBackgroundLight,
		dark: standfirstBackgroundDark,
	},
	'--card-border-top': {
		light: cardBorderTopLight,
		dark: cardBorderTopDark,
	},
	'--card-footer-text': {
		light: cardAgeTextLight,
		dark: cardAgeTextDark,
	},
	'--card-background': {
		light: cardBackgroundLight,
		dark: cardBackgroundDark,
	},
	'--card-headline-trail-text': {
		light: cardHeadlineTextLight,
		dark: cardTextDark,
	},
	'--card-kicker-text': {
		light: cardKickerTextLight,
		dark: cardBylineKickerTextDark,
	},
	'--card-background-hover': {
		light: cardBackgroundHoverLight,
		dark: cardBackgroundDark,
	},
	'--caption-text': {
		light: captionTextLight,
		dark: captionTextDark,
	},
	'--caption-link': {
		light: captionLink,
		dark: captionLink,
	},
	'--caption-overlay-text': {
		light: captionOverlayText,
		dark: captionOverlayText,
	},
	'--key-event-bullet': {
		light: keyEventBulletLight,
		dark: keyEventBulletDark,
	},
	'--key-event-bullet-hover': {
		light: keyEventBulletHoverLight,
		dark: keyEventBulletHoverDark,
	},
	'--key-event-title': {
		light: keyEventTitleLight,
		dark: keyEventTitleDark,
	},
	'--key-event-text': {
		light: keyEventTextLight,
		dark: keyEventTextDark,
	},
	'--key-event-background': {
		light: keyEventBackgroundLight,
		dark: keyEventBackgroundDark,
	},
	'--key-event-background-desktop': {
		light: keyEventBackgroundDesktopLight,
		dark: keyEventBackgroundDesktopDark,
	},
	'--key-event-border': {
		light: keyEventBorderLight,
		dark: keyEventBorderDark,
	},
	'--key-event-button': {
		light: keyEventButtonLight,
		dark: keyEventButtonDark,
	},
	'--key-event-button-hover': {
		light: keyEventButtonHoverLight,
		dark: keyEventButtonHoverDark,
	},
	'--key-event-button-fill': {
		light: keyEventButtonFillLight,
		dark: keyEventButtonFillDark,
	},
	'--summary-event-bullet': {
		light: summaryEventBulletLight,
		dark: summaryEventBulletDark,
	},
	'--summary-event-bullet-hover': {
		light: summaryEventBulletHoverLight,
		dark: summaryEventBulletHoverDark,
	},
	'--branding-label-text': {
		light: brandingLabelLight,
		dark: brandingLabelDark,
	},
	'--branding-link-text': {
		light: brandingLinkLight,
		dark: brandingLinkDark,
	},
	'--article-background': {
		light: articleBackgroundLight,
		dark: articleBackgroundDark,
	},
	'--article-section-background': {
		light: articleSectionBackgroundLight,
		dark: articleSectionBackgroundDark,
	},
	'--article-section-title': {
		light: articleSectionTitleLight,
		dark: articleSectionTitleDark,
	},
	'--article-link-text': {
		light: articleLinkTextLight,
		dark: articleLinkTextDark,
	},
	'--article-link-border': {
		light: articleLinkBorderLight,
		dark: articleLinkBorderDark,
	},
	'--article-link-text-hover': {
		light: articleLinkHoverLight,
		dark: articleLinkHoverDark,
	},
	'--article-link-border-hover': {
		light: articleLinkBorderHoverLight,
		dark: articleLinkBorderHoverDark,
	},
	'--article-border': {
		light: articleBorder,
		dark: articleBorder,
	},
	'--article-border-secondary': {
		light: articleBorderSecondary,
		dark: articleBorderSecondary,
	},
	'--sub-nav-border': {
		light: subNavBorder,
		dark: subNavBorder,
	},
	'--sub-nav-link': {
		light: subNavLink,
		dark: subNavLink,
	},
	'--share-icon-fill': {
		light: shareIconFillLight,
		dark: shareIconFillDark,
	},
	'--share-icon-blog-fill': {
		light: shareIconFillBlogLight,
		dark: shareIconFillBlogDark,
	},
	'--match-nav-background': {
		light: matchNavBackground,
		dark: matchNavBackground,
	},
	'--live-block-container-background': {
		light: liveBlockContainerBackgroundLight,
		dark: liveBlockContainerBackgroundDark,
	},
	'--live-block-border-top': {
		light: liveBlockBorderTopLight,
		dark: liveBlockBorderTopDark,
	},
	'--live-block-border-bottom': {
		light: liveBlockBorderBottomLight,
		dark: liveBlockBorderBottomDark,
	},
	'--sub-meta-background': {
		light: subMetaBackgroundLight,
		dark: subMetaBackgroundDark,
	},
	'--sub-meta-label-text': {
		light: subMetaLabelTextLight,
		dark: subMetaLabelTextDark,
	},
	'--sub-meta-text': {
		light: subMetaTextLight,
		dark: subMetaTextDark,
	},
	'--sub-meta-text-hover': {
		light: subMetaTextHoverLight,
		dark: subMetaBackgroundDark,
	},
	'--syndication-button-text': {
		light: syndicationButtonText,
		dark: syndicationButtonText,
	},
	'--syndication-button-border': {
		light: syndicationButtonBorder,
		dark: syndicationButtonBorder,
	},
	'--drop-cap': {
		light: dropCapLight,
		dark: richLinkFillDark,
	},
	'--apps-epic-background': {
		light: appsEpicBackgroundLight,
		dark: appsEpicBackgroundDark,
	},
	'--apps-epic-border': {
		light: appsEpicBorderLight,
		dark: appsEpicBorderDark,
	},
	'--interactive-block-background': {
		light: interactiveBlockBackground,
		dark: interactiveBlockBackground,
	},
	'--most-viewed-headline': {
		light: mostViewedHeadlineLight,
		dark: mostViewedHeadlineDark,
	},
	'--link-kicker-text': {
		light: linkKickerTextLight,
		dark: linkKickerTextDark,
	},
	'--article-text': {
		light: articleTextLight,
		dark: articleTextDark,
	},
	'--most-viewed-footer-hover': {
		light: mostViewedFooterHoverLight,
		dark: mostViewedFooterHoverDark,
	},
	'--pullquote-text': {
		light: pullQuoteTextLight,
		dark: pullQuoteTextDark,
	},
	'--pullquote-background': {
		light: pullQuoteBackgroundLight,
		dark: pullQuoteBackgroundDark,
	},
	'--pullquote-border': {
		light: pullQuoteBorderLight,
		dark: pullQuoteBorderDark,
	},
	'--pullquote-icon': {
		light: pullQuoteIconLight,
		dark: pullQuoteIconDark,
	},
	'--rich-link-text': {
		light: richLinkTextLight,
		dark: richLinkTextDark,
	},
	'--rich-link-background': {
		light: richLinkBackgroundLight,
		dark: richLinkBackgroundDark,
	},
	'--rich-link-fill': {
		light: richLinkFillLight,
		dark: richLinkFillDark,
	},
	'--rich-link-background-hover': {
		light: richLinkBackgroundHoverLight,
		dark: richLinkBackgroundHoverDark,
	},
	'--rich-link-header': {
		light: richLinkHeaderLight,
		dark: richLinkHeaderDark,
	},
	'--rich-link-branding-text': {
		light: richLinkBrandingTextLight,
		dark: richLinkHeaderDark,
	},
	'--quote-icon-fill': {
		light: richLinkQuoteFillLight,
		dark: richLinkFillDark,
	},
	'--rich-link-border': {
		light: richLinkBorderLight,
		dark: richLinkBorderDark,
	},
	'--age-warning-background': {
		light: ageWarningBackground,
		dark: ageWarningBackground,
	},
} satisfies PaletteColours;

/**
 * A union of all the keys of the palette object. In other words, all the
 * possible colours that can be chosen.
 */
type ColourName = keyof typeof paletteColours;

/**
 * Looks up a palette colour by name. Retrieves a CSS value for the specified
 * colour, for use in CSS declarations. See the examples for how this is
 * commonly used with our Emotion-based styles.
 *
 * @param a The name of a palette colour; for example `--headline-colour`.
 * @returns A CSS `var` function call; for example `var(--headline-colour)`.
 * @example
 * const styles = css`
 *   color: ${palette('--headline-colour')};
 *   background-color: ${palette('--headline-background-colour')};
 * `;
 */
const palette = (colour: ColourName): string => `var(${colour})`;

/**
 * Builds a list of CSS custom property declarations representing colours. These
 * can be used to set up the palette on any element, and then retrieved to apply
 * styles via the {@linkcode palette} function. See the examples for ways the
 * palette could be set up.
 *
 * @param format The `ArticleFormat` of the current article.
 * @param colourScheme Get declarations for either `light` or `dark` mode.
 * @returns A set of CSS custom property declarations for palette colours,
 * in string format. For example:
 * ```
 * [ '--headline-colour: #1a1a1a;', '--headline-background-colour: #ffffff;' ]
 * ```
 * @example
 * <caption>Create a single stylesheet to handle both colour schemes.</caption>
 * const paletteStyles = css`
 *   :root {
 *     ${paletteDeclarations(format, 'light').join('\n')}
 *   }
 *
 *   (@)media (prefers-color-scheme: dark) {
 *     :root {
 *       ${paletteDeclarations(format, 'dark').join('\n')}
 *     }
 *   }
 * `;
 * @example
 * <caption>Load separate stylesheets based on user preference.</caption>
 * // Use to build a file called 'light.css'.
 * const lightPalette = css`
 *   :root {
 *     ${paletteDeclarations(format, 'light').join('\n')}
 *   }
 * `;
 * // Use to build a file called 'dark.css'.
 * const darkPalette = css`
 *   :root {
 *     ${paletteDeclarations(format, 'dark').join('\n')}
 *   }
 * `;
 *
 * const stylesheets = (
 *   <>
 *     <link
 *       media="(prefers-color-scheme: light)"
 *       rel="stylesheet"
 *       href="light.css"
 *     />
 *     <link
 *       media="(prefers-color-scheme: dark)"
 *       rel="stylesheet"
 *       href="dark.css"
 *     />
 *   </>
 * );
 */
const paletteDeclarations = (
	format: ArticleFormat,
	colourScheme: 'light' | 'dark',
): string[] =>
	Object.entries(paletteColours).map(
		([colourName, colour]) =>
			`${colourName}: ${colour[colourScheme](format)};`,
	);

// ----- Exports ----- //

export { palette, paletteDeclarations };
