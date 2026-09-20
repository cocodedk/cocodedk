// What the page says about itself, read from the page. The copy lives once, in templates/partials/;
// anything that answers questions about the site (js/webmcp.js) asks here instead of keeping a second copy.

const text = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '');
const all = (selector, root = document) => Array.from(root.querySelectorAll(selector));
// A link that only jumps within the page ("Bed om en demo") is not the work's own site.
const site = (el) => (el && /^https?:/.test(el.getAttribute('href')) ? el.getAttribute('href') : null);

function featured(scene) {
  return {
    name: text(scene.querySelector('.scene__title')),
    kind: text(scene.querySelector('.scene__meta .sc')),
    description: [text(scene.querySelector('.scene__lead')), text(scene.querySelector('.scene__desc'))].filter(Boolean).join(' '),
    // The button, when a work has one, is its main site; the plain link is the fallback.
    url: site(scene.querySelector('a.scene__cta') || scene.querySelector('a.work__link')),
    featured: true,
  };
}

function listed(item, group) {
  return {
    name: text(item.querySelector('.index__name')),
    kind: group,
    description: text(item.querySelector('.index__desc')),
    url: site(item.querySelector('a.index__link')),
    featured: false,
  };
}

export function readWorks() {
  const catalogue = all('.index__group').flatMap((group) => {
    const heading = text(group.querySelector('h3'));
    return all('.index__list > li', group).map((item) => listed(item, heading));
  });
  return all('.scene').map(featured).concat(catalogue);
}

export function readServices() {
  return all('.services > div').map((row) => ({
    name: text(row.querySelector('dt')),
    description: text(row.querySelector('dd')),
  }));
}

export function readContact() {
  const href = (selector) => {
    const el = document.querySelector(`#kontakt a[href^="${selector}"]`);
    return el ? el.getAttribute('href') : null;
  };
  const strip = (value, prefix) => (value ? value.slice(prefix.length) : null);
  return {
    email: strip(href('mailto:'), 'mailto:'),
    phone: strip(href('tel:'), 'tel:'),
    linkedin: href('https://linkedin.com'),
  };
}

// Who this is, in the page's own words: the line above the title, then the title's two sentences.
export function readIntro() {
  const title = all('#titel > span').map(text).join(' ') || text(document.getElementById('titel'));
  return [text(document.querySelector('.hero .sc')), title].filter(Boolean).join('. ');
}

// "Om mig": the letter, paragraph by paragraph, and the notes in its margin. The notes come back as a
// list because nothing in the markup says which is the city and which the languages; naming them by
// position would break silently the day a line is added.
export function readAbout() {
  const section = document.getElementById('om');
  if (!section) return { heading: '', paragraphs: [], notes: [] };
  return {
    heading: text(section.querySelector('h2')),
    paragraphs: all('.letter p', section).map(text),
    notes: all('.margin-notes p', section).map(text),
  };
}

// Everywhere on the page an agent can send the visitor: the sections, then the featured works.
export function readPlaces() {
  const sections = all('section[id]').map((s) => s.id);
  const works = all('.featured .anchor[id]').map((a) => a.id);
  return sections.concat(works);
}
