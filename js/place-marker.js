// You are here: the bar hangs its ribbon on the section under the reader's eye.
// The catalogue has no column of its own, so it still counts as "Værker".
const PLACES = [['vaerker', '#vaerker'], ['katalog', '#vaerker'], ['ydelser', '#ydelser'], ['om', '#om'], ['kontakt', '#kontakt']];

export function initPlaceMarker() {
  const bar = document.querySelector('.dock__bar');
  if (!bar) return;
  const cols = Array.from(bar.querySelectorAll('a[href^="#"]:not(#menu-toggle)'));
  const places = PLACES
    .map(([id, href]) => ({ el: document.getElementById(id), href }))
    .filter((p) => p.el);
  let queued = false;

  function mark() {
    queued = false;
    const line = window.innerHeight * 0.45;
    let here = '';
    places.forEach((p) => { if (p.el.getBoundingClientRect().top <= line) here = p.href; });
    // The last section is too short to reach the line, so the foot of the page is "Kontakt".
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) here = '#kontakt';
    cols.forEach((c) => {
      if (c.getAttribute('href') === here) c.setAttribute('aria-current', 'true');
      else c.removeAttribute('aria-current');
    });
  }

  window.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(mark); } }, { passive: true });
  window.addEventListener('resize', mark);
  mark();
}
