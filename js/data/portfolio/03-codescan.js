export default {
  id: 'codescan',
  labels: {
    da: 'CodeScan',
    en: 'CodeScan'
  },
  translations: {
    da: 'Statisk kodeanalyse der bygger en Neo4j-grafdatabase af kodebaser. AST-baseret parsing, kaldgrafkonstruktion, testd\u00e6kningsdetektering. Eksponerer analyse til AI-agenter via MCP.',
    en: 'Static code analyzer that builds a Neo4j graph database of codebases. AST-based parsing, call graph construction, test coverage detection. Exposes analysis to AI agents via MCP.'
  },
  stack: ['Python', 'Neo4j', 'MCP', 'AST'],
  link: 'https://github.com/cocodedk/codescan',
  details: 'Graph-powered code analysis with MCP agent exposure.'
};
