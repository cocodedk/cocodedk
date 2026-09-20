// The "Indhold" sheet. No burger: the bar at the foot of the screen holds the four destinations,
// and its last column raises the sheet from behind it. The sheet never repeats what the bar offers.
export function initMenu() {
  const toggle = document.getElementById('menu-toggle');
  const sheet = document.getElementById('menu');
  const closeBtn = document.getElementById('menu-close');
  const dock = document.querySelector('.dock');
  const bar = document.querySelector('.dock__bar');
  if (!toggle || !sheet || !closeBtn || !dock || !bar) return;

  // The bar is deliberately not in this list: it stays usable while the sheet is open.
  const outside = ['.site-header', 'main', 'footer', '.skip'].map((s) => document.querySelector(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 1000px)');
  let isOpen = false;

  function setOpen(next, instant) {
    if (next === isOpen) return;
    isOpen = next;
    // Reduced motion: no unfolding, no stagger. The sheet is simply there.
    sheet.classList.toggle('no-motion', !!instant || reduce.matches);
    sheet.classList.toggle('is-open', next);
    sheet.inert = !next;
    outside.forEach((el) => { if (el) el.inert = next; });
    document.body.classList.toggle('is-locked', next);
    toggle.setAttribute('aria-expanded', String(next));
    (next ? closeBtn : toggle).focus({ preventScroll: true });
  }

  sheet.inert = true;
  toggle.addEventListener('click', (e) => { e.preventDefault(); setOpen(!isOpen); });
  closeBtn.addEventListener('click', (e) => { e.preventDefault(); setOpen(false); });
  // They are links dressed as buttons, so Space has to be taught.
  [toggle, closeBtn].forEach((el) => {
    el.addEventListener('keydown', (e) => { if (e.key === ' ') { e.preventDefault(); el.click(); } });
  });
  sheet.addEventListener('click', (e) => {
    if (e.target.closest('a[href^="#"]:not(#menu-close)')) setOpen(false, true);
  });
  // A destination in the bar, tapped while the sheet is up: put the sheet away and go.
  bar.addEventListener('click', (e) => {
    if (isOpen && e.target.closest('a[href^="#"]:not(#menu-toggle)')) setOpen(false, true);
  });

  // Focus is held inside the dock: the sheet's links first, then the bar, then round again.
  document.addEventListener('keydown', (e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false); return; }
    if (e.key !== 'Tab') return;
    const items = Array.from(dock.querySelectorAll('a[href], button:not([disabled])'));
    const first = items[0];
    const last = items[items.length - 1];
    const at = document.activeElement;
    if (e.shiftKey && at === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && at === last) { e.preventDefault(); first.focus(); }
    else if (!dock.contains(at)) { e.preventDefault(); first.focus(); }
  });

  desktop.addEventListener('change', (m) => { if (m.matches) setOpen(false, true); });

  // cocode.dk/#menu opens the sheet directly; it is also where the bar's link lands without JavaScript.
  if (window.location.hash === '#menu' && !desktop.matches) {
    setOpen(true, true);
    try { window.history.replaceState(null, '', window.location.pathname + window.location.search); } catch (err) { /* file:// */ }
  }
}
