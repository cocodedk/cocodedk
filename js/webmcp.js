// WebMCP: the page hands an AI agent in the visitor's browser a few typed tools, so it can answer
// "what has he built?" or start a mail to Babak without scraping the page. Everything stays in the
// browser: the tools read the page (js/page-facts.js) and make no requests of their own.
//
// Spec: https://webmachinelearning.github.io/webmcp/ (draft). The shape has already moved once, which
// is why tests/webmcp.test.js also feeds it registries that misbehave, instead of trusting one tidy mock.
import { readWorks, readServices, readContact, readPlaces, readIntro, readAbout } from './page-facts';

// Mail apps cut a mailto: URL short somewhere past a few thousand characters, and the agent's text is
// not ours to trust with the visitor's address bar. These keep the draft a note, not a document.
const MESSAGE_MAX = 1500;
const SUBJECT_MAX = 120;
const SUBJECT_DEFAULT = 'Henvendelse fra cocode.dk';

// Cut by character, not by code unit: half an emoji makes encodeURIComponent throw.
const clip = (value, max) => Array.from(typeof value === 'string' ? value.trim() : '').slice(0, max).join('');
// An agent may send null where the schema says object; the tool should answer, not throw.
const given = (input) => (input && typeof input === 'object' ? input : {});

const READ_ONLY = { readOnlyHint: true };

function tools(openUrl) {
  return [
    {
      name: 'list_works',
      title: 'List what Babak has built',
      description: 'Everything shown on cocode.dk: apps, games, websites, client sites and AI tools made by Babak Bandpey. Each entry has a name, its kind, a one-line description in Danish and a link when the work has its own site. The featured works come first.',
      inputSchema: {
        type: 'object',
        properties: { featured_only: { type: 'boolean', description: 'Only the featured works.' } },
      },
      annotations: READ_ONLY,
      execute: async (input) => ({
        works: readWorks().filter((w) => given(input).featured_only !== true || w.featured),
      }),
    },
    {
      name: 'get_services',
      title: 'What Babak offers',
      description: 'The services Babak Bandpey offers as an AI consultant in Copenhagen, in his own words (Danish).',
      inputSchema: { type: 'object', properties: {} },
      annotations: READ_ONLY,
      execute: async () => ({ who: readIntro(), services: readServices() }),
    },
    {
      name: 'get_about',
      title: 'Who Babak is',
      description: 'Babak Bandpey in his own words (Danish): what his trade is, how long he has done it, why he recommends what he recommends, and who a client actually talks to. Also his city and the languages he works in. Use it when someone asks who is behind cocode.dk or why they should pick him.',
      inputSchema: { type: 'object', properties: {} },
      annotations: READ_ONLY,
      execute: async () => readAbout(),
    },
    {
      name: 'get_contact',
      title: 'How to reach Babak',
      description: 'E-mail, phone and LinkedIn for Babak Bandpey. He answers himself; there is no sales team.',
      inputSchema: { type: 'object', properties: {} },
      annotations: READ_ONLY,
      execute: async () => readContact(),
    },
    {
      name: 'go_to_section',
      title: 'Show a part of the page',
      description: 'Scroll the visitor to a section of cocode.dk or to one of the featured works, by its id (for example kontakt or swanready). Ask for a place that does not exist and the answer lists the ones that do.',
      inputSchema: {
        type: 'object',
        properties: { place: { type: 'string', description: 'The id of a section or featured work.' } },
        required: ['place'],
      },
      execute: async (input) => {
        const { place } = given(input);
        // Only ids the page lists as places: an agent must not reach the menu sheet or a stray heading.
        const places = readPlaces();
        const target = places.includes(place) ? document.getElementById(place) : null;
        if (!target) return { ok: false, error: `Unknown place "${place}".`, places };
        target.scrollIntoView(); // css/base.css decides smooth or not, so reduced motion is respected
        return { ok: true, place };
      },
    },
    {
      name: 'draft_inquiry',
      title: 'Start a mail to Babak',
      description: 'Ask the visitor\'s browser to open their mail app with a message to Babak Bandpey already written. Nothing is sent: the visitor reads it and presses send. Write the message in the visitor\'s language and say briefly what they need help with. The answer includes the address, in case no mail app opens.',
      inputSchema: {
        type: 'object',
        properties: {
          subject: { type: 'string', description: `Subject line, at most ${SUBJECT_MAX} characters.` },
          message: { type: 'string', description: `The body of the mail, at most ${MESSAGE_MAX} characters.` },
        },
        required: ['message'],
      },
      execute: async (input) => {
        const { subject, message } = given(input);
        const body = clip(message, MESSAGE_MAX);
        const { email } = readContact();
        if (!email) return { ok: false, sent: false, error: 'The page shows no mail address right now.' };
        if (!body) return { ok: false, sent: false, error: 'A message (text) is required.', email };
        // encodeURIComponent is what keeps "&bcc=" in the agent's text from becoming a header.
        const url = `mailto:${email}?subject=${encodeURIComponent(clip(subject, SUBJECT_MAX) || SUBJECT_DEFAULT)}&body=${encodeURIComponent(body)}`;
        openUrl(url);
        // The page cannot see whether a mail app answered, so it does not claim one did.
        return { ok: true, sent: false, email, url, note: 'The browser was asked to open a draft in the visitor\'s mail app. Nothing is sent until they press send. If no draft appeared, give them the address.' };
      },
    },
  ];
}

// Resolves to the names the browser really holds. A registry can exist and still end up empty,
// so the answer comes from getTools(), never from what was asked for.
export async function initWebMcp({ openUrl = (url) => { window.location.href = url; } } = {}) {
  const registry = document.modelContext; // Chrome 149 had it on navigator; that alias is gone since 153
  if (!registry || typeof registry.registerTool !== 'function') return [];
  const wanted = tools(openUrl);
  await Promise.all(wanted.map((tool) => Promise.resolve()
    .then(() => registry.registerTool(tool))
    .catch(() => { /* one refused tool must not take the others with it */ })));
  // js/main.js calls this and walks away, so whatever shape the registry turns out to have, this must not reject.
  const held = await Promise.resolve().then(() => registry.getTools()).catch(() => []);
  const names = wanted.map((t) => t.name);
  return (Array.isArray(held) ? held : []).map((t) => t && t.name).filter((name) => names.includes(name));
}
