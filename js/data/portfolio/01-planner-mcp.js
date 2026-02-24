export default {
  id: 'planner-mcp',
  labels: {
    da: 'Planner Task Creator MCP',
    en: 'Planner Task Creator MCP'
  },
  translations: {
    da: 'MCP-server der forbinder AI-assistenter med Microsoft Teams Planner. OAuth-godkendelse, opgavestyring (opret, list, kommenter), smart plan/bucket-opl\u00f8sning. Python CLI + Node.js MCP wrapper.',
    en: 'MCP server connecting AI assistants to Microsoft Teams Planner. OAuth authentication, task management (create, list, comment), smart plan/bucket resolution. Python CLI + Node.js MCP wrapper.'
  },
  stack: ['Python', 'Node.js', 'MCP', 'OAuth'],
  link: 'https://github.com/cocodedk/Planner-Task-Creator-CLI-MCP',
  details: 'Production MCP server with OAuth flow and smart resolution.'
};
