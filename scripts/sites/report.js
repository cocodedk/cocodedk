// What a run found, as Markdown for the body of the pull request. A section appears only when it has
// something to say; a run with nothing to say answers with one sentence. Nothing here touches a file.

// The English words when the site has them, else the root page's own.
function titleOf(record) {
  const versions = record.versions ?? {};
  const own = versions.en ?? Object.values(versions).find((version) => version.url === record.url);
  return own?.title ?? null;
}

const has = (records, id) => Object.hasOwn(records, id);
const ids = (records) => Object.keys(records).sort();
const quoted = (title) => (title ? ` ("${title}")` : '');
const section = (heading, items) => (items.length > 0 ? `## ${heading}\n\n${items.map((item) => `- ${item}`).join('\n')}` : null);

function renamed(before, after) {
  return ids(after)
    .filter((id) => has(before, id))
    .map((id) => [id, titleOf(before[id]), titleOf(after[id])])
    .filter(([, was, now]) => was && now && was !== now)
    .map(([id, was, now]) => `${id}: "${was}" is now "${now}"`);
}

export function report({ before, after, problems, notes }) {
  const sections = [
    section('New sites', ids(after).filter((id) => !has(before, id))
      .map((id) => `${id}: ${after[id].url}${quoted(titleOf(after[id]))}`)),
    section('Gone', ids(before).filter((id) => !has(after, id)).map((id) => `${id}: ${before[id].url}`)),
    section('Changed titles', renamed(before, after)),
    section('Pictures', notes),
    section('Could not reach (kept last known)', ids(after).filter((id) => after[id].stale)
      .map((id) => `${id}: ${after[id].url}`)),
    section('Needs words or fixes', problems),
  ].filter(Boolean);
  return sections.length > 0 ? sections.join('\n\n') : 'Nothing changed.';
}
