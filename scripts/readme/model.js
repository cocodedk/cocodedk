// The page, in English. What is on it and in which order comes from the page itself (js/page-facts.js);
// only the words come from readme/copy.en.json, looked up by the Danish name. A name the copy does not
// know stops the build: a README that is half Danish is worse than one that is a day late.
import { readWorks, readServices, readContact } from '../../js/page-facts.js';

function english(table, what, name) {
  const found = table[name];
  if (found === undefined) throw new Error(`No English copy for ${what} "${name}" in readme/copy.en.json`);
  return found;
}

const plateOf = (scene) => scene.querySelector('use').getAttribute('href').slice(1);

function featured(doc, works, copy, contact) {
  const plates = Array.from(doc.querySelectorAll('.scene')).map(plateOf);
  return works
    .filter((w) => w.featured)
    .map((w, i) => {
      const words = english(copy.works, 'work', w.name);
      return {
        no: i + 1,
        name: words.name || w.name,
        kind: english(copy.kinds, 'kind', w.kind),
        line: words.line,
        // A work without a site of its own is shown on request ("Bed om en demo").
        url: w.url || `mailto:${contact.email}?subject=${encodeURIComponent(w.name)}`,
        plate: plates[i],
      };
    });
}

function catalogue(works, copy) {
  const groups = [];
  works
    .filter((w) => !w.featured)
    .forEach((w) => {
      const words = english(copy.works, 'work', w.name);
      const name = english(copy.groups, 'group', w.kind);
      if (groups.at(-1)?.name !== name) groups.push({ name, items: [] });
      groups.at(-1).items.push({ name: words.name || w.name, line: words.line, url: w.url });
    });
  return groups;
}

// The README links all three; a missing one would print "null" on the profile.
function contactOf(doc) {
  const contact = readContact(doc);
  Object.entries(contact).forEach(([field, value]) => {
    if (!value) throw new Error(`The contact section on the page has no ${field}`);
  });
  return contact;
}

export function buildModel(doc, copy) {
  const contact = contactOf(doc);
  const works = readWorks(doc);
  return {
    intro: copy.intro,
    headings: copy.headings,
    works: featured(doc, works, copy, contact),
    groups: catalogue(works, copy),
    services: readServices(doc).map((s) => english(copy.services, 'service', s.name)),
    about: copy.about,
    contact: { ...contact, ...copy.contact },
  };
}
