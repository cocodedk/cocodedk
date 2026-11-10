// The library of drawings a house-made catalogue picture can show, picked by an entry's "motif" field.
// A new kind of work means one more function: drawn in a 600 x 400 box, its colours from the theme.
import { workshop, back, dove, rps, talk } from './objects.js';
import { film, marquee, popup, keys, browser } from './screens.js';
import { photos, wave, calendar, gear, shapes } from './media.js';

export { THEMES } from './kit.js';

export const MOTIFS = {
  workshop, back, dove, rps, talk, film, marquee, popup, keys, browser, photos, wave, calendar, gear, shapes,
};

// What an entry that names no motif gets.
export const FALLBACK = 'shapes';
