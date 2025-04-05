const DEBUG_MODE = false;
const LOGGER_MODE = false;

const debug = document.getElementById('debug');

if (!DEBUG_MODE) {
    debug.style.display = 'none';
}

// Initialize canvas and context
const canvas = document.getElementById('graph');
const ctx = canvas.getContext('2d');
const infoBox = document.getElementById('infoBox');

// Check if animation system is available
let nodeAnimationSystem;
if (typeof NodeAnimation !== 'undefined') {
  nodeAnimationSystem = NodeAnimation;
}

// Track hovered and selected nodes
let hoveredNode = null;
let lastClickedNode = null;

// Node colors and styles
const colors = {
    default: {
        fill: '#333',
        stroke: '#aaa',
        text: '#fff'
    },
    hover: {
        fill: '#4a4a4a',
        stroke: '#ddd',
        text: '#fff'
    },
    categories: {
        'cocode.dk': { fill: '#005577', stroke: '#00ccff', text: '#ffffff' },
        'Software': { fill: '#0077cc', stroke: '#33ccff', text: '#ffffff' },
        'Cybersecurity': { fill: '#cc0044', stroke: '#ff6688', text: '#ffffff' },
        'Clients': { fill: '#cc8800', stroke: '#ffcc33', text: '#000000' },
        'Contact': { fill: '#f1c40f', stroke: '#f39c12', text: '#000000' }
    }
};

// Color utility functions
function lightenColor(hex, percent) {
  // Convert hex to RGB
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  // Lighten
  r = Math.min(255, Math.floor(r * (1 + percent / 100)));
  g = Math.min(255, Math.floor(g * (1 + percent / 100)));
  b = Math.min(255, Math.floor(b * (1 + percent / 100)));

  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function getContrastColor(hex) {
  // Convert hex to RGB
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  // Calculate luminance - using relative luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black for bright colors, white for dark colors
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

if(DEBUG_MODE) {
    console.log('Nodes defined:', nodes.length);
}

if(DEBUG_MODE) {
    console.log('Links defined:', links.length);
}

// Add at the top of the script
let animationState = {
    active: false,
    currentInterval: null,
    queue: []
};

// Add this near the top of your script
let currentLanguage = 'en';

// Updated language change function
function setLanguage(lang) {
    // Update currentLanguage
    currentLanguage = lang;

    // Update active class and ARIA attributes
    const langItems = document.querySelectorAll('.lang-item');
    langItems.forEach(item => {
    item.classList.remove('active');
    item.setAttribute('aria-selected', 'false');

    if (item.dataset.lang === lang) {
        item.classList.add('active');
        item.setAttribute('aria-selected', 'true');
    }
    });

    // Set RTL direction for Arabic, Persian, and Urdu
    if (lang === 'ar' || lang === 'fa' || lang === 'ur') {
    infoBox.setAttribute('dir', 'rtl');
    } else {
    infoBox.setAttribute('dir', 'ltr');
    }

    // Update infoBox if it's visible
    if (infoBox.style.display === 'block' && hoveredNode) {
    infoBox.innerHTML = '';
    applyTextEffect(hoveredNode.translations[currentLanguage], infoBox);
    }

    // Redraw graph
    drawGraph();

    // Auto-hide the language menu in responsive mode
    if (window.innerWidth <= 768) {
        const langMenu = document.getElementById('languageSelector');
        const langToggle = document.getElementById('langToggle');

        // Add a small delay to allow the user to see their selection first
        setTimeout(() => {
            // Hide menu with slide-out animation
            langMenu.classList.remove('active');

            // Update aria-expanded attribute
            langToggle.setAttribute('aria-expanded', 'false');

            // Remove keyboard listener for escape key
            document.removeEventListener('keydown', closeMenuOnEscape);

            // Add a brief confirmation message
            const confirmation = document.createElement('div');
            confirmation.className = 'lang-confirmation';

            // Find the active language item to get the correct language code
            const activeItem = document.querySelector('.lang-item.active');
            const langCode = activeItem ? activeItem.querySelector('.lang-code').textContent : lang.toUpperCase();

            confirmation.textContent = 'Language set to ' + langCode;
            document.body.appendChild(confirmation);

            // Fade in the confirmation
            setTimeout(() => {
                confirmation.style.opacity = '1';
            }, 10);

            // Remove after 2 seconds
            setTimeout(() => {
                confirmation.style.opacity = '0';
                setTimeout(() => {
                    if (confirmation.parentNode) {
                        document.body.removeChild(confirmation);
                    }
                }, 300);
            }, 2000);
        }, 300);
    }
}

// Handle keyboard navigation for language selector
function handleLanguageKeydown(event, lang) {
    // Enter or Space key
    if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    setLanguage(lang);
    }

    // Arrow Up/Down for navigation
    else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault();

    const langItems = Array.from(document.querySelectorAll('.lang-item'));
    const currentIndex = langItems.findIndex(item => item.dataset.lang === lang);
    let nextIndex;

    if (event.key === 'ArrowUp') {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : langItems.length - 1;
    } else {
        nextIndex = currentIndex < langItems.length - 1 ? currentIndex + 1 : 0;
    }

    langItems[nextIndex].focus();
    }
}

