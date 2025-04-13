# Cytoscape Node Testing Strategy

## Overview
This document outlines the testing strategy for the Cytoscape node handling functionality in the CytoscapeManager. The tests are structured following a layered approach, from unit tests of specific functions to integration tests of the complete rendering process.

## Test Structure
We have divided the tests into three specialized test files to isolate concerns and make tests more maintainable:

1. **Unit Tests** (`cytoscape-node-styling.test.js`)
   - Tests the CSS class handling logic in isolation
   - Focuses specifically on the function that applies classes to nodes
   - Uses simple mocks with minimal dependencies

2. **Integration Tests - Node Interactions** (`cytoscape-node-interactions-integration.test.js`)
   - Verifies that CytoscapeManager correctly integrates with CytoscapeNodeInteractions
   - Tests that the appropriate functions are called when the module is available
   - Tests fallback behavior when the module is not available

3. **Integration Tests - Node Rendering** (`cytoscape-node-rendering-integration.test.js`)
   - Tests the complete node rendering process including styling and class application
   - Uses more sophisticated mocks that simulate the real Cytoscape environment
   - Verifies that nodes are rendered with correct properties and styling

## Testing Approach
For each level of testing, we follow these principles:

### Unit Testing
- Extract specific functions or logic for isolated testing
- Use minimal mock objects that focus only on the specific functionality being tested
- Test edge cases and boundary conditions in detail

### Integration Testing
- Mock external dependencies as needed, but maintain realistic behavior
- Verify correct interaction between components
- Test both the "happy path" and fallback behaviors

### Rendering Testing
- Create more comprehensive mocks that simulate the real environment
- Focus on the end result (correctly rendered nodes) rather than implementation details
- Test with realistic test data that covers all potential properties

## Running the Tests
To run the full test suite:
```bash
npx jest tests/cytoscape-node-styling.test.js tests/cytoscape-node-interactions-integration.test.js tests/cytoscape-node-rendering-integration.test.js
```

To run individual test files:
```bash
npx jest tests/cytoscape-node-styling.test.js
```

## Key Test Cases

### Class Handling
- Applying a single class (category)
- Applying multiple classes
- Handling whitespace in class names
- Skipping empty class names
- Handling nodes with no classes property
- Handling nodes with empty classes string
- Avoiding duplicate class names

### Node Interactions Integration
- Verifying correct method calls during initialization
- Testing registerInteractionHandlers with the node interactions module
- Testing registerSelectionHandlers with the node interactions module
- Testing fallback behavior when node interactions module is unavailable

### Node Rendering
- Rendering a complete node with all styling properties
- Applying size based on radius property
- Verifying correct class application
- Checking style properties are applied correctly
- Testing data properties are preserved

## Maintenance Guidelines
When updating the node handling functionality:

1. Always update the unit tests first
2. Run the integration tests to ensure your changes don't break the overall functionality
3. Add new tests for any new features or edge cases
4. Remember to maintain backward compatibility unless explicitly planning breaking changes
