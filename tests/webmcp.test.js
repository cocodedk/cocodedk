import { initWebMcp } from '../js/webmcp';
import { loadPage } from './helpers/page';

// Chrome's registry, as far as the page can see it: tools go in one at a time, and come back from getTools().
function registry({ failOn } = {}) {
  const tools = [];
  return {
    tools,
    registerTool: jest.fn((tool) => (tool.name === failOn ? Promise.reject(new Error('InvalidStateError')) : Promise.resolve(void tools.push(tool)))),
    getTools: jest.fn(() => Promise.resolve(tools)),
  };
}
const put = (target, value) => Object.defineProperty(target, 'modelContext', { value, configurable: true });
const NAMES = ['draft_inquiry', 'get_about', 'get_contact', 'get_services', 'go_to_section', 'list_works'];

describe('WebMCP', () => {
  let openUrl;
  beforeEach(() => {
    loadPage();
    openUrl = jest.fn();
    Element.prototype.scrollIntoView = jest.fn();
  });
  afterEach(() => { delete document.modelContext; });

  const start = async (reg) => { await initWebMcp({ openUrl }); return (name) => reg.tools.find((t) => t.name === name); };

  test('should do nothing in a browser without WebMCP', async () => {
    await expect(initWebMcp({ openUrl })).resolves.toEqual([]);
  });

  test('should register its six tools with Chrome 150 and later', async () => {
    const reg = registry(); put(document, reg);
    await start(reg);
    expect(reg.tools.map((t) => t.name).sort()).toEqual(NAMES);
  });

  test('should keep going when one tool is refused', async () => {
    const reg = registry({ failOn: 'get_contact' }); put(document, reg);
    await start(reg);
    expect(reg.tools).toHaveLength(5);
  });

  test('should report what the browser actually holds, not what it asked for', async () => {
    const reg = registry({ failOn: 'get_contact' }); put(document, reg);
    expect(await initWebMcp({ openUrl })).not.toContain('get_contact');
  });

  test.each([
    ['returns a plain array', () => []],
    ['throws', () => { throw new Error('nope'); }],
    ['resolves to nothing', () => Promise.resolve(undefined)],
    ['lists a hole', () => Promise.resolve([null])],
  ])('should not reject when getTools %s', async (_label, getTools) => {
    put(document, { registerTool: () => Promise.resolve(), getTools });
    await expect(initWebMcp({ openUrl })).resolves.toEqual([]);
  });

  test('should use tool names the specification allows', async () => {
    const reg = registry(); put(document, reg);
    await start(reg);
    expect(reg.tools.every((t) => /^[A-Za-z0-9_.-]{1,128}$/.test(t.name))).toBe(true);
  });

  test('should mark the reading tools read-only', async () => {
    const reg = registry(); put(document, reg);
    const tool = await start(reg);
    expect(['list_works', 'get_services', 'get_contact', 'get_about'].every((n) => tool(n).annotations.readOnlyHint)).toBe(true);
  });

  test('should not call the tools that act read-only', async () => {
    const reg = registry(); put(document, reg);
    const tool = await start(reg);
    expect(['go_to_section', 'draft_inquiry'].some((n) => tool(n).annotations && tool(n).annotations.readOnlyHint)).toBe(false);
  });

  test.each(NAMES)('should answer %s even when the agent sends null', async (name) => {
    const reg = registry(); put(document, reg);
    const tool = await start(reg);
    await expect(tool(name).execute(null)).resolves.toBeDefined();
  });

  test('should introduce Babak in the page\'s own words', async () => {
    const reg = registry(); put(document, reg);
    const tool = await start(reg);
    expect((await tool('get_services').execute({})).who).toBe('Babak Bandpey, AI-konsulent. Jeg hjælper virksomheder med at bruge AI. Og jeg bygger selv det, jeg anbefaler.');
  });

  test('should answer get_about from the page', async () => {
    const reg = registry(); put(document, reg);
    const tool = await start(reg);
    expect((await tool('get_about').execute({})).paragraphs).toHaveLength(3);
  });

  test('should only narrow list_works for a real true', async () => {
    const reg = registry(); put(document, reg);
    const tool = await start(reg);
    expect((await tool('list_works').execute({ featured_only: 'false' })).works.length).toBeGreaterThan(6);
  });

  test('should answer list_works from the page', async () => {
    const reg = registry(); put(document, reg);
    const tool = await start(reg);
    expect((await tool('list_works').execute({})).works.some((w) => w.name === 'SwanReady')).toBe(true);
  });

  test('should narrow list_works to the featured ones on request', async () => {
    const reg = registry(); put(document, reg);
    const tool = await start(reg);
    expect((await tool('list_works').execute({ featured_only: true })).works).toHaveLength(6);
  });

  test('should scroll to a place that exists', async () => {
    const reg = registry(); put(document, reg);
    const tool = await start(reg);
    await tool('go_to_section').execute({ place: 'ydelser' });
    expect(Element.prototype.scrollIntoView.mock.instances[0].id).toBe('ydelser');
  });

  test.each(['menu', 'g-apps', 'h-kontakt'])('should not scroll to %s, which is on the page but is not a place', async (place) => {
    const reg = registry(); put(document, reg);
    const tool = await start(reg);
    await tool('go_to_section').execute({ place });
    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
  });

  test('should name the places it knows when asked for one it does not', async () => {
    const reg = registry(); put(document, reg);
    const tool = await start(reg);
    expect((await tool('go_to_section').execute({ place: 'pricing' })).places).toContain('kontakt');
  });

  test('should open a prefilled mail to Babak', async () => {
    const reg = registry(); put(document, reg);
    const tool = await start(reg);
    await tool('draft_inquiry').execute({ subject: 'AI i vores kundeservice', message: 'Hej Babak' });
    expect(openUrl).toHaveBeenCalledWith('mailto:bb@cocode.dk?subject=AI%20i%20vores%20kundeservice&body=Hej%20Babak');
  });

  test('should not let the agent add recipients through the subject', async () => {
    const reg = registry(); put(document, reg);
    const tool = await start(reg);
    await tool('draft_inquiry').execute({ subject: 'Hej&bcc=x@y.dk', message: 'Hej&cc=z@y.dk' });
    const url = new URL(openUrl.mock.calls[0][0]);
    expect([url.pathname, ...url.searchParams.keys()]).toEqual(['bb@cocode.dk', 'subject', 'body']);
  });

  test('should hand the agent the address too, in case no mail app opens', async () => {
    const reg = registry(); put(document, reg);
    const tool = await start(reg);
    expect((await tool('draft_inquiry').execute({ message: 'Hej' })).email).toBe('bb@cocode.dk');
  });

  test('should survive a message cut in the middle of an emoji', async () => {
    const reg = registry(); put(document, reg);
    const tool = await start(reg);
    expect((await tool('draft_inquiry').execute({ message: `${'a'.repeat(1499)}😀 og mere` })).ok).toBe(true);
  });

  test('should cap a runaway subject', async () => {
    const reg = registry(); put(document, reg);
    const tool = await start(reg);
    await tool('draft_inquiry').execute({ subject: 'S'.repeat(50000), message: 'Hej' });
    expect(openUrl.mock.calls[0][0].length).toBeLessThan(400);
  });

  test('should fall back to its own subject when given a blank one', async () => {
    const reg = registry(); put(document, reg);
    const tool = await start(reg);
    await tool('draft_inquiry').execute({ subject: '   ', message: 'Hej' });
    expect(new URL(openUrl.mock.calls[0][0]).searchParams.get('subject')).toBe('Henvendelse fra cocode.dk');
  });

  test('should refuse a message that is not text', async () => {
    const reg = registry(); put(document, reg);
    const tool = await start(reg);
    await tool('draft_inquiry').execute({ message: { a: 1 } });
    expect(openUrl).not.toHaveBeenCalled();
  });

  test('should tell the agent that nothing has been sent', async () => {
    const reg = registry(); put(document, reg);
    const tool = await start(reg);
    expect((await tool('draft_inquiry').execute({ message: 'Hej' })).sent).toBe(false);
  });

  test('should refuse an empty inquiry', async () => {
    const reg = registry(); put(document, reg);
    const tool = await start(reg);
    await tool('draft_inquiry').execute({ message: '   ' });
    expect(openUrl).not.toHaveBeenCalled();
  });
});
