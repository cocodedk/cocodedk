// Initialize Cytoscape graph
document.addEventListener('DOMContentLoaded', function() {
    // Check if the container exists
    const container = document.getElementById('cy');
    if (!container) {
        console.error('Cytoscape container not found');
        return;
    }

    // Initialize Cytoscape instance
    const cy = cytoscape({
        container: container,
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
    });

    // console.log('Cytoscape graph initialized');
});
