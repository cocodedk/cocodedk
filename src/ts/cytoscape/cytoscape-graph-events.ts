/**
 * TypeScript version of the Cytoscape graph events module.
 * Handles event binding and custom interactions for Cytoscape graphs.
 */

import { CytoscapeInstance, CytoscapeEventObject } from '../types/cytoscape';

interface EventHandlerOptions {
  onClick?: (event: CytoscapeEventObject) => void;
  onHover?: (event: CytoscapeEventObject) => void;
  onSelect?: (event: CytoscapeEventObject) => void;
  onDrag?: (event: CytoscapeEventObject) => void;
  onZoom?: (event: CytoscapeEventObject) => void;
  onPan?: (event: CytoscapeEventObject) => void;
  onLoad?: (event: CytoscapeEventObject) => void;
}

/**
 * Bind core graph events to a Cytoscape instance
 *
 * @param {CytoscapeInstance} cy - The Cytoscape instance
 * @param {EventHandlerOptions} options - Event handler functions
 */
function bindCoreEvents(cy: CytoscapeInstance, options: EventHandlerOptions = {}): void {
  // Click events
  if (options.onClick) {
    cy.on('tap', 'node, edge', options.onClick);
  }

  // Hover events
  if (options.onHover) {
    cy.on('mouseover', 'node, edge', options.onHover);
    cy.on('mouseout', 'node, edge', (event: CytoscapeEventObject) => {
      // Remove hover classes when mouse leaves
      event.target.removeClass('hover');
    });
  }

  // Selection events
  if (options.onSelect) {
    cy.on('select', 'node, edge', options.onSelect);
    cy.on('unselect', 'node, edge', (event: CytoscapeEventObject) => {
      // Handle unselection if needed
      event.target.removeClass('selected-highlight');
    });
  }

  // Drag events
  if (options.onDrag) {
    cy.on('dragfree', 'node', options.onDrag);
  }

  // Zoom events
  if (options.onZoom) {
    cy.on('zoom', options.onZoom);
  }

  // Pan events
  if (options.onPan) {
    cy.on('pan', options.onPan);
  }

  // Load completed
  if (options.onLoad) {
    cy.ready(options.onLoad);
  }
}

/**
 * Add hover behavior to graph elements
 *
 * @param {CytoscapeInstance} cy - The Cytoscape instance
 */
function addHoverBehavior(cy: CytoscapeInstance): void {
  cy.on('mouseover', 'node', (event: CytoscapeEventObject) => {
    const node = event.target;
    node.addClass('hover');
  });

  cy.on('mouseout', 'node', (event: CytoscapeEventObject) => {
    const node = event.target;
    node.removeClass('hover');
  });

  cy.on('mouseover', 'edge', (event: CytoscapeEventObject) => {
    const edge = event.target;
    edge.addClass('hover');
  });

  cy.on('mouseout', 'edge', (event: CytoscapeEventObject) => {
    const edge = event.target;
    edge.removeClass('hover');
  });
}

/**
 * Add selection behavior to graph elements
 *
 * @param {CytoscapeInstance} cy - The Cytoscape instance
 */
function addSelectionBehavior(cy: CytoscapeInstance): void {
  cy.on('select', 'node', (event: CytoscapeEventObject) => {
    const node = event.target;

    // Highlight connected edges and nodes
    const connectedEdges = node.connectedEdges();
    const connectedNodes = node.neighborhood('node');

    connectedEdges.addClass('connected-highlight');
    connectedNodes.addClass('connected-highlight');
  });

  cy.on('unselect', 'node', (_event: CytoscapeEventObject) => {
    // Remove all highlight classes
    cy.elements().removeClass('connected-highlight');
  });
}

/**
 * Add custom double-click behavior
 *
 * @param {CytoscapeInstance} cy - The Cytoscape instance
 * @param {Function} callback - Function to call on double click
 */
function addDoubleClickBehavior(cy: CytoscapeInstance, callback: (target: any) => void): void {
  let lastTapTime = 0;
  const doubleClickDelay = 300; // ms

  cy.on('tap', 'node', (event: CytoscapeEventObject) => {
    const currentTime = Date.now();
    const node = event.target;

    if (currentTime - lastTapTime < doubleClickDelay) {
      // Double click detected
      if (callback && typeof callback === 'function') {
        callback(node);
      }
    }

    lastTapTime = currentTime;
  });
}

/**
 * Add interactive element expansion/collapse
 *
 * @param {CytoscapeInstance} cy - The Cytoscape instance
 */
function addExpandCollapseBehavior(cy: CytoscapeInstance): void {
  // Add custom handling for compound nodes (parents with children)
  cy.on('tap', 'node.parent', (event: CytoscapeEventObject) => {
    const parent = event.target;

    if (parent.hasClass('collapsed')) {
      // Expand the node
      parent.removeClass('collapsed');
      parent.children().restore();
    } else {
      // Collapse the node
      parent.addClass('collapsed');
      parent.children().remove();
    }

    cy.layout({ name: 'cose' }).run();
  });
}

/**
 * Initialize all default event behaviors
 *
 * @param {CytoscapeInstance} cy - The Cytoscape instance
 * @param {EventHandlerOptions} options - Event handler options
 */
function initializeEvents(cy: CytoscapeInstance, options: EventHandlerOptions = {}): void {
  // Bind all core events
  bindCoreEvents(cy, options);

  // Add standard interactive behaviors
  addHoverBehavior(cy);
  addSelectionBehavior(cy);

  // Add double-click behavior with a default callback that zooms to the node
  addDoubleClickBehavior(cy, (node) => {
    cy.animate({
      zoom: 2,
      center: { eles: node }
    }, {
      duration: 500
    });
  });

  // Add expand/collapse for compound nodes
  addExpandCollapseBehavior(cy);
}

// Create namespace and expose the functions for backward compatibility with JavaScript code
interface CytoscapeGraphEvents {
  bindCoreEvents: typeof bindCoreEvents;
  addHoverBehavior: typeof addHoverBehavior;
  addSelectionBehavior: typeof addSelectionBehavior;
  addDoubleClickBehavior: typeof addDoubleClickBehavior;
  addExpandCollapseBehavior: typeof addExpandCollapseBehavior;
  initializeEvents: typeof initializeEvents;
}

// Define window with Cytoscape properties for TypeScript
declare global {
  interface Window {
    CytoscapeGraphEvents: CytoscapeGraphEvents;
  }
}

// Initialize the namespace if it doesn't exist
if (!window.CytoscapeGraphEvents) {
  window.CytoscapeGraphEvents = {} as CytoscapeGraphEvents;
}

// Expose the functions globally
window.CytoscapeGraphEvents.bindCoreEvents = bindCoreEvents;
window.CytoscapeGraphEvents.addHoverBehavior = addHoverBehavior;
window.CytoscapeGraphEvents.addSelectionBehavior = addSelectionBehavior;
window.CytoscapeGraphEvents.addDoubleClickBehavior = addDoubleClickBehavior;
window.CytoscapeGraphEvents.addExpandCollapseBehavior = addExpandCollapseBehavior;
window.CytoscapeGraphEvents.initializeEvents = initializeEvents;

// Export for TypeScript modules
export {
  bindCoreEvents,
  addHoverBehavior,
  addSelectionBehavior,
  addDoubleClickBehavior,
  addExpandCollapseBehavior,
  initializeEvents
};
