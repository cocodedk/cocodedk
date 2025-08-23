# TypeScript Migration

This directory contains the TypeScript rewrite of the original JavaScript codebase.

## Migration Strategy

The migration follows these principles:
1. **Test-First Approach**: All components are migrated following TDD principles
2. **Gradual Migration**: Files are migrated one by one, starting from the smallest utility files
3. **Type Safety**: Strong typing is applied to all components
4. **Modularization**: Large files are broken down into smaller modules during migration
5. **Backward Compatibility**: Maintaining compatibility with existing functionality

## Directory Structure

The TypeScript directory structure mirrors the original JavaScript structure:

```
src/ts/
├── cytoscape/ - Cytoscape-related modules
├── types/    - TypeScript interface and type definitions
└── utils/    - Utility functions
```

## Testing

Each migrated component has corresponding tests in the `tests/` directory.
Tests are written before implementation according to TDD principles.

## Build Process

TypeScript files are compiled to JavaScript during the build process using the webpack configuration.
The TypeScript compiler is configured with strict type checking to ensure code quality.
