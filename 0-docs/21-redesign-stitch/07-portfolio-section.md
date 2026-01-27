# 07 - Portfolio Section

## Current Implementation

Current portfolio section from `css/portfolio-cards.css`:

```html
<section class="portfolio-section">
  <h2 class="portfolio-title" id="portfolio-title">Seneste arbejde</h2>
  <div class="cards-grid" id="portfolio-cards-container"></div>
</section>
```

## New Portfolio Design

The new design features:
- Filter chips for categories
- Featured project badge
- Status indicators
- "View Case Study" links
- CTA banner at bottom

### HTML Structure

```html
<section class="portfolio-section">
  <!-- Section Header -->
  <div class="section-header">
    <h2 class="section-title" id="portfolio-title">
      Recent <span class="text-primary">Work</span>
    </h2>
  </div>

  <!-- Filter Chips -->
  <div class="portfolio-filters">
    <button class="filter-chip glass-chip-active" data-filter="all">All</button>
    <button class="filter-chip glass-chip" data-filter="security">Security</button>
    <button class="filter-chip glass-chip" data-filter="ecommerce">E-commerce</button>
    <button class="filter-chip glass-chip" data-filter="audit">Audit</button>
    <button class="filter-chip glass-chip" data-filter="cloud">Cloud</button>
  </div>

  <!-- Portfolio Cards -->
  <div class="portfolio-cards" id="portfolio-cards-container">
    <!-- Featured Card -->
    <article class="portfolio-card featured">
      <div class="card-image-container">
        <div class="card-image-overlay"></div>
        <img src="..." alt="Project screenshot" loading="lazy" />

        <!-- Featured Badge -->
        <span class="featured-badge">Featured</span>

        <!-- Category & Title Overlay -->
        <div class="card-image-content">
          <p class="card-category">E-commerce • Security</p>
          <h3 class="card-project-title">Rahimi Tires</h3>
        </div>
      </div>

      <div class="card-body">
        <p class="card-excerpt">
          Secure transaction platform for a leading European automotive SME. Implemented end-to-end encryption.
        </p>

        <div class="card-footer">
          <div class="status-badge status-success">
            <span class="material-symbols-outlined">verified_user</span>
            100% Uptime
          </div>
          <button class="view-case-study">
            View Case Study
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </article>

    <!-- Regular Card -->
    <article class="portfolio-card">
      <!-- Similar structure without featured badge... -->
    </article>
  </div>

  <!-- CTA Banner -->
  <div class="portfolio-cta">
    <div class="cta-pattern"></div>
    <div class="cta-content">
      <h3 class="cta-title">Have a project in mind?</h3>
      <p class="cta-subtitle">Let's build something secure together.</p>
      <button class="cta-button-white" onclick="showContactModal()">
        Start a Project
      </button>
    </div>
  </div>
</section>
```

### CSS Implementation

