/**
 * Generates and returns a stylesheet for Cytoscape
 *
 * @return {array} Array of style objects
 */
function getStylesheet() {
  return [
    // Base node styling
    {
      selector: 'node',
      style: {
        'label': 'data(label)',
        'background-color': '#f5f5f5',
        'border-width': '1px',
        'border-color': '#ddd',
        'text-valign': 'center',
        'text-halign': 'center',
        'font-size': '12px',
        'color': '#333',
        'shape': 'ellipse',
        'width': '45px',
        'height': '45px',
        'text-wrap': 'wrap',
        'text-max-width': '75px'
      }
    },

    // Base edge styling
    {
      selector: 'edge',
      style: {
        'width': '1.5px',
        'line-color': '#999',
        'target-arrow-color': '#999',
        'target-arrow-shape': 'triangle',
        'curve-style': 'unbundled-bezier',
        'control-point-distances': '0',
        'control-point-weights': '0.5'
      }
    },

    // Selected elements styling
    {
      selector: ':selected',
      style: {
        'border-width': '3px',
        'border-color': '#3388FF',
        'line-color': '#3388FF',
        'target-arrow-color': '#3388FF'
      }
    },

    // Node category-specific styling: Person
    {
      selector: 'node.person',
      style: {
        'background-color': '#E1F5FE',
        'border-color': '#42A5F5',
        'shape': 'ellipse'
      }
    },

    // Node category-specific styling: Organization
    {
      selector: 'node.organization',
      style: {
        'background-color': '#FFECB3',
        'border-color': '#FFC107',
        'shape': 'rectangle'
      }
    },

    // Node category-specific styling: Location
    {
      selector: 'node.location',
      style: {
        'background-color': '#E8F5E9',
        'border-color': '#66BB6A',
        'shape': 'diamond'
      }
    },

    // Node category-specific styling: Event
    {
      selector: 'node.event',
      style: {
        'background-color': '#F3E5F5',
        'border-color': '#AB47BC',
        'shape': 'pentagon'
      }
    },

    // Node category-specific styling: Document
    {
      selector: 'node.document',
      style: {
        'background-color': '#FFF3E0',
        'border-color': '#FF9800',
        'shape': 'star'
      }
    },

    // Edge category-specific styling: Association
    {
      selector: 'edge.association',
      style: {
        'line-color': '#42A5F5',
        'target-arrow-color': '#42A5F5'
      }
    },

    // Edge category-specific styling: Dependency
    {
      selector: 'edge.dependency',
      style: {
        'line-color': '#FF5722',
        'target-arrow-color': '#FF5722',
        'line-style': 'dashed'
      }
    },

    // Edge category-specific styling: Ownership
    {
      selector: 'edge.ownership',
      style: {
        'line-color': '#66BB6A',
        'target-arrow-color': '#66BB6A',
        'width': '2px'
      }
    },

    // Edge category-specific styling: Transformation
    {
      selector: 'edge.transformation',
      style: {
        'line-color': '#AB47BC',
        'target-arrow-color': '#AB47BC',
        'line-style': 'dotted'
      }
    },

    // Bidirectional edges - curved style
    {
      selector: 'edge[curveStyle="bezier"]',
      style: {
        'curve-style': 'bezier'
      }
    },

    // Additional styling for nodes with active state
    {
      selector: 'node.active',
      style: {
        'border-width': '3px',
        'border-color': '#3388FF',
        'border-style': 'solid'
      }
    },

    // Highlighting for accessibility focus
    {
      selector: 'node.focus',
      style: {
        'border-width': '4px',
        'border-color': '#3388FF',
        'border-style': 'double'
      }
    }
  ];
}
