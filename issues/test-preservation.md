# Test Preservation Guidelines

## Core Principle

**DO NOT MODIFY EXISTING TESTS OR REMOVE `.skip` ANNOTATIONS WITHOUT EXPLICIT INSTRUCTIONS**

## Rationale

1. Skipped tests are intentionally marked as `.skip` for specific reasons:
   - They may be part of a phased implementation approach
   - They may be dependent on features not yet implemented
   - They may be serving as documentation for future functionality

2. Preserving the current state of tests ensures:
   - Consistent test behavior across development environments
   - Predictable test runs that only validate implemented features
   - Clear tracking of implementation progress

## Requirements

1. All test files must remain in their current state
2. Do not remove or modify any `.skip` annotations
3. Do not alter test assertions or behavior
4. New tests should be created in separate files or clearly marked sections

## Requirements for Test Files

1. Test files should be created in the `/tests` directory
2. Tests should be organized by feature and component
3. Each test should have a clear description of what it's testing
4. New tests should be created in separate files rather than modifying existing tests
5. Test cases must be very specialized - each test should verify one specific behavior
6. Focus on one test at a time - complete one test fully before moving to the next
7. Fix one failing test at a time - resolve each failure before addressing others
8. Split failing tests when needed - if the first fix attempt doesn't work, break the test into smaller, more specialized tests

## Process for Test Activation

When specifically instructed to activate a test:
1. Document the test being activated in the relevant issue file
2. Remove the `.skip` annotation only from the specified test
3. Run the test to confirm expected behavior
4. Update documentation to reflect the newly activated test

## Enforcement

This guideline applies to all members of the development team and any automated processes.
