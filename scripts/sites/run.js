// npm run sites: gathers what the public cocode.dk sites say about themselves, keeps their share
// pictures as small files, and proposes the catalogue partial from data/catalogue.json. With --offline
// nothing is fetched: the partial and the house-made pictures are redrawn from what is already on disk
// (npm run sites:render). With --report <file> the findings are also written there as Markdown.
// Whatever it finds, it exits 0; the Jest gate on the data is what says "not yet".
import fs from 'fs';
import path from 'path';
import { discoverSites } from './discover.js';
import { gatherSite, settle } from './gather.js';
import { shrink, housePicture, initial } from './pictures.js';
import { DATA, picturePath } from './paths.js';
import { renderCatalogue, keptBlocks, isHidden } from './render.js';
import { findProblems } from './check.js';
import { report } from './report.js';
import { FACES, fontCss } from '../readme/fonts.js';

const root = path.resolve(import.meta.dirname, '../..');
const at = (file) => path.join(root, file);
const args = process.argv.slice(2);
const offline = args.includes('--offline');
const reportFile = args.includes('--report') ? args[args.indexOf('--report') + 1] : null;
if (args.includes('--report') && !reportFile) throw new Error('--report needs a file to write to');

const AT_ONCE = 8;
const TIMEOUT = 20000;

const readJson = (file, fallback) => (fs.existsSync(at(file)) ? JSON.parse(fs.readFileSync(at(file), 'utf8')) : fallback);
// Keys in order at every level, so a run with nothing new writes the same bytes as the last one.
const inOrder = (_, value) => (value && typeof value === 'object' && !Array.isArray(value)
  ? Object.fromEntries(Object.entries(value).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)))
  : value);

// Writes a file only when its bytes differ and says what happened: 'new', 'changed' or 'same'.
function save(file, content) {
  const next = Buffer.from(content);
  const known = fs.existsSync(at(file));
  if (known && fs.readFileSync(at(file)).equals(next)) return 'same';
  fs.mkdirSync(path.dirname(at(file)), { recursive: true });
  fs.writeFileSync(at(file), next);
  return known ? 'changed' : 'new';
}

async function pool(items, size, work) {
  const results = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await work(items[index]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, worker));
  return results;
}

const timed = (url, options) => fetch(url, { ...options, signal: AbortSignal.timeout(TIMEOUT) });
const fetchText = async (url) => {
  const res = await timed(url, { redirect: 'follow' });
  return { status: res.status, text: await res.text() };
};

// A site that times out, or answers that it is busy or broken, keeps what we last knew of it: its
// card must not vanish because of one bad minute. Any other answer is a fact about the site.
const trouble = (record) => record.status >= 500 || record.status === 429;
async function gather(site, previous) {
  try {
    const record = await gatherSite(site, fetchText);
    if (previous && trouble(record)) throw new Error(`the site answered ${record.status}`);
    return settle(site, record, previous);
  } catch (error) {
    return settle(site, error, previous);
  }
}

async function shrunkPicture(url) {
  const res = await timed(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`the picture answered ${res.status}`);
  return shrink(Buffer.from(await res.arrayBuffer()));
}

// A picture that cannot be fetched or is not a picture leaves the old file where it is.
async function refreshPictures(sites, notes) {
  const fresh = Object.entries(sites).filter(([, site]) => site.image && !site.stale);
  await pool(fresh, AT_ONCE, async ([id, site]) => {
    const file = picturePath({ id });
    try {
      if (save(file, await shrunkPicture(site.image)) === 'changed') notes.push(`${id}: the picture changed`);
    } catch (error) {
      const kept = fs.existsSync(at(file)) ? 'kept the old one' : 'there is none yet';
      notes.push(`${id}: the picture could not be refreshed (${error.message}), ${kept}`);
    }
  });
}

// The extra sites are catalogue entries that have an address of their own and are not among the
// discovered ones: client domains, github.io apps, and sites whose repo is private.
async function gatherAll(before, catalogue, notes) {
  const found = await discoverSites({ fetch: timed, token: process.env.GITHUB_TOKEN });
  const known = new Set(found.map((site) => site.id));
  const extras = (catalogue?.entries ?? [])
    .filter((entry) => entry.url && entry.picture !== 'house' && !isHidden(entry) && !known.has(entry.id))
    .map((entry) => ({ id: entry.id, url: entry.url, repo: null }));
  const sites = [...found, ...extras];
  const records = await pool(sites, AT_ONCE, (site) => gather(site, before[site.id]));
  const after = Object.fromEntries(sites.map((site, index) => [site.id, records[index]]));
  await refreshPictures(after, notes);
  return after;
}

const shownHouse = (entry) => entry.picture === 'house' && !isHidden(entry);

// A plate in the colour of its group, for the entries with no site to take one from.
async function drawHousePictures(catalogue) {
  const inks = new Map(catalogue.groups.map((group) => [group.id, group.ink]));
  for (const entry of catalogue.entries.filter((e) => shownHouse(e) && e.name && inks.has(e.group))) {
    const css = await fontCss([FACES.serif], initial(entry.name));
    save(picturePath(entry), housePicture({ name: entry.name, ink: inks.get(entry.group) }, css));
  }
}

// A picture belongs to a site that shares one, or to an entry that is drawn by hand.
function removeOrphans(sites, catalogue) {
  const wanted = new Set([
    ...Object.entries(sites).filter(([, site]) => site.image).map(([id]) => picturePath({ id })),
    ...(catalogue?.entries ?? []).filter(shownHouse).map(picturePath),
  ].map((file) => path.basename(file)));
  fs.mkdirSync(at(DATA.dir), { recursive: true });
  for (const name of fs.readdirSync(at(DATA.dir))) {
    if (!wanted.has(name)) fs.rmSync(path.join(at(DATA.dir), name));
  }
}

function writePartial(catalogue, sites) {
  const current = fs.existsSync(at(DATA.partial)) ? fs.readFileSync(at(DATA.partial), 'utf8') : '';
  save(DATA.partial, renderCatalogue({ catalogue, sites, kept: keptBlocks(current) }));
}

if (offline && !fs.existsSync(at(DATA.sites))) throw new Error(`${DATA.sites} does not exist yet: run npm run sites first`);
const catalogue = readJson(DATA.catalogue, null);
const before = readJson(DATA.sites, {});
const notes = [];
const after = offline ? before : await gatherAll(before, catalogue, notes);

if (catalogue) await drawHousePictures(catalogue);
removeOrphans(after, catalogue);
save(DATA.sites, `${JSON.stringify(after, inOrder, 2)}\n`);
if (catalogue) writePartial(catalogue, after);
else console.log('no data/catalogue.json yet: catalogue partial left unchanged');

const problems = findProblems({
  catalogue: catalogue ?? { groups: [], entries: [] },
  sites: after,
  hasFile: (file) => fs.existsSync(at(file)),
});
console.log(problems.length > 0 ? `Needs words or fixes:\n${problems.map((p) => `  ${p}`).join('\n')}` : 'No problems.');
if (reportFile) fs.writeFileSync(path.resolve(reportFile), `${report({ before, after, problems, notes: notes.sort() })}\n`);
