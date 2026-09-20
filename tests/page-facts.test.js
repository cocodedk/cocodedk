import { readWorks, readServices, readContact, readPlaces } from '../js/page-facts';
import { loadPage } from './helpers/page';

const work = (name) => readWorks().find((w) => w.name === name);

describe('what the page says about itself', () => {
  beforeEach(loadPage);

  test('should list the six featured works first', () => {
    expect(readWorks().slice(0, 6).every((w) => w.featured)).toBe(true);
  });

  test('should list the catalogue after them', () => {
    expect(readWorks().length).toBeGreaterThan(20);
  });

  test('should give a featured work its kind', () => {
    expect(work('SwanReady').kind).toBe('Mit eget produkt');
  });

  test('should give a featured work its main link', () => {
    expect(work('SwanReady').url).toBe('https://sr.cocode.dk');
  });

  test('should read a description as plain text', () => {
    expect(work('SwanReady').description).toMatch(/^Svanemærket, ét krav ad gangen\. SwanReady er min egen AI-agent/);
  });

  test('should file a catalogue entry under its group', () => {
    expect(work('Chess Puzzles').kind).toBe('Apps til Android');
  });

  test('should link a catalogue entry', () => {
    expect(work('Chess Puzzles').url).toBe('https://chess.cocode.dk');
  });

  test('should say so when a work has no site of its own', () => {
    expect(work('Unity Foundation').url).toBeNull();
  });

  test('should not offer an on-page jump as a work\'s site', () => {
    expect(work('claude-email').url).toBeNull();
  });

  test('should list the three services', () => {
    expect(readServices().map((s) => s.name)).toEqual(['Rådgivning', 'AI-agenter', 'Automatisering']);
  });

  test('should read the contact details', () => {
    expect(readContact()).toEqual({
      name: 'Babak Bandpey',
      email: 'bb@cocode.dk',
      phone: '+4553737514',
      linkedin: 'https://linkedin.com/in/babakbandpey',
    });
  });

  test('should know the sections and the featured works as places', () => {
    expect(readPlaces()).toEqual(expect.arrayContaining(['vaerker', 'ydelser', 'om', 'kontakt', 'swanready']));
  });
});
