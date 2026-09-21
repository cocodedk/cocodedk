/**
 * Jest configuration for frontend component tests
 */

module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
  modulePathIgnorePatterns: ['<rootDir>/.claude/'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  // Used for running tests with timers
  testTimeout: 10000,
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
};
