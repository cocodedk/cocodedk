// Turns the catalogue data and what the sites say about themselves into the catalogue partial. The
// words, the groups and the order come from data/catalogue.json; the address and the picture of a
// card come from the site. The download blocks that cocode-apps keeps between markers are carried over.
import { esc } from '../readme/svg.js';
import { PICTURE, picturePath } from './paths.js';

const HEAD = `  <section class="section section--ruled" id="katalog" aria-labelledby="h-katalog">
    <div class="wrap">
      <div class="section__head">
        <h2 id="h-katalog">Resten af kataloget</h2>
        <p class="note">Små ting, sjove ting og et par meget store.</p>
      </div>
      <div class="index">`;
const TAIL = `      </div>
    </div>
  </section>
`;

const PAIR = /<!-- cocode-apps:get-([^\s:]+):start -->([\s\S]*?)<!-- cocode-apps:get-\1:end -->/g;
const marked = (id, text = '') => `<!-- cocode-apps:get-${id}:start -->${text}<!-- cocode-apps:get-${id}:end -->`;
const address = (url) => url.replace(/^[a-z][a-z\d+.-]*:\/\//i, '').replace(/\/+$/, '');

export const isHidden = (entry) => Boolean(entry.hidden);

/** The text between each pair of cocode-apps markers in a rendered partial, by the id in the marker. */
export const keptBlocks = (html) => new Map([...html.matchAll(PAIR)].map(([, id, text]) => [id, text]));

/** The entries that get a card: not hidden, with words, a known group and a picture to show. */
export function shownEntries({ catalogue, sites }) {
  const groups = new Set(catalogue.groups.map((group) => group.id));
  return catalogue.entries.filter((entry) => !isHidden(entry) && entry.name && entry.line
    && groups.has(entry.group) && (entry.picture === 'house' || sites[entry.id]?.image));
}

function card(entry, site, kept) {
  const url = entry.url || site?.url;
  const picture = `<img class="index__pic" src="${esc(picturePath(entry))}" width="${PICTURE.width}" height="${PICTURE.height}" loading="lazy" decoding="async" alt="">`;
  const link = url ? `<a class="index__link" href="${esc(url)}">${esc(address(url))}</a>` : '';
  const get = entry.get ? marked(entry.get, kept.get(entry.get)) : '';
  return `            <li>${picture}<span class="index__name">${esc(entry.name)}</span><span class="index__desc">${esc(entry.line)}</span>${link}${get}</li>`;
}

const section = ({ id, title }, cards) => [
  `        <section class="index__group" aria-labelledby="g-${esc(id)}">`,
  `          <h3 id="g-${esc(id)}">${esc(title)}</h3>`,
  '          <ul class="index__list">',
  ...cards,
  '          </ul>',
  '        </section>',
].join('\n');

/** The whole partial: one section per group that has cards, in the order of the group list. */
export function renderCatalogue({ catalogue, sites, kept = new Map() }) {
  const shown = shownEntries({ catalogue, sites });
  const sections = catalogue.groups
    .map((group) => [group, shown.filter((entry) => entry.group === group.id)])
    .filter(([, entries]) => entries.length > 0)
    .map(([group, entries]) => section(group, entries.map((entry) => card(entry, sites[entry.id], kept))));
  return [HEAD, ...sections, TAIL].join('\n');
}
