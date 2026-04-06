/**
 * Jest configuration for frontend component tests
 */

module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
  modulePathIgnorePatterns: ['<rootDir>/.claude/'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/tests/mocks/styleMock.js',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/tests/mocks/fileMock.js'
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  // Used for running tests with timers
  testTimeout: 10000,
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
};
