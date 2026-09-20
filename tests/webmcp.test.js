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
const NAMES = ['draft_inquiry', 'get_contact', 'get_services', 'go_to_section', 'list_works'];

describe('WebMCP', () => {
  let openUrl;
  beforeEach(() => {
    loadPage();
    openUrl = jest.fn();
    Element.prototype.scrollIntoView = jest.fn();
  });
  afterEach(() => { delete document.modelContext; delete navigator.modelContext; });

  const start = async (reg) => { await initWebMcp({ openUrl }); return (name) => reg.tools.find((t) => t.name === name); };

  test('should do nothing in a browser without WebMCP', async () => {
    await expect(initWebMcp({ openUrl })).resolves.toEqual([]);
  });

  test('should register its five tools with Chrome 150 and later', async () => {
    const reg = registry(); put(document, reg);
    await start(reg);
    expect(reg.tools.map((t) => t.name).sort()).toEqual(NAMES);
  });

  test('should fall back to the Chrome 149 alias', async () => {
    const reg = registry(); put(navigator, reg);
    await start(reg);
    expect(reg.tools).toHaveLength(5);
  });

  test('should prefer the document registry when both exist', async () => {
    const old = registry(); put(navigator, old); put(document, registry());
    await initWebMcp({ openUrl });
    expect(old.registerTool).not.toHaveBeenCalled();
  });

  test('should keep going when one tool is refused', async () => {
    const reg = registry({ failOn: 'get_contact' }); put(document, reg);
    await start(reg);
    expect(reg.tools).toHaveLength(4);
  });

  test('should report what the browser actually holds, not what it asked for', async () => {
    const reg = registry({ failOn: 'get_contact' }); put(document, reg);
    expect(await initWebMcp({ openUrl })).not.toContain('get_contact');
  });

  test('should use tool names the specification allows', async () => {
    const reg = registry(); put(document, reg);
    await start(reg);
    expect(reg.tools.every((t) => /^[A-Za-z0-9_.-]{1,128}$/.test(t.name))).toBe(true);
  });

  test('should mark the reading tools read-only', async () => {
    const reg = registry(); put(document, reg);
    const tool = await start(reg);
    expect(['list_works', 'get_services', 'get_contact'].every((n) => tool(n).annotations.readOnlyHint)).toBe(true);
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
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
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
