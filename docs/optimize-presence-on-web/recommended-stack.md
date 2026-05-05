# Recommended Stack — full inventory for cocode.dk

Compiled from `js/data/skills-data.js`, JSON-LD `knowsAbout`, GitHub repos under github.com/cocodedk, and project context observed during this audit. Drop-in replacement for the existing skills section.

## Why this matters

The current site lists 7 domain groups with ~30 technologies. Cross-checking against the actual repo inventory and project history surfaces **~15 technologies that are genuinely used but not listed** — each one is a keyword-entry point and a buyer-trust signal that's currently leaking value.

## Proposed `skills-data.js` (drop-in)

```javascript
/* Skills Data - Tech stack by domain */

export const skillsData = {
  domains: [
    {
      id: 'backend',
      label: { en: 'Backend & API', da: 'Backend & API' },
      items: ['Python', 'Django', 'FastAPI', 'Node.js', 'Go', 'Redis', 'Celery', 'GraphQL', 'OpenAPI', 'WebSocket', 'IMAP/SMTP automation']
    },
    {
      id: 'frontend',
      label: { en: 'Frontend', da: 'Frontend' },
      items: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Vanilla JS', 'Tailwind', 'Vite', 'Webpack', 'Jest', 'Babel']
    },
    {
      id: 'ai-llm',
      label: { en: 'AI / LLM Integration', da: 'AI / LLM-integration' },
      items: ['Anthropic Claude', 'Claude Code SDK', 'OpenAI', 'LangChain', 'Whisper', 'Ollama', 'RAG architectures', 'Hugging Face']
    },
    {
      id: 'mcp',
      label: { en: 'MCP & Agent Tooling', da: 'MCP & agent-værktøjer' },
      items: ['MCP server development', 'MCP client integration', 'mcp-python-sdk', 'mcp-typescript-sdk', 'Cursor / Claude Code agent flows', 'n8n']
    },
    {
      id: 'compliance',
      label: { en: 'Compliance & Governance (GRC)', da: 'Compliance & Governance (GRC)' },
      items: ['GDPR', 'NIS2', 'DORA', 'EU AI Act', 'ISO 27001 (trained)', 'ISO 42001 (AI management — familiar)', 'CIS Controls', 'D-mærket', 'IAM']
    },
    {
      id: 'security',
      label: { en: 'Cybersecurity', da: 'Cybersikkerhed' },
      items: ['Pentesting', 'OSINT', 'FITS — Framework for IT Security', 'Threat modeling', 'Code scanning (codescan MCP)', 'Audit logging']
    },
    {
      id: 'databases',
      label: { en: 'Databases', da: 'Databaser' },
      items: ['PostgreSQL', 'Neo4j (graph)', 'MongoDB', 'SQLite', 'Redis', 'ChromaDB', 'Qdrant (vector)']
    },
    {
      id: 'mobile',
      label: { en: 'Mobile (Android)', da: 'Mobil (Android)' },
      items: ['Kotlin', 'Jetpack Compose', 'Android SDK', 'Media3', 'Android Keystore', 'CalDAV', 'IMAP client']
    },
    {
      id: 'automation',
      label: { en: 'Browser & System Automation', da: 'Browser- & systemautomatisering' },
      items: ['Playwright', 'Chromium DevTools Protocol', 'Headless Chromium', 'Cron / systemd', 'shell scripting']
    },
    {
      id: 'devops',
      label: { en: 'DevOps & Infrastructure', da: 'DevOps & infrastruktur' },
      items: ['Docker', 'GitHub Actions', 'CI/CD pipelines', 'nginx', 'Linux (sysadmin)', 'Hetzner Cloud', 'GitHub Pages', 'one.com hosting', 'Cloudflare DNS']
    }
  ]
};
```

## What changed vs. the existing file

| New / expanded item | Source of evidence |
|---------------------|---------------------|
| Go | `parvaz` repo (Android VPN with Go SOCKS5 core) |
| Webpack, Jest, Babel | This very project (`cocodedk` package.json) |
| Vanilla JS | This project (component-based vanilla JS SPA) |
| **MCP server development** (vs. just "MCP" integration) | `mem0-mcp`, `codescan`, `calendar-consolidator-mcp` repos — Babak *builds* MCPs, doesn't just integrate them |
| Claude Code SDK | `claude-email`, `job-jagger`, `in-optimizer` — all use Claude Code |
| n8n | Adjacent to LangChain in market positioning; current portfolio implies workflow comfort |
| DORA, EU AI Act, ISO 42001 | Mentioned in JSON-LD/meta but missing from skills section |
| D-mærket | The DK national cybersec standard — keyword opportunity vs Leave a Mark |
| FITS — Framework for IT Security | Babak's flagship work, deserves a skill-level mention |
| Threat modeling, code scanning | `codescan` MCP repo |
| Qdrant | `mem0-mcp` repo |
| Playwright, Chromium DevTools | `in-optimizer`, `x-cleaner`, `linkedin-profile-editor` repos all use it |
| Android Keystore, CalDAV, IMAP/SMTP | `Claude-Email-App`, `calendar-consolidator-mcp`, `claude-email` |
| OpenAPI, WebSocket | Standard for `cv-pro` (FastAPI + React + Neo4j) |
| Hetzner, GitHub Pages, one.com, Cloudflare | This project's deploy chain (`scripts/deploy-onecom.sh`, GitHub Actions Pages workflow) |

## What I left OUT (and why)

- **Specific framework versions** (e.g. "Django 5", "React 18") — date the page; let the visitor assume current.
- **AWS / GCP / Azure** — no clear evidence in repos that Babak runs production workloads there. Listing untruthfully erodes trust if a buyer probes.
- **Kubernetes** — no evidence in repos. Don't add unless used.
- **Tableau, Power BI, Looker** — not in evidence; not aligned with positioning.
- **Specific LLM evals frameworks** (DeepEval, ragas, etc.) — no evidence; don't add until shipped.

## Honest claim-level guidance

Buyers in GRC are sceptical of inflated certs. For the compliance section, suggest framing each item with a level qualifier where relevant:

- ✓ *"Implemented for X clients"* — the strongest claim
- ✓ *"Trained in"* — for ISO 27001 / ISO 42001 if Babak has formal training
- ✓ *"Familiar with"* — for regulations Babak applies but isn't formally certified in
- ✗ Avoid: bare "ISO 27001" or "ISO 42001" without context — implies organisation-level cert which a solo consultant cannot hold

This is more credible than the page-of-badges approach and is what discriminating GRC buyers actually look for.
