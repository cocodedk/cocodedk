// The hand every motif is drawn in, the same as the featured plates in templates/partials/sprite.html:
// flat fills, round caps, and a thin outline printed a little off register.
import { PALETTE } from '../../readme/svg.js';

const SAFFRON = '#E8A63A';
const TERRACOTTA = '#C9705B';

// The drawing's colours on each plate. fill: the light body; acc and acc2: the two accents; line: the
// off-register outline; dark: details drawn on a light body; onAcc: marks drawn on top of an accent.
export const THEMES = {
  ink: {
    plate: PALETTE.ink, fill: PALETTE.sheet, acc: SAFFRON, acc2: TERRACOTTA,
    line: PALETTE.sheet, dark: PALETTE.ink, onAcc: PALETTE.ink,
  },
  saffron: {
    plate: PALETTE.saffron, fill: PALETTE.sheet, acc: PALETTE.ink, acc2: '#A2322C',
    line: PALETTE.ink, dark: PALETTE.ink, onAcc: PALETTE.sheet,
  },
  lapis: {
    plate: PALETTE.lapis, fill: PALETTE.sheet, acc: SAFFRON, acc2: TERRACOTTA,
    line: PALETTE.sheet, dark: PALETTE.ink, onAcc: PALETTE.ink,
  },
};

export const OFF = 'translate(12 -12)';

export const ghost = (c) =>
  `fill="none" stroke="${c.line}" stroke-width="5" stroke-opacity=".75" stroke-linejoin="round"`;

// A shape filled, then its outline printed off register: the signature of every plate on the page.
export const echo = (tag, attrs, fill, c) =>
  `<${tag} ${attrs} fill="${fill}"/><g transform="${OFF}"><${tag} ${attrs} ${ghost(c)}/></g>`;

export const strokes = (colour, width, d, extra = '') =>
  `<path d="${d}" fill="none" stroke="${colour}" stroke-width="${width}" stroke-linecap="round" `
  + `stroke-linejoin="round" ${extra}/>`;

// n copies of a piece, side by side or around a circle.
export const repeat = (n, piece) => Array.from({ length: n }, (_, i) => piece(i)).join('');

export const round = (n) => Math.round(n * 10) / 10;
