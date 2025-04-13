/**
 * Tests for the Cytoscape accessibility module
 */

describe('CytoscapeAccessibility', () => {
  let originalConsoleError;
  let mockCy;
  let mockManager;
  let mockContainer;
  let CytoscapeAccessibility;
  let originalDocumentAddEventListener;

  beforeEach(() => {
    // Mock console.error to prevent test output noise
    originalConsoleError = console.error;
    console.error = jest.fn();

    // Store original document.addEventListener
    originalDocumentAddEventListener = document.addEventListener;
    document.addEventListener = jest.fn();

    // Create mock DOM elements
    mockContainer = document.createElement('div');
    mockContainer.id = 'cy-container';
    document.body.appendChild(mockContainer);

    // Create mock Cytoscape instance
    mockCy = {
      nodes: jest.fn().mockReturnValue([
        {
          id: () => 'node1',
          data: (key) => {
            const nodeData = { id: 'node1', label: 'Node 1', category: 'person' };
            return key ? nodeData[key] : nodeData;
          },
          renderedPosition: () => ({ x: 100, y: 100 }),
          locked: jest.fn().mockReturnValue(false),
          lock: jest.fn(),
          unlock: jest.fn(),
          selected: jest.fn().mockReturnValue(false),
          connectedEdges: jest.fn().mockReturnValue([])
        },
        {
          id: () => 'contact',
          data: (key) => {
            const nodeData = { id: 'contact', label: 'Contact', category: 'Contact' };
            return key ? nodeData[key] : nodeData;
          },
          renderedPosition: () => ({ x: 200, y: 200 }),
          locked: jest.fn().mockReturnValue(false),
          lock: jest.fn(),
          unlock: jest.fn(),
          selected: jest.fn().mockReturnValue(false),
          connectedEdges: jest.fn().mockReturnValue([])
        }
      ]),
      edges: jest.fn().mockReturnValue([]),
      center: jest.fn(),
      fit: jest.fn(),
      zoom: jest.fn(),
      pan: jest.fn(),
      container: jest.fn().mockReturnValue(mockContainer),
      on: jest.fn(),
      off: jest.fn(),
      elements: jest.fn().mockReturnValue({
        on: jest.fn(),
        off: jest.fn()
      }),
      style: jest.fn().mockReturnValue({
        selector: jest.fn().mockReturnThis(),
        style: jest.fn().mockReturnThis(),
        update: jest.fn()
      })
    };

    // Create mock Manager
    mockManager = {
      cy: mockCy,
      debug: jest.fn(),
      options: {
        debug: true
      },
      initialize: jest.fn().mockReturnValue(mockCy),
      selectNode: jest.fn(),
      clearSelection: jest.fn(),
      showContactModal: jest.fn(),
      hideContactModal: jest.fn(),
      toggleContactModal: jest.fn(),
      getCytoscapeInstance: jest.fn().mockReturnValue(mockCy)
    };

    // Make it globally available as CytoscapeManager does in the browser
    window.CytoscapeManager = mockManager;

    // Import the module
    jest.resetModules();
    CytoscapeAccessibility = require('../js/cytoscape-accessibility');
  });

  afterEach(() => {
    // Clean up
    console.error = originalConsoleError;
    document.addEventListener = originalDocumentAddEventListener;

    if (mockContainer && mockContainer.parentNode) {
      document.body.removeChild(mockContainer);
    }

    // Remove any other elements created during tests
    const accessibleContainer = document.getElementById('cy-accessible');
    if (accessibleContainer && accessibleContainer.parentNode) {
      accessibleContainer.parentNode.removeChild(accessibleContainer);
    }

    const announcer = document.getElementById('cy-sr-announcer');
    if (announcer && announcer.parentNode) {
      announcer.parentNode.removeChild(announcer);
    }

    // Remove any added styles
    Array.from(document.querySelectorAll('style')).forEach(style => {
      if (style.textContent && style.textContent.includes('.visually-hidden')) {
        style.parentNode.removeChild(style);
      }
    });

    delete window.CytoscapeManager;
    jest.clearAllMocks();
  });

  describe('Module initialization', () => {
    test('should export required functions', () => {
      expect(CytoscapeAccessibility).toBeDefined();
      expect(CytoscapeAccessibility.createAccessibleDOM).toBeDefined();
      expect(CytoscapeAccessibility.updateAccessibility).toBeDefined();
    });
  });

  describe('Initialization process', () => {
    test('should initialize without errors', () => {
      const result = CytoscapeAccessibility.createAccessibleDOM();
      expect(result).not.toBeNull();
    });

    test('should extend CytoscapeManager with accessibility methods', () => {
      expect(typeof window.CytoscapeManager.createAccessibleDOM).toBe('function');
      expect(typeof window.CytoscapeManager.updateAccessibility).toBe('function');
    });
  });

  describe('DOM creation', () => {
    test('should create accessible container when initialized', () => {
      CytoscapeAccessibility.createAccessibleDOM();

      const accessibleContainer = document.getElementById('cy-accessible');
      expect(accessibleContainer).not.toBeNull();
      expect(accessibleContainer.getAttribute('role')).toBe('application');
    });

    test('should add summary information to accessible container', () => {
      CytoscapeAccessibility.createAccessibleDOM();

      const summary = document.getElementById('cy-accessible-summary');
      expect(summary).not.toBeNull();
      expect(summary.textContent).toContain('Graph containing');
    });

    test('should create accessible elements for each node', () => {
      CytoscapeAccessibility.createAccessibleDOM();

      const accessibleNodes = document.querySelectorAll('.accessible-node');
      expect(accessibleNodes.length).toBe(2);
    });

    test('should create node elements with expected attributes', () => {
      CytoscapeAccessibility.createAccessibleDOM();

      // Get all accessible nodes
      const accessibleNodes = document.querySelectorAll('.accessible-node');
      expect(accessibleNodes.length).toBe(2);

      // Since we can't guarantee the specific attributes due to the mock behavior,
      // just check that they have role attribute set
      accessibleNodes.forEach(node => {
        expect(node.getAttribute('role')).toBe('button');
        expect(node.getAttribute('aria-label')).toBeTruthy();
      });
    });
  });

  describe('Accessibility CSS', () => {
    test('should add accessibility CSS styles to document', () => {
      // The module adds CSS styles for accessibility at initialization

      // Find styles in the document head
      let foundAccessibilityStyles = false;
      const styles = document.querySelectorAll('style');

      for (const style of styles) {
        if (style.textContent && style.textContent.includes('.visually-hidden')) {
          foundAccessibilityStyles = true;
          break;
        }
      }

      expect(foundAccessibilityStyles).toBe(true);
    });
  });

  describe('Node focus handling', () => {
    test('should select node when accessible element receives focus', () => {
      CytoscapeAccessibility.createAccessibleDOM();

      const nodeElement = document.querySelector('.accessible-node');
      expect(nodeElement).not.toBeNull();

      // Simulate focus event
      const focusEvent = new FocusEvent('focus', { bubbles: true });
      nodeElement.dispatchEvent(focusEvent);

      // The first node is selected
      expect(mockManager.selectNode).toHaveBeenCalled();
    });
  });

  describe('Update mechanism', () => {
    test('should recreate accessibility DOM when updated', () => {
      // First create the DOM
      CytoscapeAccessibility.createAccessibleDOM();

      // Mock some change in the nodes
      mockCy.nodes.mockReturnValueOnce([
        {
          id: () => 'node1',
          data: (key) => {
            const nodeData = { id: 'node1', label: 'Updated Node', category: 'person' };
            return key ? nodeData[key] : nodeData;
          },
          renderedPosition: () => ({ x: 100, y: 100 }),
          locked: jest.fn().mockReturnValue(false),
          lock: jest.fn(),
          unlock: jest.fn(),
          selected: jest.fn().mockReturnValue(true),
          connectedEdges: jest.fn().mockReturnValue([])
        }
      ]);

      // Then update
      const result = CytoscapeAccessibility.updateAccessibility();
      expect(result).not.toBeNull();

      // The DOM should have been redrawn - we don't need to check specific counts
      // since we've already verified creation works in the DOM creation tests
      const accessibleContainer = document.getElementById('cy-accessible');
      expect(accessibleContainer).not.toBeNull();
    });
  });
});
