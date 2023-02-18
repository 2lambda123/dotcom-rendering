import type { CAPIElement, EnhancedImageForLightbox } from '../types/content';

/**
 * Generates a new array of lightbox images. Does not mutate.
 *
 * We decide this array, prior to rendering, because we create and
 * insert the lightbox html in the dom at page load and to do this
 * we need to know which images we want the lightbox to contain.
 *
 * This enhancer needs to run at a higher level to most other enhancers
 * because it need both mainMediaElements and blocks in scope. Most other
 * enhancers just have blocks in scope.
 */
export const buildLightboxImages = (
	format: CAPIFormat,
	blocks: Block[],
	mainMediaElements: CAPIElement[],
): EnhancedImageForLightbox[] => {
	const images: EnhancedImageForLightbox[] = [];
	mainMediaElements.forEach((element) => {
		if (
			element._type ===
			'model.dotcomrendering.pageElements.ImageBlockElement'
		) {
			images.push(element);
		}
	});
	blocks.forEach((block) => {
		block.elements.forEach((element) => {
			let imageElement: EnhancedImageForLightbox;
			switch (element._type) {
				case 'model.dotcomrendering.pageElements.ImageBlockElement': {
					imageElement = element;
					if (
						format.design === 'LiveBlogDesign' ||
						format.design === 'DeadBlogDesign'
					) {
						imageElement.blockId = block.id;
						imageElement.firstPublished = block.blockFirstPublished;
					}
					images.push(imageElement);
					break;
				}
				case 'model.dotcomrendering.pageElements.MultiImageBlockElement': {
					element.images.forEach((multiImage) => {
						imageElement = multiImage;
						if (
							format.design === 'LiveBlogDesign' ||
							format.design === 'DeadBlogDesign'
						) {
							imageElement.blockId = block.id;
							imageElement.firstPublished =
								block.blockFirstPublished;
						}
						images.push(imageElement);
					});
					break;
				}
				default:
					break;
			}
		});
	});
	// On some articles the main media is repeated as an element in the article body so
	// we deduplicate the array here
	const alreadySeen: string[] = [];
	const uniqueImages: EnhancedImageForLightbox[] = [];
	images.forEach((image) => {
		const imageId = image.media.allImages[0]?.url.split('/')[3];
		if (!imageId) {
			// It's unlikely that we would not have an imageId here but if we do we fail
			// open, passing the image through
			uniqueImages.push(image);
			return;
		}
		if (!alreadySeen.includes(imageId)) {
			uniqueImages.push(image);
			alreadySeen.push(imageId);
		}
	});
	return uniqueImages.filter(image => image.role !== 'thumbnail');
};
