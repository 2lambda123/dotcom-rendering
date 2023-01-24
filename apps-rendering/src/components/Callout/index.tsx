import { css, ThemeProvider } from '@emotion/react';
import type { FormField } from '@guardian/apps-rendering-api-models/formField';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace } from '@guardian/source-foundations';
import { ExpandingWrapper } from '@guardian/source-react-components-development-kitchen';
import { isElement } from 'lib';
import type { FC, ReactElement } from 'react';
import { createElement as h } from 'react';
import { DeadlineDate, isCalloutActive } from '../Deadline/index';
import CalloutBlock, { getCalloutId } from './calloutBlock';
import { InactiveCallout } from './calloutComponents';
import { getTheme } from './theme';

export interface CalloutProps {
	heading: string;
	formId: number;
	formFields: FormField[];
	format: ArticleFormat;
	description?: DocumentFragment;
	isNonCollapsible: boolean;
	activeUntil?: number;
	name: string;
}

const Callout: FC<CalloutProps> = ({
	heading,
	description,
	formId,
	formFields,
	format,
	isNonCollapsible,
	activeUntil,
	name,
}): ReactElement => {
	const isActive = isCalloutActive(activeUntil);

	if (!isActive && isNonCollapsible) {
		return <InactiveCallout />;
	} else if (!isActive && !isNonCollapsible) {
		return <></>;
	}
	return (
		<aside className="js-callout">
			{isNonCollapsible ? (
				<ThemeProvider theme={getTheme()}>
					<CalloutBlock
						formId={formId}
						heading={heading}
						formFields={formFields}
						format={format}
						description={description}
					/>
					<span
						css={css`
							position: absolute;
							right: 0;
							margin-top: -${remSpace[6]};
						`}
					>
						<DeadlineDate until={activeUntil} />
					</span>
				</ThemeProvider>
			) : (
				<ThemeProvider theme={getTheme()}>
					<ExpandingWrapper
						renderExtra={(): ReactElement => (
							<DeadlineDate until={activeUntil} />
						)}
						name={`${name} form`}
					>
						<CalloutBlock
							formId={formId}
							heading={heading}
							formFields={formFields}
							format={format}
							description={description}
						/>
					</ExpandingWrapper>
				</ThemeProvider>
			)}
		</aside>
	);
};

const CalloutWithHydrationProps: FC<CalloutProps> = ({
	format,
	...calloutProps
}): ReactElement => {
	const getStringFromNodes = (nodes: NodeListOf<ChildNode>): string =>
		Array.from(nodes)
			.map((node) => {
				return isElement(node) ? node.outerHTML : node.textContent;
			})
			.join('');

	const description = calloutProps.description;
	const stringDescription = description
		? getStringFromNodes(description.childNodes)
		: '';

	const serverSideProps = JSON.stringify({
		callout: {
			...calloutProps,
			description: stringDescription,
		},
		format,
	});

	return h(
		'div',
		{
			'data-hydrationprops': serverSideProps,
			className: 'js-callout-props',
			id: getCalloutId(calloutProps.heading),
		},
		Callout({
			...calloutProps,
			format,
		}),
	);
};

export default CalloutWithHydrationProps;