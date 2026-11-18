# Sikkerhedstjek: a campaign that ends by itself

Date: 2026-11-18. Status: design, waiting for approval. Size: a small change.

## Intent

Babak offers one light security check of one website, at a fixed price, to one client he picks among
those who write before a closing date. The offer is announced on cocode.dk and on LinkedIn (a poster,
`design/poster/sikkerhedstjek.png`). The poster says "cocode.dk", so the front page has to carry the
offer while it runs and drop it by itself when it has closed.

## Goals

1. The front page shows the offer, in the page's own look and words a non-technical owner understands.
2. It says the price, the closing date, how the check is done (five steps) and what it is not.
3. One press starts a mail to Babak with the subject filled in; the phone number is next to it.
4. From the day after the closing date the section is gone, with nobody touching the site.
5. The closing date is written in one place on the page.
6. Two LinkedIn posts (launch, reminder) ready to paste, with the poster.

## Non-goals

- No form, no booking system, no payment. A mail is enough for one client.
- No menu entry, no second page, no subdomain, no English version.
- No change to the share picture, the JSON-LD, `llms.txt`, the sitemap or the README: all of them
  would outlive the offer.
- The written permission and the report the client gets are part of doing the check, not of
  advertising it. They are needed before step 3 of the procedure and are not in this work.

## Anti-goals

- The offer still visible after the closing date.
- Anything that looks technical or like "hacking": no terminals, no jargon, no "pentest" on the page.
- A promise the check cannot keep. The line "Jeg kan ikke love, at jeg finder alt." stays.
- A request to another server (project rule).

## Approaches

1. **A section that is hidden in the markup and shown by the page's script until the closing date
   (chosen).** The site is static, so only the visitor's browser knows today's date. Hidden is the
   resting state: no JavaScript, a broken date or a script error all end in "not shown", which is the
   safe side for an expired offer. Cost: a visitor without JavaScript never sees the offer.
2. A scheduled rebuild that removes the section. Works without JavaScript, but adds a workflow, and a
   failed run leaves an expired offer online.
3. Remove it by hand. Nothing to build, and exactly what Babak asked not to depend on.

## The design

- `templates/partials/campaign.html`: `<section class="section section--ruled campaign" id="sikkerhedstjek" hidden>`,
  placed in `templates/template.html` between the hero and the works.
- The closing date lives once, in the section: `<time datetime="2026-11-30">30. november</time>`. A test
  holds the readable text to the machine date.
- `js/campaign.js`, `initCampaign({ now })`: shows the section while the visitor's own date is on or
  before that date; otherwise leaves it hidden. The visitors are in Denmark, so their clock is the
  right one and no time zone needs naming.
- Left as it is: after the closing date the WebMCP tool `go_to_section` still knows the hidden
  section's id and answers ok without anything to show. It goes away with the clean-up commit.
- Look: a sheet (`--sheet`, `--rule` border, as `.mount`) on the paper, serif heading, the price in
  serif, the five steps as a numbered list (they are a sequence), the reservation as `.note`, a
  `.btn` and the phone number. No picture: the pixel art belongs to the poster.

### Copy (the poster's, already reviewed; through `humanizer-da` once more before it ships)

- Above the heading (`.sc`): Sikkerhedstjek
- Heading: Jeg tjekker låsene på én hjemmeside. Skal det være din?
- Lead: Jeg prøver en ny måde at arbejde på. Derfor tager jeg kun én hjemmeside, til fast pris.
- Price: 1.995 kr. ekskl. moms
- Deadline: Skriv senest 30. november
- Steps, heading "Sådan foregår det":
  1. Skriv til mig med adressen på din hjemmeside.
  2. Jeg vælger én hjemmeside og giver alle besked.
  3. Du giver skriftlig tilladelse. Før det rører jeg ingenting.
  4. Jeg tester forsigtigt, så siden kan køre videre imens.
  5. Du får en rapport på almindeligt dansk, og vi gennemgår den sammen.
- Condition (a plain paragraph after the steps): Webhotellet, hvor din hjemmeside ligger, skal også tillade tjekket. Det undersøger jeg, før jeg vælger.
- Reservation: Et let tjek, ikke en fuld sikkerhedstest. Jeg kan ikke love, at jeg finder alt.
- Button: "Skriv til mig om tjekket" opens a mail to bb@cocode.dk, subject "Sikkerhedstjek af min
  hjemmeside", body "Adressen på min hjemmeside: ".
- Next to it: Eller ring på 53 73 75 14

### LinkedIn (both with the poster; the text is kept here and pasted at launch)

Launch:

> Jeg tjekker låsene på én hjemmeside. Skal det være din?
>
> Jeg prøver en ny måde at arbejde på, og den skal prøves på noget rigtigt. Derfor tager jeg én
> hjemmeside, ikke flere, til en fast pris: 1.995 kr. ekskl. moms.
>
> Sådan foregår det:
> 1. Du skriver til mig med adressen på din hjemmeside, senest 30. november.
> 2. Jeg vælger én hjemmeside og giver alle besked.
> 3. Du giver skriftlig tilladelse. Før det rører jeg ingenting.
> 4. Jeg tester forsigtigt, så siden kan køre videre imens.
> 5. Du får en rapport på almindeligt dansk, og vi gennemgår den sammen.
>
> Webhotellet, hvor din hjemmeside ligger, skal også tillade tjekket. Det undersøger jeg, før jeg vælger.
>
> Det er et let tjek, ikke en fuld sikkerhedstest. Jeg kan ikke love, at jeg finder alt.
>
> Skriv til bb@cocode.dk. Det hele står også på cocode.dk.

Reminder, three days before the closing date:

> Tre dage tilbage. Jeg tager stadig kun én hjemmeside til et let sikkerhedstjek for 1.995 kr. ekskl.
> moms. Skriv senest 30. november med adressen på din hjemmeside: bb@cocode.dk. Hvordan det
> foregår, står på cocode.dk.

## Decided by Babak

- One client, picked by him. A closing date about ten days after launch. Paid, not free.
- The website hides the campaign by itself after the closing date.
- The hosting condition must be clear before a client applies (2026-11-18): it is on the page, the poster and in the launch post.
- He launches when he is ready; the poster is not posted before the site carries the offer.

## Calls made by Claude (Babak can overrule any of these)

- Price 1.995 kr. ekskl. moms. Closing date 30 November 2026 is provisional: launch day plus ten days.
- The public line "Jeg prøver en ny måde at arbejde på".
- The section sits right under the hero, with no menu entry.
- Merging the branch is the launch (the site deploys on push to main), so the date is set just before.
- After the check is done the partial is deleted in a small clean-up commit.
