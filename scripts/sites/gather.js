// Gathers what one site says about itself, in every language it lists. A site that answers badly
// is kept with its status and no versions; one that cannot be reached keeps its last known record.
import { readMeta } from './meta.js';

const answered = (status) => status >= 200 && status < 300;
const blank = (site, status) => ({ url: site.url, repo: site.repo ?? null, status, image: null, versions: {} });
const version = (url, meta) => ({ url, title: meta.title, description: meta.description });

async function alternate(fetchText, lang, url) {
  try {
    const res = await fetchText(url);
    return answered(res.status) ? [lang, version(url, readMeta(res.text, url))] : null;
  } catch {
    return null;
  }
}

export async function gatherSite(site, fetchText) {
  const root = await fetchText(site.url);
  if (!answered(root.status)) return blank(site, root.status);

  const meta = readMeta(root.text, site.url);
  const lang = meta.lang ?? 'und';
  const others = Object.entries(meta.alternates).filter(([other]) => other.toLowerCase() !== lang.toLowerCase());
  const found = await Promise.all(others.map(([other, url]) => alternate(fetchText, other, url)));

  const versions = [[lang, version(site.url, meta)], ...found.filter(Boolean)].sort(([a], [b]) => (a < b ? -1 : 1));
  return { ...blank(site, root.status), image: meta.image, versions: Object.fromEntries(versions) };
}

export function settle(site, result, previous) {
  if (!(result instanceof Error)) return result;
  return previous ? { ...previous, stale: true } : blank(site, 0);
}
