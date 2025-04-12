/**
 * Cytoscape.js Production Data Conversion Tests
 *
 * Tests for converting production-like data to Cytoscape.js format
 * This tests task 2.2 in the migration plan
 */

// Import CytoscapeManager
const CytoscapeManager = require('../js/cytoscape-manager');

describe('Production Data Conversion', () => {
  // Sample production-like data with real-world patterns
  const productionData = {
    nodes: [
      {
        id: 'cocode',
        label: {
          en: 'Cocode.dk',
          da: 'Cocode.dk',
          es: 'Cocode.dk'
        },
        category: 'cocode.dk',
        x: 0,
        y: 0,
        radius: 2.5
      },
      {
        id: 'software-dev',
        label: {
          en: 'Software Development',
          da: 'Softwareudvikling',
          es: 'Desarrollo de Software'
        },
        category: 'Software',
        x: -150,
        y: -100,
        radius: 1.8
      },
      {
        id: 'cybersecurity',
        label: {
          en: 'Cybersecurity',
          da: 'Cybersikkerhed',
          es: 'Ciberseguridad'
        },
        category: 'Cybersecurity',
        x: 150,
        y: -100,
        radius: 1.8
      },
      {
        id: 'client-confidential',
        label: {
          en: 'Confidential Client',
          da: 'Fortrolig Kunde',
          es: 'Cliente Confidencial'
        },
        category: 'Clients',
        x: 0,
        y: 200,
        radius: 1.5
      },
      {
        id: 'node-Contact',
        label: {
          en: 'Contact Us',
          da: 'Kontakt Os',
          es: 'Contáctenos'
        },
        category: 'Contact',
        x: 200,
        y: 150,
        radius: 1.2
      }
    ],
    edges: [
      {
        source: 'cocode',
        target: 'software-dev',
        category: 'cocode.dk',
        width: 3
      },
      {
        source: 'cocode',
        target: 'cybersecurity',
        category: 'cocode.dk',
        width: 3
      },
      {
        source: 'software-dev',
        target: 'cybersecurity',
        category: 'Software',
        lineStyle: 'dashed'
      },
      {
        source: 'software-dev',
        target: 'client-confidential',
        category: 'Software'
      },
      {
        source: 'cybersecurity',
        target: 'client-confidential',
        category: 'Cybersecurity'
      },
      {
        source: 'client-confidential',
        target: 'cocode',
        category: 'Clients'
      }
    ]
  };

  test('should convert production-like nodes correctly', () => {
    // When we convert the production nodes to Cytoscape format
    const cytoscapeNodes = CytoscapeManager.convertNodesToCytoscape(productionData.nodes);

    // Then they should have the correct structure
    expect(cytoscapeNodes).toHaveLength(productionData.nodes.length);

    // Check the main cocode.dk node
    const cocodeNode = cytoscapeNodes.find(node => node.data.id === 'cocode');
    expect(cocodeNode).toBeDefined();
    expect(cocodeNode.data.label).toEqual(productionData.nodes[0].label);
    expect(cocodeNode.data.category).toBe('cocode.dk');
    expect(cocodeNode.classes).toBe('cocode.dk');
    expect(cocodeNode.position.x).toBe(0);
    expect(cocodeNode.position.y).toBe(0);

    // Check multilingual node label
    const softwareNode = cytoscapeNodes.find(node => node.data.id === 'software-dev');
    expect(softwareNode).toBeDefined();
    expect(softwareNode.data.label).toEqual({
      en: 'Software Development',
      da: 'Softwareudvikling',
      es: 'Desarrollo de Software'
    });

    // Check Contact node
    const contactNode = cytoscapeNodes.find(node => node.data.id === 'node-Contact');
    expect(contactNode).toBeDefined();
    expect(contactNode.data.category).toBe('Contact');
    expect(contactNode.classes).toBe('Contact');
  });

  test('should convert production-like edges correctly', () => {
    // When we convert the production edges to Cytoscape format
    const cytoscapeEdges = CytoscapeManager.convertEdgesToCytoscape(productionData.edges);

    // Then they should have the correct structure
    expect(cytoscapeEdges).toHaveLength(productionData.edges.length);

    // Check the main cocode connection edge
    const cocodeEdge = cytoscapeEdges.find(edge =>
      edge.data.source === 'cocode' && edge.data.target === 'software-dev'
    );
    expect(cocodeEdge).toBeDefined();
    expect(cocodeEdge.data.category).toBe('cocode.dk');
    expect(cocodeEdge.data.width).toBe(3);
    expect(cocodeEdge.classes).toBe('cocode.dk');

    // Check edge with lineStyle
    const dashedEdge = cytoscapeEdges.find(edge =>
      edge.data.source === 'software-dev' && edge.data.target === 'cybersecurity'
    );
    expect(dashedEdge).toBeDefined();
    expect(dashedEdge.data.lineStyle).toBe('dashed');
  });

  test('should convert complete production-like graph correctly', () => {
    // When we convert the complete production graph to Cytoscape format
    const cytoscapeElements = CytoscapeManager.convertGraphToCytoscape(productionData);

    // Then it should contain all nodes and edges
    expect(Array.isArray(cytoscapeElements)).toBe(true);
    expect(cytoscapeElements.length).toBe(
      productionData.nodes.length + productionData.edges.length
    );

    // Check that nodes were converted correctly
    const nodes = cytoscapeElements.filter(el => el.group === 'nodes');
    expect(nodes.length).toBe(productionData.nodes.length);

    // Check that edges were converted correctly
    const edges = cytoscapeElements.filter(el => el.group === 'edges');
    expect(edges.length).toBe(productionData.edges.length);

    // Verify consistent edge IDs
    edges.forEach(edge => {
      expect(edge.data.id).toBe(`${edge.data.source}-${edge.data.target}`);
    });
  });

  test('should handle multilingual labels in production data', () => {
    // When we convert production nodes with multilingual labels
    const cytoscapeNodes = CytoscapeManager.convertNodesToCytoscape(productionData.nodes);

    // Then all nodes should preserve their multilingual label data
    cytoscapeNodes.forEach((node, index) => {
      expect(node.data.label).toEqual(productionData.nodes[index].label);
    });

    // Check specific languages
    const cybersecurityNode = cytoscapeNodes.find(node => node.data.id === 'cybersecurity');
    expect(cybersecurityNode.data.label.en).toBe('Cybersecurity');
    expect(cybersecurityNode.data.label.da).toBe('Cybersikkerhed');
    expect(cybersecurityNode.data.label.es).toBe('Ciberseguridad');
  });
});
