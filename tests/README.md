# Cytoscape Test Suite

This directory contains the test suite for the Cytoscape implementation. The tests are organized by functionality and component.

## Test Status

Many tests in this directory are marked with `.skip` - **DO NOT REMOVE THESE SKIP ANNOTATIONS** without explicit instructions. These skipped tests represent planned functionality that is being implemented in phases.

## Test Categories

- **Edge Tests**: Tests for edge rendering, conversion, and interactions
- **Node Tests**: Tests for node rendering, selection, and interactions
- **Layout Tests**: Tests for different layout algorithms and configurations
- **Data Conversion Tests**: Tests for converting data between formats
- **Interaction Tests**: Tests for user interactions with the graph
- **Accessibility Tests**: Tests for accessibility features

## Running Tests

To run all non-skipped tests:

```bash
npm test
```

To run a specific test file:

```bash
npx jest tests/filename.test.js
```

## Test Development Guidelines

1. **DO NOT MODIFY** existing tests or remove `.skip` annotations
2. Follow the Test-Driven Development (TDD) approach for new features
3. Create new test files for new functionality
4. Ensure all tests have clear descriptions and assertions
5. Reference the comprehensive test plan in `/issues/cytoscape-test-plan.md`

## Test Implementation Process

Refer to `/issues/test-preservation.md` for the complete guidelines on test preservation and activation.
