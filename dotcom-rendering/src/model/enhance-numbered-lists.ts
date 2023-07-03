import { JSDOM } from 'jsdom';
import type {
	FEElement,
	ImageBlockElement,
	TextBlockElement,
} from '../types/content';

const isFalseH3 = (element: FEElement): boolean => {
	// Checks if this element is a 'false h3' based on the convention: <p><strong><H3 text</strong></p>
	if (
		element._type !== 'model.dotcomrendering.pageElements.TextBlockElement'
	) {
		return false;
	}
	const frag = JSDOM.fragment(element.html);
	if (!frag.firstElementChild) return false;
	const html = frag.firstElementChild.outerHTML;
	// The following things must be true for an element to be a faux H3
	const hasPwrapper = frag.firstElementChild.nodeName === 'P';
	const containsStrongtags =
		frag.firstElementChild.outerHTML.includes('<strong>');
	const doesNotContainLinks =
		!frag.firstElementChild.outerHTML.includes('<a>');
	const htmlLength = html.length;
	const startStrong = html.substr(0, 11) === '<p><strong>';
	const endsStrong = html.substr(htmlLength - 13) === '</strong></p>';

	return (
		hasPwrapper &&
		containsStrongtags &&
		doesNotContainLinks &&
		startStrong &&
		endsStrong
	);
};

const extractH3 = (element: FEElement): string => {
	// Extract the text based on the convention: <p><strong><H3 text</strong></p>
	const textElement = element as TextBlockElement;
	const frag = JSDOM.fragment(textElement.html);
	if (isFalseH3(element)) {
		return (
			frag.firstElementChild?.innerHTML
				.split('<strong>')
				.join('')
				.split('</strong>')
				.join('') ?? ''
		);
	}
	return '';
};

const isStar = (character: string): character is '★' | '☆' => {
	return character === '★' || character === '☆';
};

const isStarRating = (element?: FEElement): element is TextBlockElement => {
	if (!element) return false;

	// Checks if this element is a 'star rating' based on the convention: <p>★★★★☆</p>
	if (element._type !== 'model.dotcomrendering.pageElements.TextBlockElement')
		return false;
	const frag = JSDOM.fragment(element.html);
	const hasPTags = frag.firstElementChild?.nodeName === 'P';
	const text = frag.textContent ?? '';
	// Loop the string making sure each letter is a star
	for (const letter of text) {
		if (!isStar(letter)) return false;
	}
	const hasFiveStars = text.length === 5;
	return hasPTags && hasFiveStars;
};

const extractStarCount = (element: TextBlockElement): number => {
	const isSelectedStar = (charactor: string): boolean => {
		return charactor === '★';
	};
	// Returns the count of stars
	const textElement = element;
	const frag = JSDOM.fragment(textElement.html);
	const text = frag.textContent ?? '';
	// Loop the string counting selected stars
	let starCount = 0;
	for (const letter of text) {
		if (isSelectedStar(letter)) starCount += 1;
	}
	return starCount;
};

const isStarableImage = (element: FEElement | undefined): boolean => {
	return (
		element?._type ===
			'model.dotcomrendering.pageElements.ImageBlockElement' &&
		element.role !== 'thumbnail'
	);
};

const starifyImages = (elements: FEElement[]): FEElement[] =>
	elements.flatMap((thisElement, index) => {
		const previousElement = elements[index - 1];
		switch (thisElement._type) {
			case 'model.dotcomrendering.pageElements.TextBlockElement':
				if (
					isStarRating(thisElement) &&
					isStarableImage(elements[index + 1])
				) {
					// Skip this element
					return [];
				} else {
					// Pass through
					return thisElement;
				}

			case 'model.dotcomrendering.pageElements.ImageBlockElement':
				if (
					isStarableImage(thisElement) &&
					isStarRating(previousElement)
				) {
					return {
						...thisElement,
						starRating: extractStarCount(previousElement),
					};
				} else {
					// Pass through
					return thisElement;
				}

			default:
				// Pass through
				return thisElement;
		}
	});

const inlineStarRatings = (elements: FEElement[]): FEElement[] =>
	elements.map((thisElement) => {
		if (
			thisElement._type ===
				'model.dotcomrendering.pageElements.TextBlockElement' &&
			isStarRating(thisElement)
		) {
			const rating = extractStarCount(thisElement);
			// Inline this image
			return {
				_type: 'model.dotcomrendering.pageElements.StarRatingBlockElement',
				elementId: thisElement.elementId,
				rating,
				size: 'large',
			};
		} else {
			// Pass through
			return thisElement;
		}
	});

const makeThumbnailsRound = (elements: FEElement[]): FEElement[] =>
	elements.map((thisElement) => {
		if (
			thisElement._type ===
				'model.dotcomrendering.pageElements.ImageBlockElement' &&
			thisElement.role === 'thumbnail'
		) {
			// Make this image round
			return {
				...thisElement,
				isAvatar: true,
			};
		} else {
			// Pass through
			return thisElement;
		}
	});

const isItemLink = (element: FEElement): boolean => {
	// Checks if this element is a 'item link' based on the convention: <ul> <li>...</li> </ul>
	if (
		element._type !== 'model.dotcomrendering.pageElements.TextBlockElement'
	) {
		return false;
	}
	const frag = JSDOM.fragment(element.html);
	if (!frag.firstElementChild) return false;

	const hasULWrapper = frag.firstElementChild.nodeName === 'UL';
	const hasOnlyOneChild = frag.firstElementChild.childElementCount === 1;
	const hasLINestedWrapper =
		frag.firstElementChild.firstElementChild?.nodeName === 'LI';

	return hasULWrapper && hasOnlyOneChild && hasLINestedWrapper;
};

