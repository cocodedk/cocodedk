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
- **HTML5**: Core markup language
- **CSS3**: Styling with advanced features
  - CSS Variables: For consistent theming
  - Flexbox: For responsive layouts
  - Grid: For structured layouts
  - Media Queries: For responsive design
  - Transitions/Animations: For smooth UI effects
  - Backdrop Filter: For glass-morphism effects
- **JavaScript (ES6+)**: Core programming language
  - Canvas API: For graph visualization
  - DOM Manipulation: For dynamic UI updates
  - Local Storage: For saving user preferences
- **JSON**: For structured data

### No External Dependencies
The project intentionally uses no external libraries or frameworks, keeping it lightweight and focusing on vanilla web technologies.

### SEO Optimization
- **Meta Tags**: Comprehensive meta tag strategy with language attributes
- **Open Graph**: Social media sharing optimization
- **Structured Data**: JSON-LD for rich search results
- **Multilingual Support**: Language-specific meta descriptions and hreflang tags
- **Cache Control**: Meta tags for proper cache management
- **Cache Busting**: Query parameters for resource versioning

## Development Setup

### Editor
- Visual Studio Code with extensions:
  - ESLint
  - HTML/CSS/JS Prettifier
  - Live Server

### Version Control
- Git for source control
- GitHub for repository hosting

### Testing
- Manual testing across devices
- Chrome DevTools for responsive design testing
- Lighthouse for performance auditing

## Technical Constraints

### Browser Compatibility
- Support for modern browsers (Chrome, Firefox, Safari, Edge)
- No IE11 support required
- Progressive enhancement approach

### Performance
- Target frame rate: 60fps for animations
- Responsive design for all screen sizes
- Load time optimization
- Resource caching with version control

### Security
- No sensitive data storage in frontend
- Contact information protection
- CORS policies consideration

## Architecture

### Single Page Application
- Single HTML entry point
- Modular JavaScript organization
- External CSS and JavaScript files

### Code Organization
```
cocodedk/
├── index.html           # Main entry point
├── css/
│   └── styles.css       # All styles
├── js/
│   ├── main.js          # Core application logic
│   ├── node-animation.js # Animation system
│   └── contact-modal.js # Contact form handling
└── assets/              # (Future) Images, fonts, etc.
```

### JavaScript Architecture
- Modular design pattern
- Function-based components
- Event-driven interactions
- Object literals for configuration

### Animation System
- Canvas-based rendering
- Request Animation Frame for smooth animations
- Configurable animation properties
- Multiple animation presets

## Data Flow

### Language Switching
1. User selects language from selector
2. Language code stored in localStorage
3. UI elements updated with translations
4. Node labels and descriptions updated
5. Canvas redrawn with new text

### Node Interaction
1. User hovers over node
2. Node highlighted with glow effect
3. User clicks node
4. InfoBox populated with node information
5. InfoBox displayed with animation

### Contact Information
1. User clicks contact button
2. Modal appears with human verification challenge
3. User completes challenge
4. Contact information progressively revealed

## Rendering Strategy

### Canvas Rendering
- Canvas element covers full page
- Nodes rendered as circles with text
- Animation frames calculated at 60fps
- Hover effects with shadow and glow

### DOM Rendering
- InfoBox and UI controls rendered in DOM
- CSS animations for transitions
- Translate3D for hardware acceleration
- Flexbox for responsive layouts

## Optimization Strategies

### Performance
- Minimizing DOM operations
- Using requestAnimationFrame for animations
- Canvas optimization techniques
- Setting proper viewport meta tags
- Using CSS transitions instead of JS when possible

### Maintainability
- Modular code structure
- Consistent naming conventions
- Clear separation of concerns
- Configuration-driven approach

### Network
- Image optimization (future)
- Minification of CSS and JS (future)
- Cache busting for version control
- Cache control headers

## Future Technical Considerations

### Potential Additions
- Web Workers for background processing
- Service Worker for offline support
- Module bundling with Webpack/Rollup
- CSS pre-processors (SASS/LESS)
- Automated testing with Jest
- Server-side rendering for improved SEO

### Integration Options
- API connections to backend services
- Social media integration
- Analytics integration
- Chat/support integration

## Technical Documentation

### Inline Documentation
- JSDoc comments for functions
- CSS section comments
- HTML structure comments

### External Documentation
- README file with setup instructions (future)
- Code style guide (future)
- API documentation (future)
