// The offer is hidden in the markup and shown here, so a broken script or date leaves it hidden.
const SECTION_ID = 'sikkerhedstjek';
const DAY_FORMAT = /^\d{4}-\d{2}-\d{2}$/;
const VISITOR_LOCALE = 'sv-SE'; // gives YYYY-MM-DD in the visitor's own time zone

export function initCampaign({ now = new Date() } = {}) {
  const section = document.getElementById(SECTION_ID);
  if (!section) return;
  const closing = section.querySelector('time[datetime]')?.getAttribute('datetime') ?? '';
  section.hidden = !(DAY_FORMAT.test(closing) && now.toLocaleDateString(VISITOR_LOCALE) <= closing);
}