/**
 * Article pages come with some global style rules, one of which affects h2
 * tags. But for numbered lists we don't want these styles because we use
 * these html elements to represents our special titles. Rather than start a
 * css war, this enhancer uses the `data-ignore` attribute which is a contract
 * established to allow global styles to be ignored.
 *
 * All h2 tags inside an article of Design: NumberedList have this attribute
 * set.
 */
const removeGlobalH2Styles = (elements: FEElement[]): FEElement[] =>
	elements.map((thisElement) => {
		if (
			thisElement._type ===
			'model.dotcomrendering.pageElements.SubheadingBlockElement'
		) {
			return {
				...thisElement,
				html: thisElement.html.replace(
					'<h2>',
					'<h2 data-ignore="global-h2-styling">',
				),
			};
		} else {
			// Pass through
			return thisElement;
		}
	});

/**
 * Why not just add H3s in Composer?
 * Truth is, you can't. So to get around this there's a convention that says if
 * you insert <p><strong>Faux H3!</strong>,</p> then we replace it with a h3 tag
 * instead.
 *
 * Note. H3s don't have any styles so we have to add them. In Frontend, they use
 * a 'fauxH3' class for this. In DCR we add `globalH3Styles` which was added at
 * the same time as this code.
 */
const addH3s = (elements: FEElement[]): FEElement[] =>
	elements.flatMap((thisElement, index) => {
		if (
			thisElement._type ===
				'model.dotcomrendering.pageElements.TextBlockElement' &&
			isFalseH3(thisElement)
		) {
			const h3Text = extractH3(thisElement);

			// To avoid having to depend on the ordering of the enhancer (which could easily be a source of bugs)
			const previousItem = elements[index - 1];

			// We determine if previous items are `ItemLinkBlockElement` through type and `isItemLink` functions
			const isPreviousItemLink =
				previousItem?._type ===
					'model.dotcomrendering.pageElements.ItemLinkBlockElement' ||
				(previousItem && isItemLink(previousItem));

			return [
				{
					_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
					size: 'full',
					spaceAbove: isPreviousItemLink ? 'loose' : 'tight',
				},
				{
					...thisElement,
					html: `<h3>${h3Text}</h3>`,
				},
			];
		} else {
			// pass through
			return thisElement;
		}
	});

const addItemLinks = (elements: FEElement[]): FEElement[] =>
	elements.flatMap((thisElement) => {
		if (
			thisElement._type ===
				'model.dotcomrendering.pageElements.TextBlockElement' &&
			isItemLink(thisElement)
		) {
			return [
				{
					_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
					size: 'full',
					spaceAbove: 'tight',
				},
				{
					...thisElement,
					_type: 'model.dotcomrendering.pageElements.ItemLinkBlockElement',
				},
			];
		} else {
			// Pass through
			return thisElement;
		}
	});

const addTitles = (elements: FEElement[], format: FEFormat): FEElement[] => {
	let position = 1;
	return elements.flatMap((thisElement) => {
		if (
			thisElement._type ===
			'model.dotcomrendering.pageElements.SubheadingBlockElement'
		) {
			const { html } = thisElement;
			return [
				{
					_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
					size: 'full',
					spaceAbove: 'loose',
				},
				{
					_type: 'model.dotcomrendering.pageElements.NumberedTitleBlockElement',
					elementId: thisElement.elementId,
					position: position++,
					html,
					format,
				},
			];
		} else {
			// Pass through
			return thisElement;
		}
	});
};

class Enhancer {
	elements: FEElement[];

	format: FEFormat;

	constructor(elements: FEElement[], format: FEFormat) {
		this.elements = elements;
		this.format = format;
	}

	makeThumbnailsRound() {
		this.elements = makeThumbnailsRound(this.elements);
		return this;
	}

	addTitles() {
		this.elements = addTitles(this.elements, this.format);
		return this;
	}

	removeGlobalH2Styles() {
		this.elements = removeGlobalH2Styles(this.elements);
		return this;
	}

	addH3s() {
		this.elements = addH3s(this.elements);
		return this;
	}

	addItemLinks() {
		this.elements = addItemLinks(this.elements);
		return this;
	}

	starifyImages() {
		this.elements = starifyImages(this.elements);
		return this;
	}

	inlineStarRatings() {
		this.elements = inlineStarRatings(this.elements);
		return this;
	}
}

const enhance = (elements: FEElement[], format: FEFormat): FEElement[] => {
	return (
		new Enhancer(elements, format)
			// Add the data-ignore='global-h2-styling' attribute
			.removeGlobalH2Styles()
			// Turn false h3s into real ones
			.addH3s()
			// Add item links
			.addItemLinks()
			// Add numbered titles
			.addTitles()
			// Overlay stars onto images
			.starifyImages()
			// Turn ascii stars into components
			.inlineStarRatings()
			// Thumbnail images should be round
			.makeThumbnailsRound().elements
	);
};

export const enhanceNumberedLists = (
	blocks: Block[],
	format: FEFormat,
): Block[] => {
	const isNumberedList = format.display === 'NumberedListDisplay';

	if (!isNumberedList) {
		return blocks;
	}

	return blocks.map((block: Block) => {
		return {
			...block,
			elements: enhance(block.elements, format),
		};
	});
};
