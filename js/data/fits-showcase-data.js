/* FITS Showcase Data - Translations and content */

export const fitsShowcaseData = {
  title: {
    en: 'FITS — Framework for IT Security',
    da: 'FITS — Framework for IT Security'
  },
  subtitle: {
    en: 'Multi-tenant GRC platform built single-handedly. 3,000+ hours. In production.',
    da: 'Multi-tenant GRC-platform bygget egenhændigt. 3.000+ timer. I produktion.'
  },
  version: 'v8.8.29',
  features: [
    {
      icon: 'fa-shield-halved',
      label: { en: 'AI Policy Factory', da: 'AI Policy Factory' },
      desc: {
        en: '7-step workflow generating compliance policies from documents, free text, or interactive questionnaires.',
        da: '7-trins workflow der genererer compliance-politikker fra dokumenter, fritekst eller interaktive spørgeskemaer.'
      }
    },
    {
      icon: 'fa-robot',
      label: { en: 'RAG & 4 LLM Providers', da: 'RAG & 4 LLM-udbydere' },
      desc: {
        en: 'Hybrid search (vector + BM25). OpenAI, Anthropic, Gemini, Mistral.',
        da: 'Hybrid søgning (vektor + BM25). OpenAI, Anthropic, Gemini, Mistral.'
      }
    },
    {
      icon: 'fa-diagram-project',
      label: { en: 'Neo4j Graph Database', da: 'Neo4j Grafdatabase' },
      desc: {
        en: 'Compliance mapping as a graph problem. Organizations, projects, scopes, assessments.',
        da: 'Compliance-mapping som et grafproblem. Organisationer, projekter, scopes, assessments.'
      }
    },
    {
      icon: 'fa-file-contract',
      label: { en: 'Document Evaluation', da: 'Dokumentevaluering' },
      desc: {
        en: 'AI evaluates documents against framework requirements with evidence strength and gap analysis.',
        da: 'AI evaluerer dokumenter mod framework-krav med bevisstyrke og gap-analyse.'
      }
    },
    {
      icon: 'fa-bolt',
      label: { en: 'Real-Time WebSocket', da: 'Real-Time WebSocket' },
      desc: {
        en: '12 WebSocket consumers for live progress on AI tasks, publishing, and imports.',
        da: '12 WebSocket-forbrugere til live fremdrift på AI-opgaver, publicering og imports.'
      }
    },
    {
      icon: 'fa-building',
      label: { en: 'Multi-Tenant Architecture', da: 'Multi-Tenant Arkitektur' },
      desc: {
        en: 'Complete data isolation. Super admin, tenant admin, org user, and client roles.',
        da: 'Komplet dataisolation. Super admin, tenant admin, org-bruger og klientroller.'
      }
    }
  ],
  frameworks: [
    'ISO 27001', 'CIS v8', 'HIPAA', 'GDPR',
    'NIS2', 'DORA', 'EU AI Act', 'NIST'
  ],
  stack: [
    'Django 5.2', 'Neo4j', 'Redis', 'Celery',
    'TypeScript', 'Tailwind', 'Vite', 'Docker',
    'LangChain', 'ChromaDB', 'Channels', 'nginx'
  ],
  cta: {
    label: { en: 'Visit FITS.DK', da: 'Besøg FITS.DK' },
    url: 'https://fits.dk'
  }
};
