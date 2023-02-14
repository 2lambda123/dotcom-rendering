import { css } from '@emotion/react';
import {
	brand,
	brandAlt,
	breakpoints,
	neutral,
} from '@guardian/source-foundations';
import { FrontContainer } from './FrontContainer';

export default {
	component: FrontContainer,
	title: 'Components/FrontContainer',
	parameters: {
		viewport: {
			// This has the effect of turning off the viewports addon by default
			defaultViewport: 'doesNotExist',
		},
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.desktop,
				breakpoints.leftCol,
				breakpoints.wide,
			],
		},
	},
};

const Placeholder = ({
	heightInPixels = 400,
	text = 'Placeholder Content',
}: {
	heightInPixels?: number;
	text?: string;
}) => (
	<div
		css={css`
			background-color: lightgrey;
			width: 100%;
			height: ${heightInPixels}px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 2em;
			font-weight: 200;
		`}
	>
		{text}
	</div>
);

export const ContainerStory = () => {
	return (
		<FrontContainer title="Default Container">
			<Placeholder />
		</FrontContainer>
	);
};
ContainerStory.story = { name: 'default container' };

export const BordersStory = () => {
	return (
		<FrontContainer title="Borders">
			<Placeholder />
		</FrontContainer>
	);
};
BordersStory.story = { name: 'with all borders' };

export const LeftContentStory = () => {
	return (
		<FrontContainer
			title="Borders"
			leftContent={<Placeholder text="LeftCol" heightInPixels={200} />}
		>
			<Placeholder />
		</FrontContainer>
	);
};
LeftContentStory.story = {
	name: 'with an element passed into the left column',
};

export const BackgroundStory = () => {
	return (
		<FrontContainer
			title="Background Colour"
			description="About this content"
			fontColour={neutral[100]}
			backgroundColour={brand[400]}
			borderColour={brand[600]}
		>
			<Placeholder />
		</FrontContainer>
	);
};
BackgroundStory.story = { name: 'with a blue background' };

export const InnerBackgroundStory = () => {
	return (
		<FrontContainer
			title="Inner Background"
			description="About this content"
			fontColour={neutral[100]}
			innerBackgroundColour={brand[400]}
			borderColour={brand[300]}
		>
			<Placeholder />
		</FrontContainer>
	);
};
InnerBackgroundStory.story = {
	name: 'with a blue inner background',
};

export const DifferentBackgrounds = () => {
	return (
		<FrontContainer
			title="Tip us off"
			backgroundColour="#FFF280"
			borderColour={brand[300]}
			innerBackgroundColour="#FFE501"
		>
			<h1>
				👀 Share stories with the Guardian securely and confidentially
			</h1>
		</FrontContainer>
	);
};
DifferentBackgrounds.story = {
	name: 'with inner background different to main background',
};

export const StretchRightStory = () => {
	return (
		<FrontContainer
			title="Stretched Right"
			description="About this content"
			stretchRight={true}
		>
			<Placeholder />
		</FrontContainer>
	);
};
StretchRightStory.story = {
	name: 'with content stretched to the right (no margin)',
};

export const ToggleableStory = () => {
	return (
		<FrontContainer
			title="Toggleable Container"
			toggleable={true}
			sectionId="section-id"
		>
			<Placeholder />
		</FrontContainer>
	);
};
ToggleableStory.story = { name: 'toggleable container' };

export const MultipleStory = () => {
	return (
		<>
			<FrontContainer title="Page Title" />
			<FrontContainer title="Headlines">
				<Placeholder />
			</FrontContainer>
			<FrontContainer title="Useful links" />
			<FrontContainer
				title="Around the World - I'm a link"
				url="https://www.theguardian.com/world"
			>
				<Placeholder />
			</FrontContainer>
			<FrontContainer backgroundColour={brandAlt[400]}>
				<h2>Insert call to action here</h2>
			</FrontContainer>
			<FrontContainer
				title="Videos"
				fontColour="white"
				backgroundColour="black"
			>
				<Placeholder />
			</FrontContainer>
			<FrontContainer
				title="Coronavirus"
				description="A collection of stories about Coronavirus"
			>
				<Placeholder />
			</FrontContainer>
		</>
	);
};
MultipleStory.story = {
	name: 'with multiple FrontGrids',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.leftCol,
				breakpoints.wide,
			],
		},
	},
};

export const TreatsStory = () => {
	return (
		<FrontContainer
			title="Treats and Date Header"
			treats={[
				{
					links: [
						{
							text: 'The treat text',
							linkTo: '',
						},
					],
					editionId: 'UK',
				},
				{
					links: [
						{
							text: 'Another piece of text',
							linkTo: '',
						},
					],
					editionId: 'UK',
				},
			]}
			editionId="UK"
		>
			<Placeholder />
		</FrontContainer>
	);
};
TreatsStory.story = {
	name: 'with treats and date header',
};
