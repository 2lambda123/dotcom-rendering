import type { FEElement, SubheadingBlockElement } from '../types/content';
import { isLegacyTableOfContents } from './isLegacyTableOfContents';
import { stripHTML } from './sanitise';

const enhance = (elements: FEElement[]): FEElement[] => {
	const hasInteractiveContentsBlockElement = elements.some(
		isLegacyTableOfContents,
	);

	if (hasInteractiveContentsBlockElement) {
		// We want to record all `SubheadingBlockElement` to construct the interactive content block
		const subheadingLinks = elements.filter(
			(element): element is SubheadingBlockElement => {
				return (
					element._type ===
					'model.dotcomrendering.pageElements.SubheadingBlockElement'
				);
			},
		);

		// Get the last element with an 'elementId'
		// Array.prototype.findLast is supported in Node 18
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast
		const endDocumentElement = elements.findLast(
			(element): element is typeof element & { elementId: string } =>
				'elementId' in element,
		);

		// replace interactive content block
		return elements.flatMap((element) => {
			if (isLegacyTableOfContents(element)) {
				const divider = {
					_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
					size: 'full',
					spaceAbove: 'tight',
				} as const;
				if ('elementId' in element && element.elementId) {
					return [
						divider,
						{
							_type: 'model.dotcomrendering.pageElements.InteractiveContentsBlockElement',
							elementId: element.elementId,
							// Strip the HTML from the subheading links for use as titles within the element
							subheadingLinks: subheadingLinks.map(
								(subheading) => ({
									...subheading,
									html: stripHTML(subheading.html),
								}),
							),
							endDocumentElementId: endDocumentElement
								? endDocumentElement.elementId
								: undefined,
						},
					];
				}
				return divider;
			} else {
				return element;
			}
		});
	}

	return elements;
};

export const enhanceInteractiveContentsElements = (blocks: Block[]): Block[] =>
	blocks.map((block: Block) => {
		return {
			...block,
			elements: enhance(block.elements),
		};
	});
