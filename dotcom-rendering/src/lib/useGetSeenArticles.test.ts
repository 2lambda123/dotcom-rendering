import { renderHook, waitFor } from '@testing-library/react';
import { useConfig } from '../components/ConfigContext';
import { useGetSeenArticles } from './useGetSeenArticles';

const mockMoreLikeThis = [
	'https://www.theguardian.com/environment/2023/aug/30/scrapping-housebuilder-pollution-rules-is-a-regression-watchdog-tells-coffey',
	'https://www.theguardian.com/society/2023/aug/29/scrapping-of-housebuilder-water-pollution-rules-to-cost-taxpayer-140m',
	'https://www.theguardian.com/environment/2023/jul/31/swimmers-avoiding-the-water-over-fears-of-raw-sewage-on-uk-beaches',
];

const mockSeenArticles = [
	'society/2023/aug/29/scrapping-of-housebuilder-water-pollution-rules-to-cost-taxpayer-140m',
];

jest.mock('./bridgetApi', () => ({
	getUserClient: () => ({
		filterSeenArticles: async () => {
			return mockSeenArticles;
		},
	}),
}));

jest.mock('../components/ConfigContext', () => ({
	useConfig: jest.fn(),
}));

const mockUseConfig = useConfig as jest.MockedFunction<typeof useConfig>;

describe('useGetSeenArticles', () => {
	describe('when renderingTarget is Web', () => {
		beforeEach(() => {
			mockUseConfig.mockReturnValue({ renderingTarget: 'Web' });
		});

		test('returns an empty array', async () => {
			const { result } = renderHook(() =>
				useGetSeenArticles(mockMoreLikeThis),
			);
			await waitFor(() => {
				expect(result.current).toStrictEqual([]);
			});
		});
	});

	describe('when renderingTarget is Apps', () => {
		beforeEach(() => {
			mockUseConfig.mockReturnValue({ renderingTarget: 'Apps' });
		});

		it('returns an empty array, if no urls are provided', async () => {
			const { result } = renderHook(() => useGetSeenArticles([]));
			await waitFor(() => {
				expect(result.current).toStrictEqual([]);
			});
		});

		it('returns an array with full urls of the seen articles', async () => {
			const { result } = renderHook(() =>
				useGetSeenArticles(mockMoreLikeThis),
			);
			const expected = [
				'https://www.theguardian.com/society/2023/aug/29/scrapping-of-housebuilder-water-pollution-rules-to-cost-taxpayer-140m',
			];
			await waitFor(() => {
				expect(result.current).toStrictEqual(expected);
			});
		});
	});
});
