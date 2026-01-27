# 05 - Hero Section

## Current Implementation

The current hero section in `templates/template.html`:

```html
<section class="hero hero-fade-in">
  <div class="hero-content">
    <div class="terminal-text"></div>
    <p class="hero-subtitle">Freelance IT Consultancy • Software Development • Cybersecurity • Europe</p>
    <h1 class="hero-headline" id="hero-headline"></h1>
    <p class="hero-value-prop" id="hero-value-prop"></p>
    <button class="cta-button" id="cta-button" onclick="showContactModal()"></button>
    <button class="cta-button" id="cta-pricing-button" onclick="...">Se priser</button>
  </div>
</section>
```

## New Hero Design

The new design features a terminal-style card with macOS traffic lights:

### HTML Structure

```html
<section class="hero-section">
  <!-- Terminal Hero Card -->
  <div class="terminal-card glass-panel">
    <!-- Terminal Header -->
    <div class="terminal-header">
      <div class="terminal-dots">
        <span class="dot dot-red"></span>
        <span class="dot dot-yellow"></span>
        <span class="dot dot-green"></span>
      </div>
      <div class="terminal-title font-mono text-xs text-white/30">bash — 80x24</div>
    </div>

    <!-- Terminal Body -->
    <div class="terminal-body font-mono">
      <div class="terminal-prompt text-primary/80">
        user@cocode:~$ ./init_secure_audit.sh
      </div>
      <div class="terminal-output text-white font-bold">
        <span class="text-success">&gt;</span>
        <span id="terminal-text"></span>
        <span class="cursor"></span>
      </div>

      <!-- Status Panel -->
      <div class="status-panel">
        <span class="status-comment">// System Status</span>
        <div class="status-item">
          <span class="material-symbols-outlined text-success">check_circle</span>
          <span>GDPR Compliant</span>
        </div>
        <div class="status-item">
          <span class="material-symbols-outlined text-success">check_circle</span>
          <span>NIS2 Ready</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Value Proposition Card -->
  <div class="value-card glass-panel">
    <div class="value-card-glow"></div>
    <div class="value-badge">
      <span class="material-symbols-outlined text-primary">shield</span>
      <span class="text-primary text-xs font-bold uppercase tracking-wider">Compliance-Ready</span>
    </div>
    <h3 class="value-title text-h3 text-white" id="hero-headline"></h3>
    <p class="value-description text-body-sm text-secondary" id="hero-value-prop"></p>

    <!-- Abstract Visual -->
    <div class="value-visual">
      <div class="grid-lines"></div>
      <div class="shimmer-effect"></div>
    </div>
  </div>

  <!-- CTA Buttons -->
  <div class="hero-actions">
    <button class="btn btn-primary" id="cta-button" onclick="showContactModal()">
      <span id="cta-button-text"></span>
      <span class="material-symbols-outlined">arrow_forward</span>
    </button>
    <button class="btn btn-secondary" id="cta-pricing-button">
      <span id="cta-pricing-text">View Pricing</span>
    </button>
  </div>

  <!-- Trust Badges -->
  <div class="trust-section">
    <p class="trust-label text-caption text-tertiary">Trusted Standards</p>
    <div class="trust-badges">
      <div class="trust-badge glass-chip">
        <span class="material-symbols-outlined">verified_user</span>
        <span>ISO 27001</span>
      </div>
      <div class="trust-badge glass-chip">
        <span class="material-symbols-outlined">lock</span>
        <span>GDPR</span>
      </div>
      <div class="trust-badge glass-chip">
        <span class="material-symbols-outlined">policy</span>
        <span>NIS2</span>
      </div>
    </div>
  </div>
</section>
```

### CSS Implementation

