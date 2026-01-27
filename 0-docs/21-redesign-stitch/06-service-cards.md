# 06 - Service Cards

## Current Implementation

Current service cards from `css/service-cards.css` and `js/components/service-card.js`:

```html
<div class="service-card">
  <span class="service-card__icon">🔐</span>
  <h3 class="service-card__title">Cybersecurity</h3>
  <p class="service-card__description">Security audits and compliance</p>
  <div class="service-card__tags">
    <span class="service-card__tag">GDPR</span>
    <span class="service-card__tag">NIS2</span>
  </div>
</div>
```

## New Service Card Design

The new design features larger cards with images, icons, and glow effects:

### HTML Structure

```html
<section class="services-section">
  <div class="section-header">
    <h2 class="section-title">
      Our <span class="text-primary">Expertise</span>
    </h2>
    <p class="section-subtitle text-secondary">
      Secure, scalable, and modern IT solutions empowering European SMEs.
    </p>
  </div>

  <div class="service-cards">
    <!-- Service Card -->
    <article class="service-card-new group">
      <!-- Glow Effect -->
      <div class="card-glow-effect"></div>

      <!-- Card Content -->
      <div class="card-inner glass-panel">
        <!-- Header -->
        <div class="card-header">
          <div class="card-icon-wrap">
            <span class="material-symbols-outlined">terminal</span>
          </div>
          <span class="material-symbols-outlined card-arrow">arrow_outward</span>
        </div>

        <!-- Image -->
        <div class="card-image">
          <div class="card-image-overlay"></div>
          <img src="..." alt="Software Development" loading="lazy" />
        </div>

        <!-- Content -->
        <h3 class="card-title">Software Development</h3>
        <p class="card-description">
          Custom secure software tailored to your business logic using modern frameworks.
        </p>

        <!-- Action -->
        <button class="card-action">
          Learn More
        </button>
      </div>
    </article>

    <!-- Repeat for other services... -->
  </div>
</section>
```

### CSS Implementation

```css
/* Services Section */
.services-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.section-header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.section-subtitle {
  max-width: 28rem;
}

/* Service Cards Container */
.service-cards {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Individual Service Card */
.service-card-new {
  position: relative;
}

/* Glow Effect */
.card-glow-effect {
  position: absolute;
  inset: -2px;
  background: linear-gradient(to right, var(--primary), #c94112);
  border-radius: var(--radius-lg);
  filter: blur(4px);
  opacity: 0.2;
  z-index: 0;
  transition: opacity var(--transition-slow);
}

.service-card-new:hover .card-glow-effect {
  opacity: 0.4;
}

/* Card Inner */
.card-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  overflow: hidden;
  transition: transform var(--transition-base);
}

.service-card-new:active .card-inner {
  transform: scale(0.98);
}

/* Card Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.card-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: rgba(238, 95, 43, 0.2);
  border-radius: var(--radius-lg);
  color: var(--primary);
}

.card-icon-wrap .material-symbols-outlined {
  font-size: 28px;
}

.card-arrow {
  color: #6b7280;
  transition: color var(--transition-fast);
}

.service-card-new:hover .card-arrow {
  color: var(--primary);
}

/* Card Image */
.card-image {
  position: relative;
  width: 100%;
  height: 8rem;
  margin-bottom: 1rem;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

.card-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--bg-dark) 0%, transparent 60%);
  z-index: 1;
}

/* Card Content */
.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.card-description {
  font-size: 0.875rem;
  color: #d1d5db;
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* Card Action */
.card-action {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--primary);
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.service-card-new:hover .card-action {
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-color: rgba(238, 95, 43, 0.5);
}
```

## Service Data Structure

Update `js/data/services.js` to include image URLs:

