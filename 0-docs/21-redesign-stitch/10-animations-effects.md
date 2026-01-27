# 10 - Animations & Effects

## Design Effects Overview

The new design features several visual effects:
1. **Ambient Background Glows** - Floating colored orbs
2. **Glassmorphism** - Frosted glass panels
3. **Blinking Cursor** - Terminal typing effect
4. **Shimmer Animation** - Value card visual
5. **Hover Glow Effects** - Card interactions
6. **Micro-interactions** - Buttons, links, icons

## Ambient Background Glows

### HTML Structure

```html
<div class="ambient-background">
  <div class="glow-orb orb-1"></div>
  <div class="glow-orb orb-2"></div>
  <div class="glow-orb orb-3"></div>
</div>
```

### CSS Implementation

```css
/* Ambient Background Container */
.ambient-background {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

/* Base Glow Orb */
.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.6;
  will-change: transform;
}

/* Orb Variations */
.orb-1 {
  top: -10%;
  left: -10%;
  width: 50%;
  height: 40%;
  background: rgba(238, 95, 43, 0.2);
  animation: float 20s ease-in-out infinite;
}

.orb-2 {
  bottom: 20%;
  right: -5%;
  width: 60%;
  height: 40%;
  background: rgba(217, 119, 6, 0.1);
  animation: float 25s ease-in-out infinite reverse;
}

.orb-3 {
  top: 40%;
  left: 20%;
  width: 40%;
  height: 30%;
  background: rgba(124, 45, 18, 0.2);
  filter: blur(80px);
  animation: float 30s ease-in-out infinite;
  animation-delay: -5s;
}

/* Float Animation */
@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(5%, 10%) scale(1.05);
  }
  50% {
    transform: translate(-5%, 5%) scale(0.95);
  }
  75% {
    transform: translate(10%, -5%) scale(1.02);
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .glow-orb {
    animation: none;
  }
}
```

## Glassmorphism Effects

### Base Glass Panel

```css
/* Glass Panel - Primary */
.glass-panel {
  background: rgba(34, 21, 16, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-xl);
  box-shadow:
    0 4px 30px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

/* Glass Panel - Light */
.glass-panel-light {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Glass Panel - Dark (for nested elements) */
.glass-panel-dark {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Glass Navigation */
.glass-nav {
  background: rgba(34, 21, 16, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
```

### Glass Input

```css
.glass-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: 0.75rem 1rem;
  color: white;
  font-size: 0.875rem;
  transition: all var(--transition-base);
}

.glass-input::placeholder {
  color: rgba(255, 255, 255, 0.2);
}

.glass-input:focus {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(238, 95, 43, 0.15);
}
```

## Terminal Cursor Animation

```css
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

/* Reduced motion - solid cursor */
@media (prefers-reduced-motion: reduce) {
  .cursor {
    animation: none;
    opacity: 1;
  }
}
```

## Shimmer Effect

Used on the value proposition visual:

```css
/* Shimmer Animation */
.shimmer-container {
  position: relative;
  overflow: hidden;
}

.shimmer-effect {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(238, 95, 43, 0.2) 50%,
    transparent 100%
  );
  transform: translateX(-100%) skewX(-12deg);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(-12deg);
  }
  50%, 100% {
    transform: translateX(200%) skewX(-12deg);
  }
}

/* Grid Lines Pattern */
.grid-pattern {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}

@media (prefers-reduced-motion: reduce) {
  .shimmer-effect {
    animation: none;
    opacity: 0.3;
    transform: none;
  }
}
```

## Card Hover Glow

```css
/* Card with Glow Effect */
.card-glow {
  position: relative;
}

.card-glow::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(to right, var(--primary), #c94112);
  border-radius: inherit;
  filter: blur(4px);
  opacity: 0.2;
  z-index: -1;
  transition: opacity 0.5s ease;
}

.card-glow:hover::before {
  opacity: 0.4;
}

/* Alternative: Glow as separate element */
.glow-effect {
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, var(--primary), #c94112);
  border-radius: inherit;
  filter: blur(8px);
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s ease;
}

.card:hover .glow-effect {
  opacity: 0.3;
}
```

## Button Interactions

```css
/* Primary Button */
.btn-primary {
  position: relative;
  overflow: hidden;
  transition: all var(--transition-base);
}

/* Hover overlay effect */
.btn-primary::after {
  content: '';
  position: absolute;
  inset: 0;
  background: white;
  opacity: 0;
  transform: translateY(100%);
  transition: all 0.3s ease;
}

.btn-primary:hover::after {
  opacity: 0.2;
  transform: translateY(0);
}

/* Active state */
.btn-primary:active {
  transform: scale(0.98);
}

/* Icon Arrow Animation */
.btn-primary .icon-arrow {
  transition: transform var(--transition-fast);
}

.btn-primary:hover .icon-arrow {
  transform: translateX(4px);
}
```

## Link Hover Effects

```css
/* Underline animation */
.link-underline {
  position: relative;
  text-decoration: none;
}

.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary);
  transition: width var(--transition-base);
}

.link-underline:hover::after {
  width: 100%;
}

/* Color transition */
.link-primary {
  color: var(--primary);
  transition: color var(--transition-fast);
}

.link-primary:hover {
  color: white;
}
```

## Icon Animations

```css
/* Icon Scale on Hover */
.icon-scale {
  transition: transform var(--transition-fast);
}

.icon-scale:hover {
  transform: scale(1.1);
}

/* Icon Rotate */
.icon-rotate {
  transition: transform var(--transition-base);
}

.icon-rotate:hover {
  transform: rotate(15deg);
}

/* Material Symbol Animation */
.material-symbols-outlined {
  transition: color var(--transition-fast);
}
```

## Page Transitions

```css
/* Fade In Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Staggered Reveal */
.reveal-item {
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
}

.reveal-item:nth-child(1) { animation-delay: 0.1s; }
.reveal-item:nth-child(2) { animation-delay: 0.2s; }
.reveal-item:nth-child(3) { animation-delay: 0.3s; }
.reveal-item:nth-child(4) { animation-delay: 0.4s; }
.reveal-item:nth-child(5) { animation-delay: 0.5s; }

/* Slide Up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale In */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

## Scroll-Triggered Animations

```javascript
// js/utils/scroll-animations.js

export function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animation = entry.target.dataset.animate;
        entry.target.classList.add(`animate-${animation}`);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}
```

Usage:
```html
<div data-animate="fadeIn">Content</div>
<div data-animate="slideUp">Content</div>
```

## Performance Considerations

```css
/* GPU Acceleration */
.gpu-accelerated {
  transform: translateZ(0);
  will-change: transform;
}

/* Disable animations on low-end devices */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Disable blur on low-end devices (optional) */
@supports not (backdrop-filter: blur(1px)) {
  .glass-panel {
    background: rgba(34, 21, 16, 0.95);
  }
}
```

## Migration Steps

1. [ ] Add ambient background HTML and CSS
2. [ ] Update glassmorphism utilities
3. [ ] Implement terminal cursor animation
4. [ ] Add shimmer effect to value card
5. [ ] Add card hover glow effects
6. [ ] Update button interactions
7. [ ] Add link hover effects
8. [ ] Implement scroll-triggered animations
9. [ ] Test reduced motion support
10. [ ] Performance testing on mobile
