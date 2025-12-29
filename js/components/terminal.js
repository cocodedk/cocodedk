/* Terminal Typewriter Effect Component */

const terminalText = {
  en: 'cocode.dk | IT • Security • Innovation',
  da: 'cocode.dk | IT • Sikkerhed • Innovation',
  es: 'cocode.dk | IT • Seguridad • Innovación',
  zh: 'cocode.dk | 信息技术 • 安全 • 创新',
  ja: 'cocode.dk | IT • セキュリティ • イノベーション',
  de: 'cocode.dk | IT • Sicherheit • Innovation',
  ar: 'cocode.dk | تكنولوجيا المعلومات • الأمن • الابتكار',
  fa: 'cocode.dk | فناوری اطلاعات • امنیت • نوآوری',
  hi: 'cocode.dk | आईटी • सुरक्षा • नवाचार',
  ur: 'cocode.dk | آئی ٹی • سیکیورٹی • نوآوری',
  fr: 'cocode.dk | TI • Sécurité • Innovation'
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

  // Find the terminal-text element inside terminal-output
  const terminalElement = document.querySelector('.terminal-output .terminal-text');
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