```javascript
export const services = [
  {
    id: 'software',
    icon: 'terminal',
    image: '/images/services/software-dev.jpg',
    title: {
      en: 'Software Development',
      da: 'Softwareudvikling',
      // ... other languages
    },
    description: {
      en: 'Custom secure software tailored to your business logic using modern frameworks.',
      da: 'Skræddersyet sikker software til din forretningslogik med moderne frameworks.',
      // ... other languages
    },
    tags: ['Python', 'Django', 'API'],
    link: '#software'
  },
  {
    id: 'cybersecurity',
    icon: 'security',
    image: '/images/services/cybersecurity.jpg',
    title: {
      en: 'Cybersecurity & Compliance',
      da: 'Cybersikkerhed & Compliance',
      // ...
    },
    description: {
      en: 'GDPR-ready security audits and penetration testing to keep your data safe.',
      da: 'GDPR-klar sikkerhedsrevision og penetrationstest for at beskytte dine data.',
      // ...
    },
    tags: ['GDPR', 'NIS2', 'ISO27001'],
    link: '#cybersecurity'
  },
  {
    id: 'ai',
    icon: 'neurology',
    image: '/images/services/ai-tech.jpg',
    title: {
      en: 'AI & Modern Tech',
      da: 'AI & Moderne Teknologi',
      // ...
    },
    description: {
      en: 'Leverage machine learning to automate processes and innovate faster.',
      da: 'Udnyt maskinlæring til at automatisere processer og innovere hurtigere.',
      // ...
    },
    tags: ['AI', 'Neo4j', 'Automation'],
    link: '#ai'
  }
];
```

## JavaScript Component Update

```javascript
// js/components/service-card.js

import { services } from '../data/services.js';
import { getCurrentLanguage } from '../utils/i18n.js';

export function renderServiceCards(containerId = 'service-cards-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const lang = getCurrentLanguage();

  const html = services.map(service => `
    <article class="service-card-new group" data-service="${service.id}">
      <div class="card-glow-effect"></div>
      <div class="card-inner glass-panel">
        <div class="card-header">
          <div class="card-icon-wrap">
            <span class="material-symbols-outlined">${service.icon}</span>
          </div>
          <span class="material-symbols-outlined card-arrow">arrow_outward</span>
        </div>

        ${service.image ? `
          <div class="card-image">
            <div class="card-image-overlay"></div>
            <img src="${service.image}" alt="${service.title[lang] || service.title.en}" loading="lazy" />
          </div>
        ` : ''}

        <h3 class="card-title">${service.title[lang] || service.title.en}</h3>
        <p class="card-description">${service.description[lang] || service.description.en}</p>

        <button class="card-action" onclick="showServiceDetail('${service.id}')">
          ${getTranslation('learnMore', lang)}
        </button>
      </div>
    </article>
  `).join('');

  container.innerHTML = html;
}

// Re-render on language change
window.addEventListener('languageChange', () => {
  renderServiceCards();
});
```

## Image Assets Needed

Create placeholder images or source appropriate visuals:

| Service | Suggested Image | Alt Text |
|---------|-----------------|----------|
| Software Development | Code on dark screen | "Abstract code on a dark monitor screen" |
| Cybersecurity | Digital lock/padlock | "Digital padlock and binary data stream" |
| AI & Modern Tech | Neural network | "Abstract AI neural network connections" |

Image specs:
- Format: WebP preferred, JPEG fallback
- Dimensions: 800x400px (2:1 ratio)
- Optimization: Max 100KB each
- Location: `/images/services/`

## Responsive Behavior

```css
/* Tablet and up */
@media (min-width: 768px) {
  .service-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .service-cards {
    grid-template-columns: repeat(3, 1fr);
  }

  .card-image {
    height: 10rem;
  }
}
```

## Migration Steps

1. [ ] Update data structure with images
2. [ ] Create/source service images
3. [ ] Add new CSS classes
4. [ ] Update JavaScript component
5. [ ] Verify translation integration
6. [ ] Test hover/active states
7. [ ] Verify glow effects render correctly
8. [ ] Mobile responsiveness
9. [ ] Image lazy loading verification
10. [ ] Accessibility check
