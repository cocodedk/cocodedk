/*
 * Node Display JS - non-canvas version
 * For rendering and interacting with nodes as HTML elements
 */

// Create NodeDisplay namespace
window.NodeDisplay = {};

// Current language selection
let displayCurrentLanguage = 'en';

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

// Expose the initialization function
window.NodeDisplay.initNodeDisplay = initNodeDisplay;

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
    nodeElement.setAttribute('aria-label', nodeData.labels[displayCurrentLanguage]);

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
    labelElement.textContent = nodeData.labels[displayCurrentLanguage];
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
function createLink(fromNode, toNode, spacingMultiplier = 1) {
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
    scaleFactor = 0.75; // Match the updated scale factor
  }

  // Apply scale factor and spacing multiplier to positions
  const fromX = centerX + (fromNode.x * spacingMultiplier) * scaleFactor;
  const fromY = centerY + (fromNode.y * spacingMultiplier) * scaleFactor;
  const toX = centerX + (toNode.x * spacingMultiplier) * scaleFactor;
  const toY = centerY + (toNode.y * spacingMultiplier) * scaleFactor;

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
  if (displayCurrentLanguage === 'ar' || displayCurrentLanguage === 'fa' || displayCurrentLanguage === 'ur') {
    nodeModal.setAttribute('dir', 'rtl');
  } else {
    nodeModal.setAttribute('dir', 'ltr');
  }

  // Set title
  nodeModal.innerHTML = '';
  const title = document.createElement('h2');
  title.textContent = nodeData.labels[displayCurrentLanguage];
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
  const contentText = nodeData.translations[displayCurrentLanguage];
  // Convert URLs and emails to clickable links
  nodeModalContent.innerHTML = window.linkifyText ? window.linkifyText(contentText) : contentText;
  nodeModal.appendChild(nodeModalContent);

  // Show modal and overlay
  nodeModal.style.display = 'block';
  nodeModalOverlay.style.display = 'block';

  // Fix for mobile devices to ensure full screen coverage
  if (window.innerWidth <= 480) {
    // Force full viewport coverage on mobile
    nodeModal.style.height = `${window.innerHeight}px`;

    // Prevent body scrolling to avoid iOS safari issues
    document.body.style.overflow = 'hidden';
  }

  // Add active class to the node
  const nodeElement = document.getElementById(`node-${nodeData.id}`);
  if (nodeElement) {
    nodeElement.classList.add('active');
  }

  // Add parallax effect to title
  addTitleParallax();

  // Handle resize events for mobile
  const handleResize = () => {
    if (window.innerWidth <= 480 && nodeModal.style.display === 'block') {
      nodeModal.style.height = `${window.innerHeight}px`;
    }
  };

  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleResize);
}

// Add parallax effect to modal title
function addTitleParallax() {
  const title = document.querySelector('.node-modal h2');
  const modal = document.querySelector('.node-modal');

  if (!title || !modal) return;

  // Skip parallax effect for mobile devices
  if (window.innerWidth <= 768) {
    // Reset the title styling to ensure it displays properly on mobile
    title.style.transform = 'translateX(-50%)';
    title.style.filter = 'none';
    return;
  }

  modal.addEventListener('mousemove', (e) => {
    const rect = modal.getBoundingClientRect();
    const x = e.clientX - rect.left; // X position within the modal
    const y = e.clientY - rect.top;  // Y position within the modal

    // Calculate movement (limited to small range)
    const moveX = (x - rect.width / 2) / 50;
    const moveY = (y - rect.height / 2) / 50;

    // Apply the transform - subtle movement based on mouse position
    title.style.transform = `translateX(calc(-50% + ${moveX}px)) translateY(${moveY}px)`;

    // Also adjust the glow direction slightly
    title.style.filter = `drop-shadow(${moveX/2}px ${moveY/2}px 15px rgba(255,255,255,0.2))`;
  });

  // Reset when mouse leaves
  modal.addEventListener('mouseleave', () => {
    title.style.transform = 'translateX(-50%) translateY(0)';
    title.style.filter = 'drop-shadow(0 0 15px rgba(255,255,255,0.2))';
  });
}

// Close the node info modal
function closeNodeModal() {
  nodeModal.style.display = 'none';
  nodeModalOverlay.style.display = 'none';

  // Restore body scrolling
  document.body.style.overflow = '';

  // Remove active class from all nodes
  document.querySelectorAll('.node').forEach(node => {
    node.classList.remove('active');
  });

  selectedNode = null;
}

// Set language and update all nodes
function setLanguage(lang) {
  displayCurrentLanguage = lang;

  // Update nodes with new language
  updateNodeLabels(lang);
}

// Expose the setLanguage function
window.NodeDisplay.setLanguage = setLanguage;

// Update node labels to reflect the current language
function updateNodeLabels(lang) {
  try {
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
    if (selectedNode && nodeModal && nodeModal.style.display === 'block') {
      showNodeInfo(selectedNode);
    }

    // Handle RTL languages
    if (nodeModal) {
      if (lang === 'ar' || lang === 'fa' || lang === 'ur') {
        nodeModal.setAttribute('dir', 'rtl');
      } else {
        nodeModal.setAttribute('dir', 'ltr');
      }
    }
  } catch (e) {
    console.error('[TDD] Error updating node labels:', e);
  }
}

// Adjust node positions and sizes for screen size
function adjustNodesForScreenSize() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Adjust scale factor for mobile
  let scaleFactor = 1;
  let spacingMultiplier = 1; // Default spacing multiplier

  if (window.innerWidth <= 768) {
    scaleFactor = 0.8;
  }
  if (window.innerWidth <= 480) {
    scaleFactor = 0.75; // Increased from 0.7 for better visibility
    spacingMultiplier = 1.2; // Add more spacing between nodes at 480px
  }

  // Update node positions and sizes
  nodes.forEach(nodeData => {
    const nodeElement = document.getElementById(`node-${nodeData.id}`);
    if (nodeElement) {
      // Scale size but ensure minimum sizes for touch targets
      let size = nodeData.r * 2 * scaleFactor;

      // Set minimum size for proper touch targets on mobile
      if (window.innerWidth <= 480) {
        size = Math.max(size, 54); // Increased minimum size from 48px to 54px
      } else if (window.innerWidth <= 768) {
        size = Math.max(size, 44);
      }

      nodeElement.style.width = `${size}px`;
      nodeElement.style.height = `${size}px`;

      // Apply spacing multiplier to spread nodes out more at 480px
      const adjustedX = nodeData.x * spacingMultiplier;
      const adjustedY = nodeData.y * spacingMultiplier;

      // Update position
      nodeElement.style.left = `${centerX + adjustedX * scaleFactor - (size / 2)}px`;
      nodeElement.style.top = `${centerY + adjustedY * scaleFactor - (size / 2)}px`;

      // Adjust font size
      const labelElement = nodeElement.querySelector('.node-label');
      if (labelElement) {
        // Larger font size for smaller screens but keep it proportional to node size
        let fontSize = Math.max(12, Math.min(16, nodeData.r / 3 * scaleFactor));
        if (window.innerWidth <= 480) {
          fontSize = Math.max(13, fontSize); // Minimum 13px font on small screens
        }
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
      // Pass the spacing multiplier to createLink
      createLink(fromNode, toNode, spacingMultiplier);
    }
  });
}

// Expose the adjustNodesForScreenSize function for external use
window.NodeDisplay.adjustNodesForScreenSize = adjustNodesForScreenSize;

// Do NOT initialize automatically - this is now controlled by main.js
// document.addEventListener('DOMContentLoaded', initNodeDisplay);
