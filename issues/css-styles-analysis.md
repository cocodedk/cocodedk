# CSS Styles Analysis for Cytoscape Migration

This document analyzes the existing CSS styles from the HTML-based implementation and maps them to Cytoscape.js stylesheet format.

## Current CSS Style System

The current visualization uses CSS classes to style nodes and links with category-specific appearances. These styles are defined in `css/node-display.css`.

## Base Node Styles

### Current CSS
```css
.node {
  position: absolute;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  z-index: 51;
}

.node-label {
  color: #fff;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  text-align: center;
  pointer-events: none;
  padding: 0 5px;
  line-height: 1.2;
}
```

### Cytoscape Equivalent
```javascript
{
  selector: 'node',
  style: {
    'background-color': '#0077cc',
    'label': 'data(label)',
    'color': '#ffffff',
    'text-valign': 'center',
    'text-halign': 'center',
    'width': '60px',
    'height': '60px',
    'border-width': '2px',
    'border-color': '#33ccff',
    'font-family': 'Arial, sans-serif',
    'font-weight': 'bold',
    'text-outline-width': 1,
    'text-outline-color': 'rgba(0,0,0,0.5)',
    'text-outline-opacity': 0.5
  }
}
```

## Category-Specific Node Styles

### Current CSS
```css
/* Category-specific colors */
.node-cocode\.dk {
  background-color: #005577;
  border: 2px solid #00ccff;
}

.node-Software {
  background-color: #0077cc;
  border: 2px solid #33ccff;
}

.node-Cybersecurity {
  background-color: #cc0044;
  border: 2px solid #ff6688;
}

.node-Clients {
  background-color: #cc8800;
  border: 2px solid #ffcc33;
}
.node-Clients .node-label {
  color: #000000;
}

.node-Contact {
  background-color: #f1c40f;
  border: 2px solid #f39c12;
}
.node-Contact .node-label {
  color: #000000;
}
```

### Cytoscape Equivalent
```javascript
// Node category styles
{
  selector: '.cocode\\.dk',
  style: {
    'background-color': '#005577',
    'border-color': '#00ccff'
  }
},
{
  selector: '.Software',
  style: {
    'background-color': '#0077cc',
    'border-color': '#33ccff'
  }
},
{
  selector: '.Cybersecurity',
  style: {
    'background-color': '#cc0044',
    'border-color': '#ff6688'
  }
},
{
  selector: '.Clients',
  style: {
    'background-color': '#cc8800',
    'border-color': '#ffcc33',
    'color': '#000000',
    'text-outline-width': 0 // Remove text outline for dark text
  }
},
{
  selector: '.Contact',
  style: {
    'background-color': '#f1c40f',
    'border-color': '#f39c12',
    'color': '#000000',
    'text-outline-width': 0 // Remove text outline for dark text
  }
}
```

## Link/Edge Styles

### Current CSS
```css
.node-link {
  position: absolute;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.3);
  transform-origin: 0 0;
  pointer-events: none;
  z-index: 49;
}

/* Custom link colors based on categories */
.node-link.link-Software {
  background-color: rgba(51, 204, 255, 0.4);
}

.node-link.link-Cybersecurity {
  background-color: rgba(255, 102, 136, 0.4);
}
```

### Cytoscape Equivalent
```javascript
// Default edge style
{
  selector: 'edge',
  style: {
    'width': 2,
    'line-color': 'rgba(255, 255, 255, 0.3)',
    'curve-style': 'straight',
    'target-arrow-shape': 'none',
    'source-arrow-shape': 'none'
  }
},

// Edge category styles
{
  selector: 'edge.Software',
  style: {
    'line-color': 'rgba(51, 204, 255, 0.4)'
  }
},
{
  selector: 'edge.Cybersecurity',
  style: {
    'line-color': 'rgba(255, 102, 136, 0.4)'
  }
}
```

## Interactive States

### Current CSS
```css
.node:hover, .node:focus {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.node.active {
  transform: scale(1.1);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
}
```

### Cytoscape Equivalent
```javascript
// Interactive states
{
  selector: 'node:selected',
  style: {
    'border-width': '4px',
    'border-color': '#ffffff',
    'background-color': function(ele) {
      // Get the original background color and make it brighter
      const color = ele.style('background-color');
      return color; // For simplicity; could implement color brightening
    },
    'z-index': 100
  }
},
{
  selector: 'node.hover',
  style: {
    'border-width': '3px',
    'border-color': '#ffffff',
    'z-index': 90,
    'overlay-opacity': 0.1,
    'overlay-color': '#ffffff'
  }
}
```

## Responsive Styles

### Current CSS
```css
/* Mobile optimizations */
@media (max-width: 768px) {
  .node {
    min-width: 44px !important;
    min-height: 44px !important;
  }

  .node-label {
    font-size: 12px !important;
    color: #ffffff !important;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.8) !important;
    font-weight: bold !important;
  }
}
```

### Cytoscape Equivalent
In Cytoscape.js, responsive styling needs to be handled programmatically:

```javascript
// Update styles based on screen size
function updateResponsiveStyles() {
  const isMobile = window.innerWidth <= 768;

  cy.style()
    .selector('node')
    .style({
      'width': isMobile ? '44px' : '60px',
      'height': isMobile ? '44px' : '60px',
      'font-size': isMobile ? '12px' : '14px'
    })
    .update();
}

// Call on resize
window.addEventListener('resize', updateResponsiveStyles);
```

## Accessibility Styles

### Current CSS
```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
```

### Implementation Notes
For accessibility styles, it's best to maintain these in regular CSS rather than trying to implement them in Cytoscape styles, as they apply to the parallel DOM structure for accessibility.

## Animation Effects
Current animations (scaling, fading, etc.) will need to be implemented using Cytoscape.js animation functions rather than CSS transitions/animations.

## Style Migration Strategy

1. **Basic Styles First**: Implement core node/edge styles first
2. **Interactive States**: Add hover/select states
3. **Custom Category Styling**: Implement category-specific styles
4. **Responsive Adaptation**: Add screen-size-based style adjustments
5. **Animation Effects**: Add animations using Cytoscape.js methods

## Testing Approach

To ensure visual parity with the original implementation, we should:

1. Create a set of test cases for each style category (base, category-specific, interactive)
2. Compare visual snapshots of original vs. Cytoscape implementation
3. Test on multiple screen sizes and devices
4. Verify interactive state appearances match the original implementation
