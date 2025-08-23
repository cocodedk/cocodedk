/**
 * TypeScript version of the Cytoscape graph initialization module
 */

// Declare cytoscape as a global function
declare function cytoscape(config: CytoscapeConfig): any;

// Import types
interface CytoscapeStyle {
  selector: string;
  style: {
    [key: string]: string | number | boolean;
  };
}

interface CytoscapeConfig {
  container: HTMLElement | null;
  style?: Array<CytoscapeStyle>;
  layout?: {
    name: string;
    [key: string]: any;
  };
  elements?: {
    nodes: Array<{ data: { id: string, [key: string]: any } }>;
    edges: Array<{ data: { id: string, source: string, target: string, [key: string]: any } }>;
  };
  [key: string]: any;
}

/**
 * Initialize Cytoscape graph when the DOM is loaded
 *
 * @returns {void} No return value
 */
const initializeCytoscapeGraph = (): void => {
  document.addEventListener('DOMContentLoaded', function() {
    // Check if the container exists
    const container = document.getElementById('cy');
    if (!container) {
      console.error('Cytoscape container not found');
      return;
    }

    // Initialize Cytoscape instance with config
    const cytoscapeConfig: CytoscapeConfig = {
      container,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#6FB1FC',
            'label': 'data(id)',
            'color': '#fff',
            'text-outline-width': 2,
            'text-outline-color': '#6FB1FC'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }
        }
      ],
      layout: {
        name: 'grid'
      },
      // Sample graph data
      elements: {
        nodes: [
          { data: { id: 'a' } },
          { data: { id: 'b' } },
          { data: { id: 'c' } },
          { data: { id: 'd' } },
          { data: { id: 'e' } }
        ],
        edges: [
          { data: { id: 'ab', source: 'a', target: 'b' } },
          { data: { id: 'ac', source: 'a', target: 'c' } },
          { data: { id: 'cd', source: 'c', target: 'd' } },
          { data: { id: 'ce', source: 'c', target: 'e' } }
        ]
      }
    };

    // Call cytoscape with the configuration
    cytoscape(cytoscapeConfig);
  });
};

// Execute the initialization function
initializeCytoscapeGraph();

// For testing purposes, export the initialization function
module.exports = { initializeCytoscapeGraph };
