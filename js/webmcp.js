// WebMCP: the page hands an AI agent in the visitor's browser a few typed tools, so it can answer
// "what has he built?" or start a mail to Babak without scraping the page. Everything stays in the
// browser: the tools read the page (js/page-facts.js) and make no requests of their own.
//
// Spec: https://webmachinelearning.github.io/webmcp/ (draft). The shape has already moved once, which
// is why tests/webmcp.test.js runs against each browser shape instead of trusting one mock.
import { readWorks, readServices, readContact, readPlaces } from './page-facts';

const MESSAGE_MAX = 1500; // a mailto: URL that outgrows ~2000 characters is cut short by some mail apps

const READ_ONLY = { readOnlyHint: true };

function tools(openUrl) {
  return [
    {
      name: 'list_works',
      title: 'List what Babak has built',
      description: 'Everything shown on cocode.dk: apps, games, websites, client sites and AI tools made by Babak Bandpey. Each entry has a name, its kind, a one-line description in Danish and a link when the work has its own site. The six featured works come first.',
      inputSchema: {
        type: 'object',
        properties: { featured_only: { type: 'boolean', description: 'Only the six featured works.' } },
      },
      annotations: READ_ONLY,
      execute: async ({ featured_only: featuredOnly } = {}) => ({
        works: readWorks().filter((w) => !featuredOnly || w.featured),
      }),
    },
    {
      name: 'get_services',
      title: 'What Babak offers',
      description: 'The services Babak Bandpey offers as an AI consultant in Copenhagen, in his own words (Danish).',
      inputSchema: { type: 'object', properties: {} },
      annotations: READ_ONLY,
      execute: async () => ({
        who: 'Babak Bandpey, AI-konsulent. Jeg hjælper virksomheder med at bruge AI, og jeg bygger selv det, jeg anbefaler.',
        services: readServices(),
      }),
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
      description: 'Scroll the visitor to a section of cocode.dk (vaerker, katalog, ydelser, om, kontakt) or to one of the featured works (for example swanready or weather).',
      inputSchema: {
        type: 'object',
        properties: { place: { type: 'string', description: 'The id of a section or featured work.' } },
        required: ['place'],
      },
      execute: async ({ place } = {}) => {
        const places = readPlaces();
        const target = places.includes(place) ? document.getElementById(place) : null;
        if (!target) return { ok: false, error: `Unknown place "${place}".`, places };
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return { ok: true, place };
      },
    },
    {
      name: 'draft_inquiry',
      title: 'Start a mail to Babak',
      description: 'Open the visitor\'s mail app with a message to Babak Bandpey already written. Nothing is sent: the visitor reads it and presses send. Write the message in the visitor\'s language and say briefly what they need help with.',
      inputSchema: {
        type: 'object',
        properties: {
          subject: { type: 'string', description: 'Subject line.' },
          message: { type: 'string', description: `The body of the mail, at most ${MESSAGE_MAX} characters.` },
        },
        required: ['message'],
      },
      execute: async ({ subject, message } = {}) => {
        const body = String(message || '').trim().slice(0, MESSAGE_MAX);
        const { email } = readContact();
        if (!body || !email) return { ok: false, sent: false, error: 'A message is required.' };
        const line = String(subject || 'Henvendelse fra cocode.dk').trim();
        openUrl(`mailto:${email}?subject=${encodeURIComponent(line)}&body=${encodeURIComponent(body)}`);
        return { ok: true, sent: false, note: 'The draft is open in the visitor\'s mail app. They still have to press send.' };
      },
    },
  ];
}

// Chrome 150+ keeps the registry on the document; 149 had it on navigator (removed again in 153).
const findRegistry = () => document.modelContext || navigator.modelContext || null;

// Resolves to the names the browser really holds. A registry can exist and still end up empty,
// so the answer comes from getTools(), never from what was asked for.
export async function initWebMcp({ openUrl = (url) => { window.location.href = url; } } = {}) {
  const registry = findRegistry();
  if (!registry || typeof registry.registerTool !== 'function') return [];
  const wanted = tools(openUrl);
  await Promise.all(wanted.map((tool) => Promise.resolve()
    .then(() => registry.registerTool(tool))
    .catch(() => { /* one refused tool must not take the others with it */ })));
  if (typeof registry.getTools !== 'function') return [];
  const held = await registry.getTools().catch(() => []);
  const names = wanted.map((t) => t.name);
  return held.map((t) => t.name).filter((name) => names.includes(name));
}
