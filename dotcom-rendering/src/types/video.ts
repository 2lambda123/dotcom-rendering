/** For displaying embedded, playable videos directly in cards */
export type CardYoutubeVideo = {
	elementId: string;
	videoId: string;
	height: number;
	width: number;
	origin: string;
	title: string;
	duration: number;
	expired: boolean;
	images: Array<{ url: string; width: number }>;
};