```css
/* Hero Section */
.hero-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg) 0;
}

/* Terminal Card */
.terminal-card {
  overflow: hidden;
  background: #1e1e1e;
  border: 1px solid var(--glass-border);
  box-shadow: 0 25px 50px -12px rgba(238, 95, 43, 0.1);
}

.terminal-header {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #2d2d2d;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.terminal-dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot-red { background: #ff5f56; }
.dot-yellow { background: #ffbd2e; }
.dot-green { background: #27c93f; }

.terminal-title {
  margin-left: auto;
}

.terminal-body {
  padding: 1.25rem;
  min-height: 180px;
  display: flex;
  flex-direction: column;
}

.terminal-prompt {
  margin-bottom: 0.5rem;
  color: rgba(238, 95, 43, 0.8);
}

.terminal-output {
  line-height: 1.6;
}

/* Blinking Cursor */
.cursor {
  display: inline-block;
  width: 10px;
  height: 20px;
  background: var(--primary);
  margin-left: 4px;
  vertical-align: middle;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Status Panel */
.status-panel {
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-md);
  border-left: 2px solid rgba(238, 95, 43, 0.5);
}

.status-comment {
  display: block;
  opacity: 0.6;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #d1d5db;
}

.status-item .material-symbols-outlined {
  font-size: 14px;
  color: var(--success);
}

/* Value Card */
.value-card {
  position: relative;
  overflow: hidden;
  padding: 1.25rem;
}

.value-card-glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 8rem;
  height: 8rem;
  background: rgba(238, 95, 43, 0.1);
  border-radius: 50%;
  filter: blur(40px);
  z-index: 0;
}

.value-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.5rem;
  background: rgba(238, 95, 43, 0.1);
  border: 1px solid rgba(238, 95, 43, 0.2);
  border-radius: var(--radius-md);
  margin-bottom: 0.5rem;
}

.value-badge .material-symbols-outlined {
  font-size: 16px;
}

.value-title {
  margin-bottom: 0.75rem;
}

.value-description {
  color: #d1d5db;
  line-height: 1.6;
}

/* Abstract Visual */
.value-visual {
  position: relative;
  width: 100%;
  height: 6rem;
  margin-top: 1rem;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.grid-lines {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}

.shimmer-effect {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    transparent,
    rgba(238, 95, 43, 0.2),
    transparent
  );
  transform: translateX(-100%) skewX(-12deg);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%) skewX(-12deg); }
  50%, 100% { transform: translateX(200%) skewX(-12deg); }
}

/* CTA Buttons */
.hero-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 3.5rem;
  padding: 0 1.5rem;
  border-radius: var(--radius-lg);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.015em;
  cursor: pointer;
  transition: all var(--transition-base);
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
  box-shadow: 0 8px 24px var(--shadow-glow);
}

.btn-primary:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: scale(0.98);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Trust Section */
.trust-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

.trust-label {
  text-align: center;
}

.trust-badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  opacity: 0.7;
}

.trust-badge {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  font-weight: 700;
}

.trust-badge .material-symbols-outlined {
  font-size: 18px;
  color: #9ca3af;
}
```

## JavaScript Integration

### Terminal Typing Effect

Preserve the existing terminal typing effect but update the target element:

```javascript
// Update terminal.js to target new element
const terminalOutput = document.getElementById('terminal-text');

// Existing typing animation logic continues to work
// Just ensure the selector matches the new HTML structure
```

### Translation Updates

The hero content is dynamically translated. Ensure these IDs are preserved:
- `#hero-headline` - Main headline
- `#hero-value-prop` - Value proposition text
- `#cta-button` - Primary CTA button
- `#cta-pricing-button` - Secondary CTA button

## Migration Steps

1. [ ] Create new hero section HTML structure
2. [ ] Add terminal card CSS
3. [ ] Add value card CSS
4. [ ] Update button styles
5. [ ] Add trust badges section
6. [ ] Verify terminal typing animation works
7. [ ] Test translation switching
8. [ ] Add shimmer animation
9. [ ] Mobile responsiveness check
10. [ ] Accessibility review (keyboard nav, screen readers)

## Accessibility Considerations

- Terminal card should have `role="img"` and `aria-label`
- Ensure blinking cursor doesn't cause issues (respect `prefers-reduced-motion`)
- CTA buttons need proper focus states

```css
@media (prefers-reduced-motion: reduce) {
  .cursor,
  .shimmer-effect {
    animation: none;
  }
}
```
