'use strict';

const { setLanguage } = require('../../js/main/setLanguage.js');

describe('setLanguage', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="lang-item" data-lang="en" aria-selected="false"></div>
      <div class="lang-item active" data-lang="da" aria-selected="true"></div>
    `;

    window.updateHeroContent = jest.fn();
    window.updateSectionContent = jest.fn();
    window.terminal = { start: jest.fn() };
    window.serviceCards = { render: jest.fn() };
    window.nodes = [{ id: 'n1' }];
    window.renderPortfolio = jest.fn();
    window.portfolioItems = [{ id: 'p1' }];
    window.CytoscapeManager = { setLanguage: jest.fn() };
  });

  afterEach(() => {
    delete window.updateHeroContent;
    delete window.updateSectionContent;
    delete window.terminal;
    delete window.serviceCards;
    delete window.nodes;
    delete window.renderPortfolio;
    delete window.portfolioItems;
    delete window.CytoscapeManager;
  });

  test('updates current UI surfaces for the selected language', () => {
    const result = setLanguage('en');

    expect(result).toBe('en');
    expect(window.updateHeroContent).toHaveBeenCalledWith('en');
    expect(window.updateSectionContent).toHaveBeenCalledWith('en');
    expect(window.terminal.start).toHaveBeenCalledWith('en');
    expect(window.serviceCards.render).toHaveBeenCalledWith(window.nodes, 'en');
    expect(window.renderPortfolio).toHaveBeenCalledWith(window.portfolioItems, 'en');
    expect(document.body.getAttribute('dir')).toBe('ltr');
  });

  test('updates the active language item', () => {
    setLanguage('en');

    const english = document.querySelector('[data-lang="en"]');
    const danish = document.querySelector('[data-lang="da"]');

    expect(english.classList.contains('active')).toBe(true);
    expect(english.getAttribute('aria-selected')).toBe('true');
    expect(danish.classList.contains('active')).toBe(false);
    expect(danish.getAttribute('aria-selected')).toBe('false');
  });

  test('does not call removed visualization integrations', () => {
    setLanguage('en');

    expect(window.CytoscapeManager.setLanguage).not.toHaveBeenCalled();
  });
});
