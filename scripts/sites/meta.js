// Reads what one page says about itself: the words and picture it offers when shared, and the other
// languages it lists. Nothing here fetches; the caller hands over the HTML and the page's address.
import { JSDOM } from 'jsdom';

const clean = (text) => (text ?? '').trim() || null;

function absolute(href, pageUrl) {
  try {
    return new URL(href, pageUrl).href;
  } catch {
    return null;
  }
}

export function readMeta(html, pageUrl) {
  const doc = new JSDOM(html).window.document;
  const meta = (attribute, name) => clean(doc.querySelector(`meta[${attribute}="${name}"]`)?.getAttribute('content'));
  const image = meta('property', 'og:image');

  const alternates = {};
  for (const link of doc.querySelectorAll('link[rel~="alternate" i][hreflang][href]')) {
    const lang = clean(link.getAttribute('hreflang'));
    const href = absolute(link.getAttribute('href'), pageUrl);
    if (lang && href && lang.toLowerCase() !== 'x-default') alternates[lang] = href;
  }

  return {
    lang: clean(doc.documentElement.getAttribute('lang')),
    title: meta('property', 'og:title') ?? clean(doc.title),
    description: meta('property', 'og:description') ?? meta('name', 'description'),
    siteName: meta('property', 'og:site_name'),
    image: image && absolute(image, pageUrl),
    alternates,
  };
}
