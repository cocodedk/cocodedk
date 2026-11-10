// Finds the public cocode.dk sites: the public repos of cocodedk whose Pages site answers on a
// cocode.dk host. The repo list comes from the GitHub API and the address from github.io, which
// answers a HEAD for a project site with a redirect to its custom domain.
const API = 'https://api.github.com/users/cocodedk/repos?per_page=100&page=';
const SUFFIX = '.cocode.dk';

async function listRepos(fetch, token) {
  const headers = { Accept: 'application/vnd.github+json', ...(token && { Authorization: `Bearer ${token}` }) };
  const repos = [];
  for (let page = 1; ; page += 1) {
    const res = await fetch(`${API}${page}`, { headers });
    if (!res.ok) throw new Error(`GitHub API answered ${res.status} for page ${page} of the repos`);
    const batch = await res.json();
    if (batch.length === 0) return repos;
    repos.push(...batch);
  }
}

// The cocode.dk address a repo's Pages site redirects to, or null when it stays on github.io or
// lives on another domain (cocode.dk itself does not end in ".cocode.dk", so it falls out here too).
async function siteOf(fetch, repo) {
  const from = `https://cocodedk.github.io/${repo}/`;
  const res = await fetch(from, { method: 'HEAD', redirect: 'manual' });
  // A failing or rate-limited github.io says nothing about the site: stop rather than drop it,
  // or the run would delete a live site's card and picture.
  if (res.status >= 500 || res.status === 429) throw new Error(`github.io answered ${res.status} for ${repo}`);
  const location = [301, 302].includes(res.status) && res.headers.get('location');
  if (!location) return null;
  const url = new URL(location, from);
  if (!url.hostname.endsWith(SUFFIX)) return null;
  return { id: url.hostname.slice(0, -SUFFIX.length), url: url.href, repo };
}

export async function discoverSites({ fetch, token }) {
  const repos = (await listRepos(fetch, token)).filter((repo) => repo.has_pages);
  const sites = (await Promise.all(repos.map((repo) => siteOf(fetch, repo.name)))).filter(Boolean);
  return sites.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}