```css
/* Portfolio Section */
.portfolio-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  padding-top: var(--spacing-xl);
}

/* Filter Chips */
.portfolio-filters {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.portfolio-filters::-webkit-scrollbar {
  display: none;
}

.filter-chip {
  flex-shrink: 0;
  height: 2.25rem;
  padding: 0 1.25rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-chip.active,
.filter-chip:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
  box-shadow: 0 4px 12px var(--shadow-glow);
}

/* Portfolio Cards */
.portfolio-cards {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Portfolio Card */
.portfolio-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--glass-surface);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  transition: all var(--transition-base);
}

.portfolio-card:hover {
  border-color: rgba(238, 95, 43, 0.3);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

/* Card Image Container */
.card-image-container {
  position: relative;
  height: 14rem;
  overflow: hidden;
}

.portfolio-card.featured .card-image-container {
  height: 18rem;
}

.card-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.portfolio-card:hover .card-image-container img {
  transform: scale(1.05);
}

.card-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, #181311 0%, transparent 60%);
  z-index: 1;
}

/* Featured Badge */
.featured-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  background: rgba(238, 95, 43, 0.9);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  backdrop-filter: blur(4px);
}

/* Image Content Overlay */
.card-image-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.25rem;
  z-index: 2;
}

.card-category {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--primary);
  margin-bottom: 0.25rem;
}

.card-project-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  line-height: 1.2;
}

.portfolio-card.featured .card-project-title {
  font-size: 1.75rem;
}

/* Card Body */
.card-body {
  padding: 1.25rem;
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-excerpt {
  font-size: 0.875rem;
  color: #9ca3af;
  line-height: 1.6;
}

/* Card Footer */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--glass-border-light);
}

/* Status Badge */
.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-md);
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge .material-symbols-outlined {
  font-size: 16px;
}

.status-success {
  background: rgba(39, 201, 63, 0.1);
  color: #4ade80;
}

.status-info {
  background: rgba(96, 165, 250, 0.1);
  color: #60a5fa;
}

.status-warning {
  background: rgba(168, 85, 247, 0.1);
  color: #a855f7;
}

/* View Case Study Link */
.view-case-study {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--primary);
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: color var(--transition-fast);
}

.view-case-study:hover {
  color: white;
}

.view-case-study .material-symbols-outlined {
  font-size: 18px;
  transition: transform var(--transition-fast);
}

.view-case-study:hover .material-symbols-outlined {
  transform: translateX(4px);
}

/* CTA Banner */
.portfolio-cta {
  position: relative;
  margin-top: 1rem;
  padding: 1.5rem;
  border-radius: var(--radius-xl);
  background: linear-gradient(to bottom right, var(--primary), #c94112);
  text-align: center;
  overflow: hidden;
  cursor: pointer;
  transition: transform var(--transition-fast);
}

.portfolio-cta:hover {
  transform: scale(1.02);
}

.cta-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.1;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.cta-content {
  position: relative;
  z-index: 1;
}

.cta-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.cta-subtitle {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
}

.cta-button-white {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  padding: 0 1.5rem;
  background: white;
  color: var(--primary);
  border: none;
  border-radius: var(--radius-lg);
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  transition: transform var(--transition-fast);
}

.cta-button-white:hover {
  transform: scale(1.05);
}
```

## Portfolio Data Structure

```javascript
// js/data/portfolio.js

export const portfolioProjects = [
  {
    id: 'rahimi-tires',
    featured: true,
    image: '/images/portfolio/rahimi-tires.jpg',
    categories: ['ecommerce', 'security'],
    title: {
      en: 'Rahimi Tires',
      da: 'Rahimi Dæk',
    },
    description: {
      en: 'Secure transaction platform for a leading European automotive SME. Implemented end-to-end encryption.',
      da: 'Sikker transaktionsplatform for en førende europæisk bilvirksomhed. Implementeret ende-til-ende kryptering.',
    },
    status: {
      type: 'success',
      icon: 'verified_user',
      text: '100% Uptime'
    },
    link: '#rahimi-case-study'
  },
  {
    id: 'finsecure-audit',
    image: '/images/portfolio/finsecure.jpg',
    categories: ['security', 'audit'],
    title: {
      en: 'FinSecure Audit',
      da: 'FinSecure Revision',
    },
    description: {
      en: 'Automated vulnerability scanning for fintech applications. Reduced risk exposure significantly.',
      da: 'Automatiseret sårbarhedsscanning for fintech-applikationer. Reduceret risikoeksponering markant.',
    },
    status: {
      type: 'info',
      icon: 'trending_down',
      text: 'Risk -40%'
    },
    link: '#finsecure-case-study'
  },
  // ... more projects
];
```

## Filter Functionality

```javascript
// js/components/portfolio-filter.js

export function initPortfolioFilters() {
  const filterButtons = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.portfolio-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active state
      filterButtons.forEach(b => {
        b.classList.remove('glass-chip-active');
        b.classList.add('glass-chip');
      });
      btn.classList.remove('glass-chip');
      btn.classList.add('glass-chip-active');

      // Filter cards
      cards.forEach(card => {
        const categories = card.dataset.categories?.split(',') || [];
        const shouldShow = filter === 'all' || categories.includes(filter);

        card.style.display = shouldShow ? 'flex' : 'none';
        card.style.animation = shouldShow ? 'fadeIn 0.3s ease' : '';
      });
    });
  });
}

// Animation keyframe
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

## Migration Steps

1. [ ] Create portfolio data structure
2. [ ] Source/create project images
3. [ ] Add filter chip HTML and CSS
4. [ ] Implement card component
5. [ ] Add filter functionality
6. [ ] Create CTA banner
7. [ ] Integrate translations
8. [ ] Test filter animations
9. [ ] Mobile horizontal scroll for filters
10. [ ] Accessibility review
