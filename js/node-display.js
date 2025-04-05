/*
 * Node Display JS - non-canvas version
 * For rendering and interacting with nodes as HTML elements
 */

// Current language selection
let currentLanguage = 'en';

// References to DOM elements
let nodeContainer;
let nodeModal;
let nodeModalContent;
let nodeModalOverlay;
let selectedNode = null;

// Initialize the node display
function initNodeDisplay() {
  // Create container for nodes if it doesn't exist
  if (!document.querySelector('.node-container')) {
    nodeContainer = document.createElement('div');
    nodeContainer.className = 'node-container';
    document.body.appendChild(nodeContainer);
  } else {
    nodeContainer = document.querySelector('.node-container');
  }

  // Create modal for node content
  createNodeModal();

  // Create node elements
  createNodes();

  // Create links between nodes
  createNodeLinks();

  // Add window resize handler
  window.addEventListener('resize', adjustNodesForScreenSize);

  // Initial size adjustment
  adjustNodesForScreenSize();
}

// Create nodes from the nodes data
function createNodes() {
  // Clear existing nodes
  const existingNodes = document.querySelectorAll('.node');
  existingNodes.forEach(node => node.remove());

  // Create new nodes
  nodes.forEach(nodeData => {
    const nodeElement = document.createElement('div');
    // Escape dots for class name purposes
    const safeId = nodeData.id.replace(/\./g, '\\.');
    nodeElement.className = `node node-${safeId}`;

    // Add category class for styling
    if (nodeData.category) {
      nodeElement.classList.add(`node-${nodeData.category}`);
    }

    nodeElement.id = `node-${nodeData.id}`;
    nodeElement.setAttribute('role', 'button');
    nodeElement.setAttribute('tabindex', '0');
    nodeElement.setAttribute('aria-label', nodeData.labels[currentLanguage]);

    // Set size based on radius in data
    const size = nodeData.r * 2;
    nodeElement.style.width = `${size}px`;
    nodeElement.style.height = `${size}px`;

    // Position the node
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    nodeElement.style.left = `${centerX + nodeData.x - nodeData.r}px`;
    nodeElement.style.top = `${centerY + nodeData.y - nodeData.r}px`;

    // Add label
    const labelElement = document.createElement('div');
    labelElement.className = 'node-label';
    labelElement.textContent = nodeData.labels[currentLanguage];
    nodeElement.appendChild(labelElement);

    // Add event listeners
    nodeElement.addEventListener('click', () => showNodeInfo(nodeData));
    nodeElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showNodeInfo(nodeData);
      }
    });

    // Add to container
    nodeContainer.appendChild(nodeElement);
  });
}

// Create links between nodes
function createNodeLinks() {
  // Clear existing links
  const existingLinks = document.querySelectorAll('.node-link');
  existingLinks.forEach(link => link.remove());

  // Create new links
  links.forEach(link => {
    const fromNodeId = link[0];
    const toNodeId = link[1];

    // Find node data
    const fromNode = nodes.find(n => n.id === fromNodeId);
    const toNode = nodes.find(n => n.id === toNodeId);

    if (fromNode && toNode) {
      createLink(fromNode, toNode);
    }
  });
}

// Create a visual link between two nodes
function createLink(fromNode, toNode) {
  const linkElement = document.createElement('div');
  linkElement.className = 'node-link';

  // Add category-based class for styling
  if (fromNode.category) {
    linkElement.classList.add(`link-${fromNode.category}`);
  }

  // Calculate positions
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Determine scale factor based on screen size
  let scaleFactor = 1;
  if (window.innerWidth <= 768) {
    scaleFactor = 0.8;
  }
  if (window.innerWidth <= 480) {
    scaleFactor = 0.6;
  }

  // Apply scale factor to positions
  const fromX = centerX + fromNode.x * scaleFactor;
  const fromY = centerY + fromNode.y * scaleFactor;
  const toX = centerX + toNode.x * scaleFactor;
  const toY = centerY + toNode.y * scaleFactor;

  // Calculate distance and angle
  const dx = toX - fromX;
  const dy = toY - fromY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;

  // Position the link
  linkElement.style.width = `${distance}px`;
  linkElement.style.left = `${fromX}px`;
  linkElement.style.top = `${fromY}px`;
  linkElement.style.transform = `rotate(${angle}deg)`;

  // Add to container before nodes to ensure nodes appear on top
  nodeContainer.appendChild(linkElement);
}

// Create modal for displaying node info
function createNodeModal() {
  // Create overlay
  nodeModalOverlay = document.createElement('div');
  nodeModalOverlay.className = 'node-modal-overlay';
  document.body.appendChild(nodeModalOverlay);

  // Create modal
  nodeModal = document.createElement('div');
  nodeModal.className = 'node-modal';

  // Create close button
  const closeButton = document.createElement('button');
  closeButton.className = 'node-modal-close';
  closeButton.innerHTML = '&times;';
  closeButton.setAttribute('aria-label', 'Close');
  closeButton.addEventListener('click', closeNodeModal);

  // Create content container
  nodeModalContent = document.createElement('div');
  nodeModalContent.className = 'node-modal-content';

  // Assemble modal
  nodeModal.appendChild(closeButton);
  nodeModal.appendChild(nodeModalContent);
  document.body.appendChild(nodeModal);

  // Close modal when clicking overlay
  nodeModalOverlay.addEventListener('click', closeNodeModal);

  // Close modal with escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nodeModal.style.display === 'block') {
      closeNodeModal();
    }
  });
}

