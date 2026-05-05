/* Skills Data - Tech stack by domain.
   Expanded per docs/optimize-presence-on-web/recommended-stack.md (Phase 4.1)
   to cover ~15 technologies the cocode.dk repos prove are used but the
   site previously did not list. */

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
      items: ['GDPR', 'NIS2', 'DORA', 'EU AI Act', 'ISO 27001 (trained)', 'ISO 42001 (AI management)', 'CIS Controls', 'D-mærket', 'IAM']
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
