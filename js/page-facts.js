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
    url: site(scene.querySelector('a.scene__cta, a.work__link')),
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
    name: 'Babak Bandpey',
    email: strip(href('mailto:'), 'mailto:'),
    phone: strip(href('tel:'), 'tel:'),
    linkedin: href('https://linkedin.com'),
  };
}

// Everywhere on the page an agent can send the visitor: the sections, then the featured works.
export function readPlaces() {
  const sections = all('section[id]').map((s) => s.id);
  const works = all('.featured .anchor[id]').map((a) => a.id);
  return sections.concat(works);
}
