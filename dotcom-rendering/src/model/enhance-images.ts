import { JSDOM } from 'jsdom';
import type {
	FEElement,
	ImageBlockElement,
	MultiImageBlockElement,
	SubheadingBlockElement,
	TextBlockElement,
} from '../types/content';

interface HalfWidthImageBlockElement extends ImageBlockElement {
	role: 'halfWidth';
}

const isHalfWidthImage = (
	element?: FEElement,
): element is HalfWidthImageBlockElement => {
	if (!element) return false;
	return (
		element._type ===
			'model.dotcomrendering.pageElements.ImageBlockElement' &&
		element.role === 'halfWidth'
	);
};

const isMultiImage = (
	element?: FEElement,
): element is MultiImageBlockElement => {
	if (!element) return false;
	return (
		element._type ===
		'model.dotcomrendering.pageElements.MultiImageBlockElement'
	);
};

const isImage = (element?: FEElement): element is ImageBlockElement => {
	if (!element) return false;
	return (
		element._type === 'model.dotcomrendering.pageElements.ImageBlockElement'
	);
};

const isTitle = (element?: FEElement): element is SubheadingBlockElement => {
	if (!element) return false;
	// Checks if this element is a 'title' based on the convention: <h2>Title text</h2>
	if (
		element._type !==
		'model.dotcomrendering.pageElements.SubheadingBlockElement'
	)
		return false;
	const frag = JSDOM.fragment(element.html);
	return frag.firstElementChild?.nodeName === 'H2';
};

const extractTitle = (element: SubheadingBlockElement): string => {
	// We cast here because we're know this element is a subheading but TS isn't sure
	const subHeading = element;
	// Extract 'title' based on the convention: <h2>Title text</h2>
	const frag = JSDOM.fragment(subHeading.html);
	if (!frag.firstElementChild) return '';
	const isH2tag = frag.firstElementChild.nodeName === 'H2';
	if (isH2tag) {
		// element is an essay title
		return frag.textContent?.trim() ?? '';
	}
	return '';
};

const isCaption = (element?: FEElement): element is TextBlockElement => {
	if (!element) return false;
	// Checks if this element is a 'caption' based on the convention: <ul><li><Caption text</li></ul>
	if (
		element._type !== 'model.dotcomrendering.pageElements.TextBlockElement'
	) {
		return false;
	}
	const frag = JSDOM.fragment(element.html);
	if (!frag.firstElementChild) return false;
	const hasULwrapper = frag.firstElementChild.nodeName === 'UL';
	const containsLItags = frag.firstElementChild.outerHTML.includes('<li>');
	return hasULwrapper && containsLItags;
};

const extractCaption = (element: TextBlockElement): string => {
	// Extract 'caption' based on the convention: <ul><li><Caption text</li></ul>
	// We cast here because we're know this element is a text element but TS isn't sure
	const textElement = element;
	const frag = JSDOM.fragment(textElement.html);
	if (!frag.firstElementChild) return '';
	const hasULwrapper = frag.firstElementChild.nodeName === 'UL';
	const containsLItags = frag.firstElementChild.outerHTML.includes('<li>');
	if (hasULwrapper && containsLItags) {
		return textElement.html;
	}
	return '';
};

const constructMultiImageElement = (
	first: ImageBlockElement,
	second: ImageBlockElement,
): MultiImageBlockElement => {
	return {
		_type: 'model.dotcomrendering.pageElements.MultiImageBlockElement',
		elementId: first.elementId,
		images: [
			{
				...first,
				data: {
					...first.data,
					caption: '', // Delete any existing caption (special captions might be added later)
				},
			},
			{
				...second,
				data: {
					...second.data,
					caption: '', // ibid
				},
			},
		],
	};
};

const addMultiImageElements = (elements: FEElement[]): FEElement[] =>
	elements.reduce<FEElement[]>((withMultiImageElements, thisElement) => {
		const lastElement = withMultiImageElements.at(-1);
		if (isHalfWidthImage(lastElement) && isHalfWidthImage(thisElement)) {
			// Pair found. Add a multi element instead of the last one
			return withMultiImageElements
				.slice(0, -1)
				.concat(constructMultiImageElement(lastElement, thisElement));
		} else {
			// Pass through
			return withMultiImageElements.concat(thisElement);
		}
	}, []);

const addTitles = (elements: FEElement[]): FEElement[] =>
	elements.reduce<FEElement[]>((withTitles, thisElement) => {
		const lastElement = withTitles.at(-1);
		const penultimateElement = withTitles.at(-2);

		if (isImage(lastElement) && isTitle(thisElement)) {
			// This element is an image and is immediately followed by a title
			return withTitles.slice(0, -1).concat({
				...lastElement,
				title: extractTitle(thisElement),
			});
		} else if (
			isImage(penultimateElement) &&
			isCaption(lastElement) &&
			isTitle(thisElement)
		) {
			// This element is an image, was followed by a caption, and then had a title after it
			return withTitles.slice(0, -2).concat(
				{
					...penultimateElement,
					title: extractTitle(thisElement),
				},
				lastElement,
			);
		} else {
			// Pass through
			return withTitles.concat(thisElement);
		}
	}, []);

