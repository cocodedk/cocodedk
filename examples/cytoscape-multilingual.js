/**
 * Example of using CytoscapeManager with multilingual nodes.js data
 */

// This code demonstrates how to initialize CytoscapeManager with the existing nodes.js data

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Cytoscape with the container
  const cy = CytoscapeManager.initialize('cy-container');

  // Step 1: Create a node map for easier category lookup
  const nodeMap = {};
  nodes.forEach(node => {
    nodeMap[node.id] = node;
  });

  // Step 2: Convert nodes to Cytoscape format
  const cytoscapeNodes = CytoscapeManager.convertNodesToCytoscape(nodes);

  // Step 3: Convert links to Cytoscape edges
  const cytoscapeEdges = CytoscapeManager.convertLinksToCytoscapeEdges(links, nodeMap);

  // Step 4: Add all elements to the graph
  cy.add([...cytoscapeNodes, ...cytoscapeEdges]);

  // Step 5: Apply layout to maintain the exact positions from nodes.js
  CytoscapeManager.applyLayout({ name: 'preset' });

  // Step 6: Register event handlers for interactions
  CytoscapeManager.registerInteractionHandlers();

  // Step 7: Register selection handlers
  CytoscapeManager.registerSelectionHandlers();

  // Step 8: Set the initial language (use browser language or default to English)
  const userLang = navigator.language || navigator.userLanguage;
  const languageCode = userLang.split('-')[0]; // Get just the language code part

  // Check if the language is supported in our data
  const firstNode = nodes[0];
  const supportedLanguages = firstNode.labels ? Object.keys(firstNode.labels) : ['en'];

  // Set to user's language if supported, otherwise default to English
  const initialLang = supportedLanguages.includes(languageCode) ? languageCode : 'en';
  CytoscapeManager.setLanguage(initialLang);

  // Step 9: Connect language switcher UI to Cytoscape
  document.querySelectorAll('.lang-item').forEach(item => {
    item.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      CytoscapeManager.setLanguage(lang);

      // Update active state in UI
      document.querySelectorAll('.lang-item').forEach(el => {
        el.classList.remove('active');
        el.setAttribute('aria-selected', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');
    });
  });

  console.log('Cytoscape initialized with multilingual data from nodes.js');
});

// Optional: Helper function to show node details on click
function showNodeDetails(node) {
  const nodeData = node.data();
  const lang = CytoscapeManager.getCurrentLanguage() || 'en';

  // Get the translations for the current language
  const translation = nodeData.translations && nodeData.translations[lang]
    ? nodeData.translations[lang]
    : 'No translation available';

  // Display in a modal or info panel
  const infoPanel = document.getElementById('node-info-panel');
  if (infoPanel) {
    const title = document.createElement('h3');
    title.textContent = nodeData.labels[lang] || nodeData.id;

    const content = document.createElement('p');
    content.textContent = translation;

    infoPanel.innerHTML = '';
    infoPanel.appendChild(title);
    infoPanel.appendChild(content);
    infoPanel.style.display = 'block';
  }
}
