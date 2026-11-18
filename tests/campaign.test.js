import { initCampaign } from '../js/campaign';
import { loadPage } from './helpers/page';

const at = (iso) => ({ now: new Date(iso) });

describe('the sikkerhedstjek campaign', () => {
  let section;
  beforeEach(() => { loadPage(); section = document.getElementById('sikkerhedstjek'); section.querySelector('time').dateTime = '2026-11-30'; });

  test('should be hidden until the script shows it', () => { expect(section.hidden).toBe(true); });
  test('should show on the closing date', () => { initCampaign(at('2026-11-30T12:00:00')); expect(section.hidden).toBe(false); });
  test('should hide the day after the closing date', () => { initCampaign(at('2026-12-01T12:00:00')); expect(section.hidden).toBe(true); });
  test('should stay hidden when the date is not a date', () => {
    section.querySelector('time').setAttribute('datetime', 'snart'); initCampaign(at('2026-11-20T12:00:00'));
    expect(section.hidden).toBe(true);
  });
  test('should write the closing date the way it is set', () => {
    loadPage();
    const time = document.querySelector('#sikkerhedstjek time');
    const readable = new Intl.DateTimeFormat('da-DK', { day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(time.dateTime));
    expect(time.textContent.trim()).toBe(readable);
  });
  test('should start a mail with the subject filled in', () => {
    expect(decodeURIComponent(section.querySelector('.campaign__mail').getAttribute('href')))
      .toBe('mailto:bb@cocode.dk?subject=Sikkerhedstjek af min hjemmeside&body=Adressen på min hjemmeside: ');
  });
});
