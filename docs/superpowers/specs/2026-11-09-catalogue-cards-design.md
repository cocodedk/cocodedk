# Catalogue cards from the sites themselves

Date: 2026-11-09. Status: design, waiting for approval.

## Intent

Babak's public work lives on 58 sites under `*.cocode.dk` (counted 2026-11-09, after three deletions), each a GitHub Pages site from a public repo
of the `cocodedk` account. Each site already describes itself well: a title, a description, a share
picture (`og:image`) and, for most, several language versions (`hreflang`). The catalogue on cocode.dk
("Resten af kataloget") is a hand-written text list that has fallen behind: 14 live sites are missing
and three entries still point to `github.io`.

The goal is a script that gathers what the sites say about themselves and **proposes** an updated
catalogue as a pull request. Babak reads the PR and merges it. Nothing goes live on its own.

The audience of cocode.dk is potential clients, not developers (see `design/mockups/BRIEF.md`). The
catalogue has to look finished and calm, never like a generated dump.

## Goals

1. **Every public `*.cocode.dk` site gets a card**, apart from the excluded list below.
2. **Each card is a poster** (option A in `design/mockups/catalogue-cards.html`, chosen by Babak): the site's own share
   picture in its own colours, the name, one short Danish line, and the web address. Download links
   (F-Droid, APK) stay on the cards that have them today.
3. **Cards are grouped by what they are related to**, under group headings, as the catalogue is today.
4. **The script collects every language** each site exists in (titles and descriptions per
   `hreflang` version) and keeps them in a data file. Today only Danish reaches the page, and English
   reaches the GitHub profile README. The rest is kept for the planned English version (phase two).
5. **It proposes, never publishes**: the output is a branch and a PR with a readable diff.

## Non-goals

- The seven featured works at the top ("Udvalgte værker") are not touched. They keep their
  hand-drawn plates and hand-written text.
- No language switch on the page. Persian, Spanish and the rest are stored, not shown.
- The script does not fix the sites themselves (missing or broken share pictures). It reports them.

## Anti-goals (what would make this a failure even if it works)

- Unreviewed Danish reaching the page. Every Danish line on cocode.dk goes through the `humanizer-da`
  skill (project rule) and is read by Babak in the PR. Text copied straight from a site, or from a
  translation tool, never is.
- The site's long, technical descriptions pasted onto the page. Example: the catalogue line for Chess
  Puzzles is "Rigtige skakopgaver, også når du er uden net."; the site's own Danish description names
  Lichess and lists features. The short hand-written line wins.
- The page loading pictures from other servers, or growing heavy. Visitors download the page and its
  pictures from cocode.dk only (project rule: no third-party requests).
- The WebMCP tools, the profile README, the mobile menu or the cocode-apps download links breaking.

## Decided by Babak

- Propose through a PR; Babak merges.
- All sites, grouped by relatedness, images are required on every card.
- Card style A (poster).
- The games named after others' works (Tetris, Dune, TIE fighter, Breakout) get cards like every other
  site. Their trademark risk was raised, and Babak chose to show them.
- Leave out: `linkedin-extension` (hidden). Deleted on 2026-11-09 and so gone from the list:
  `publix`, `mem0-mcp`, `aura-recruit-demo`.

## Calls made by Claude (Babak can overrule any of these)

1. **Also hidden:** `brand` (the shared header/footer frame, not a product) and `d7` (the 7kasif
   tournament tracker; mention it on the 7kasif card instead of its own card).
2. **Featured works do not get a second card.** Sites already in "Udvalgte værker" (weather, measure,
   swanready, parvaz, claude-email) stay out of the catalogue, as today ("the rest of the catalogue").
3. **Entries that are not public `*.cocode.dk` sites stay.** The catalogue today also lists client
   sites on their own domains (klinikvenus.dk, nick-autoteknik.dk), fits.dk, `github.io` apps and plain
   GitHub repos. They keep their place. They are gathered the same way from a short hand-kept list of
   extra URLs, so they get a picture too. An entry with no site to read gets a house-made picture
   (call 14).
4. **Where the site list comes from:** the GitHub API (public repos of `cocodedk` whose Pages
   site has a `cocode.dk` custom domain), plus the hand-kept extra URLs. Not the local map in
   `~/.claude-personal/state/tools/cocode-subdomains.txt`: it was 11 sites behind on 2026-11-09.
5. **Where the Danish line and the group come from:** a hand-kept file in this repo, one entry per
   site: group, Danish name if it differs, Danish line, hidden yes/no. The current catalogue's lines
   seed it, so nothing already written is lost. The script never writes Danish itself.
6. **A new site without a Danish line stops the build** with a message naming the site, the same way
   a work without English copy stops the README build today. The weekly PR therefore fails CI until
   someone writes the line (with `humanizer-da`) and picks a group, in the same PR. That is the
   proposal step.
7. **Pictures are copied, shrunk and committed** into the repo (for example `images/works/<site>.webp`,
   about 640 px wide). The 12 share pictures sampled weigh about 160 KB each, so 55 originals (58 sites less the three hidden ones) would add
   about 9 MB. Shrunk WebP copies should come to about 2 MB in total. They are lazy-loaded below the
   fold. A site with no share picture, or a broken one, gets no card until it is fixed. The PR lists
   it, and the build stops, as with a missing Danish line.
