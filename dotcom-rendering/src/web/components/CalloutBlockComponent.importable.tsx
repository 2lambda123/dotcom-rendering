import { css } from '@emotion/react';
import {
	headline,
	neutral,
	space,
	textSans,
} from '@guardian/source-foundations';
import { ExpandingWrapper } from '@guardian/source-react-components-development-kitchen';
import { useState } from 'react';
import type { CalloutBlockElementV2 } from 'src/types/content';
import { decidePalette } from '../lib/decidePalette';
import { Deadline } from './CalloutNew/CalloutDeadline';
import { CalloutDescription } from './CalloutNew/CalloutDescription';
import { CalloutExpired } from './CalloutNew/CalloutExpired';
import { CalloutShareComponent } from './CalloutNew/CalloutShareComponent';
import { Form } from './CalloutNew/Form';

const ruleStyles = css`
	border-image: repeating-linear-gradient(
			to bottom,
			${neutral[86]},
			${neutral[86]} 1px,
			transparent 1px,
			transparent 4px
		)
		13;
	border-top: 13px solid ${neutral[86]};
`;

const wrapperStyles = css`
	margin-bottom: ${space[6]}px;
	padding-left: ${space[2]}px;
	padding-right: ${space[2]}px;
	background-color: ${neutral[97]};
`;

const calloutDetailsStyles = css`
	position: relative;
	padding-bottom: ${space[2]}px;

	/* IE does not support summary HTML elements, so we need to hide children ourself */
	:not([open]) > *:not(summary) {
		display: none;
	}
`;

const summaryStyles = css`
	padding-left: ${space[2]}px;
	padding-right: ${space[2]}px;
	display: block;
	/* Removing default styles from summery tag */
	::-webkit-details-marker {
		display: none;
	}
	outline: none;

	/* We don't want the summary to open when we click anything but the button, so we pointer-event: none the summary */
	/* 176da211-05aa-4280-859b-1e3157b3f19e */
	pointer-events: none;

	/*
        why hide visibility?
        because we want to prevent the user for tabbing to the summery HTML element
        without using tabIndex={-1} which would disable focus on all child DOM elements

        NOTE: requires "visibility: visible;" on child elements to display and enable focus
    */
	visibility: hidden;

	a {
		/* but we do want to allow click on links */
		pointer-events: all;
	}
`;

const summaryContentWrapper = css`
	visibility: visible;
`;

const titleStyles = (format: ArticleFormat) => css`
	${headline.xxsmall({ fontWeight: 'bold' })}
	color: ${decidePalette(format).text.calloutHeading}
`;

const subtitleTextHeaderStyles = css`
	${headline.xxsmall()}
	padding-bottom: ${space[3]}px;
`;

const activeUntilStyles = css`
	position: absolute;
	bottom: ${space[1]}px;
	right: ${space[1]}px;
	display: block;
`;

const submissionSuccessStyles = css`
	padding-left: ${space[2]}px;
	padding-right: ${space[2]}px;
	${textSans.small()}
`;

type FormDataType = { [key in string]: any };

export const CalloutBlockComponent = ({
	callout,
	format,
}: {
	callout: CalloutBlockElementV2;
	format: ArticleFormat;
}) => {
	const [networkError, setNetworkError] = useState('');
	const [submissionSuccess, setSubmissionSuccess] = useState(false);
	const { title, description, formFields, activeUntil } = callout;

	const isExpired = (date: number | undefined): boolean => {
		if (date) {
			return Math.floor(new Date().getTime() / 1000) > date;
		}
		return false;
	};

	const onSubmit = async (formData: FormDataType) => {
		// Reset error for new submission attempt
		setNetworkError('');

		if (formData.twitterHandle) {
			setNetworkError('Sorry we think you are a robot.');
			return;
		}
		// need to add prefix `field_` to all keys in form
		const formDataWithFieldPrefix = Object.keys(formData).reduce(
			(acc, cur) => ({
				...acc,
				[`field_${cur}`]: formData[cur],
			}),
			{},
		);

		return fetch(callout.calloutsUrl, {
			method: 'POST',
			body: JSON.stringify({
				formId: callout.formId,
				// TODO: check if we need to send this
				'twitter-handle': '',
				...formDataWithFieldPrefix,
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
			.then((resp) => {
				if (resp.status === 201) {
					setSubmissionSuccess(true);
				} else {
					setNetworkError(
						'Sorry, there was a problem submitting your form. Please try again later.',
					);
				}
			})
			.catch((respError) => {
				window.guardian.modules.sentry.reportError(
					respError,
					'callout-embed-submission',
				);

				setNetworkError(
					'Sorry, there was a problem submitting your form. Please try again later.',
				);
			});
	};

	if (callout.isNonCollapsible && isExpired(activeUntil)) {
		return null;
	}

	if (submissionSuccess) {
		return (
			<details
				css={[calloutDetailsStyles, wrapperStyles, ruleStyles]}
				aria-hidden={true}
				open={true}
			>
				<summary css={summaryStyles}>
					<div css={summaryContentWrapper}>
						<div css={titleStyles(format)}>Tell us</div>
						<h4 css={subtitleTextHeaderStyles}>{title}</h4>
						<CalloutDescription
							format={format}
							description={description}
						/>
						<div css={activeUntilStyles}>
							<Deadline until={activeUntil} />
						</div>
					</div>
				</summary>
				<CalloutShareComponent format={format} />
				<div css={submissionSuccessStyles}>
					Thank you, your story has been submitted successfully. One
					of our journalists will be in touch if we wish to take your
					submission further.
				</div>
			</details>
		);
	}
	return (
		<aside>
			{callout.isNonCollapsible ? (
				<details
					css={[calloutDetailsStyles, wrapperStyles, ruleStyles]}
					aria-hidden={true}
					open={true}
				>
					<summary css={summaryStyles}>
						<div css={summaryContentWrapper}>
							<div css={titleStyles(format)}>Tell us</div>
							<h4 css={subtitleTextHeaderStyles}>{title}</h4>
							<CalloutDescription
								format={format}
								description={description}
							/>
						</div>
					</summary>
					<div css={activeUntilStyles}>
						<Deadline until={activeUntil} />
					</div>
					<CalloutShareComponent format={format} />
					{isExpired(activeUntil) ? (
						<CalloutExpired />
					) : (
						<Form
							formFields={formFields}
							onSubmit={onSubmit}
							format={format}
							networkError={networkError}
						/>
					)}
				</details>
			) : (
				<ExpandingWrapper
					name={`${callout.formId} form`}
					renderExtra={() => <Deadline until={activeUntil} />}
				>
					<details
						css={[calloutDetailsStyles, wrapperStyles]}
						aria-hidden={true}
						open={true}
					>
						<summary css={summaryStyles}>
							<div css={summaryContentWrapper}>
								<div css={titleStyles(format)}>Tell us</div>
								<h4 css={subtitleTextHeaderStyles}>{title}</h4>
								<CalloutDescription
									format={format}
									description={description}
								/>
							</div>
						</summary>
						<CalloutShareComponent format={format} />
						<Form
							formFields={formFields}
							onSubmit={onSubmit}
							format={format}
							networkError={networkError}
						/>
					</details>
				</ExpandingWrapper>
			)}
		</aside>
	);
};