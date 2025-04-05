# Technical Context

## Core Technology Choices

The project intentionally uses minimal technology dependencies:

- **Vanilla JavaScript**: No frameworks or libraries
- **Canvas API**: For rendering the graph visualization
- **CSS3**: For styling and animations
- **HTML5**: For structure and semantic markup

## File Organization

The codebase is organized as follows:

```
cocode.dk/
├── index.html        # Main HTML document
├── css/
│   └── styles.css    # External CSS file
├── js/
│   ├── main.js           # Core visualization logic
│   ├── node-animation.js # Animation system
│   └── contact-modal.js  # Contact security module
├── assets/
│   └── flags/        # Language flag icons
└── memory-bank/      # Documentation and context
```

## Technical Implementation Details

### Modular Architecture
The codebase has been restructured to follow a more modular architecture:
- CSS moved from inline to external file for better maintainability
- JavaScript split into multiple files by functionality:
  - `main.js`: Core graph visualization and UI functionality
  - `node-animation.js`: Modular animation system for nodes
  - `contact-modal.js`: Secure contact information handling

### Canvas Rendering
- Custom rendering pipeline for nodes and connections
- Optimization techniques for canvas performance
- Double-buffering for smooth rendering
- Categorical color schemes with hover states
- Glow effects using multi-layer rendering
- Text rendering with proper alignment and sizing

### Animation System
- Modular animation framework with multiple animation types:
  - Move: Direct movement between positions
  - Orbit: Circular motion around a center point
  - Oscillate: Back-and-forth movement
  - Jitter: Random movement within constraints
- Configurable easing functions
- Animation presets for different visualization modes
- Frame rate control and optimization

### Multilingual Support
- Embedded translation objects for 11 languages
- Language-aware node labels and information display
- RTL language support
- Vertical language selector with flag icons
- Keyboard accessibility for language selection
- Language persistence across sessions

### Interaction Models
- Mouse and touch event handling
- Hover effects with color transformations
- Click-based information display
- Responsive design breakpoints
- Mobile-optimized interaction patterns
- Keyboard navigation support
- Context-aware UI elements

### Security Features
- Obfuscated contact information
- Human verification challenges
- Progressive information disclosure
- Contact modal with verification steps
- Protection against automated scraping

### Responsive Design
- Media query breakpoints for different device sizes
- Mobile-first approach to UI components
- Touch-friendly interaction targets
- Auto-hiding menus after selection
- Context-aware element positioning
- Adaptive layouts preventing element overlap

### DOM Manipulation
- Dynamic content generation
- InfoBox management system
- Language menu handling
- Event delegation for efficient event handling
- Accessibility attributes (ARIA) implementation

### Performance Optimization
- RAF (requestAnimationFrame) based animation
- Event throttling and debouncing
- Memory management with cleanup functions
- Efficient canvas redrawing
- Conditional rendering based on state changes

## Technical Debt and Constraints

- Single HTML file architecture limits some modularity options
- Canvas-based approach requires custom implementation for all interactions
- Translation object embedded in JavaScript increases initial payload size
- Optimizations needed for complex animations with many nodes

## Browser Compatibility

- Designed for modern browsers (Chrome, Firefox, Safari, Edge)
- Uses standard APIs available in all modern browsers
- Progressive enhancement for newer CSS features
- No IE11 support

## Technologies Used

### Frontend
- **HTML5**: Structure and canvas element
- **CSS3**: Styling for UI elements and effects
  - Keyframe animations for visual effects
  - CSS transitions for smooth interactions
  - Custom gradients for backgrounds
  - Media queries for responsive design
- **JavaScript**: Core functionality and interactivity
  - Canvas API for rendering
  - DOM manipulation for UI elements
  - Event handling for user interactions
  - ResizeObserver API for tracking element dimensions
  - ES6+ features for clean code organization
  - Interval-based animations for complex effects

### Visual Assets
- Emoji flag icons for language representation
- Matrix-inspired text animations
- CSS gradient backgrounds
- Color-coded node categories

### Development Tools
- Basic text editor / IDE
- Git for version control
- Simple local server for testing
- Browser developer tools for debugging DOM interactions

## Technical Constraints

### Performance
- Must handle rendering of 15+ nodes with connections
- Smooth animations without framerate drops
- Character scrambling animation performance
- Multiple simultaneous CSS and JS animations
- Responsive to window resizing without lag
- Efficient DOM updates for infoBox management
- Memory management for long-running animations

### Browser Compatibility
- Support for modern browsers (Chrome, Firefox, Safari, Edge)
- Fallback for canvas not supported (basic message)
- Responsive design for desktop and mobile devices
- Compatibility with ResizeObserver API
- Support for CSS keyframe animations
- Proper rendering of emoji flags across platforms

### Internationalization
- Support for 11 languages including:
  - Left-to-right: English, Danish, Spanish, French, German, etc.
  - Right-to-left: Arabic, Persian, Urdu
  - Character-based: Chinese, Japanese
  - Complex script: Hindi
- Dynamic language switching with persistent UI state
- Translated node labels in the current language
- Dynamic node resizing based on label text width
- RTL text support in the infoBox prepend system
- Accessible language selection with keyboard navigation

## Development Environment

### Local Setup
- Standard web development environment
- Python simple HTTP server for local testing
- Chrome DevTools for debugging
- Browser extension for additional testing (currently non-functional)

### Deployment
- Static site hosting
- No server-side requirements
- Fast CDN delivery preferred

## Dependencies
- No external JavaScript libraries required
- No build process needed
- No CSS frameworks used
- Native browser APIs only:
  - Canvas
  - ResizeObserver
  - DOM manipulation
  - Interval timers
  - CSS animations
  - Web accessibility API

## Coding Standards
- Vanilla JavaScript using ES6+ features
- Functional approach to UI updates
- Modular code organization with clear responsibilities
- Proper error handling and edge case management
- Console logging for debugging and tracking state changes
- Accessible markup with ARIA attributes
- Mobile-first responsive design
- Performance optimization for animations

## Technology Stack

The project uses a minimalist technology stack:

- **HTML5**: Core structure and content
- **CSS3**: Styling and animations
  - Responsive design principles
  - Animation transitions
  - Flexbox layout
  - CSS variables for theming
- **JavaScript (ES6+)**: Interactive functionality
  - Canvas API for drawing the network graph
  - DOM manipulation
  - Event handling
  - Internationalization handling
- **No frameworks**: Pure vanilla implementation
- **No build tools**: Direct development for simplicity

## Code Organization

- **Modular structure**:
  - HTML in index.html
  - CSS in external stylesheet (css/styles.css)
  - JavaScript in external file (js/main.js)
- **Clear separation of concerns**:
  - Structure (HTML)
  - Presentation (CSS)
  - Behavior (JavaScript)
