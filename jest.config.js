/**
 * Jest configuration for Cytoscape tests
 */

module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/tests/mocks/styleMock.js',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/tests/mocks/fileMock.js'
  },
  // Used for running tests with timers
  testTimeout: 10000,
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  transformIgnorePatterns: ['/node_modules/(?!cytoscape)/']
};