const addCaptionsToImages = (elements: FEElement[]): FEElement[] =>
	elements.reduce<FEElement[]>((withSpecialCaptions, thisElement) => {
		const lastElement = withSpecialCaptions.at(-1);
		const penultimateElement = withSpecialCaptions.at(-2);

		if (isImage(lastElement) && isCaption(thisElement)) {
			const thisImage = lastElement;
			return withSpecialCaptions.slice(0, -1).concat({
				...thisImage,
				data: {
					...thisImage.data,
					caption: extractCaption(thisElement),
				},
			});
		} else if (
			isImage(penultimateElement) &&
			isTitle(lastElement) &&
			isCaption(thisElement)
		) {
			const thisImage = penultimateElement;
			return withSpecialCaptions.slice(0, -2).concat(
				{
					...thisImage,
					data: {
						...thisImage.data,
						caption: extractCaption(thisElement),
					},
				},
				lastElement,
			);
		} else {
			// Pass through
			return withSpecialCaptions.concat(thisElement);
		}
	}, []);

const addCaptionsToMultis = (elements: FEElement[]): FEElement[] =>
	elements.reduce<FEElement[]>((withSpecialCaptions, thisElement) => {
		const lastElement = withSpecialCaptions.at(-1);
		const penultimateElement = withSpecialCaptions.at(-2);

		if (isMultiImage(lastElement) && isCaption(thisElement)) {
			return withSpecialCaptions.slice(0, -1).concat({
				...lastElement,
				caption: extractCaption(thisElement),
			});
		} else if (
			isMultiImage(penultimateElement) &&
			isTitle(lastElement) &&
			isCaption(thisElement)
		) {
			return withSpecialCaptions.slice(0, -2).concat(
				{
					...penultimateElement,
					caption: extractCaption(thisElement),
				},
				lastElement,
			);
		} else {
			// Pass through
			return withSpecialCaptions.concat(thisElement);
		}
	}, []);

/** Remove all captions from all images */
const stripCaptions = (elements: FEElement[]): FEElement[] =>
	elements.map((thisElement) => {
		if (
			thisElement._type ===
			'model.dotcomrendering.pageElements.ImageBlockElement'
		) {
			// Remove the caption from this image
			return {
				...thisElement,
				data: {
					...thisElement.data,
					caption: '',
				},
			};
		} else {
			// Pass through
			return thisElement;
		}
	});

/** Remove credit from all images */
const removeCredit = (elements: FEElement[]): FEElement[] =>
	elements.map((thisElement) => {
		if (
			thisElement._type ===
			'model.dotcomrendering.pageElements.ImageBlockElement'
		) {
			// Remove the credit from this image
			return {
				...thisElement,
				data: {
					...thisElement.data,
					credit: '',
				},
			};
		} else {
			// Pass through
			return thisElement;
		}
	});

class Enhancer {
	elements: FEElement[];

	constructor(elements: FEElement[]) {
		this.elements = elements;
	}

	/**
	 * Photo essays by convention have all image captions removed and rely completely on
	 * special captions set using the `ul`/`li` trick
	 */
	stripCaptions() {
		this.elements = stripCaptions(this.elements);
		return this;
	}

	/**
	 * Replace pairs of halfWidth images with MultiImageBlockElements
	 */
	addMultiImageElements() {
		this.elements = addMultiImageElements(this.elements);
		return this;
	}

	/**
	 * Photo essay have a convention of adding titles to images if the subsequent block is a h2
	 */
	addTitles() {
		this.elements = addTitles(this.elements);
		return this;
	}

	/**
	 * If any MultiImageBlockElement is followed by a ul/l caption, delete the special caption
	 * element and use the value for the multi image `caption` prop
	 */
	addCaptionsToMultis() {
		this.elements = addCaptionsToMultis(this.elements);
		return this;
	}

	/**
	 * In photo essays, we also use ul captions for normal images as well
	 */
	addCaptionsToImages() {
		this.elements = addCaptionsToImages(this.elements);
		return this;
	}

	/**
	 * By convention, photo essays don't include credit for images in the caption
	 */
	removeCredit() {
		this.elements = removeCredit(this.elements);
		return this;
	}
}

const enhance = (elements: FEElement[], isPhotoEssay: boolean): FEElement[] => {
	if (isPhotoEssay) {
		return new Enhancer(elements)
			.stripCaptions()
			.removeCredit()
			.addMultiImageElements()
			.addTitles()
			.addCaptionsToMultis()
			.addCaptionsToImages().elements;
	}

	return (
		new Enhancer(elements)
			// Replace pairs of halfWidth images with MultiImageBlockElements
			.addMultiImageElements()
			// If any MultiImageBlockElement is followed by a ul/l caption, delete the special caption
			// element and use the value for the multi image `caption` prop
			.addCaptionsToMultis().elements
	);
};

export const enhanceImages = (blocks: Block[], format: FEFormat): Block[] => {
	const isPhotoEssay = format.design === 'PhotoEssayDesign';

	return blocks.map((block: Block) => {
		return {
			...block,
			elements: enhance(block.elements, isPhotoEssay),
		};
	});
};
