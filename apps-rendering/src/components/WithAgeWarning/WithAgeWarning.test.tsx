import type { Tag } from '@guardian/content-api-models/v1/tag';
import { TagType } from '@guardian/content-api-models/v1/tagType';
import { getAgeWarning } from '.';

const fakeCurrentTime = new Date('2022-12-16T00:00:00Z');

describe('WithAgeWarning test', () => {
	const unsupportedTags: Tag[] = [
		{
			id: 'uk/uk',
			type: TagType.KEYWORD,
			webTitle: 'UK news',
			webUrl: 'https://www.theguardian.com/uk/uk',
			apiUrl: 'https://content.guardianapis.com/uk/uk',
			references: [],
		},
	];

	const supportedTags: Tag[] = [
		{
			id: 'tone/news',
			type: TagType.KEYWORD,
			webTitle: 'UK news',
			webUrl: 'https://www.theguardian.com/uk/uk',
			apiUrl: 'https://content.guardianapis.com/uk/uk',
			references: [],
		},
	];

	it('returns None given no tag is supported', () => {
		const publicationDate = new Date('2021-12-16T00:00:00Z');
		const ageWarningMessage = getAgeWarning(
			unsupportedTags,
			fakeCurrentTime,
		)(publicationDate);

		expect(ageWarningMessage.withDefault('error')).toBe('error');
	});

	it('returns "1 month old" given a news article that was published within the last year', () => {
		const publicationDate = new Date('2022-10-16T00:00:00Z');

		const ageWarningMessage = getAgeWarning(
			supportedTags,
			fakeCurrentTime,
		)(publicationDate);

		expect(ageWarningMessage.withDefault('error')).toBe('1 month old');
	});

	it('returns "2 months old" given a news article that was published within the last year', () => {
		const publicationDate = new Date('2022-09-16T00:00:00Z');

		const ageWarningMessage = getAgeWarning(
			supportedTags,
			fakeCurrentTime,
		)(publicationDate);

		expect(ageWarningMessage.withDefault('error')).toBe('2 months old');
	});

	it('returns "1 year old" given a news article that was published within the last 2 years', () => {
		const publicationDate = new Date('2021-09-16T00:00:00Z');

		const ageWarningMessage = getAgeWarning(
			supportedTags,
			fakeCurrentTime,
		)(publicationDate);

		expect(ageWarningMessage.withDefault('error')).toBe('1 year old');
	});

	it('returns "10 years old" given a news article that was published over 10 years ago', () => {
		const publicationDate = new Date('2012-09-16T00:00:00Z');

		const ageWarningMessage = getAgeWarning(
			supportedTags,
			fakeCurrentTime,
		)(publicationDate);

		expect(ageWarningMessage.withDefault('error')).toBe('10 years old');
	});
});
