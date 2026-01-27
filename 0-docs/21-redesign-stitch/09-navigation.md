# 09 - Navigation

## Current Navigation

The current site uses a footer-based language selector:

```html
<footer id="site-footer">
  <div class="footer-content">
    <p class="footer-credit">Design + Implementation </cocode.dk></p>
    <div class="footer-center-group">
      <div id="languageSelector" class="footer-lang-menu">
        <!-- 11 language flags -->
      </div>
      <a href="..." class="footer-cv-link">CV</a>
    </div>
    <p class="footer-copyright">...</p>
  </div>
</footer>
```

## New Navigation Design

The new design features:
1. **Sticky Header** - Logo, language toggle, menu
2. **Bottom Navigation Bar** - App-style tab navigation
3. **Floating Action Button** (optional) - Quick consultation booking

### Header Implementation

```html
<header class="site-header">
  <div class="header-content">
    <!-- Logo (keeping current) -->
    <div class="header-logo">
      <img src="images/cocode-logo.png" alt="cocode.dk" />
    </div>

    <!-- Right Side Actions -->
    <div class="header-actions">
      <!-- Language Toggle -->
      <div class="lang-toggle" id="lang-toggle">
        <button class="lang-btn" data-lang="en">EN</button>
        <span class="lang-divider">|</span>
        <button class="lang-btn active" data-lang="da">DK</button>
      </div>

      <!-- More Languages Dropdown (for remaining 9 languages) -->
      <button class="lang-more-btn" id="lang-more-btn" aria-label="More languages">
        <span class="material-symbols-outlined">language</span>
      </button>

      <!-- Language Dropdown -->
      <div class="lang-dropdown" id="lang-dropdown" hidden>
        <button class="lang-dropdown-item" data-lang="es">🇪🇸 Español</button>
        <button class="lang-dropdown-item" data-lang="zh">🇨🇳 中文</button>
        <button class="lang-dropdown-item" data-lang="ja">🇯🇵 日本語</button>
        <button class="lang-dropdown-item" data-lang="de">🇩🇪 Deutsch</button>
        <button class="lang-dropdown-item" data-lang="ar">🇸🇦 العربية</button>
        <button class="lang-dropdown-item" data-lang="fa">🇮🇷 فارسی</button>
        <button class="lang-dropdown-item" data-lang="hi">🇮🇳 हिन्दी</button>
        <button class="lang-dropdown-item" data-lang="ur">🇵🇰 اردو</button>
        <button class="lang-dropdown-item" data-lang="fr">🇫🇷 Français</button>
      </div>
    </div>
  </div>
</header>
```

### Header CSS

```css
/* Sticky Header */
.site-header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  background: rgba(34, 21, 16, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--glass-border);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0.75rem 1rem;
}

/* Logo */
.header-logo {
  display: flex;
  align-items: center;
}

.header-logo img {
  height: 2rem;
  width: auto;
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Language Toggle */
.lang-toggle {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--glass-border-light);
  border-radius: var(--radius-full);
}

.lang-btn {
  background: none;
  border: none;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-tertiary);
  cursor: pointer;
  transition: color var(--transition-fast);
}

.lang-btn:hover,
.lang-btn.active {
  color: white;
}

.lang-divider {
  color: var(--text-tertiary);
  font-size: 0.75rem;
}

/* More Languages Button */
.lang-more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.lang-more-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

/* Language Dropdown */
.lang-dropdown {
  position: absolute;
  top: 100%;
  right: 1rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: var(--bg-dark);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  z-index: var(--z-modal);
}

.lang-dropdown[hidden] {
  display: none;
}

.lang-dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-align: left;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.lang-dropdown-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}
```

### Bottom Navigation

```html
<nav class="bottom-nav">
  <div class="nav-content">
    <a href="#home" class="nav-item active" data-section="home">
      <span class="material-symbols-outlined">home</span>
      <span class="nav-label">Home</span>
    </a>
    <a href="#services" class="nav-item" data-section="services">
      <span class="material-symbols-outlined">grid_view</span>
      <span class="nav-label">Services</span>
    </a>
    <a href="#portfolio" class="nav-item" data-section="portfolio">
      <span class="material-symbols-outlined">work</span>
      <span class="nav-label">Work</span>
    </a>
    <a href="#contact" class="nav-item" data-section="contact">
      <span class="material-symbols-outlined">mail</span>
      <span class="nav-label">Contact</span>
    </a>
  </div>
</nav>
```

### Bottom Navigation CSS

```css
/* Bottom Navigation */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: var(--z-header);
  background: rgba(24, 19, 17, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid var(--glass-border);
  padding-bottom: env(safe-area-inset-bottom, 0);
}

.nav-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0.75rem 1rem 0.5rem;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
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

/* Active indicator (optional) */
.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: var(--primary);
  border-radius: 50%;
}
```

### Floating Action Button (Optional)

```html
<button class="fab" onclick="showContactModal()">
  <span class="material-symbols-outlined">calendar_month</span>
  <span class="fab-label">Book Consultation</span>
</button>
```

```css
/* Floating Action Button */
.fab {
  position: fixed;
  bottom: calc(5rem + env(safe-area-inset-bottom, 0));
  right: 1rem;
  z-index: var(--z-above);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  box-shadow: 0 8px 30px var(--shadow-glow);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.fab:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}

.fab:active {
  transform: scale(0.95);
}

.fab .material-symbols-outlined {
  font-size: 20px;
}

.fab-label {
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

/* Hide FAB on small screens or when not needed */
@media (max-width: 480px) {
  .fab-label {
    display: none;
  }

  .fab {
    padding: 0.875rem;
    border-radius: 50%;
  }
}
```

### JavaScript: Navigation Behavior

```javascript
// js/main/navigation.js

export function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');

  // Smooth scroll to section
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }

      // Update active state
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Update active nav on scroll
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(item => {
          item.classList.toggle('active', item.dataset.section === id);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// Language dropdown
export function initLanguageDropdown() {
  const moreBtn = document.getElementById('lang-more-btn');
  const dropdown = document.getElementById('lang-dropdown');

  moreBtn?.addEventListener('click', () => {
    dropdown.hidden = !dropdown.hidden;
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!moreBtn?.contains(e.target) && !dropdown?.contains(e.target)) {
      dropdown.hidden = true;
    }
  });

  // Language selection
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);

      // Update toggle buttons
      document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.lang === lang);
      });

      dropdown.hidden = true;
    });
  });
}
```

## Migration from Footer

The footer language selector will be removed in favor of:
1. Header EN|DK toggle for primary languages
2. Dropdown for remaining 9 languages

Keep footer for:
- Copyright notice
- Credits (optional)

```html
<footer class="site-footer">
  <div class="footer-content">
    <p class="footer-copyright">© 2025 cocode.dk | <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></p>
  </div>
</footer>
```

```css
.site-footer {
  padding: 1rem;
  padding-bottom: calc(5rem + env(safe-area-inset-bottom, 0));
  text-align: center;
}

.footer-copyright {
  font-size: 0.75rem;
  color: var(--text-tertiary);
}

.footer-copyright a {
  color: var(--text-secondary);
}
```

## Migration Steps

1. [ ] Create sticky header structure
2. [ ] Add header CSS
3. [ ] Implement language toggle
4. [ ] Add language dropdown for 9+ languages
5. [ ] Create bottom navigation
6. [ ] Add navigation CSS
7. [ ] Implement smooth scroll behavior
8. [ ] Add scroll-based active state
9. [ ] Optional: Add FAB
10. [ ] Update footer (minimal)
11. [ ] Test iOS safe areas
12. [ ] Verify language switching works