// Show node information in modal
function showNodeInfo(nodeData) {
  // Store selected node
  selectedNode = nodeData;

  // Set RTL for appropriate languages
  if (currentLanguage === 'ar' || currentLanguage === 'fa' || currentLanguage === 'ur') {
    nodeModal.setAttribute('dir', 'rtl');
  } else {
    nodeModal.setAttribute('dir', 'ltr');
  }

  // Set title
  nodeModal.innerHTML = '';
  const title = document.createElement('h2');
  title.textContent = nodeData.labels[currentLanguage];
  nodeModal.appendChild(title);

  // Add close button
  const closeButton = document.createElement('button');
  closeButton.className = 'node-modal-close';
  closeButton.innerHTML = '&times;';
  closeButton.setAttribute('aria-label', 'Close');
  closeButton.addEventListener('click', closeNodeModal);
  nodeModal.appendChild(closeButton);

  // Set content
  nodeModalContent = document.createElement('div');
  nodeModalContent.className = 'node-modal-content';
  nodeModalContent.textContent = nodeData.translations[currentLanguage];
  nodeModal.appendChild(nodeModalContent);

  // Show modal and overlay
  nodeModal.style.display = 'block';
  nodeModalOverlay.style.display = 'block';

  // Add active class to the node
  const nodeElement = document.getElementById(`node-${nodeData.id}`);
  if (nodeElement) {
    nodeElement.classList.add('active');
  }
}

// Close the node info modal
function closeNodeModal() {
  nodeModal.style.display = 'none';
  nodeModalOverlay.style.display = 'none';

  // Remove active class from all nodes
  document.querySelectorAll('.node').forEach(node => {
    node.classList.remove('active');
  });

  selectedNode = null;
}

// Set language and update all nodes
function setLanguage(lang) {
  currentLanguage = lang;

  // Update node labels
  nodes.forEach(nodeData => {
    const nodeElement = document.getElementById(`node-${nodeData.id}`);
    if (nodeElement) {
      const labelElement = nodeElement.querySelector('.node-label');
      if (labelElement) {
        labelElement.textContent = nodeData.labels[lang];
      }
      nodeElement.setAttribute('aria-label', nodeData.labels[lang]);
    }
  });

  // Update modal content if open
  if (selectedNode && nodeModal.style.display === 'block') {
    showNodeInfo(selectedNode);
  }

  // Handle RTL languages
  if (lang === 'ar' || lang === 'fa' || lang === 'ur') {
    nodeModal.setAttribute('dir', 'rtl');
  } else {
    nodeModal.setAttribute('dir', 'ltr');
  }
}

// Adjust node positions and sizes for screen size
function adjustNodesForScreenSize() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Adjust scale factor for mobile
  let scaleFactor = 1;
  if (window.innerWidth <= 768) {
    scaleFactor = 0.8;
  }
  if (window.innerWidth <= 480) {
    scaleFactor = 0.6;
  }

  // Update node positions and sizes
  nodes.forEach(nodeData => {
    const nodeElement = document.getElementById(`node-${nodeData.id}`);
    if (nodeElement) {
      // Scale size
      const size = nodeData.r * 2 * scaleFactor;
      nodeElement.style.width = `${size}px`;
      nodeElement.style.height = `${size}px`;

      // Update position
      nodeElement.style.left = `${centerX + nodeData.x * scaleFactor - (nodeData.r * scaleFactor)}px`;
      nodeElement.style.top = `${centerY + nodeData.y * scaleFactor - (nodeData.r * scaleFactor)}px`;

      // Adjust font size
      const labelElement = nodeElement.querySelector('.node-label');
      if (labelElement) {
        const fontSize = Math.max(10, Math.min(16, nodeData.r / 3 * scaleFactor));
        labelElement.style.fontSize = `${fontSize}px`;
      }
    }
  });

  // Clear existing links
  const existingLinks = document.querySelectorAll('.node-link');
  existingLinks.forEach(link => link.remove());

  // Recreate links to match new positions
  links.forEach(link => {
    const fromNodeId = link[0];
    const toNodeId = link[1];

    // Find node data
    const fromNode = nodes.find(n => n.id === fromNodeId);
    const toNode = nodes.find(n => n.id === toNodeId);

    if (fromNode && toNode) {
      createLink(fromNode, toNode);
    }
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initNodeDisplay);

// Export functions for external use
window.NodeDisplay = {
  setLanguage,
  initNodeDisplay,
  adjustNodesForScreenSize
};
