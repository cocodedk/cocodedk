/*
 * Navigation - Stitch Design System
 * Handles smooth scrolling, active state detection, and language dropdown
 */

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
        // Calculate offset for fixed header
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
        const navHeight = document.querySelector('.bottom-nav')?.offsetHeight || 0;
        const offset = headerHeight + 20;

        const targetPosition = targetSection.offsetTop - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }

      // Update active state
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Update active nav on scroll
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(item => {
          const href = item.getAttribute('href');
          const sectionId = href ? href.slice(1) : '';
          item.classList.toggle('active', sectionId === id);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    if (section.id) {
      observer.observe(section);
    }
  });

  // Set initial active state based on scroll position
  const updateActiveOnLoad = () => {
    const scrollPos = window.scrollY + 100;
    let activeSection = null;

    sections.forEach(section => {
      if (section.id && section.offsetTop <= scrollPos) {
        activeSection = section.id;
      }
    });

    if (activeSection) {
      navItems.forEach(item => {
        const href = item.getAttribute('href');
        const sectionId = href ? href.slice(1) : '';
        item.classList.toggle('active', sectionId === activeSection);
      });
    }
  };

  // Run on load and after a short delay to account for dynamic content
  updateActiveOnLoad();
  setTimeout(updateActiveOnLoad, 500);
}

export function initLanguageDropdown() {
  const moreBtn = document.getElementById('lang-more-btn');
  const dropdown = document.getElementById('lang-dropdown');
  const langToggle = document.getElementById('lang-toggle');

  if (!moreBtn || !dropdown) return;

  // Toggle dropdown
  moreBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.hidden = !dropdown.hidden;
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!moreBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.hidden = true;
    }
  });

  // Update active state in toggle when language changes
  const updateToggleActive = () => {
    const currentLang = localStorage.getItem('preferredLanguage') || 'da';
    langToggle?.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
  };

  // Listen for language changes
  const originalSetLanguage = window.setLanguage;
  if (originalSetLanguage) {
    window.setLanguage = function(lang) {
      originalSetLanguage(lang);
      updateToggleActive();
      dropdown.hidden = true;
    };
  }

  // Update on load
  updateToggleActive();

  // Handle dropdown item clicks
  dropdown.querySelectorAll('.lang-dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      const lang = item.dataset.lang;
      if (window.setLanguage) {
        window.setLanguage(lang);
      }
    });
  });
}
