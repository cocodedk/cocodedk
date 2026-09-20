import { initMenu } from '../js/menu';

const FIXTURE = `
  <a class="skip" href="#indhold">Spring til indholdet</a>
  <header class="site-header"></header>
  <div class="dock">
    <div class="sheet" id="menu">
      <a id="menu-close" href="#" role="button">Luk</a>
      <a id="work" href="#weather">Weather</a>
      <a id="mail" href="mailto:bb@cocode.dk">Skriv til mig</a>
    </div>
    <nav class="dock__bar">
      <a id="place" href="#ydelser">Ydelser</a>
      <a id="menu-toggle" href="#menu" role="button" aria-expanded="false">Indhold</a>
    </nav>
  </div>
  <main></main>
  <footer></footer>`;

const $ = (id) => document.getElementById(id);
const press = (key) => document.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));

describe('the Indhold sheet', () => {
  beforeEach(() => {
    document.body.innerHTML = FIXTURE;
    // jsdom has no matchMedia; a phone with motion allowed is the case under test.
    window.matchMedia = () => ({ matches: false, addEventListener() {} });
    initMenu();
  });

  test('should start closed and out of reach', () => {
    expect($('menu').inert).toBe(true);
  });

  test('should open when Indhold is tapped', () => {
    $('menu-toggle').click();
    expect($('menu').classList.contains('is-open')).toBe(true);
  });

  test('should tell assistive technology that it is open', () => {
    $('menu-toggle').click();
    expect($('menu-toggle').getAttribute('aria-expanded')).toBe('true');
  });

  test('should take the page behind it out of reach while open', () => {
    $('menu-toggle').click();
    expect(document.querySelector('main').inert).toBe(true);
  });

  test('should leave the bar usable while open', () => {
    $('menu-toggle').click();
    expect(document.querySelector('.dock__bar').inert).toBeFalsy();
  });

  test('should close on Escape', () => {
    $('menu-toggle').click();
    press('Escape');
    expect($('menu').classList.contains('is-open')).toBe(false);
  });

  test('should hand the page back when it closes', () => {
    $('menu-toggle').click();
    $('menu-close').click();
    expect(document.querySelector('main').inert).toBe(false);
  });

  test('should close when a work is chosen', () => {
    $('menu-toggle').click();
    $('work').click();
    expect($('menu').classList.contains('is-open')).toBe(false);
  });

  test('should close when a destination in the bar is tapped', () => {
    $('menu-toggle').click();
    $('place').click();
    expect($('menu').classList.contains('is-open')).toBe(false);
  });

  test('should stay open when the mail button is used', () => {
    $('menu-toggle').click();
    $('mail').addEventListener('click', (e) => e.preventDefault());
    $('mail').click();
    expect($('menu').classList.contains('is-open')).toBe(true);
  });
});
