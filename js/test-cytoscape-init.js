/**
 * Test script for Cytoscape initialization and basic rendering
 * Use this file to test if nodes appear correctly outside of the main application
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Test Cytoscape initialization script loaded');

  // Check for container element
  const container = document.getElementById('cy-container');
  if (!container) {
    console.error('No container element found with ID "cy-container"');
    return;
  }

  // Verify Cytoscape library is loaded
  if (typeof cytoscape !== 'function') {
    console.error('Cytoscape library not loaded');
    return;
  }

  console.log('Initializing test Cytoscape instance');

  try {
    // Initialize Cytoscape with minimal configuration
    const cy = cytoscape({
      container: container,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#0077cc',
            'label': 'data(label)',
            'color': '#ffffff',
            'text-valign': 'center',
            'text-halign': 'center',
            'width': 60,
            'height': 60
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#999',
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle'
          }
        }
      ],
      // Start with empty elements
      elements: []
    });

    console.log('Cytoscape instance created successfully');

    // Add test nodes
    const testElements = [
      { data: { id: 'a', label: 'Node A' }, position: { x: 100, y: 100 } },
      { data: { id: 'b', label: 'Node B' }, position: { x: 300, y: 100 } },
      { data: { id: 'c', label: 'Node C' }, position: { x: 100, y: 300 } },
      { data: { id: 'd', label: 'Node D' }, position: { x: 300, y: 300 } },
      { data: { id: 'ab', source: 'a', target: 'b' } },
      { data: { id: 'ac', source: 'a', target: 'c' } },
      { data: { id: 'cd', source: 'c', target: 'd' } },
      { data: { id: 'bd', source: 'b', target: 'd' } }
    ];

    // Add elements to the graph
    cy.add(testElements);
    console.log(`Added ${cy.nodes().length} nodes and ${cy.edges().length} edges`);

    // Apply a layout
    cy.layout({ name: 'grid' }).run();

    // Center the graph
    cy.fit();
    cy.center();

    console.log('Test initialization complete');

    // Add to window for debugging
    window.testCy = cy;

  } catch (error) {
    console.error('Error initializing Cytoscape:', error);
  }
});

function resetView() {
  if (!window.testCy) {
    alert('Cytoscape not initialized');
    return;
  }

  window.testCy.fit(undefined, 50); // Add 50px padding
  window.testCy.center();
  document.getElementById('status').textContent = 'View reset with padding';
}
