# Interaction Behaviors Analysis

This document analyzes the current interaction patterns in the HTML-based implementation to ensure proper replication in the Cytoscape.js migration.

## Node Click/Tap Behavior

### Current Implementation
In the current implementation (`node-display.js`), clicking a node shows a modal with details:

```javascript
// Add event listeners
nodeElement.addEventListener('click', () => showNodeInfo(nodeData));
```

The `showNodeInfo` function:
- Populates the modal with node content (title, description)
- Displays node details from the language-specific translations
- Applies animations to modal content
- Handles closing behavior

### Cytoscape Implementation Approach
In Cytoscape.js, this can be implemented using the tap event:

```javascript
cy.on('tap', 'node', function(evt) {
  const node = evt.target;

  // Special handling for Contact node
  if (node.id() === 'node-Contact' || node.data('category') === 'Contact') {
    // Show contact modal
  } else {
    // Show node info modal
    showNodeInfo(node.data());
  }
});
```

## Contact Node Special Behavior

### Current Implementation
The Contact node has special click handling to show a dedicated contact modal instead of the standard node info modal:

```javascript
if (nodeData.id === 'Contact') {
  // Show contact modal
  ContactModal.show();
  return;
}
```

### Cytoscape Implementation Approach
```javascript
// Register specific event handlers for Contact node
cy.on('tap', 'node[category = "Contact"]', function() {
  ContactModal.show();
});
```

## Hover Behavior

### Current Implementation
The current hover behavior is primarily CSS-driven with some JS enhancement:

```css
.node:hover, .node:focus {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}
```

Some nodes may also have custom hover behavior in code:

```javascript
nodeElement.addEventListener('mouseenter', () => {
  // Custom hover behavior
});
```

### Cytoscape Implementation Approach
```javascript
// Mouse enter handler (hover effect)
cy.on('mouseover', 'node', function(evt) {
  evt.target.addClass('hover');
});

// Mouse leave handler (remove hover effect)
cy.on('mouseout', 'node', function(evt) {
  evt.target.removeClass('hover');
});
```

## Escape Key for Modals

### Current Requirement
The only keyboard interaction required is the Escape key for closing modals:

```javascript
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nodeModal.style.display === 'block') {
    closeNodeModal();
  }
});
```

### Cytoscape Implementation Approach
```javascript
// Set up escape key handler for document
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    // Close any open modals
    if (typeof ContactModal !== 'undefined' && ContactModal.hide) {
      ContactModal.hide();
    }
    // Clear any node selection
    cy.nodes().unselect();
  }
});
```

## Node Selection

### Current Implementation
Node selection is primarily visual - there isn't a persistent "selected" state in the HTML implementation besides the active visual state when a node is clicked.

### Cytoscape Implementation Approach
Cytoscape.js has built-in selection mechanisms:

```javascript
// Handle node selection
cy.on('select', 'node', function(evt) {
  const node = evt.target;

  // Add selected class
  node.addClass('selected');

  // Trigger callback if provided
  if (selectionCallbacks.onNodeSelected) {
    selectionCallbacks.onNodeSelected(node.data());
  }
});

// When clicking on the background, deselect all nodes
cy.on('tap', function(evt) {
  // Only handle background clicks (not on nodes)
  if (evt.target === cy) {
    clearSelection();
  }
});
```

## Responsive Interactions

### Current Implementation
The current implementation adjusts node size and position for different screen sizes:

```javascript
function adjustNodesForScreenSize() {
  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;

  // Adjust spacing multiplier
  const spacingMultiplier = isSmallMobile ? 0.75 : isMobile ? 0.8 : 1;

  // Update node positions
  // ...
}

window.addEventListener('resize', adjustNodesForScreenSize);
```

### Cytoscape Implementation Approach
```javascript
function handleResize() {
  const width = container.offsetWidth;
  const height = container.offsetHeight;

  // Update Cytoscape container dimensions
  cy.resize();

  // Apply layout with adjusted spacing
  const isMobile = window.innerWidth <= 768;
  const spacingFactor = isMobile ? 0.8 : 1;

  cy.layout({
    name: 'preset',
    fit: true,
    zoom: isMobile ? 0.8 : 1,
    positions: function(node) {
      const data = node.data();
      return {
        x: data.originalX * spacingFactor,
        y: data.originalY * spacingFactor
      };
    }
  }).run();
}

window.addEventListener('resize', handleResize);
```

## Modal Interactions

### Current Implementation
The node modal system includes:
- Show/hide animations
- Close button
- Background overlay that closes the modal when clicked
- Escape key to close
- Content animations and effects

### Cytoscape Implementation
The modal system can remain largely the same, just being triggered from Cytoscape events instead:

```javascript
// For Contact modal integration:
function initializeContactModalIntegration() {
  // Ensure ContactModal is available
  if (typeof ContactModal !== 'undefined') {
    // Initialize ContactModal
    ContactModal.initialize();

    // Register specific event handlers for Contact node
    if (cy) {
      cy.on('tap', 'node[category = "Contact"]', function() {
        ContactModal.show();
      });
    }
  }
}
```

## Touch Device Adaptations

### Current Implementation
The current implementation has specific optimizations for touch devices:

```css
@media (max-width: 480px) {
  .node {
    min-width: 54px !important;
    min-height: 54px !important;
  }

  /* Enhanced touch target size */
}
```

### Cytoscape Implementation Approach
```javascript
function setupTouchInteractions() {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    // Increase node size for better touch targets
    cy.style()
      .selector('node')
      .style({
        'width': '54px',
        'height': '54px'
      })
      .update();

    // Add touch-specific interactions
    cy.on('taphold', 'node', function(evt) {
      // Handle long-press on node
    });
  }
}
```

## Animation Integration

### Current Implementation
The current implementation uses CSS transitions and animations for various effects:

```css
.node {
  transition: transform 0.2s, box-shadow 0.2s;
}

@keyframes floatTitle {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-10px); }
}
```

### Cytoscape Implementation Approach
Cytoscape.js has its own animation system:

```javascript
// Animate selection
cy.on('select', 'node', function(evt) {
  const node = evt.target;

  // Animate node size
  node.animate({
    style: {
      'width': function(ele) { return ele.width() * 1.1; },
      'height': function(ele) { return ele.height() * 1.1; }
    },
    duration: 200,
    easing: 'ease-out-cubic'
  });
});
```

## Implementation Strategy

To ensure all interactions are correctly migrated, follow this approach:

1. **Map Event Types**: Document each DOM event and its Cytoscape equivalent
2. **Isolate Special Behavior**: Handle special case nodes (like Contact) separately
3. **Preserve Modal System**: Keep the modal system as-is, just trigger it from Cytoscape events
4. **Test on Multiple Devices**: Ensure interactions work on desktop, mobile, and touch devices
5. **Maintain Event Sequence**: Ensure the order of events (mousedown, mouseup, etc.) is preserved

## Comprehensive Testing Plan

For each interaction:

1. Create a test case that verifies the interaction functions correctly
2. Test on desktop with mouse
3. Test on mobile with touch
4. Test only Escape key for closing modals
5. Compare behavior with original implementation

## Escape Key Functionality

As per requirements, the only keyboard interaction implemented is the Escape key functionality to close modals. This has been implemented and tested to ensure compliance with the specified accessibility requirements.
