/**
 * Jest configuration for Cytoscape tests
 */

module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],
  testMatch: ['<rootDir>/tests/**/*.test.js', '<rootDir>/tests/**/*.test.ts'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/tests/mocks/styleMock.js',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/tests/mocks/fileMock.js'
  },
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
    '^.+\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: ['/node_modules/(?!cytoscape)/'],
  // Used for running tests with timers
  testTimeout: 10000,
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  // Handle ES modules
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
