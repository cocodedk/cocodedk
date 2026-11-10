// Motifs of pictures, sound, plans and parts. Each is drawn in a 600 x 400 box and takes its colours
// from a theme.
import { OFF, ghost, echo, strokes, repeat, round } from './kit.js';

const CHECK = 'l9 10 17-22';

// A fan of photographs turning into a film, with a note for the music.
export function photos(c) {
  const card = (rot, inner) => `<g transform="rotate(${rot} 260 210)">`
    + `${echo('rect', 'x="130" y="100" width="260" height="210" rx="6"', c.fill, c)}${inner}</g>`;
  const view = `<rect x="148" y="118" width="224" height="148" fill="${c.acc2}"/>`
    + `<circle cx="330" cy="152" r="18" fill="${c.acc}"/>`
    + `<path d="M148 266l70-82 46 52 32-30 76 60z" fill="${c.dark}" opacity=".85"/>`;
  return `<g transform="translate(-20 -6)">${card(-14, '')}${card(-5, '')}${card(5, view)}
<circle cx="420" cy="292" r="50" fill="${c.acc}"/><path d="M406 268v48l38-24z" fill="${c.onAcc}"/>
${strokes(c.line, 10, 'M500 96v120M500 96l40 14')}
<ellipse cx="484" cy="218" rx="20" ry="15" transform="rotate(-20 484 218)" fill="${c.line}"/></g>`;
}

// A sound wave divided into chapters, each with its flag.
export function wave(c) {
  const cols = [c.fill, c.acc, c.acc2];
  const bars = repeat(36, (i) => {
    const h = round(26 + 120 * Math.abs(Math.sin(i * 0.9) * 0.6 + Math.sin(i * 0.37) * 0.4));
    const ch = Math.floor(i / 12);
    return `<rect x="${round(48 + i * 14.4 + ch * 12)}" y="${round(214 - h / 2)}" width="8" height="${h}" rx="4" `
      + `fill="${cols[ch]}"/>`;
  });
  const flag = (ch) => {
    const x = round(44 + ch * (12 * 14.4 + 12));
    return `${strokes(c.line, 4, `M${x} 104V320`, 'stroke-opacity=".55"')}`
      + `<path d="M${x - 2} 74h46l-12 15 12 15h-46z" fill="${cols[ch]}"/>`;
  };
  return `<g transform="translate(-7 0)">${bars}${repeat(3, flag)}</g>`;
}

// A calendar page with a day circled, and a ticked task list beside it.
export function calendar(c) {
  const ticks = [150, 200, 250].map((y) => `<path d="M84 ${y}${CHECK}"/>`).join('');
  const days = repeat(28, (i) =>
    `<rect x="${262 + (i % 7) * 38}" y="${160 + Math.floor(i / 7) * 44}" width="14" height="14" rx="2"/>`);
  return `<g transform="translate(8 -6)"><g transform="rotate(-8 170 210)">
${echo('rect', 'x="60" y="96" width="210" height="250" rx="6"', c.fill, c)}
<g fill="none" stroke="${c.acc}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">${ticks}</g>
${strokes(c.dark, 7, 'M130 146h110M130 196h110M130 246h70', 'stroke-opacity=".5"')}</g>
${echo('rect', 'x="236" y="70" width="300" height="280" rx="10"', c.fill, c)}
<path d="M236 80a10 10 0 0 1 10-10h280a10 10 0 0 1 10 10v54H236z" fill="${c.acc2}"/>
${strokes(c.dark, 12, 'M300 52v40M472 52v40')}
<g fill="${c.dark}" opacity=".4">${days}</g>
<circle cx="383" cy="211" r="25" fill="none" stroke="${c.acc}" stroke-width="7"/></g>`;
}

// Two meshing gears: any tool that does a job.
export function gear(c) {
  const wheel = (cx, cy, r, teeth, fill, rot) => {
    const tooth = `<rect x="${round(-r * 0.17)}" y="${round(-r * 1.22)}" width="${round(r * 0.34)}" `
      + `height="${round(r * 0.4)}" rx="5"/>`;
    const ring = repeat(teeth, (i) => `<g transform="rotate(${round((360 / teeth) * i)})">${tooth}</g>`);
    const hub = round(r * 0.36);
    const disc = `M${-r} 0a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0z`
      + `M${-hub} 0a${hub} ${hub} 0 1 1 ${2 * hub} 0a${hub} ${hub} 0 1 1 ${-2 * hub} 0z`;
    return `<g transform="translate(${cx} ${cy}) rotate(${rot})" fill="${fill}">${ring}`
      + `<path d="${disc}" fill-rule="evenodd"/></g>
<circle cx="${cx}" cy="${cy}" r="${round(r * 1.22)}" transform="${OFF}" ${ghost(c)} stroke-dasharray="6 10"/>`;
  };
  return `<g transform="translate(8 6)">${wheel(240, 200, 120, 10, c.fill, 0)}${wheel(408, 128, 64, 8, c.acc, 12)}</g>`;
}

// Circle, square, triangle: the fallback when an entry names no motif.
export const shapes = (c) => `<g transform="translate(-42 -4)">
${echo('circle', 'cx="214" cy="226" r="98"', c.acc, c)}
${echo('rect', 'x="282" y="96" width="170" height="170" rx="4" transform="rotate(8 367 181)"', c.fill, c)}
${echo('path', 'd="M410 330l78-136 78 136z"', c.acc2, c)}</g>`;
