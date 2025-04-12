# Edge Hover Implementation Plan

## Overview
This document outlines the MVP implementation plan for adding edge hover and selection functionality to the Cytoscape graph visualization.

## Implementation Approach

### 1. Create a Separate Edge Interactions Module
We've created a new file `js/cytoscape-edge-interactions.js` that contains:
- `setupEdgeHoverInteractions(cy)` - Adds mouseover/mouseout handlers for edges
- `selectEdge(cy, edgeId, clearOthers)` - Handles edge selection

### 2. Integration with CytoscapeManager
To integrate the new module with the main CytoscapeManager:

```javascript
// Add to the top with other imports
const { setupEdgeHoverInteractions, selectEdge } = require('./cytoscape-edge-interactions.js');

// Add the setup call to the initialization function
function initialize(containerId) {
  // Existing initialization code

  // Set up edge interactions
  setupEdgeHoverInteractions(cy);

  return cy;
}

// Add to the public API
return {
  // Existing methods
  selectEdge: function(edgeId) {
    return selectEdge(cy, edgeId);
  }
};
```

### 3. Testing Plan
Create tests in the existing `cytoscape-edge-rendering.test.js` file:

```javascript
test('applies hover class to edge on mouseover', () => {
  const edge = cy.edges()[0];
  cy.emit('mouseover', { target: edge });
  expect(edge.hasClass('hover')).toBe(true);
});

test('removes hover class from edge on mouseout', () => {
  const edge = cy.edges()[0];
  edge.addClass('hover');
  cy.emit('mouseout', { target: edge });
  expect(edge.hasClass('hover')).toBe(false);
});

test('selects edge using selectEdge method', () => {
  const edgeId = cy.edges()[0].id();
  CytoscapeManager.selectEdge(edgeId);
  expect(cy.$id(edgeId).selected()).toBe(true);
});
```

### 4. Next Steps After Implementation
1. Mark the task as completed in `cytoscape-task-tracker.md`
2. Move on to implementing edge selection handler
3. Complete the minimal tests for edge hover/selection

## Timeline
- Edge Interactions Module: 30 minutes ✓
- CytoscapeManager Integration: 30 minutes
- Testing Implementation: 30 minutes
- Documentation Update: 15 minutes

Total estimated time: ~2 hours
