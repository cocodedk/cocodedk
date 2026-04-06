'use strict';

const { showNodeDescriptionModal } = require('../../js/main/showNodeDescriptionModal.js');

describe('showNodeDescriptionModal', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.linkifyText = jest.fn(text => text);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    delete window.linkifyText;
  });

  test('opens a node modal and only registers the escape-key listener', () => {
    const addSpy = jest.spyOn(document, 'addEventListener');
    const closeSpy = jest.fn();
    const pushStateSpy = jest.spyOn(window.history, 'pushState');
    const nodeData = {
      id: 'Pricing',
      label: 'Pricing',
      labels: { en: 'Pricing' },
      translations: { en: 'Some description' },
    };
    const currentModalRef = { value: null };
    const isModalOpeningRef = { value: false };
    const currentEscapeKeyHandlerRef = { value: null };

    showNodeDescriptionModal(
      nodeData,
      'en',
      currentModalRef,
      isModalOpeningRef,
      currentEscapeKeyHandlerRef,
      closeSpy,
      jest.fn()
    );

    expect(pushStateSpy).toHaveBeenCalledWith({ modal: 'pricing' }, '', '#pricing');
    expect(document.getElementById('node-description-modal-container')).not.toBeNull();
    expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('click', expect.any(Function), true);
    expect(typeof currentEscapeKeyHandlerRef.value).toBe('function');
  });
});
