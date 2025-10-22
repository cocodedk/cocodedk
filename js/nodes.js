/*
 * Nodes.js - Definition of nodes, links and related data for the cocode.dk visualization
 */

// Import individual node definitions
import cocodedk from './data/nodes/01-cocode-dk.js';
import aiIntegration from './data/nodes/02-ai-integration.js';
import mcpDevelopment from './data/nodes/03-mcp-development.js';
import openaiIntegration from './data/nodes/04-openai-integration.js';
import fullstackInnovation from './data/nodes/05-fullstack-innovation.js';
import specDrivenDevelopment from './data/nodes/06-spec-driven-development.js';
import cybersecurityAudit from './data/nodes/07-cybersecurity-audit.js';
import fitsDK from './data/nodes/08-fits-dk.js';
import contact from './data/nodes/09-contact.js';
import github from './data/nodes/10-github.js';
import linkedin from './data/nodes/11-linkedin.js';
import unityFoundation from './data/nodes/12-unity-foundation.js';
import about from './data/nodes/13-about.js';
import testimonials from './data/nodes/14-testimonials.js';

/**
 * @typedef {Object} HoverColors
 * @property {string} fill - Fill color
 * @property {string} stroke - Stroke color
 * @property {string} text - Text color
 */

/**
 * Custom window properties for graph visualization
 * @type {Object}
 * @property {Array} window.nodes - Array of node objects
 * @property {Object.<string, HoverColors>} window.categoryHoverColors - Colors for different node categories
 */

// Category-specific hover colors
window.categoryHoverColors = {};

// Define nodes array - REORDER BY CHANGING IMPORT ORDER ABOVE
window.nodes = [
    cocodedk,
    contact,
    aiIntegration,
    mcpDevelopment,
    openaiIntegration,
    fullstackInnovation,
    specDrivenDevelopment,
    cybersecurityAudit,
    fitsDK,
    github,
    linkedin,
    unityFoundation,
    about,
    testimonials
];

// Define links between nodes - Flat structure
window.links = [
    // Main hub connections
    ['cocode.dk', 'AI Integration'],
    ['cocode.dk', 'MCP Development'],
    ['cocode.dk', 'OpenAI Integration'],
    ['cocode.dk', 'Fullstack Innovation'],
    ['cocode.dk', 'Spec-Driven Development'],
    ['cocode.dk', 'Cybersecurity Audit'],
    ['cocode.dk', 'FITS.DK'],
    ['cocode.dk', 'Contact'],
    ['cocode.dk', 'GitHub'],
    ['cocode.dk', 'LinkedIn'],
    ['cocode.dk', 'Unity Foundation'],
    ['cocode.dk', 'About'],
    ['cocode.dk', 'Testimonials']
];

// Log successful load
console.log('Nodes.js loaded successfully. Nodes:', window.nodes.length, 'Links:', window.links.length);
