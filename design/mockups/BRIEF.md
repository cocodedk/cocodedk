# cocode.dk homepage — mockup brief

Three design directions are being mocked up in parallel from this one brief, so the owner can
compare like with like. You build ONE of them (named in your task). Output a single
self-contained HTML file; do not touch the real site (`index.html`, `src/`, `css/`).

## What this page is

cocode.dk is one person: **Babak Bandpey, AI consultant**. The page has to make a potential
client think "this person has taste, and he ships". The proof is everything he has built.
So: a showcase with a consultant's offer wrapped around it — not a CV, not a feature list.

**Audience:** potential clients (founders, managers, agencies), mostly Danish. They are not
developers. They decide in seconds whether this looks expensive and trustworthy.

**The owner's words:** "extremely stylish", "must look like a million bucks", "no more technical
nerdy stuff". The current site is the anti-reference: dark terminal green, monospace, stat
counters, compliance acronyms (NIS2, DORA, ISO 42001). None of that look survives.

**Language:** Danish first. Include a visible DA / EN switch in the navigation (the switch may be
non-functional in the mockup, but write the visible copy in natural Danish — not translated
English; "du", short sentences, no buzzwords).

## Content to show (all real)

Positioning line, in the spirit of: *AI-konsulent. Jeg hjælper virksomheder med at bruge AI —
og jeg bygger selv det, jeg anbefaler.* Rewrite freely; keep it human and confident.

**Apps (Android)** — each lives on its own subdomain:
- Weather — vejr for ethvert sted · weather.cocode.dk
- Chess Puzzles — rigtige skakopgaver, offline · chess.cocode.dk
- Battleship — sænke slagskibe · battleship.cocode.dk
- BabakCast — hent video, få et resumé · cast.cocode.dk
- BabakPlayer — afspiller til det BabakCast deler · player.cocode.dk
- Parvaz — omgå censur (VPN til Iran) · parvaz.cocode.dk
- Metrologist — mål ting ud fra ét foto · measure.cocode.dk
- Link QR Wallet — dine links som QR-koder · qr.cocode.dk
- LifeMeter — dit liv i tal · lifemeter.cocode.dk
- Calendar — persisk kalender · calendar.cocode.dk
- TMS Measurement — opmåling til TMS-behandling · tms.cocode.dk

**Web og spil:** Dansk-Persisk lektioner, Dansk-Japansk lektioner, 7kasif (kortspil), Dune
(strategispil i browseren), TIE Fighter (3D-spil), Reverse Prime Plot.

**Kundeprojekter** (live client sites on their own domains): lpterapi.dk (parterapi), Klinik for
Manuel Terapi, Venus Høreklinik (klinikvenus.dk — høreapparater og høretest, København K), Nick
Autoteknik (nick-autoteknik.dk — autoværksted i Rødovre), Unity Foundation.

**SwanReady** is NOT a client project — it is his own product and the strongest proof of the
consulting offer: an AI agent that helps manufacturers get the Nordic Swan Ecolabel (Svanemærket).
It takes in the product, finds the right category, walks through the requirements one at a time,
tracks the documentation, shows what is missing, and writes the application summary. Site:
sr.cocode.dk; a two-minute story (DA/EN/ES) at swanready.cocode.dk; a 9-minute documentary on
YouTube. Feature it large and explain it in plain Danish.

**TV:** Copenhagen Weather og Night Gallery til Samsung-tv.

**AI-værktøjer:** claude-email (styr en AI-agent via e-mail), graph-loop (uovervågede agent-loops),
MCP-servere (kalender, Teams Planner, hukommelse), FITS.DK (compliance-platform, 3000+ timer).

**Ydelser (kort, tre ting, ingen akronymer):** AI-rådgivning · AI-agenter der udfører rigtigt
arbejde · automatisering af det kedelige. Then one clear contact action ("Lad os tale").

Don't show all ~30 items with equal weight. Pick 4–6 to feature large; the rest can live in a
quieter index. Editing is part of the design.

## Craft rules (from the lpterapi project's discipline — its method, not its look)

- No framework, no build step for the mockup: one HTML file with inline CSS and minimal vanilla JS.
- **Mobile first.** Design at 390 px wide first, then make 1440 px excellent — not a stretched
  phone layout. Check 768 px too.
- Typography does the heavy lifting. Google Fonts are fine in the mockup (production will
  self-host); choose with intent, and avoid the defaults everyone reaches for (Inter, Roboto,
  Poppins, Montserrat, Space Grotesk).
- **The mobile menu is a feature.** The owner asked for a "finer" menu than lpterapi's. Design it
  properly: generous touch targets (≥ 48 px), a considered open/close transition, the language
  switch and the contact action inside it, focus trapped while open, Escape closes it, and it
  must work with JavaScript's `prefers-reduced-motion` respected. No generic hamburger-drawer.
- Artwork: there are no final screenshots. Give each featured project its own art made in
  CSS/SVG (a distinct colour world, a simple emblem or abstract device frame). It must look
  intentional, not like grey placeholder boxes. Never use stock photos or emoji as icons.
- Accessibility: real headings, landmarks, visible focus, contrast ≥ 4.5:1 for text, links that
  say where they go, `lang="da"`.
- Read and avoid the AI design tells in
  `~/.claude-shared/plugins/cache/rtd/design-for-ai/2.0.0/skills/design-for-ai/references/ai-tells.md`
  (purple gradients, glassmorphism everywhere, centered-everything, three identical feature
  cards, glow, gradient text, emoji bullets). Load the `frontend-design:frontend-design` skill
  before designing.

## Verify before you report

Render your file with headless Chrome at **390×844** and **1440×900** and LOOK at the screenshots
(Read the PNGs). Also screenshot the mobile menu open. Fix what looks wrong and re-render — expect
at least two rounds. Check: no horizontal scroll at 390 px, nothing clipped, text readable over
any image or colour, the menu opens and closes.

```bash
google-chrome-stable --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=390,844 --virtual-time-budget=4000 \
  --screenshot=<name>-mobile.png "file://<absolute path to your html>"
```
For a full-page capture use a tall window (e.g. `--window-size=390,4200`).

## Deliver

- `~/0-projects/cocodedk/design/mockups/<direction>.html`
- screenshots beside it: `<direction>-mobile.png`, `<direction>-desktop.png`, `<direction>-menu.png`
- Report back in under 150 words: the idea in one sentence, fonts and palette, how the mobile
  menu works, and anything you're unsure about. Don't commit or push.
