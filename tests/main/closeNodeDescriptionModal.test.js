'use strict';

const { closeNodeDescriptionModal } = require('../../js/main/closeNodeDescriptionModal.js');

describe('closeNodeDescriptionModal', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="node-description-modal-container"></div>
      <div class="node-modal-overlay"></div>
      <div class="node-modal"></div>
      <div class="modal-backdrop"></div>
      <div class="node-description-modal"></div>
    `;

    window.CytoscapeManager = { clearSelection: jest.fn() };
    window.history.pushState({}, '', '#pricing');
  });

  afterEach(() => {
    delete window.CytoscapeManager;
  });

  test('removes modal elements and escape handler state', () => {
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      target: {
        tagName: 'BUTTON',
        textContent: 'Close',
        innerHTML: '',
        classList: { contains: jest.fn(() => true) },
      },
    };
    const escapeHandler = jest.fn();
    const isModalOpeningRef = { value: false };
    const currentEscapeKeyHandlerRef = { value: escapeHandler };
    const removeSpy = jest.spyOn(document, 'removeEventListener');

    closeNodeDescriptionModal(event, isModalOpeningRef, currentEscapeKeyHandlerRef);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(document.getElementById('node-description-modal-container')).toBeNull();
    expect(document.querySelector('.node-modal-overlay')).toBeNull();
    expect(document.querySelector('.node-modal')).toBeNull();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.node-description-modal')).toBeNull();
    expect(removeSpy).toHaveBeenCalledWith('keydown', escapeHandler);
    expect(currentEscapeKeyHandlerRef.value).toBeNull();
  });

  test('replaces the modal hash instead of pushing a new history entry', () => {
    const replaceSpy = jest.spyOn(window.history, 'replaceState');
    const pushSpy = jest.spyOn(window.history, 'pushState');
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      target: {
        tagName: 'BUTTON',
        textContent: 'Close',
        innerHTML: '',
        classList: { contains: jest.fn(() => true) },
      },
    };

    closeNodeDescriptionModal(event, { value: false }, { value: null });

    expect(replaceSpy).toHaveBeenCalledWith('', document.title, window.location.pathname);
    expect(pushSpy).not.toHaveBeenCalled();
  });

  test('does not touch removed Cytoscape cleanup hooks', () => {
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      target: {
        tagName: 'BUTTON',
        textContent: 'Close',
        innerHTML: '',
        classList: { contains: jest.fn(() => true) },
      },
    };

    closeNodeDescriptionModal(event, { value: false }, { value: null });

    expect(window.CytoscapeManager.clearSelection).not.toHaveBeenCalled();
  });
});
