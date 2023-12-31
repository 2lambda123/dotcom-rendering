const swcConfig = require('./webpack/.swcrc.json');

module.exports = {
	testEnvironment: 'jsdom',
	moduleDirectories: ['node_modules', 'src'],
	transform: {
		'^.+\\.(ts|tsx)$': ['@swc/jest', swcConfig],
	},
	testMatch: ['**/*.test.+(ts|tsx|js)'],
	setupFilesAfterEnv: ['<rootDir>/scripts/jest/setup.ts'],
	moduleNameMapper: {
		'^svgs/(.*)$': '<rootDir>/__mocks__/svgMock.tsx',
		'^(.*)\\.svg$': '<rootDir>/__mocks__/svgMock.tsx',
	},
	transformIgnorePatterns: ['/node_modules/(?!@guardian/)'],
	collectCoverageFrom: ['src/**/*.{ts,tsx}'],
};
