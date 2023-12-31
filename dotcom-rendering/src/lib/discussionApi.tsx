import { joinUrl } from '@guardian/libs';
import type {
	AdditionalHeadersType,
	CommentResponse,
	CommentType,
	DiscussionOptions,
	DiscussionResponse,
	OrderByType,
	ThreadsType,
	UserNameResponse,
} from '../types/discussion';
import type { SignedInWithCookies, SignedInWithOkta } from './identity';
import { getOptionsHeadersWithOkta } from './identity';

const options = {
	// Defaults
	baseUrl: 'https://discussion.theguardian.com/discussion-api',
	apiKey: 'discussion-rendering',
	headers: {},
	idApiUrl: 'https://idapi.theguardian.com',
};

const defaultParams = {
	'api-key': options.apiKey,
};

export const initialiseApi = ({
	baseUrl,
	additionalHeaders,
	apiKey,
	idApiUrl,
}: {
	baseUrl: string;
	additionalHeaders: AdditionalHeadersType;
	apiKey: string;
	idApiUrl: string;
}) => {
	options.baseUrl = baseUrl || options.baseUrl;
	options.headers = additionalHeaders;
	options.apiKey = apiKey || options.apiKey;
	options.idApiUrl = idApiUrl || options.idApiUrl;

	defaultParams['api-key'] = options.apiKey;
};

const objAsParams = (obj: any): string => {
	const params = Object.keys(obj)
		.map((key) => {
			// TODO: Refactor this for better typesafety. See https://github.com/guardian/dotcom-rendering/pull/8057/commits/da4667399d4a7726589f1944ac60380f1f3f36e1
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions -- type issues here cannot be avoided with this implementation
			return `${key}=${obj[key]}`;
		})
		.join('&');

	return '?' + params;
};

//todo: figure out the different return types and consider error handling
export const getDiscussion = (
	shortUrl: string,
	opts: {
		orderBy: OrderByType;
		pageSize: number;
		threads: ThreadsType;
		page: number;
	},
): Promise<DiscussionResponse | undefined> => {
	const apiOpts: DiscussionOptions = {
		...defaultParams,
		...{
			// Frontend uses the 'recommendations' key to store this options but the api expects
			// 'mostRecommended' so we have to map here to support both
			orderBy:
				opts.orderBy === 'recommendations'
					? 'mostRecommended'
					: opts.orderBy,
			pageSize: opts.pageSize,
			displayThreaded: opts.threads !== 'unthreaded',
			maxResponses: opts.threads === 'collapsed' ? 3 : 100,
			page: opts.page,
		},
	};
	const params = objAsParams(apiOpts);

	const url = joinUrl(options.baseUrl, 'discussion', shortUrl) + params;

	return fetch(url, {
		headers: {
			...options.headers,
		},
	})
		.then((resp) => resp.json())
		.then((json) => {
			if (
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				json.errorCode === 'DISCUSSION_ONLY_AVAILABLE_IN_LINEAR_FORMAT'
			) {
				// We need force a refetch with unthreaded set, as we don't know
				// that this discussion is only available in linear format until
				// we get the response to tell us
				return getDiscussion(shortUrl, {
					...opts,
					...{ threads: 'unthreaded' },
				});
			}
			return json;
		})
		.catch((error) => console.error(`Error fetching ${url}`, error));
};

export const preview = (body: string): Promise<string> => {
	const url =
		joinUrl(options.baseUrl, 'comment/preview') +
		objAsParams(defaultParams);
	const data = new URLSearchParams();
	data.append('body', body);

	return (
		fetch(url, {
			method: 'POST',
			body: data.toString(),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				...options.headers,
			},
		})
			.then((resp) => resp.json())
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			.then((json) => json.commentBody)
			.catch((error) => console.error(`Error fetching ${url}`, error))
	);
};

export const comment =
	(authStatus: SignedInWithCookies | SignedInWithOkta) =>
	(shortUrl: string, body: string): Promise<CommentResponse> => {
		const url =
			joinUrl(options.baseUrl, 'discussion', shortUrl, 'comment') +
			objAsParams(defaultParams);
		const data = new URLSearchParams();
		data.append('body', body);

		const authOptions = getOptionsHeadersWithOkta(authStatus);

		return fetch(url, {
			method: 'POST',
			body: data.toString(),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				...options.headers,
				...(authOptions.headers !== undefined
					? authOptions.headers
					: {}),
			},
			credentials: authOptions.credentials,
		}).then((resp) => resp.json());
	};

export const reply =
	(authStatus: SignedInWithCookies | SignedInWithOkta) =>
	(
		shortUrl: string,
		body: string,
		parentCommentId: number,
	): Promise<CommentResponse> => {
		const url =
			joinUrl(
				options.baseUrl,
				'discussion',
				shortUrl,
				'comment',
				parentCommentId.toString(),
				'reply',
			) + objAsParams(defaultParams);
		const data = new URLSearchParams();
		data.append('body', body);
		const authOptions = getOptionsHeadersWithOkta(authStatus);

		return fetch(url, {
			method: 'POST',
			body: data.toString(),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				...options.headers,
				...(authOptions.headers !== undefined
					? authOptions.headers
					: {}),
			},
			credentials: authOptions.credentials,
		}).then((resp) => resp.json());
	};

