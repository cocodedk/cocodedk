/**
 * Production Data Test Fixture
 *
 * This file contains actual production data from nodes.js formatted for testing
 */

// Category-specific hover colors copied from nodes.js
const categoryHoverColors = {
  'cocode.dk': { fill: '#0077aa', stroke: '#33eeff', text: '#ffffff' },
  'Software': { fill: '#1188ee', stroke: '#66ffff', text: '#ffffff' },
  'Cybersecurity': { fill: '#ee0055', stroke: '#ff99aa', text: '#ffffff' },
  'Clients': { fill: '#ffaa00', stroke: '#ffdd55', text: '#000000' },
  'Contact': { fill: '#f7dc6f', stroke: '#f5b041', text: '#000000' }
};

// Define nodes - copied from nodes.js
const nodes = [
  {
    id: 'cocode.dk',
    x: 0, y: 0, r: 50,
    labels: {
      en: 'cocode.dk',
      da: 'cocode.dk',
      es: 'cocode.dk',
      zh: 'cocode.dk',
      ja: 'cocode.dk',
      de: 'cocode.dk',
      ar: 'cocode.dk',
      fa: 'cocode.dk',
      hi: 'cocode.dk',
      ur: 'cocode.dk',
      fr: 'cocode.dk'
    },
    translations: {
      en: 'cocode.dk is a freelance IT consultancy based in Denmark specializing in custom software development, graph databases, and cybersecurity services including compliance and audit automation.'
    },
    category: 'cocode.dk'
  },
  {
    id: 'Software',
    x: 0, y: -150, r: 40,
    labels: {
      en: 'Software',
      da: 'Software',
      es: 'Software'
    },
    translations: {
      en: 'Full-stack custom software solutions built with modern frameworks such as Django and React.'
    },
    category: 'Software'
  },
  {
    id: 'Cybersecurity',
    x: 0, y: 150, r: 40,
    labels: {
      en: 'Cybersecurity',
      da: 'Cybersikkerhed',
      es: 'Ciberseguridad'
    },
    translations: {
      en: 'Cybersecurity consulting including gap assessments, pentest coordination, risk remediation, and framework compliance (CIS18, NIST, ISO).'
    },
    category: 'Cybersecurity'
  },
  {
    id: 'Clients',
    x: 150, y: 0, r: 40,
    labels: {
      en: 'Clients',
      da: 'Kunder',
      es: 'Clientes'
    },
    translations: {
      en: 'Real-world freelance IT and security projects delivered across Europe.'
    },
    category: 'Clients'
  },
  {
    id: 'Contact',
    x: -150, y: 0, r: 40,
    labels: {
      en: 'Contact',
      da: 'Kontakt',
      es: 'Contacto'
    },
    translations: {
      en: 'Reach out to cocode.dk for IT consultancy or cybersecurity projects.'
    },
    category: 'Contact'
  }
];

// Define links between nodes - copied from nodes.js
const links = [
  // Main branches from center
  ['cocode.dk', 'Software'],
  ['cocode.dk', 'Cybersecurity'],
  ['cocode.dk', 'Clients'],
  ['cocode.dk', 'Contact']
];

// Convert links to edges with format similar to existing tests
const edges = links.map(link => ({
  source: link[0],
  target: link[1],
  // In production data, edges don't have explicit category
  // We'll derive it from the source node
  category: nodes.find(n => n.id === link[0]).category
}));

// Complete graph data for testing full conversion
const graphData = {
  nodes: nodes,
  edges: edges
};

module.exports = {
  nodes,
  edges,
  links,
  graphData,
  categoryHoverColors
};
