// npm run readme: rebuilds README.md and readme/img/ from the page. The pictures folder is emptied
// first, so a work that leaves the page takes its card with it.
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import { buildModel } from './model.js';
import { plates } from './svg.js';
import { FACES, fontCss } from './fonts.js';
import { hero } from './hero.js';
import { workCard, contactCard, heading } from './cards.js';
import { renderReadme, cardFile } from './markdown.js';

const root = path.resolve(import.meta.dirname, '../..');
const partials = path.join(root, 'templates/partials');
const out = path.join(root, 'readme/img');
const read = (file) => fs.readFileSync(file, 'utf8');

const page = fs.readdirSync(partials).sort().map((f) => read(path.join(partials, f))).join('\n');
const doc = new JSDOM(page).window.document;
const model = buildModel(doc, JSON.parse(read(path.join(root, 'readme/copy.en.json'))));
const art = plates(read(path.join(partials, 'sprite.html')));

// Each picture carries only the letters it shows. Drawing once without fonts tells us which.
const words = (draw) => draw('').replace(/<[^>]+>/g, ' ');
async function picture(file, faces, draw) {
  const css = await fontCss(faces, words(draw));
  fs.writeFileSync(path.join(out, file), draw(css));
}

const { serif, serifItalic, sans, sc } = FACES;
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

await picture('hero.svg', [serif, sc], (css) => hero(model, css, art));
for (const work of model.works) {
  await picture(cardFile(work), [serif, serifItalic, sans, sc], (css) => workCard(work, css, art));
}
for (const key of Object.keys(model.headings)) {
  await picture(`heading-${key}.svg`, [serif], (css) => heading(model.headings[key].title, css));
}
await picture('contact.svg', [serif, sans], (css) => contactCard(model.contact, css));

fs.writeFileSync(path.join(root, 'README.md'), renderReadme(model));
console.log(`README.md and ${fs.readdirSync(out).length} pictures in readme/img/`);
