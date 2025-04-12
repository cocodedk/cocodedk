/**
 * tests/cytoscape/accessibility.test.js
 * Tests for accessibility features in the Cytoscape implementation
 */

// Import the accessibility module to apply it to CytoscapeManager
require('../../js/cytoscape-accessibility');

// Mock ContactModal globally
global.ContactModal = {
  showModal: jest.fn(),
  hideModal: jest.fn()
};

describe('Cytoscape Accessibility', () => {
  // Setup for testing
  let container;

  beforeEach(() => {
    // Create container for Cytoscape
    container = document.createElement('div');
    container.id = 'cy-container';
    document.body.appendChild(container);

    // Setup test nodes
    const testNodes = [
      { data: { id: 'node1', label: 'Node 1', category: 'Person' } },
      { data: { id: 'node2', label: 'Node 2', category: 'Organization' } },
      { data: { id: 'node-Contact', label: 'Contact Us', category: 'Contact' } }
    ];

    const testEdges = [
      { data: { id: 'edge1', source: 'node1', target: 'node2' } }
    ];

    // Setup Cytoscape instance with test data
    global.cy.nodes.mockReturnValue(testNodes.map(node => ({
      id: () => node.data.id,
      data: (key) => node.data[key],
      selected: () => false,
      connectedEdges: () => testEdges.filter(edge =>
        edge.data.source === node.data.id || edge.data.target === node.data.id
      ),
      position: () => ({ x: Math.random() * 100, y: Math.random() * 100 }),
      select: jest.fn()
    })));

    global.cy.edges.mockReturnValue(testEdges.map(edge => ({
      id: () => edge.data.id,
      data: (key) => edge.data[key]
    })));

    // Initialize Cytoscape with accessibility
    CytoscapeManager.initialize('cy-container');
  });

  afterEach(() => {
    // Clean up
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    document.querySelectorAll('#cy-accessible, #cy-sr-announcer').forEach(el => {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });
    jest.clearAllMocks();
  });

  test('Creates accessible DOM representation of nodes', () => {
    // Verify that the accessible container is created
    const accessibleContainer = document.getElementById('cy-accessible');
    expect(accessibleContainer).not.toBeNull();
    expect(accessibleContainer.getAttribute('role')).toBe('application');

    // Verify navigation region exists
    const navRegion = accessibleContainer.querySelector('[role="navigation"]');
    expect(navRegion).not.toBeNull();

    // Check that a summary element is created
    const summary = accessibleContainer.querySelector('#cy-accessible-summary');
    expect(summary).not.toBeNull();
    expect(summary.textContent).toContain('nodes');
    expect(summary.textContent).toContain('connections');

    // Verify that accessible elements are created for each node
    const nodeElements = accessibleContainer.querySelectorAll('.accessible-node');
    expect(nodeElements.length).toBe(3);

    // Check that the first node has the right ARIA attributes
    const firstNodeElement = document.getElementById('accessible-node1');
    expect(firstNodeElement).not.toBeNull();
    expect(firstNodeElement.getAttribute('role')).toBe('button');
    expect(firstNodeElement.getAttribute('aria-label')).toContain('Node 1');
    expect(firstNodeElement.getAttribute('aria-label')).toContain('Person');

    // Check that the Contact node has specific attributes for modals
    const contactNodeElement = document.getElementById('accessible-node-Contact');
    expect(contactNodeElement).not.toBeNull();
    expect(contactNodeElement.getAttribute('aria-haspopup')).toBe('dialog');
    expect(contactNodeElement.getAttribute('aria-controls')).toBe('contact-modal');
  });

  test('Updates accessibility when graph changes', () => {
    // Mock change to graph nodes
    const updatedNodes = [
      { data: { id: 'node1', label: 'Updated Node 1', category: 'Person' } },
      { data: { id: 'new-node', label: 'New Node', category: 'Document' } }
    ];

    global.cy.nodes.mockReturnValue(updatedNodes.map(node => ({
      id: () => node.data.id,
      data: (key) => node.data[key],
      selected: () => false,
      connectedEdges: () => [],
      position: () => ({ x: 0, y: 0 }),
      select: jest.fn()
    })));

    // Update accessibility
    const updatedContainer = CytoscapeManager.updateAccessibility();

    // Verify updated accessible container
    expect(updatedContainer).not.toBeNull();

    // Verify that the new node is in the accessible DOM
    const newNodeElement = document.getElementById('accessible-new-node');
    expect(newNodeElement).not.toBeNull();
    expect(newNodeElement.getAttribute('aria-label')).toContain('New Node');
    expect(newNodeElement.getAttribute('aria-label')).toContain('Document');

    // Verify that the old nodes not in the new graph are removed
    const contactNodeElement = document.getElementById('accessible-node-Contact');
    expect(contactNodeElement).toBeNull();
  });

  test('Handles Escape key for closing modals', () => {
    // Create announcer element for testing
    const announcer = document.createElement('div');
    announcer.id = 'cy-sr-announcer';
    announcer.setAttribute('aria-live', 'assertive');
    announcer.setAttribute('role', 'status');
    document.body.appendChild(announcer);

    // Mock that a modal is open
    ContactModal.showModal();
    expect(ContactModal.showModal).toHaveBeenCalled();

    // Simulate Escape key press on document
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    // Verify that modal is hidden
    expect(ContactModal.hideModal).toHaveBeenCalled();

    // Verify that screen reader announcer exists
    const announcerEl = document.getElementById('cy-sr-announcer');
    expect(announcerEl).not.toBeNull();
    expect(announcerEl.getAttribute('aria-live')).toBe('assertive');

    // Clean up announcer
    document.body.removeChild(announcer);
  });
});
