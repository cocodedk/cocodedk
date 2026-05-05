# cocode.dk — current-state baseline

**Type:** Personal portfolio / boutique consulting (1 person)
**Location:** Magistervej 54, 2400 Copenhagen NV, DK
**Practitioner:** Babak Bandpey (25+ years experience)
**Languages:** Danish (default) + English

## Current SEO state (as of 2026-05-04)

| Factor | Status | Note |
|--------|--------|------|
| `<title>` | ✓ Strong | "Babak Bandpey \| AI Agent Development & Cybersecurity \| cocode.dk" |
| Meta description | ✓ Strong | DA + EN keywords; mentions GDPR/DORA/NIS2 |
| Canonical URL | ✓ Set | `https://cocode.dk/` |
| `hreflang` DA/EN | ✓ Set | But points to fragments `#en` / `#da` (not separate URLs) |
| Open Graph + Twitter Card | ✓ Complete | OG image 1200×630 |
| JSON-LD schema | ✓ Excellent | `ProfessionalService` + `ConsultingBusiness`, geo coords, knowsAbout list |
| H1 | ⚠ Dynamic | Set by JS — Google may render but not all crawlers will |
| Content depth | ✗ Weak | Single-page SPA — no dedicated `/ai-compliance/`, `/mcp-development/`, `/grc/` URLs |
| Indexed page count | ✗ Likely 1 | All content under `/` — no internal SEO surface area |
| Sitemap.xml / robots.txt | ? Unknown | Needs check |

## Trust signals on the site

| Signal | Present | Notes |
|--------|---------|-------|
| Years experience | ✓ | "25+ Years Experience" hero stat |
| Project count | ✓ | "50+ Projects Built" |
| Differentiator stat | ✓ | "Top 2% Developer (Cursor AI)" — unique |
| FITS authority | ✓ | "3000+ Hours on FITS" |
| Profile photo | ✓ | hero avatar |
| Phone | △ | Only in JSON-LD (`+45 53 73 75 14`), not visible on page |
| Address | △ | Only in JSON-LD, not on page |
| Named clients | ✗ | No client logos visible |
| Case studies | △ | Portfolio shows own projects (FITS, codescan, BabakCast) — few named-client engagements |
| Certifications visible | ✗ | GDPR/DORA/NIS2/ISO27001/EU AI Act listed in JSON-LD `knowsAbout` but not displayed on page |
| Third-party reviews | ✗ | No Trustpilot, Clutch, G2, LinkedIn recommendation widget |
| LinkedIn link | ✓ | Linked from JSON-LD `sameAs` |
| GitHub link | ✓ | Linked from JSON-LD `sameAs`; "Latest from GitHub" feed section |
| CV link | ✓ | Footer links to cocodedk.github.io/cv-generator/ |

## Conversion UX

| Element | Status | Notes |
|---------|--------|-------|
| Hero CTA | ✓ | Two buttons: dynamic CTA + "Se ydelser" (campaign overlay) |
| Phone in header | ✗ | Not displayed |
| Email in header | ✗ | Contact handled via modal |
| Booking flow | △ | Contact modal opens — count of clicks-to-contact = 1 |
| 24/7 contact | ✓ | Email/phone always available |
| Differentiators stated | ✓ | Hero stats |
| Pricing | △ | "Se ydelser" overlay — pricing is gated behind the campaign cube |
| No-referral statement | n/a | (relevant for clinics, not this market) |

## Skills section currently lists

- **Backend & API:** Python, Django, FastAPI, Node.js, Redis, Celery, GraphQL
- **Frontend:** React, TypeScript, Next.js, Tailwind, Vite, Vue.js
- **AI & ML:** LangChain, OpenAI, Anthropic, RAG, MCP, Whisper, Ollama
- **Security & GRC:** ISO 27001, CIS Controls, NIS2, GDPR, Pentesting, OSINT, IAM
- **Databases:** Neo4j, PostgreSQL, MongoDB, ChromaDB, Redis, SQLite
- **Mobile:** Kotlin, Jetpack Compose, Android SDK, SQLite, Media3
- **DevOps & Infrastructure:** Docker, CI/CD, GitHub Actions, nginx, Linux, Hetzner

**Missing from the listed skills** (verified present in real repos): Go, Playwright, Webpack, Jest, Babel, FastAPI tooling, Qdrant (vector DB used in `mem0-mcp`), MCP server *development* (versus listed "MCP" as integration), DORA, EU AI Act, ISO 42001, IMAP/SMTP automation. See `recommended-stack.md` for the complete proposed inventory.

## Off-site presence (quick scan)

- **LinkedIn personal:** linkedin.com/in/babakbandpey — present, linked from site
- **GitHub org:** github.com/cocodedk — 27+ repos, mostly low-star, broad polyglot range; activity feed embedded on cocode.dk via API
- **YouTube:** referenced in code (LinkedIn API + YouTube API integrations); presence not verified via this audit
- **Trustpilot, Clutch, Sortlist, TechBehemoths, ensun, FysFinder.dk:** not listed (DK B2B IT directories are an opportunity)
- **Press mentions in DK tech (version2.dk, computerworld.dk):** none found via casual search — opportunity for outreach

## Key takeaways (cocode.dk)

**Strengths**
- Genuinely strong technical SEO foundation (JSON-LD richness exceeds most boutique competitors)
- Bilingual DA/EN with proper `hreflang`
- Unique credibility signals — `Top 2% Cursor AI`, FITS hours, 25-year tenure
- Polished design (warm glassmorphism, hero terminal text, mesh background)
- Real GitHub portfolio with breadth

**Weaknesses**
- Single-page architecture caps SEO surface — no service pages = limited keyword entry points
- Trust signals are *claimed* (in JSON-LD) but not *visualised* (no badge row, no client logo bar, no certificates)
- No third-party validation surface (no Trustpilot, Clutch, LinkedIn recommendation widget)
- No productized open-source play that ranks for the target keyword (compare Ansvar Systems' MCP server)
- Skills list is comprehensive but missing the most differentiating recent work (MCP-server *development*, EU AI Act, ISO 42001, Playwright/browser automation)
