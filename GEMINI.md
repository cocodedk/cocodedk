# Project Overview

This project is a redesign of the cocode.dk website, a portfolio and IT consultancy website. The redesign focuses on a "Warm Glassmorphism" theme and is being implemented in several phases. The project is a single-page application built with HTML, CSS, and JavaScript. It uses `webpack` for bundling and `jest` for testing. The project is currently in the process of migrating to TypeScript and Cytoscape.js for node visualization.

## Building and Running

### Prerequisites

- Node.js and npm

### Installation

1. Clone the repository.
2. Run `npm install` to install the dependencies.

### Development

To run the project in development mode, use the following command:

```bash
npm run dev
```

This will start a webpack dev server and open the project in your default browser.

### Building

To build the project for production, use the following command:

```bash
npm run build
```

This will create a `dist` directory with the bundled files.

### Testing

To run the tests, use the following command:

```bash
npm test
```

## Development Conventions

- The project follows a modular architecture, with different features and components separated into their own files.
- The project is in the process of migrating to TypeScript, so new code should be written in TypeScript whenever possible.
- The project uses a phased approach for the redesign, with each phase focusing on a specific set of features. The current status of the project can be found in the `BUILD-PLAN.md` file.
- The project uses `prettier` for code formatting and `eslint` for linting. It is recommended to set up your editor to automatically format and lint your code on save.