//todo: come back and parse the response properly and set a proper return type for the error case
export const getPicks = (
	shortUrl: string,
): Promise<CommentType[] | undefined> => {
	const url =
		joinUrl(options.baseUrl, 'discussion', shortUrl, 'topcomments') +
		objAsParams(defaultParams);

	return (
		fetch(url, {
			headers: {
				...options.headers,
			},
		})
			.then((resp) => resp.json())
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			.then((json) => json.discussion.comments)
			.catch((error) => console.error(`Error fetching ${url}`, error))
	);
};

export const reportAbuse = ({
	commentId,
	categoryId,
	email,
	reason,
	authStatus,
}: {
	commentId: number;
	categoryId: number;
	reason?: string;
	email?: string;
	authStatus?: SignedInWithCookies | SignedInWithOkta;
}): Promise<CommentResponse> => {
	const url =
		joinUrl(
			options.baseUrl,
			'comment',
			commentId.toString(),
			'reportAbuse',
		) + objAsParams(defaultParams);

	const data = new URLSearchParams();
	data.append('categoryId', categoryId.toString());
	email && data.append('email', email.toString());
	reason && data.append('reason', reason);

	const authOptions = authStatus
		? getOptionsHeadersWithOkta(authStatus)
		: undefined;

	return fetch(url, {
		method: 'POST',
		body: data.toString(),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			...options.headers,
			...(authOptions?.headers !== undefined ? authOptions.headers : {}),
		},
		credentials: authOptions?.credentials,
	}).then((resp) => resp.json());
};

export const recommend =
	(authStatus: SignedInWithCookies | SignedInWithOkta) =>
	(commentId: number): Promise<boolean> => {
		const url =
			joinUrl(
				options.baseUrl,
				'comment',
				commentId.toString(),
				'recommend',
			) + objAsParams(defaultParams);

		const authOptions = getOptionsHeadersWithOkta(authStatus);

		return fetch(url, {
			method: 'POST',
			headers: {
				...options.headers,
				...(authOptions.headers !== undefined
					? authOptions.headers
					: {}),
			},
			credentials: authOptions.credentials,
		}).then((resp) => resp.ok);
	};

export const addUserName = (
	authStatus: SignedInWithCookies | SignedInWithOkta,
	userName: string,
): Promise<UserNameResponse> => {
	const url = options.idApiUrl + `/user/me/username`;
	const authOptions = getOptionsHeadersWithOkta(authStatus);

	return fetch(url, {
		method: 'POST',
		body: JSON.stringify({
			publicFields: {
				username: userName,
				displayName: userName,
			},
		}),
		headers: {
			'Content-Type': 'application/json',
			...(authOptions.headers !== undefined ? authOptions.headers : {}),
		},
		credentials: authOptions.credentials,
	})
		.then((resp) => resp.json())
		.catch((error) => console.error(`Error fetching ${url}`, error));
};

export const pickComment = (
	authStatus: SignedInWithCookies | SignedInWithOkta,
	commentId: number,
): Promise<CommentResponse> => {
	const url =
		joinUrl(options.baseUrl, 'comment', commentId.toString(), 'highlight') +
		objAsParams(defaultParams);

	const authOptions = getOptionsHeadersWithOkta(authStatus);
	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			...options.headers,
			...(authOptions.headers !== undefined ? authOptions.headers : {}),
		},
		credentials: authOptions.credentials,
	})
		.then((resp) => resp.json())
		.catch((error) => console.error(`Error fetching ${url}`, error));
};

export const unPickComment = (
	authStatus: SignedInWithCookies | SignedInWithOkta,
	commentId: number,
): Promise<CommentResponse> => {
	const url =
		joinUrl(
			options.baseUrl,
			'comment',
			commentId.toString(),
			'unhighlight',
		) + objAsParams(defaultParams);
	const authOptions = getOptionsHeadersWithOkta(authStatus);

	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			...options.headers,
			...(authOptions.headers !== undefined ? authOptions.headers : {}),
		},
		credentials: authOptions.credentials,
	})
		.then((resp) => resp.json())
		.catch((error) => console.error(`Error fetching ${url}`, error));
};

export const getMoreResponses = (
	commentId: number,
): Promise<{
	status: 'ok' | 'error';
	comment: CommentType;
}> => {
	const url =
		joinUrl(options.baseUrl, 'comment', commentId.toString()) +
		objAsParams({
			...defaultParams,
			...{
				displayThreaded: true,
				displayResponses: true,
			},
		});

	return fetch(url, {
		headers: {
			...options.headers,
		},
	})
		.then((resp) => resp.json())
		.catch((error) => console.error(`Error fetching ${url}`, error));
};