8. **When it runs:** on demand (`npm run sites`) and weekly from a scheduled GitHub Action that
   opens or updates one PR. Bot-pushed commits need approval to run CI, and jobs that commit must use
   `npm ci --ignore-scripts` (see the shared memory note "bot pushes need approval").
9. **Groups to start with**, by what the work is for (the builder seeds the file with these and Babak
   adjusts in review):
   - Apps til Android: android.guard, chess, battleship, cast, player, qr, lifemeter, calendar, tms,
     markdown, plus the `github.io` apps already in the group
   - Til tv'et i stuen: tv-vejr, breakout, nightgallery
   - Spil i browseren: dune, tiefighter, tetris, wonderland, barrage, invaders, persia, 7kasif, glasswing
   - Lær et sprog: persisk, japansk, hej, dip, transliterate
   - AI-værktøjer: agent-linters, agentboard, agents, tanks, loops, advisor, message-test,
     natural-parallel, jev-bench, rag, codescan, job-jagger, linkedin-editor, pdf2speech, whisperframe
   - Små værktøjer: png2svg, usb, portguard, xlook, x-cleaner, in-optimizer, primes, cv
   - Kundeprojekter: the client sites, as today

10. **The three broken share pictures are fixed first, as part of this work**: 7kasif gets one, and
    codescan and job-jagger get theirs repaired, each by a PR in its own repo, before the first
    catalogue PR. This settles the conflict with "the script never fixes sites": the script doesn't,
    the work does.
11. **Who writes the lines for new sites:** in the first PR, Claude drafts the Danish line (through
    `humanizer-da`) and the English line for every new site, and Babak reviews them in the PR, as with
    the current lines. A later weekly PR that brings a new site stays red until someone does the same.
    A red weekly PR is the expected way of saying "a new site needs words".
12. **The English line stays in `readme/copy.en.json`**, keyed as today, and is never filled from a
    site's `og:` text automatically. The PR report may quote the site's own English description as a
    hint for whoever writes the line.
13. **Card names are pinned** in the hand-kept file, like the line. They are seeded from the current
    catalogue names, and a new site's name is drafted from its `og:site_name` or `<title>`. A site that
    renames itself shows up in the PR report and changes nothing by itself. That keeps the README's
    name lookup and WebMCP's `list_works` stable.

14. **Entries with no site of their own get a house-made picture.** That covers three with no
    address (Klinik for Manuel Terapi, Unity Foundation, MCP-servere) and the entries linking only to
    a GitHub repo (AI Video Edit, tmux-zipper, Overlay Killer, img2vid, YouTube Audio Extractor;
    Persian Transliterator likely merges into the new `transliterate` card). The picture is the name
    set in the page's serif on paper, in the group's colour, rendered the way the site's own share
    picture already is (`templates/og-card.html`). GitHub's automatic repo card is never used: it shows
    the GitHub logo and star counts. This replaces the GitHub fallback mentioned in call 3. The data
    file needs a way to mark an entry as "house-made picture".

## Constraints from the codebase

- `js/page-facts.js` reads the catalogue from the page (`.index__group`, `.index__list > li`,
  `.index__name`, `.index__desc`, `a.index__link`). The WebMCP tools (`list_works`) and the README
  generator (`scripts/readme/model.js`) both use it. Change the markup and these must follow, with
  their tests.
- The README is generated (`npm run readme`) and needs English copy for every work in
  `readme/copy.en.json`; the English `og:description`/title gathered by the script can seed it
  (58 of 60 sites have English).
- The mobile menu's "Indhold" sheet lists the catalogue groups by hand (`templates/partials/dock.html`,
  links to `#g-apps` and so on). If groups change, the sheet must change with them. Layer rule: the
  sheet holds only what the bottom bar cannot.
- The cocode-apps tool (`~/0-projects/cocode-apps`, `python3 -m tools.render --catalogue`) writes the
  download links into `catalogue.html` between `<!-- cocode-apps:get-<id>:start/end -->` markers, and
  its audit checks they are there. Whatever produces the catalogue must keep those blocks working, or
  take over that job and retire the cocode-apps catalogue step in the same change.
- 200-line limit per code file (pre-commit and CI). Node 20. No new runtime scripts on the page.
- Design tokens and fonts as in `css/base.css`; the poster card in the mockup used the existing serif
  for the name, the sans for the line and lapis for the address.

## Known site problems found (for the report, not for the script to fix)

- No share picture: 7kasif. Broken share picture: codescan, job-jagger. Babak wants these fixed before
  the first PR, so they can get cards.

## Left to the builder

- Data file formats and names, where the script lives (`scripts/sites/` would match `scripts/readme/`).
- Whether the catalogue partial is generated as a committed file or rendered at build time from data.
- The HTML parser (`jsdom` is already a dev dependency) and the image tool for shrinking to WebP.
- Card layout details within option A: grid size, breakpoints, how download links sit on the card,
  alt text, the order of cards inside a group.
- How the PR body presents the report (new sites, gone sites, changed pictures, missing lines).
