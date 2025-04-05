# System Patterns

## Architecture Overview
The website is built using a simple, dependency-free HTML/CSS/JavaScript architecture:

```
index.html
├── Canvas-based rendering
├── External CSS styling (styles.css)
└── External JavaScript (js/main.js, js/node-animation.js, js/contact-modal.js)
    ├── Data structures (nodes, links)
    ├── Rendering functions
    ├── Event handlers
    ├── Animation systems
    │   ├── Text typing effects
    │   ├── Matrix title animation
    │   ├── Node animation system
    │   └── CSS keyframe animations
    ├── Language management
    ├── InfoBox management
    ├── Contact protection system
    └── Responsive behavior handlers
```

Cocode.dk is built as a single-page application with the following components:

- **HTML Structure**: Core markup defining the DOM structure
- **CSS Styling**: Visual appearance and animations
  - External CSS file for better maintainability
- **JavaScript Logic**: Interactive behavior and data manipulation
  - Multiple JavaScript files organized by functionality
- **Canvas Rendering**: Graph visualization
- **Language System**: Multi-language support
- **InfoBox Management**: Dynamic content display system
- **Contact Modal**: Secure display of sensitive information
- **Animation System**: Modular animation capabilities

## Core Design Patterns

### Graph Visualization Pattern
- Nodes represent services/technologies
- Links represent relationships between nodes
- Force-directed layout (simplified)
- Node categorization by color/style
- Language-aware text rendering inside nodes
- Glow effects for hovered and selected nodes

### Data Structure Patterns
- Node objects with comprehensive properties:
  - Position (x, y)
  - Size (r)
  - Identification (id)
  - Category assignment
  - Multilingual translations for detailed content
  - Multilingual label translations for node display
- Link arrays defining node relationships

### Interaction Patterns
- Hover state management with visual feedback
- Click-based information display in infoBox
- Vertical language selection with flag icons
- Keyboard navigation for accessibility
- Mobile-responsive UI with toggle controls
- Responsive scaling and positioning
- Context-aware UI elements that adapt to user behavior
- Human verification for sensitive information access

### Visual Design Patterns
- Dark mode aesthetic with purple gradient background
- Matrix-inspired animated title with character scrambling
- Green glow effects with CSS animation
- Flag icons for language representation
- Color-coded node categories
- Consistent typography and spacing
- Glass-morphism effects for UI containers
- Category-specific hover colors for nodes

### Security Patterns
- Data obfuscation to prevent scraping of sensitive information
- Human verification through interactive challenges
- Progressive information disclosure
- Contact information protection via modal interface
- Separation of public and protected information

### Animation and Visual Feedback Patterns
- Text typing effect for information display
- Matrix-style character scrambling for title
- CSS keyframe animations for glowing effects
- Animation queue for managing multiple animations
- State tracking for busy conditions
- Interval management for cleanup
- Modular animation system for node movements
- Animation presets for different visualization modes
- Transition effects for UI state changes

### Responsive Design Patterns
- Media query breakpoints for different device sizes
- Context-aware element positioning
- Adaptive layouts that prevent element overlap
- Dynamic positioning based on scroll and orientation
- Collapse/expand patterns for mobile navigation
- Touch-friendly targets for mobile interaction
- Auto-hiding menus after user selection
- Floating controls that adapt to user context

### InfoBox Management Patterns
- Prepend-based content addition (newest at top)
- Dynamic height management with auto-trimming
- Oldest-entry removal when space constraints hit
- Minimums preservation to maintain context
- Layering based on canvas overlap detection
- Responsive positioning below header in mobile views

### Language Selection Patterns
- Vertical menu with flag icons
- Language codes for clear identification
- Current language highlighting
- Smooth hover effects
- RTL language handling
- ARIA-compliant for accessibility
- Responsive toggle for mobile devices
- Auto-hiding after selection on mobile
- Confirmation feedback for language changes

## Technical Decisions

### Canvas vs. SVG
- Canvas chosen for performance with many nodes
- Direct pixel manipulation for custom effects
- Simplified event handling logic
- Dynamic calculation of node sizes based on text width in current language

### Inline vs. External Resources
- Single file approach for simplicity
- No external dependencies to manage
- Facilitates easy deployment and maintenance
- Emoji flags instead of external image files

### Multilingual Implementation
- Translation objects embedded in node data:
  - Full descriptions in `translations` object
  - Short labels in `labels` object for in-node display
- Language-specific display with common visual elements
- Support for right-to-left languages
- Dynamic measurement of text width for proper node sizing

### Animation Implementation
- CSS animations for continuous effects (glow pulse)
- JavaScript interval-based animations for complex effects (character scrambling)
- Queue management for text typing effects
- State tracking to prevent animation conflicts

### Responsive Approach
- Dynamic canvas sizing based on viewport
- Relative positioning based on screen dimensions
- Centered visualization regardless of screen size
- Responsive UI elements with breakpoints
- Collapsible menus on mobile devices
- Touch-friendly interaction targets

## Code Organization Patterns

### File Structure
- **index.html**: Main HTML document with minimal inline code
- **css/styles.css**: External stylesheet containing all CSS rules
- **js/main.js**: External JavaScript file containing all application logic
- **No build process**: Vanilla approach for simplicity and quick iteration

### Code Separation Principles
- **Separation of concerns**: HTML for structure, CSS for presentation, JS for behavior
- **Progressive enhancement**: Core content in HTML, enhanced with CSS and JavaScript
- **Maintainability focus**: External files make code easier to maintain and extend
- **Reduced duplication**: Common styles and functions consolidated in their respective files