// Helper function to resize canvas and maintain centering
function resizeCanvas() {
    if(DEBUG_MODE) {
        console.log('Resizing canvas to window size:', window.innerWidth, 'x', window.innerHeight);
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (DEBUG_MODE) {
        debug.textContent = `Canvas size: ${canvas.width} x ${canvas.height}`;
    }

    // Recalculate node sizes based on screen size
    adjustNodeSizesForScreenWidth();

    centerGraph();
    drawGraph();
}

// New function to adjust node sizes based on screen width
function adjustNodeSizesForScreenWidth() {
    const screenWidth = window.innerWidth;

    // Scale factor based on screen width
    let scaleFactor = 1;

    if (screenWidth <= 480) {
        // Small mobile screens
        scaleFactor = 0.65;
    } else if (screenWidth <= 768) {
        // Medium mobile screens
        scaleFactor = 0.75;
    } else if (screenWidth <= 992) {
        // Tablets
        scaleFactor = 0.85;
    }

    // Apply scaling to original node sizes
    nodes.forEach(node => {
        // If original radius doesn't exist, create it
        if (!node.originalR) {
            node.originalR = node.r;
        }

        // Scale the radius
        node.r = node.originalR * scaleFactor;
    });

    if (DEBUG_MODE) {
        debug.textContent += `\nNode scale: ${scaleFactor.toFixed(2)}`;
    }
}

// Function to calculate text width and adjust node radius if needed
function calculateNodeRadius(node) {
    const screenWidth = window.innerWidth;

    // Determine font size based on screen size
    let fontSize = 12; // Default font size
    if (screenWidth <= 480) {
        fontSize = 9;
    } else if (screenWidth <= 768) {
        fontSize = 10;
    }

    ctx.font = `${fontSize}px sans-serif`;

    // Get the appropriate text to measure based on the current language
    const nodeText = (node.labels && node.labels[currentLanguage]) ? node.labels[currentLanguage] : node.id;

    const textWidth = ctx.measureText(nodeText).width;

    // Base padding adjusted for mobile
    let padding = 15;
    if (screenWidth <= 768) {
        padding = 10; // Less padding on mobile
    }

    // Calculate minimum radius needed to contain text
    const textRadius = (textWidth / 2) + padding;

    // If we have an original radius stored, use that as base
    const baseRadius = node.originalR || node.r;

    // For mobile, we might want to cap the maximum radius to prevent overlapping
    if (screenWidth <= 480) {
        return Math.min(Math.max(baseRadius, textRadius), 35); // Cap at 35px for very small screens
    } else if (screenWidth <= 768) {
        return Math.min(Math.max(baseRadius, textRadius), 45); // Cap at 45px for medium mobile
    } else {
        return Math.max(baseRadius, textRadius); // No cap for larger screens
    }
}

// Function to center the graph in the canvas
function centerGraph() {
    if (nodeAnimationSystem && nodeAnimationSystem.isRunning) {
        if(DEBUG_MODE) {
            console.log('Skipping centering due to active animations');
        }
        return;
    }
    if(DEBUG_MODE) {
        console.log('Centering graph');
    }
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Determine spacing factor based on screen width
    const screenWidth = window.innerWidth;
    let spacingFactor = 1;

    if (screenWidth <= 480) {
        // Increase vertical spacing on small screens
        spacingFactor = 1.3;
    } else if (screenWidth <= 768) {
        spacingFactor = 1.15;
    }

    nodes.forEach(node => {
      // Store original position as offsets from center
      if (!node.hasOwnProperty('offsetX')) {
        node.offsetX = node.x;
        node.offsetY = node.y;
      }

      // For mobile screens, adjust vertical positioning more than horizontal
      let adjustedOffsetX = node.offsetX;
      let adjustedOffsetY = node.offsetY;

      if (screenWidth <= 768) {
          // On mobile, adjust Y offset more than X offset to create more vertical spacing
          adjustedOffsetY = node.offsetY * spacingFactor;
      }

      // Update position based on canvas center
      node.x = centerX + adjustedOffsetX;
      node.y = centerY + adjustedOffsetY;

      // Ensure radius is appropriate for text
      node.r = calculateNodeRadius(node);
    });

    // Log the position of the central node
    const centralNode = nodes.find(n => n.id === 'cocode.dk');
    if (centralNode) {
        if (DEBUG_MODE) {
            debug.textContent += `\nCenter node: ${centralNode.x.toFixed(0)},${centralNode.y.toFixed(0)}`;
        }
    }
}

// Function to draw a node
function drawNode(node) {
    // Determine if this node is hovered or selected
    const isHovered = (hoveredNode === node);
    const isSelected = (lastClickedNode && node.id === lastClickedNode.id);
    const shouldGlow = isHovered || isSelected;

    // Determine colors based on node state and category
    let fillColor, strokeColor, textColor;

    if (isHovered) {
        // Use category-specific hover colors
        if (categoryHoverColors[node.category]) {
            fillColor = categoryHoverColors[node.category].fill;
            strokeColor = categoryHoverColors[node.category].stroke;
            textColor = categoryHoverColors[node.category].text;
        } else {
            fillColor = colors.hover.fill;
            strokeColor = colors.hover.stroke;
            textColor = colors.hover.text;
        }
    } else if (colors.categories[node.category]) {
        fillColor = colors.categories[node.category].fill;
        strokeColor = colors.categories[node.category].stroke;
        textColor = colors.categories[node.category].text;
    } else {
        fillColor = colors.default.fill;
        strokeColor = colors.default.stroke;
        textColor = colors.default.text;
    }

    // Apply glow effect if node should glow
    if (shouldGlow) {
        ctx.shadowBlur = isSelected ? 15 : 10;
        ctx.shadowColor = strokeColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    } else {
        // Reset shadow
        ctx.shadowBlur = 0;
    }

    // Draw node circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = isHovered ? 2 : 1;
    ctx.stroke();

    // Reset shadow for text drawing to prevent text glow
    ctx.shadowBlur = 0;

    // Determine font size based on screen width and node size
    const screenWidth = window.innerWidth;
    let fontSize = 12; // Default font size

    if (screenWidth <= 480) {
        // Very small screens - scale font down proportionally with node size
        fontSize = Math.max(9, Math.floor(node.r / 3));
    } else if (screenWidth <= 768) {
        // Medium mobile screens
        fontSize = Math.max(10, Math.floor(node.r / 3));
    }

    // Draw node text inside the circle in the selected language
    // If no label exists for the language, fall back to the node ID
    ctx.fillStyle = textColor;
    ctx.font = `${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Use node.labels[currentLanguage] if it exists, otherwise use node.id
    const nodeText = (node.labels && node.labels[currentLanguage]) ? node.labels[currentLanguage] : node.id;

    // Text truncation for small screens if the text is too long for the node
    let displayText = nodeText;
    if (screenWidth <= 768) {
        const maxTextWidth = node.r * 1.8; // Maximum text width based on node radius
        const textWidth = ctx.measureText(nodeText).width;

        if (textWidth > maxTextWidth) {
            // Truncate text and add ellipsis
            let truncated = nodeText;
            while (ctx.measureText(truncated + '...').width > maxTextWidth && truncated.length > 0) {
                truncated = truncated.slice(0, -1);
            }
            if (truncated.length < nodeText.length) {
                displayText = truncated + '...';
            }
        }
    }

    ctx.fillText(displayText, node.x, node.y);
}

// Function to draw a link between nodes
function drawLink(from, to) {
    if (!from || !to) {
    console.error('Missing node in link', from, to);
    return;
    }

    // Determine if this link should glow
    const isConnectedToHovered = (hoveredNode && (from.id === hoveredNode.id || to.id === hoveredNode.id));
    const isConnectedToSelected = (lastClickedNode && (from.id === lastClickedNode.id || to.id === lastClickedNode.id));
    const shouldGlow = isConnectedToHovered || isConnectedToSelected;

    // Apply glow effect if the link should glow
    if (shouldGlow) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = isConnectedToHovered ? '#aaa' : '#888';
        ctx.lineWidth = 2;
    } else {
        ctx.shadowBlur = 0;
        ctx.lineWidth = 1;
    }

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.strokeStyle = shouldGlow ? '#777' : '#555';
    ctx.stroke();

    // Reset shadow after drawing
    ctx.shadowBlur = 0;
}

// Function to draw the entire graph
function drawGraph() {
    if(DEBUG_MODE) {
        console.log('Drawing graph');
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Apply any active animations to node positions
  if (nodeAnimationSystem && typeof nodeAnimationSystem.updateNodePositions === 'function') {
    nodeAnimationSystem.updateNodePositions(nodes);
  }

  // Draw links first (so they appear behind nodes)
  links.forEach(link => {
    const from = nodes.find(n => n.id === link[0]);
    const to = nodes.find(n => n.id === link[1]);

    if (!from || !to) {
      console.error('Could not find nodes for link:', link);
      return;
    }

    drawLink(from, to);
  });

  // Draw nodes on top
  nodes.forEach(drawNode);

    if(DEBUG_MODE) {
        console.log('Graph drawn');
    }
}

// Function to find a node under the mouse cursor
function getMouseNode(mx, my) {
    return nodes.find(node => {
    const dx = mx - node.x;
    const dy = my - node.y;
    return dx * dx + dy * dy < node.r * node.r;
    });
}

// Modified applyTextEffect
function applyTextEffect(newText, element) {
    // Queue system unchanged
    if (animationState.active) {
    animationState.queue.push(newText);
    element.style.cursor = 'progress';
    return;
    }

    animationState.active = true;

    // Create containers for new content (prepend instead of replace)
    const entryContainer = document.createElement('div');
    const header = document.createElement('div');
    header.className = 'new-entry';

    // Prepend to element (instead of clearing first)
    element.prepend(entryContainer);
    entryContainer.appendChild(header);

    let index = 0;
    animationState.currentInterval = setInterval(() => {
    if (index < newText.length) {
        header.textContent = newText.substring(0, index) +
                        String.fromCharCode(33 + Math.floor(Math.random() * 94));
        index++;
    } else {
        clearInterval(animationState.currentInterval);
        header.textContent = newText;
        // Add separator
        const separator = document.createElement('div');
        separator.className = 'entry-separator';
        entryContainer.appendChild(separator);

        // Process queue
        animationState.active = false;
        if (animationState.queue.length > 0) {
        applyTextEffect(animationState.queue.shift(), element);
        }
        element.style.cursor = 'default';

        // Mark previous entries
        Array.from(element.querySelectorAll('.new-entry')).forEach(el => {
        if (el !== header) el.classList.add('old-entry');
        });

        // Check if we need to remove old entries after adding new content
        checkInfoBoxHeight();
    }
    }, 10);
}

// Mouse move event handler
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  // Find node under cursor
  const nodeUnderCursor = getMouseNode(mx, my);

  // Handle hover effects
  if (nodeUnderCursor) {
    // Set hover state
    if (hoveredNode !== nodeUnderCursor) {
      hoveredNode = nodeUnderCursor;
      drawGraph(); // Redraw with hover effect
    }
  } else {
    // Reset hover state
    if (hoveredNode !== null) {
      hoveredNode = null;
      drawGraph(); // Redraw without hover effect
    }
  }
});

// Click event handler
canvas.addEventListener('click', (e) => {
    if (animationState.active) {
      infoBox.classList.add('busy');
      setTimeout(() => infoBox.classList.remove('busy'), 200);
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const clicked = getMouseNode(mx, my);
    if (clicked) {
      // Track selected node for glow effect
      lastClickedNode = clicked;

      // Special handling for Contact node
      if (clicked.id === 'Contact') {
        // The modal handling is done in contact-modal.js
        // Just update the glow effect here
        drawGraph();
        return;
      }

      // Show info box
      infoBox.style.display = 'block';

      // Ensure infoBox is positioned correctly based on responsive mode
      adjustInfoBoxPosition();

      // Clear previous content before adding new text
      applyTextEffect(clicked.translations[currentLanguage], infoBox);

      // Get the node text in current language for debug output
      const nodeText = (clicked.labels && clicked.labels[currentLanguage])
        ? clicked.labels[currentLanguage]
        : clicked.id;

      if (DEBUG_MODE) {
        debug.textContent += `\nClicked: ${nodeText}`;
      }
    } else {
      // Clear selection when clicking empty space
      lastClickedNode = null;
      infoBox.style.display = 'none';
    }

    // Redraw to show selection glow
    drawGraph();
});

// Function to adjust infoBox position based on screen size
function adjustInfoBoxPosition() {
  // Get the current window width
  const windowWidth = window.innerWidth;

  // No need to adjust position if styles already handle it via CSS
  // This function is just to ensure any dynamic positioning needed
  // For example, we could calculate exact positions based on title container height:

  if (windowWidth <= 480) {
    // Very small screens - position is managed by CSS but we could add special handling here
    checkInfoBoxOverlap(); // Check for any overlap with nodes
  } else if (windowWidth <= 768) {
    // Medium mobile screens
    checkInfoBoxOverlap();
  } else {
    // Desktop - standard position
    checkInfoBoxOverlap();
  }
}

// Window resize handler
window.addEventListener('resize', function() {
  resizeCanvas();

  // If infoBox is visible, adjust its position
  if (infoBox.style.display === 'block') {
    adjustInfoBoxPosition();
  }
});

// Initialize language menu toggle for mobile
document.getElementById('langToggle').addEventListener('click', function() {
    const menu = document.getElementById('languageSelector');
    menu.classList.toggle('active');

    // Toggle aria-expanded attribute
    const expanded = menu.classList.contains('active');
    this.setAttribute('aria-expanded', expanded);

    // Add tooltip effect
    if (expanded) {
      const tooltip = document.createElement('div');
      tooltip.className = 'lang-tooltip';
      tooltip.textContent = 'Choose your language';
      tooltip.style.position = 'fixed';
      tooltip.style.top = (this.getBoundingClientRect().bottom + 10) + 'px';
      tooltip.style.right = '20px';
      tooltip.style.backgroundColor = 'rgba(0,0,0,0.8)';
      tooltip.style.color = '#fff';
      tooltip.style.padding = '8px 12px';
      tooltip.style.borderRadius = '4px';
      tooltip.style.fontSize = '14px';
      tooltip.style.zIndex = '1002';
      tooltip.style.opacity = '0';
      tooltip.style.transition = 'opacity 0.3s ease';
      document.body.appendChild(tooltip);

      // Fade in tooltip
      setTimeout(() => {
        tooltip.style.opacity = '1';
      }, 10);

      // Remove tooltip after 3 seconds
      setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
          if (tooltip.parentNode) {
            document.body.removeChild(tooltip);
          }
        }, 300);
      }, 3000);
    }

    // Add escape key listener when menu is open
    if (expanded) {
      document.addEventListener('keydown', closeMenuOnEscape);
    } else {
      document.removeEventListener('keydown', closeMenuOnEscape);
    }
});

// Function to close menu on Escape key
function closeMenuOnEscape(e) {
    if (e.key === 'Escape') {
    const menu = document.getElementById('languageSelector');
    menu.classList.remove('active');
    document.getElementById('langToggle').setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', closeMenuOnEscape);
    }
}

// Initial rendering
if(DEBUG_MODE) {
    console.log('Starting initial rendering');
}
resizeCanvas();

// Force a redraw after a short delay to ensure canvas is properly sized
setTimeout(() => {
    console.log('Forced redraw after timeout');
    resizeCanvas();
}, 100);

// Matrix title animation
function animateMatrixTitle() {
    const title = document.getElementById('site-title');
    const originalText = "Cocode.dk";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let interval;
    let position = 0;

    // Initialize with scrambled text
    let currentText = originalText.split('').map(() =>
    chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');

    title.textContent = currentText;

    interval = setInterval(() => {
    let updated = currentText.split('');

    if (position < originalText.length) {
        // Gradually reveal the correct characters
        updated[position] = originalText[position];
        position++;
    } else {
        // Randomly change one character occasionally for ongoing effect
        if (Math.random() < 0.2) {
        const randomPos = Math.floor(Math.random() * originalText.length);
        updated[randomPos] = chars.charAt(Math.floor(Math.random() * chars.length));

        // Reset it after a brief pause
        setTimeout(() => {
            let reset = title.textContent.split('');
            reset[randomPos] = originalText[randomPos];
            title.textContent = reset.join('');
        }, 100);
        }
    }

    currentText = updated.join('');
    title.textContent = currentText;
    }, 100);
}

// Start the Matrix title animation
animateMatrixTitle();

// Add after node definitions
function checkInfoBoxOverlap() {
    const infoBoxRect = infoBox.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();

    // Check overlap with any node
    const overlap = nodes.some(node => {
    const nodeX = canvasRect.left + node.x - (node.r * 2);
    const nodeY = canvasRect.top + node.y;
    const nodeRight = nodeX + node.r;
    const nodeBottom = nodeY + node.r;

    return (
        nodeX < infoBoxRect.right &&
        nodeRight > infoBoxRect.left &&
        nodeY < infoBoxRect.bottom &&
        nodeBottom > infoBoxRect.top
    );
    });

    infoBox.classList.toggle('canvas-overlap', overlap);
    return overlap;
}

function checkInfoBoxHeight() {
    const infoBoxRect = infoBox.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    let entriesRemoved = 0;

    // Continue removing oldest entries until box is at safe distance from bottom
    // or until we have only a minimum number of entries left
    while (infoBoxRect.bottom > viewportHeight - 50 &&
            infoBox.children.length > 2 && // Keep at least 1 entry and its separator
            entriesRemoved < 5) { // Safety limit to prevent infinite loop

    // Remove oldest entry (last child element) - usually a separator
    infoBox.removeChild(infoBox.lastElementChild);

    // If there's still content, also remove the entry itself
    if (infoBox.lastElementChild) {
        infoBox.removeChild(infoBox.lastElementChild);
    }

    entriesRemoved++;

    // Get updated position
    infoBoxRect = infoBox.getBoundingClientRect();
    }

    if (entriesRemoved > 0) {
        if(DEBUG_MODE) {
            console.log(`Removed ${entriesRemoved} old entries from infoBox`);
        }
    }
}

// Create ResizeObserver for infoBox
const resizeObserver = new ResizeObserver(entries => {
    checkInfoBoxHeight(); // New height check
    if (checkInfoBoxOverlap()) {
    infoBox.classList.add('canvas-overlap');
    } else {
    infoBox.classList.remove('canvas-overlap');
    }
});

resizeObserver.observe(infoBox);

// Add initial check
setTimeout(() => checkInfoBoxOverlap(), 100);

// Add scroll event listener to check infoBox height
window.addEventListener('scroll', () => {
    if (infoBox.style.display === 'block') {
    checkInfoBoxHeight();
    }
});

// Add scroll effect for header
window.addEventListener('scroll', function() {
  const headerContainer = document.querySelector('.header-container');
  const scrollPos = window.scrollY;

  if (scrollPos > 50) {
    headerContainer.style.background = 'linear-gradient(to bottom, rgba(20, 10, 30, 0.9), rgba(20, 10, 30, 0.7))';
    headerContainer.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
  } else {
    headerContainer.style.background = 'linear-gradient(to bottom, rgba(20, 10, 30, 0.7), transparent)';
    headerContainer.style.boxShadow = 'none';
  }
});

// Add responsive position handling for language toggle
function updateTogglePosition() {
  const langToggle = document.getElementById('langToggle');
  const titleContainer = document.getElementById('title-container');
  const isLandscape = window.innerWidth > window.innerHeight;
  const isMobile = window.innerWidth <= 768;
  const isVerySmall = window.innerWidth <= 480;
  const scrollPosition = window.scrollY;

  // Default position
  let topPosition = '20px';
  let rightPosition = '20px';

  // Make sure title is always visible, especially on small screens
  if (titleContainer) {
    if (isVerySmall) {
      titleContainer.style.display = 'block';
      titleContainer.style.visibility = 'visible';
      titleContainer.style.opacity = '1';
      titleContainer.style.zIndex = '1001';

      // Adjust title container position on very small screens
      titleContainer.style.maxWidth = '65%';
      titleContainer.style.left = '15px';
    } else if (isMobile) {
      // For medium mobile screens
      titleContainer.style.maxWidth = '70%';
      titleContainer.style.left = '20px';
    }
  }

  if (isMobile) {
    if (isLandscape) {
      // In landscape mobile, position in bottom right
      topPosition = 'auto';
      langToggle.style.bottom = '20px';
    } else {
      // In portrait mobile, adjust based on scroll
      if (scrollPosition > 100) {
        // When scrolled down, move to bottom right for easier access
        topPosition = 'auto';
        langToggle.style.bottom = '20px';
      } else {
        // When at top, position in top right
        topPosition = '15px';
        langToggle.style.bottom = 'auto';
      }
    }

    // Add floating animation when repositioned to bottom
    if (langToggle.style.bottom && langToggle.style.bottom !== 'auto') {
      langToggle.classList.add('floating');
    } else {
      langToggle.classList.remove('floating');
    }
  } else {
    // On desktop, keep in top right
    topPosition = '20px';
    langToggle.style.bottom = 'auto';
    langToggle.classList.remove('floating');
  }

  langToggle.style.top = topPosition;
  langToggle.style.right = rightPosition;
}

// Listen for changes that would affect position
window.addEventListener('resize', updateTogglePosition);
window.addEventListener('scroll', updateTogglePosition);
window.addEventListener('orientationchange', updateTogglePosition);

// Initialize position
document.addEventListener('DOMContentLoaded', function() {
  updateTogglePosition();
});

// Add node event listeners
function addNodeEventListeners() {
    // Mouse events for desktop
    canvas.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Check if mouse is over a node
        const nodeUnderMouse = getMouseNode(mouseX, mouseY);

        if (nodeUnderMouse !== hoveredNode) {
            hoveredNode = nodeUnderMouse;
            canvas.style.cursor = hoveredNode ? 'pointer' : 'default';
            drawGraph();
        }
    });

    // Touch events for mobile
    canvas.addEventListener('touchstart', e => {
        e.preventDefault(); // Prevent mousedown from firing as well
        if (e.touches.length === 1) {
            const rect = canvas.getBoundingClientRect();
            const touchX = e.touches[0].clientX - rect.left;
            const touchY = e.touches[0].clientY - rect.top;

            // Check if touch is on a node
            const touchedNode = getMouseNode(touchX, touchY);

            if (touchedNode) {
                lastClickedNode = touchedNode;
                showNodeInfo(touchedNode);
                drawGraph();
            } else {
                // Touch not on a node, hide info
                hideNodeInfo();
                lastClickedNode = null;
                drawGraph();
            }
        }
    });

    // Add orientation change listener for mobile
    window.addEventListener('orientationchange', () => {
        // Small delay to allow the browser to update dimensions
        setTimeout(() => {
            if(DEBUG_MODE) {
                console.log('Orientation changed, resizing and repositioning nodes');
            }
            resizeCanvas();
            adjustNodeSizesForScreenWidth();
            centerGraph();
            drawGraph();
        }, 200);
    });
}

// Function to validate that nodes are properly loaded from nodes.js
function validateNodesLoaded() {
  if (typeof nodes === 'undefined' || !Array.isArray(nodes) || nodes.length === 0) {
    console.error('Nodes not properly loaded from nodes.js. Make sure nodes.js is included before main.js.');
    // Create a fallback empty nodes array to prevent errors
    return false;
  }

  if (DEBUG_MODE) {
    console.log('Nodes successfully loaded from nodes.js:', nodes.length);
  }
  return true;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Validate that nodes are properly loaded
    if (!validateNodesLoaded()) {
      console.error('Cannot initialize application without nodes data.');
      return;
    }

    // Ensure title container is visible regardless of screen size
    const titleContainer = document.getElementById('title-container');
    if (titleContainer) {
        titleContainer.style.display = 'block';
        titleContainer.style.visibility = 'visible';
        titleContainer.style.opacity = '1';
    }

    // Initialize other components
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Add node event listeners
    addNodeEventListeners();

    // Create node links
    links = createNodeLinks();

    // Center the graph initially
    centerGraph();

    // Draw the graph for the first time
    drawGraph();

    // Set up click and touch events for node interaction
    setupNodeInteraction();

    // Initialize language toggles
    initLanguageSelector();

    // Add the rest of the initialization code
    updateTogglePosition();

    // Handle window resize specifically for title visibility
    window.addEventListener('resize', function() {
        // Ensure title remains visible on small screens
        if (window.innerWidth <= 480) {
            if (titleContainer) {
                titleContainer.style.display = 'block';
                titleContainer.style.visibility = 'visible';
                titleContainer.style.opacity = '1';
                titleContainer.style.zIndex = '1001';
            }
        }
    });
});

// Set up click and touch events for node interaction
function setupNodeInteraction() {
    canvas.addEventListener('click', e => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const clickedNode = getMouseNode(mouseX, mouseY);

        if (clickedNode) {
            lastClickedNode = clickedNode;
            showNodeInfo(clickedNode);
            drawGraph();
        } else {
            // Click not on a node, hide info
            hideNodeInfo();
            lastClickedNode = null;
            drawGraph();
        }
    });

    // Pan and zoom for mobile (basic implementation)
    let isDragging = false;
    let lastX, lastY;
    let pinchStartDistance = 0;
    let currentScale = 1;

    // Touch start
    canvas.addEventListener('touchstart', e => {
        if (e.touches.length === 1) {
            isDragging = true;
            lastX = e.touches[0].clientX;
            lastY = e.touches[0].clientY;
        } else if (e.touches.length === 2) {
            // Pinch to zoom start
            pinchStartDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
        }
    });

    // Touch move
    canvas.addEventListener('touchmove', e => {
        if (isDragging && e.touches.length === 1) {
            // Simple panning
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;

            const dx = touchX - lastX;
            const dy = touchY - lastY;

            // Move all nodes
            nodes.forEach(node => {
                node.x += dx;
                node.y += dy;
            });

            lastX = touchX;
            lastY = touchY;

            drawGraph();
        } else if (e.touches.length === 2) {
            // Pinch to zoom
            const currentDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );

            if (pinchStartDistance > 0) {
                const newScale = currentDistance / pinchStartDistance;
                const scaleFactor = newScale / currentScale;

                if (scaleFactor > 0.8 && scaleFactor < 1.2) { // Limit abrupt changes
                    // Find center point between fingers
                    const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
                    const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

                    // Scale nodes relative to the center point
                    const rect = canvas.getBoundingClientRect();
                    const canvasCenterX = centerX - rect.left;
                    const canvasCenterY = centerY - rect.top;

                    nodes.forEach(node => {
                        // Calculate distance from center
                        const dx = node.x - canvasCenterX;
                        const dy = node.y - canvasCenterY;

                        // Scale distance
                        node.x = canvasCenterX + dx * scaleFactor;
                        node.y = canvasCenterY + dy * scaleFactor;

                        // Scale radius for consistency
                        node.r *= scaleFactor;
                    });

                    currentScale = newScale;
                    drawGraph();
                }
            }

            pinchStartDistance = currentDistance;
        }
    });

    // Touch end
    canvas.addEventListener('touchend', e => {
        isDragging = false;
        if (e.touches.length < 2) {
            pinchStartDistance = 0;
        }
    });
}

// Function to create node links from the imported links array
function createNodeLinks() {
  // Verify links from nodes.js
  try {
    // If we already have pre-defined links from nodes.js, use those
    if (typeof links !== 'undefined' && Array.isArray(links)) {
      if(DEBUG_MODE) {
        console.log('Using pre-defined links from nodes.js:', links.length);
      }
      return links;
    } else {
      if(DEBUG_MODE) {
        console.warn('Links array from nodes.js is not properly defined or is not an array');
      }
    }
  } catch (e) {
    console.error('Error accessing links from nodes.js:', e);
  }

  // If no links are defined or there was an error, return an empty array
  if(DEBUG_MODE) {
    console.log('No pre-defined links found, returning empty array');
  }
  return [];
}
