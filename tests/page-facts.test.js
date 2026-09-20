import { readWorks, readServices, readContact, readPlaces, readIntro, readAbout } from '../js/page-facts';
import { loadPage } from './helpers/page';

const work = (name) => readWorks().find((w) => w.name === name);

describe('what the page says about itself', () => {
  beforeEach(loadPage);

  test('should list the six featured works first', () => {
    expect(readWorks().map((w) => w.featured).join('').startsWith('true'.repeat(6) + 'false')).toBe(true);
  });

  test('should list the whole catalogue after them', () => {
    expect(readWorks().slice(6).filter((w) => !w.featured).length).toBe(document.querySelectorAll('.index__list > li').length);
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

  test('should introduce Babak the way the page does', () => {
    expect(readIntro()).toBe('Babak Bandpey, AI-konsulent. Jeg hjælper virksomheder med at bruge AI. Og jeg bygger selv det, jeg anbefaler.');
  });

  test('should read the letter in Om mig, paragraph by paragraph', () => {
    expect(readAbout().paragraphs).toEqual([
      'Mit fag er at bygge software. Det har jeg gjort i over 25 år, og i dag handler det meste om AI: Jeg rådgiver om den, og jeg bygger med den.',
      'Meget af det, du ser her, er lavet med de samme AI-værktøjer, som jeg anbefaler til mine kunder. Derfor ved jeg, hvad der virker i praksis, og hvad der kun ser godt ud i en præsentation.',
      'Du taler altid med mig. Ikke med en sælger.',
    ]);
  });

  test('should read the notes in the margin as a list, whatever they are', () => {
    expect(readAbout().notes).toEqual(['Babak Bandpey', 'København', 'Dansk, engelsk og persisk']);
  });

  test('should give the section its heading', () => {
    expect(readAbout().heading).toBe('Et par ord fra mig');
  });

  test('should list the three services', () => {
    expect(readServices().map((s) => s.name)).toEqual(['Rådgivning', 'AI-agenter', 'Automatisering']);
  });

  test('should read the contact details', () => {
    expect(readContact()).toEqual({
      email: 'bb@cocode.dk',
      phone: '+4553737514',
      linkedin: 'https://linkedin.com/in/babakbandpey',
    });
  });

  test('should know the sections and the featured works as places', () => {
    expect(readPlaces()).toEqual(expect.arrayContaining(['vaerker', 'ydelser', 'om', 'kontakt', 'swanready']));
  });
});
