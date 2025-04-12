/**
 * Tests for multilingual support in CytoscapeManager
 *
 * TESTING PHILOSOPHY:
 * - IMPERATIVE: Use real methods and real data wherever possible
 * - Mocking is expensive and creates maintenance burden
 * - Every change to the implementation code requires updating mocks
 * - Tests should focus on verifying behavior, not implementation details
 * - Simpler tests that use real code paths are more maintainable
 * - Only mock what's absolutely necessary (browser APIs, network calls, etc.)
 * - A minimal, passing test is better than a complex, brittle test
 */

const CytoscapeManager = require('../js/cytoscape-manager');

describe('Cytoscape Multilingual Support', () => {
  let container;

  beforeEach(() => {
    // Create container for Cytoscape
    container = document.createElement('div');
    container.id = 'cy-container';
    document.body.appendChild(container);

    // Initialize Cytoscape
    CytoscapeManager.initialize('cy-container');
  });

  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });

  test('should convert nodes with multilingual labels', () => {
    // Test data with multilingual structure like nodes.js
    const testNode = {
      id: 'test-node',
      x: 100,
      y: 200,
      r: 40,
      labels: {
        en: 'Test Node',
        da: 'Test Knude',
        es: 'Nodo de Prueba'
      },
      translations: {
        en: 'This is a test node with multilingual support',
        da: 'Dette er en testknude med flersproget understøttelse',
        es: 'Este es un nodo de prueba con soporte multilingüe'
      },
      category: 'Software'
    };

    // Convert the node
    const cytoscapeNode = CytoscapeManager.convertNodeToCytoscape(testNode);

    // Check that multilingual data is preserved
    expect(cytoscapeNode.data.labels).toEqual(testNode.labels);
    expect(cytoscapeNode.data.translations).toEqual(testNode.translations);
    expect(cytoscapeNode.data.r).toBe(testNode.r);

    // Default label should be English
    expect(cytoscapeNode.data.label).toBe('Test Node');

    // Position should be preserved
    expect(cytoscapeNode.position.x).toBe(100);
    expect(cytoscapeNode.position.y).toBe(200);
  });

  test('should convert array-style links to Cytoscape edges', () => {
    // Create node map
    const nodeMap = {
      'node1': { id: 'node1', category: 'Software' },
      'node2': { id: 'node2', category: 'Cybersecurity' }
    };

    // Test simple link array like in nodes.js
    const links = [
      ['node1', 'node2'],
      ['node2', 'node1']
    ];

    // Convert links
    const cytoscapeEdges = CytoscapeManager.convertLinksToCytoscapeEdges(links, nodeMap);

    // Check conversion results
    expect(cytoscapeEdges.length).toBe(2);
    expect(cytoscapeEdges[0].data.source).toBe('node1');
    expect(cytoscapeEdges[0].data.target).toBe('node2');
    expect(cytoscapeEdges[0].data.category).toBe('Software');

    expect(cytoscapeEdges[1].data.source).toBe('node2');
    expect(cytoscapeEdges[1].data.target).toBe('node1');
    expect(cytoscapeEdges[1].data.category).toBe('Cybersecurity');
  });

  test('should switch language in node display', () => {
    // Add a real multilingual node to the Cytoscape instance
    const testNode = {
      id: 'test-node',
      labels: {
        en: 'English Label',
        da: 'Danish Label',
        es: 'Spanish Label'
      },
      category: 'Software'
    };

    // Add test node to Cytoscape
    CytoscapeManager.renderNode(testNode);

    // Get current language (should default to English)
    expect(CytoscapeManager.getCurrentLanguage()).toBe('en');

    // Change to Danish
    CytoscapeManager.setLanguage('da');

    // Verify language changed
    expect(CytoscapeManager.getCurrentLanguage()).toBe('da');

    // Change to Spanish
    CytoscapeManager.setLanguage('es');

    // Verify language changed
    expect(CytoscapeManager.getCurrentLanguage()).toBe('es');
  });
});
