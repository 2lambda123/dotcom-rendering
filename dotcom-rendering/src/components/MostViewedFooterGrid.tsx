import { css } from '@emotion/react';
import {
	border,
	from,
	headline,
	neutral,
	until,
	visuallyHidden,
} from '@guardian/source-foundations';
import { useState } from 'react';
import type { TrailTabType, TrailType } from '../types/trails';
import { MostViewedFooterItem } from './MostViewedFooterItem';

const thinGreySolid = `1px solid ${border.secondary}`;

const hidePanel = css`
	display: none;
`;

const tabsContainer = css`
	display: flex;
	position: relative;
	border-left: ${thinGreySolid};
	border-right: ${thinGreySolid};
	border-bottom: ${thinGreySolid};

	${until.leftCol} {
		border-top: ${thinGreySolid};
		border-bottom: 0;
	}
`;

const listTab = css`
	font-weight: 700;
	line-height: 1.1;
	background-color: transparent;
	text-transform: capitalize;
	padding: 0 0 0;
	margin-bottom: 16px;
	width: 240px;
	height: 28px;
`;

const firstTab = css`
	border-right: ${thinGreySolid};
`;
const selectedListTabStyles = (selectedColour: string) => css`
	/* TODO: Using a pseudo selector here could be faster? */
	box-shadow: inset 0px 4px 0px 0px ${selectedColour};
	transition: box-shadow 0.3s ease-in-out;
`;

const unselectedStyles = css`
	&:hover {
		box-shadow: inset 0px 4px 0px 0px ${neutral[86]};
		transition: box-shadow 0.3s ease-in-out;
	}
`;

const buttonStyles = (isSelected: boolean) => css`
	${headline.xxxsmall()};
	color: ${neutral[7]};
	margin: 0;
	border: 0;
	background: transparent;
	padding: 6px 6px 0 10px;
	text-align: left;
	text-decoration: none;
	font-weight: 600;
	min-height: 36px;
	display: block;
	width: 100%;

	&:hover {
		cursor: ${isSelected ? 'default' : 'pointer'};
	}
`;

const gridContainer = css`
	display: grid;
	grid-auto-flow: column;

	/* One column view */
	grid-template-columns: 1fr;
	grid-template-rows: auto auto auto auto auto auto auto auto auto auto;

	/* Two column view */
	${from.tablet} {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto auto auto auto;
	}

	/* We set left border on the grid container, and then right border on
    the gridItems to prevent borders doubling up */
	border-left: 1px solid ${border.secondary};
`;

type Props = {
	data: TrailTabType[];
	sectionName?: string;
	selectedColour?: string;
};

// To avoid having to handle multiple ways of reducing the capitalisation styling
const TabHeading = ({ heading }: { heading: string }) => {
	switch (heading.toLowerCase()) {
		case 'most popular':
			return <span>Most popular</span>;
		default:
			return (
				<span
					css={css`
						text-transform: capitalize;
					`}
					// "Across The Guardian" has a non-breaking space entity between "The" and "Guardian - Eg. "Across The&nbsp;Guardian"
					dangerouslySetInnerHTML={{
						__html: heading,
					}}
				/>
			);
	}
};

export const MostViewedFooterGrid = ({
	data,
	sectionName = '',
	selectedColour = neutral[0],
}: Props) => {
	const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
	/**
	 * If there is only one 'tab' of content, then we don't want to render this as
	 * a tabbed interface at all, preferring a simple list of links. This should improve
	 * accessibility because otherwise screen readers will announce it as a 'tablist' of
	 * one tab, adding extra friction to screen reader navigation.
	 */
	const renderAsTabs = data.length > 1;

	return (
		<>
			{/*
				This .map() generates the 'tabs' (the navigation links at the top
				of the container). The 'tabpanels' (the containers which show or hide
				depending on which tab is active) are generated by a separate .map()
				below.
				It only generates tabs if there is more than one panel of content.
			*/}
			{renderAsTabs && (
				<ul css={tabsContainer} role="tablist">
					{data.map((tab: TrailTabType, i: number) => {
						const isSelected = i === selectedTabIndex;
						const isFirst = i === 0;
						const selectedStyles =
							selectedListTabStyles(selectedColour);
						return (
							<li
								css={[
									listTab,
									isSelected
										? selectedStyles
										: unselectedStyles,
									isFirst && firstTab,
								]}
								role="none"
								id={`tabs-popular-${i}-tab`}
								data-cy={`tab-heading-${i}`}
								key={`tabs-popular-${tab.heading}-tab`}
								data-link-name={tab.heading}
								data-chromatic="ignore"
							>
								<a
									href={`tabs-popular-${i}`}
									css={buttonStyles(isSelected)}
									onClick={(e) => {
										e.preventDefault();
										setSelectedTabIndex(i);
									}}
									aria-selected={isSelected}
									aria-controls={`tabs-popular-${i}`}
									role="tab"
								>
									<span
										css={css`
											${visuallyHidden};
										`}
									>
										Most viewed{' '}
									</span>

									<TabHeading heading={tab.heading} />
								</a>
							</li>
						);
					})}
				</ul>
			)}
			{/* End of 'tab' mapping, beginning of 'tabpanel' mapping. */}
			{data.map((tab: TrailTabType, i: number) => (
				<section
					role={renderAsTabs ? 'tabpanel' : undefined}
					id={`tabs-popular-${i}`}
					data-testid={tab.heading}
					key={`tabs-popular-${tab.heading}`}
					css={i !== selectedTabIndex && hidePanel}
				>
					<h3
						css={css`
							${visuallyHidden}
						`}
					>
						Most viewed {tab.heading}
					</h3>
					<ol
						css={gridContainer}
						data-cy={`tab-body-${i}`}
						data-link-name={tab.heading}
						data-link-context={`most-read/${sectionName}`}
					>
						{tab.trails.map((trail: TrailType, j: number) => (
							<MostViewedFooterItem
								key={trail.url}
								position={j + 1}
								url={trail.url}
								format={trail.format}
								headlineText={trail.headline}
								ageWarning={trail.ageWarning}
							/>
						))}
					</ol>
				</section>
			))}
		</>
	);
};