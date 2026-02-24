/* Terminal Typewriter Effect Component */

const terminalText = {
  en: 'cocode.dk | AI Agents \u2022 Automation \u2022 Security',
  da: 'cocode.dk | AI Agenter \u2022 Automatisering \u2022 Sikkerhed'
};

let typewriterTimeout;
let currentLanguage = 'en';

function typeWriter(text, element, speed = 80) {
  if (!element) return;

  element.textContent = '';
  let index = 0;

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      typewriterTimeout = setTimeout(type, speed);
    } else {
      showCursor(element);
    }
  }

  type();
}

function showCursor(element) {
  if (!element) return;
  const cursor = document.createElement('span');
  cursor.className = 'terminal-cursor';
  element.appendChild(cursor);
}

function startTerminalEffect(lang = 'en') {
  currentLanguage = lang;
  clearTimeout(typewriterTimeout);

  const terminalElement = document.querySelector('.terminal-text');
  if (!terminalElement) return;

  const text = terminalText[lang] || terminalText['en'];
  typeWriter(text, terminalElement, 80);
}

function initTerminal() {
  startTerminalEffect(currentLanguage);
}

// Export for global use
window.terminal = {
  start: startTerminalEffect,
  init: initTerminal
};
