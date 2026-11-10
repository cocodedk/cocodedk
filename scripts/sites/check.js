// Everything that has to be true of the catalogue data before the partial can be trusted. It returns
// the problems as sentences that name the site, so a failed run says what to fix and where.
import { picturePath } from './paths.js';
import { isHidden } from './render.js';
import { MOTIFS } from './motifs/index.js';

const answersWell = (site) => site.status === 200 || site.stale;

// The picture of a card is a file in the repo: a house-made one, or the site's share picture.
function pictureProblems(entry, site, hasFile) {
  if (entry.picture !== 'house') {
    if (!entry.url && !site) return ['no site with this name any more'];
    if (site && !answersWell(site)) return [`the site answers ${site.status}`];
    if (!site?.image) return ['the site shares no picture'];
  }
  const file = picturePath(entry);
  return hasFile(file) ? [] : [`picture file ${file} is missing`];
}

function entryProblems(entry, groupIds, sites, hasFile) {
  const own = [];
  if (!entry.name || !entry.line || !entry.group) own.push('needs a name, a Danish line and a group');
  if (entry.group && !groupIds.has(entry.group)) own.push(`group "${entry.group}" is not in the group list`);
  if (entry.motif && !MOTIFS[entry.motif]) own.push(`motif "${entry.motif}" is not in the motif library`);
  own.push(...pictureProblems(entry, sites[entry.id], hasFile));
  return own.map((problem) => `${entry.id}: ${problem}`);
}

// A hidden entry needs no words and no picture, only a place in the list so a new site cannot slip
// by unnoticed; the words, the status and the picture are asked of the entries meant to be shown.
export function findProblems({ catalogue, sites, hasFile }) {
  const groupIds = new Set(catalogue.groups.map((group) => group.id));
  const listed = new Set(catalogue.entries.map((entry) => entry.id));
  const problems = Object.keys(sites).sort()
    .filter((id) => !listed.has(id))
    .map((id) => `${id}: on cocode.dk but not in data/catalogue.json`);

  const seen = new Set();
  for (const entry of catalogue.entries) {
    if (seen.has(entry.id)) problems.push(`${entry.id}: listed twice`);
    seen.add(entry.id);
    if (!isHidden(entry)) problems.push(...entryProblems(entry, groupIds, sites, hasFile));
  }
  return [...new Set(problems)];
}
