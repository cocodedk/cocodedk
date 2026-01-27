# 04 - Layout Structure

## Current Layout

The current site uses a full-width layout:

```html
<body>
  <div class="header-container">
    <div id="logo-container">...</div>
  </div>
  <section class="hero">...</section>
  <section class="service-cards-section">...</section>
  <section class="portfolio-section">...</section>
  <section class="activity-feed-section">...</section>
  <footer id="site-footer">...</footer>
</body>
```

## New Layout Structure

The new design uses a constrained mobile-first container:

```html
<body class="bg-background-dark font-display antialiased">
  <!-- Ambient Background -->
  <div class="ambient-glows">
    <div class="glow-orb glow-orb-primary" style="top:-10%;left:-10%;width:50%;height:40%"></div>
    <div class="glow-orb glow-orb-secondary" style="bottom:20%;right:-5%;width:60%;height:40%"></div>
  </div>

  <!-- Main Wrapper -->
  <div class="relative z-10 flex min-h-screen w-full flex-col">
    <!-- Sticky Header -->
    <header class="site-header glass-nav sticky top-0 z-50">...</header>

    <!-- Main Content -->
    <main class="site-main flex-1 w-full max-w-md mx-auto px-4 py-6">
      <!-- Page sections go here -->
    </main>

    <!-- Bottom Navigation -->
    <nav class="site-nav glass-nav fixed bottom-0 w-full z-50">...</nav>

    <!-- Safe area padding -->
    <div class="h-20"></div>
  </div>
</body>
```

## Container System

### Mobile-First Container

```css
.site-container {
  width: 100%;
  max-width: var(--container-max); /* 448px */
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--spacing-md); /* 16px */
  padding-right: var(--spacing-md);
}
```

### Responsive Breakpoints

```css
/* Mobile-first base (< 640px) */
.site-container {
  max-width: 100%;
}

/* Small devices (640px+) */
@media (min-width: 640px) {
  .site-container {
    max-width: var(--container-max);
  }
}

/* Medium devices (768px+) - optional wider content */
@media (min-width: 768px) {
  .site-container {
    max-width: 600px;
  }
}

/* Large devices (1024px+) - optional desktop layout */
@media (min-width: 1024px) {
  .site-container {
    max-width: 800px;
  }

  /* Two-column grid for cards */
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

## Header Structure

### New Header Layout

```html
<header class="site-header">
  <div class="site-container flex items-center justify-between py-4">
    <!-- Logo -->
    <div class="flex items-center gap-2">
      <img src="images/cocode-logo.png" alt="cocode.dk" class="h-8" />
      <h2 class="text-white text-lg font-bold">cocode.dk</h2>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-3">
      <!-- Language Toggle -->
      <div class="lang-toggle glass-chip flex items-center gap-1">
        <button class="lang-btn active" data-lang="en">EN</button>
        <span class="text-white/40">|</span>
        <button class="lang-btn" data-lang="da">DK</button>
      </div>

      <!-- Menu (optional) -->
      <button class="menu-btn p-2 rounded-full hover:bg-white/10">
        <span class="material-symbols-outlined">menu</span>
      </button>
    </div>
  </div>
</header>
```

### Header CSS

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  background: rgba(34, 21, 16, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--glass-border);
}

.lang-toggle {
  padding: 0.25rem 0.75rem;
}

.lang-btn {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-tertiary);
  transition: color var(--transition-fast);
}

.lang-btn.active,
.lang-btn:hover {
  color: var(--text-primary);
}
```

## Bottom Navigation

### Navigation Structure

```html
<nav class="site-nav">
  <div class="site-container flex justify-around items-center py-3 pb-6">
    <a href="#home" class="nav-item active">
      <span class="material-symbols-outlined">home</span>
      <span class="nav-label">Home</span>
    </a>
    <a href="#services" class="nav-item">
      <span class="material-symbols-outlined">grid_view</span>
      <span class="nav-label">Services</span>
    </a>
    <a href="#portfolio" class="nav-item">
      <span class="material-symbols-outlined">work</span>
      <span class="nav-label">Work</span>
    </a>
    <a href="#contact" class="nav-item">
      <span class="material-symbols-outlined">mail</span>
      <span class="nav-label">Contact</span>
    </a>
  </div>
</nav>
```

### Navigation CSS

```css
.site-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: var(--z-header);
  background: rgba(24, 19, 17, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid var(--glass-border);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  color: var(--text-tertiary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.nav-item:hover,
.nav-item.active {
  color: var(--primary);
}

.nav-item .material-symbols-outlined {
  font-size: 24px;
}

.nav-label {
  font-size: 0.625rem;
  font-weight: 500;
}
```

## Section Layout

### Section Spacing

```css
.section {
  padding-top: var(--spacing-xl);
  padding-bottom: var(--spacing-xl);
}

.section-title {
  margin-bottom: var(--spacing-lg);
}

.section-subtitle {
  margin-bottom: var(--spacing-md);
  color: var(--text-secondary);
}
```

### Grid Layouts

```css
/* Single column (mobile default) */
.grid-single {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

/* Two-column grid */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

/* Three-column grid (for small items) */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-sm);
}

/* Auto-fit grid (responsive) */
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--spacing-md);
}
```

## Safe Areas

### iOS Safe Area Support

```css
/* iOS safe area insets */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .site-nav {
    padding-bottom: calc(1.5rem + env(safe-area-inset-bottom));
  }

  main {
    padding-bottom: calc(5rem + env(safe-area-inset-bottom));
  }
}
```

## Migration Checklist

1. [ ] Add ambient glow background
2. [ ] Update body classes
3. [ ] Create site-container wrapper
4. [ ] Migrate header to new structure
5. [ ] Preserve current logo
6. [ ] Add bottom navigation
7. [ ] Update section spacing
8. [ ] Test on mobile viewport
9. [ ] Add iOS safe area support
10. [ ] Verify language switching works
