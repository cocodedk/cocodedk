// Small pieces every README picture is made of. GitHub shows an SVG as an image: no scripts, no
// outside files, and no text wrapping, so lines are broken here and every file carries its own fonts.

export const PALETTE = {
  paper: '#ECE2CF',
  sheet: '#F6EFE0',
  ink: '#1D2130',
  ink2: '#4A4639',
  rule: '#C8BCA4',
  lapis: '#233E8B',
  saffron: '#D8982C',
  saffronText: '#EDB651',
  onLapis2: '#D5D3D6',
  // The headings float on GitHub's own background, light or dark; this ochre clears 3:1 on both.
  ochre: '#A8741A',
};

export const FONT = {
  serif: "'Ibarra Real Nova', Georgia, serif",
  sans: "'Ysabeau Office', 'Gill Sans', sans-serif",
  sc: "'Ysabeau SC', 'Ysabeau Office', sans-serif",
};

const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ENTITIES[c]);

// Greedy, by characters: the copy is short and set in a known face, so a character budget per line
// is honest enough. Text that will not fit stops the build rather than running off the card.
export function wrap(text, maxChars, maxLines, label) {
  const out = [];
  text.split(/\s+/).forEach((word) => {
    const last = out.at(-1);
    if (last !== undefined && `${last} ${word}`.length <= maxChars) out[out.length - 1] = `${last} ${word}`;
    else out.push(word);
  });
  if (out.length > maxLines) throw new Error(`"${label}" needs more than ${maxLines} lines`);
  return out;
}

export const lines = (list, x, y, lh) =>
  list.map((line, i) => `<tspan x="${x}" y="${y + i * lh}">${esc(line)}</tspan>`).join('');

// The sprite's patterns and plates, without the invisible <svg> that holds them on the page.
export const plates = (sprite) => sprite.slice(sprite.indexOf('>') + 1, sprite.lastIndexOf('</svg>')).trim();

// The site's paper grain and the soft shadow its mounted plates cast.
export const GRAIN =
  '<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/>' +
  '<feColorMatrix values="0 0 0 0 .42 0 0 0 0 .33 0 0 0 0 .2 0 0 0 .11 0"/></filter>';
export const SHADOW =
  '<filter id="shadow" x="-10%" y="-10%" width="120%" height="125%">' +
  '<feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#3A2E17" flood-opacity=".22"/></filter>';

// Motion is a courtesy: anyone who asked their system for less gets none.
const STILL = '@media (prefers-reduced-motion: reduce){*{animation:none!important}}';

export function svg({ w, h, title, css = '', defs = '', body }) {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(title)}">`,
    `<title>${esc(title)}</title>`,
    `<style>${css}${STILL}</style>`,
    defs ? `<defs>${defs}</defs>` : '',
    body,
    '</svg>',
    '',
  ].join('\n');
}
