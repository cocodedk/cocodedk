# Research migration to TypeScript

## Research

create an extensive plan to migrate the project to TypeScript with correct structure.

Ditch the legacy mode/code and only keep the cytoscape related code.

keep this document updated with the plan and progress.
it must be a TDD approach.

main rules must be obeyed.

## project root directory "/home/bba/0-projects/cocodedk"

## Core Principles
1. **ABSOLUTE Test-Driven Development**
   - No implementation without tests - zero exceptions
   - Tests before ANY code is written
   - Tests after EACH change, no matter how minor
   - No progression to next change until current change is tested and passing

2. **Streamlined Documentation**
   - Documentation in EVERY folder with depth proportional to complexity
   - Living task document with consolidated updates for closely related changes
   - Clear test references for all components

3. **Code Management**
   - Strict mode adherence with fluid transitions when appropriate
   - Isolated task execution
   - Continuous verification
   - Method preservation (never delete/rename without confirmation)
   - Maintain backward compatibility as default
   - Modularize code exceeding 300 lines

4. **Testing Excellence**
   - Tests must be specialized and targeted
   - Focus on one-test-at-a-time approach
   - Group very small related changes under single test when forming one logical unit
   - Test crucial parts with priority on real methods/data over mocks
   - Address failing tests individually, splitting as needed for clarity
   - Run JS tests with " -- --bail tests"

## Code Structure Guidelines

1. **File Size Limits**
   - Maximum 300 lines per file - when approaching this limit, modularize into smaller files
   - Break down complex functions exceeding 50 lines
   - Keep classes focused with clear single responsibilities

2. **Component Organization**
   - Separate logical concerns into distinct files
   - Group related functionality in well-named directories
   - Maintain clear import hierarchies to prevent circular dependencies

3. **Code Quality Metrics**
   - Maximum function length: 30 lines (excluding comments)
   - Maximum method parameter count: 5
   - Maximum nesting depth: 3 levels
   - Maximum line length: 100 characters

4. **Documentation Proportion**
   - Documentation should comprise 15-25% of total code
   - Every public API requires complete documentation
   - Comments required for complex algorithms or non-obvious logic

## Documentation Standards

### Folder Documentation
```
/folder_name/README.md
- Purpose of components in folder
- Testing strategy for components
- Component relationships
- Test commands for all components
```
*Note: Scale depth based on component complexity while ensuring all sections are addressed*
*Note: May consolidate closely related changes in a single update*

## Task File Management

1. **Task Documentation Structure**
   - Create separate .md files for each subtask within a larger task
   - File naming convention: `/code/issues/[main-task]-[subtask].md`
   - Each subtask documentation must follow TDD principles independently

2. **Master Task List**
   - Maintain a single master task list file at `/code/issues/task-list.md`
   - This file must contain ONLY the list of all tasks and subtasks
   - No other content (explanations, notes, etc.) is permitted in this file
   - Format each task as a checkbox item with link to its documentation file
   ```
   - [ ] @Task One
     - [ ] @Subtask 1.1
     - [ ] @Subtask 1.2
   - [ ] @Task Two
   ```

3. **Task List Maintenance**
   - Update master task list after EACH progression
   - Check completed tasks/subtasks immediately after tests pass
   - Add new subtasks as they are identified
   - Ensure task list reflects accurate current project state at all times

4. **Subtask Documentation**
   - Each subtask file must contain:
     - Clear description of specific subtask goal
     - Test plan with explicit assertions
     - Progress checklist
     - Implementation notes
     - Test results
   - Update subtask documentation in tandem with master list

## Function Documentation Requirements
```python
"""
args:
  ▸ type of args
return:
  ▸ types
raise:
  ▸ exceptions
test:
  ▸ full path reference to test case
  ▸ complete bash command for the specific test
deprecated:
  ▸ Only mark as deprecated after confirmation
  ▸ Must maintain backward compatibility
"""
```

## Task Execution Workflow
1. Create task work document with initial checklist
2. For EACH change:
   - Investigate
   - Plan
   - Write test (group minimal related changes if they form one logical unit)
   - Verify test fails
   - Implement minimal code to pass
   - Run tests
   - Update task document (consolidate updates for closely related changes)
   - Update folder documentation as needed
   - Repeat
3. No exceptions to test-first approach
4. Every folder must contain documentation
5. Task document must reflect current progress

## Operational Modes

### Mode Declaration Protocol
- Every response must start with `[MODE: MODE_NAME]`
- Fluid transitions allowed between adjacent modes when context is clear
- Each mode maintains its specific activities and boundaries

### Mode Specifications

#### [MODE: RESEARCH]
- Purpose: Understand only
- Actions:
  - Read files
  - Analyze structure
  - Review test requirements
  - Document folder structure
  - **Create task work document first**
- Forbidden: Suggestions, planning, code writing
- Exit: Primarily on ENTER INNOVATE MODE, may transition when research clearly indicates next steps

#### [MODE: INNOVATE]
- Purpose: Explore testable solutions
- Actions:
  - Brainstorm testing approaches
  - Update task work document with ideas
  - Document test-first approaches for each component
- Forbidden: Decisions, concrete plans, implementation code
- Exit: Primarily on ENTER PLAN MODE, may transition when innovation naturally leads to planning

#### [MODE: PLAN]
- Purpose: Create complete testable implementation plan
- Actions:
  - Define test cases first with explicit commands
  - Plan folder-level documentation
  - Create detailed task checklist in work document
  - **Document all test assertions before any implementation**
- Requirements:
  - End with numbered test-first checklist
  - Include explicit test commands for each change
- Exit: Primarily on ENTER ACT MODE, may transition when plan is ready for implementation

#### [MODE: ACT]
- Purpose: Implement with absolute TDD
- Rules:
  - Write test FIRST for single change (or minimal related changes forming one logical unit)
  - Verify test fails (Red)
  - Implement minimal code to pass test (Green)
  - Refactor with tests (Refactor)
  - Update task document (consolidate updates for closely related changes)
  - **No progression without passing tests**
- Forbidden:
  - Writing ANY code without tests
  - Moving to next change before testing current
  - Batching multiple unrelated changes without testing each
- Exit: Primarily on ENTER TEST MODE, may transition when implementation is ready for testing

#### [MODE: TEST]
- Purpose: Comprehensive test verification before review
- Requirements:
  - Run ALL tests for the implemented feature
  - Add edge case tests not previously considered
  - Measure and document test coverage
  - Perform integration testing across components
  - Validate behavior against requirements
- Actions:
  - Identify and fix any failing tests one at a time
  - Address test coverage gaps
  - Document all test results in work document
  - Update testing documentation
- Forbidden:
  - Proceeding to REVIEW with any failing tests
  - Adding new features (implementation only for test fixes)
  - Skipping documentation of test results
- Exit: Primarily on ENTER REVIEW MODE, may transition when testing is complete

#### [MODE: REVIEW]
- Purpose: Verify test coverage and implementation
- Requirements:
  - Confirm documentation exists in all folders
  - Verify task document is fully updated
  - Run ALL tests to ensure no regressions
  - Validate test coverage metrics
- Conclusion:
  - Document all test results in task document

## Critical Reminder
- No implementation without tests - ZERO EXCEPTIONS
- Documentation in EVERY folder
- Task document must reflect current progress
- Every change must be tested before proceeding


ACT: Create a plan to migrate the code step by step.


Documentation:
- https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html

## TypeScript Migration Plan

### Step 1: Project Setup for TypeScript ✅
- **Goal**: Configure the project to support TypeScript compilation and integration with existing build tools.
- **Test Plan**: Verify that TypeScript compiler is installed and configured correctly.
- **Assertions**:
  1. TypeScript compiler can be run successfully.
  2. Webpack configuration accepts TypeScript files.
- **Implementation**:
  1. Install TypeScript and necessary type definitions. ✅
  2. Create `tsconfig.json` with appropriate settings for gradual migration (allowJs, etc.). ✅
  3. Update webpack configuration to handle `.ts` files with `ts-loader`. ✅
- **Test Command**: `npm run build` to ensure build process works with TypeScript configuration. ✅

### Step 2: Establish Testing Framework ✅
- **Goal**: Ensure Jest is configured to work with TypeScript for TDD.
- **Test Plan**: Verify that tests can be written and run in TypeScript.
- **Assertions**:
  1. Jest can run tests written in TypeScript. ✅
  2. Test coverage reports include TypeScript files. ✅
- **Implementation**:
  1. Update Jest configuration to transform TypeScript files. ✅
  2. Install necessary type definitions for Jest. ✅
- **Test Command**: `npm test` to verify test execution with TypeScript. ✅

### Step 3: Create TypeScript Directory Structure ✅
- **Goal**: Set up a parallel TypeScript directory structure to begin migration.
- **Test Plan**: Verify directory structure allows for gradual migration.
- **Assertions**:
  1. New TypeScript directory structure mirrors essential JavaScript structure. ✅
  2. Documentation for new structure is in place. ✅
- **Implementation**:
  1. Create `src/ts` directory for TypeScript code. ✅
  2. Add README.md in the new directory explaining the migration approach. ✅
- **Test Command**: Manual verification of directory structure and documentation. ✅

### Step 4: Migrate Utility Functions First (Smallest Files) ✅
- **Goal**: Start with smaller, utility-focused files to establish migration patterns.
- **Test Plan**: Convert `cytoscape-graph.js` (58 lines) as the first file.
- **Assertions**:
  1. All functions in the file have proper TypeScript types. ✅
  2. Tests for the file pass after conversion. ✅
- **Implementation**:
  1. Write tests for all exported functions in `cytoscape-graph.js`. ✅
  2. Convert the file to TypeScript with appropriate typing. ✅
  3. Update imports to use the TypeScript version. ✅
- **Test Command**: `npm test -- --bail tests/cytoscape-graph.test.ts` ✅

### Step 5: Migrate Style-Related Files ✅
- **Goal**: Convert style definition files to TypeScript. ✅
- **Test Plan**: Convert `cytoscape-edge-styles.js`, `cytoscape-node-styles.js`, and `cytoscape-stylesheet.js`. ✅
- **Assertions**:
  1. Style definitions maintain their structure with proper typing. ✅
  2. Tests verify style application after conversion. ✅
- **Implementation**:
  1. Write comprehensive tests for style application. ✅
  2. Convert each file to TypeScript, adding interfaces for style objects. ✅
  3. Added proper type definitions in cytoscape.d.ts file for all components. ✅
- **Test Command**: `npm test -- --bail tests/cytoscape-styles.test.ts` ✅
- **Issues fixed**:
  1. Added missing `CytoscapeInstance` type definition to properly type Cytoscape core objects ✅
  2. Updated `CytoscapeStyle` interface to handle arrays for style properties (e.g., line-dash-pattern) ✅
  3. Created proper definitions for `CytoscapeEventObject` to handle events ✅
  4. Added `LayoutOptions` interface to support layout configurations ✅
  5. Fixed method signature overloads for on() and ready() methods to support various calling patterns ✅
  6. Implemented a robust global object detection method to ensure compatibility in both browser and test environments ✅

### Step 6: Migrate Interaction Files ✅
- **Goal**: Convert interaction handling files to TypeScript. ✅
- **Test Plan**: Convert `cytoscape-node-interactions.js` and `cytoscape-edge-interactions.js`. ✅
- **Assertions**:
  1. Event handlers are properly typed. ✅
  2. Interaction tests pass after conversion. ✅
- **Implementation**:
  1. Write tests for all interaction events. ✅
  2. Convert files to TypeScript with proper event type definitions. ✅
  3. Fix namespace and type conflicts between modules. ✅
  4. Ensure proper handling of global objects in browser vs. test environments. ✅
- **Test Command**: `npm test -- --bail tests/cytoscape-interactions.test.ts` ✅
- **Issues fixed**:
  1. Resolved type conflicts between edge and node interaction modules ✅
  2. Added proper checks for `typeof window !== 'undefined'` to support test environments ✅
  3. Fixed global namespace declarations in TypeScript ✅
  4. Documented rationale for maintaining global namespace exports during transition ✅

### Step 7: Migrate Core Cytoscape Manager
- **Goal**: Convert the large `cytoscape-manager.js` (1922 lines) to TypeScript.
- **Test Plan**: Break down into smaller modules during migration.
- **Assertions**:
  1. Core functionality is preserved in smaller, typed modules.
  2. Comprehensive test suite passes after conversion.
- **Implementation**:
  1. Write extensive tests covering all major functions. (In Progress ✅ - Initial tests created)
  2. Split into logical modules under `src/ts/cytoscape/` directory. (In Progress ✅ - Basic structure created, needs to be split into smaller modules)
  3. Convert each module to TypeScript with strict typing. (In Progress - Minimal placeholder implementation created, full migration of `cytoscape-manager.js` to TypeScript pending)
- **Test Command**: `npm test -- --bail tests/cytoscape-manager.test.ts` (Initial tests passed ✅)
- **Next Steps**:
  1. Analyze `cytoscape-manager.js` to identify logical modules for splitting.
  2. Create separate TypeScript files for each module (e.g., initialization, node management, edge management, layout, interactions, etc.).
  3. Write targeted tests for each module before implementation.
  4. Migrate functionality from `cytoscape-manager.js` to these modules with proper TypeScript typing.

### Step 8: Migrate Main Application Logic
- **Goal**: Convert `main.js` (849 lines) to TypeScript.
- **Test Plan**: Modularize during migration if possible.
- **Assertions**:
  1. Application initialization and core logic are properly typed.
  2. All integration tests pass after conversion.
- **Implementation**:
  1. Write integration tests for application flow.
  2. Convert to TypeScript, potentially splitting into smaller files.
- **Test Command**: `npm test -- --bail tests/main.test.ts`

### Step 9: Migrate Remaining Files
- **Goal**: Convert remaining files like `node-display.js`, `node-animation.js`, etc.
- **Test Plan**: Follow TDD for each file conversion.
- **Assertions**:
  1. Each file's functionality is preserved with proper typing.
  2. Individual test suites pass for each converted file.
- **Implementation**:
  1. Write specific tests for each file's functionality.
  2. Convert each file to TypeScript.
- **Test Command**: `npm test -- --bail tests/` for each respective test file.

### Step 10: Final Integration and Testing
- **Goal**: Ensure the entire application works cohesively in TypeScript.
- **Test Plan**: Full integration testing.
- **Assertions**:
  1. Application builds without errors.
  2. All features work as expected in the browser.
  3. Test coverage meets minimum thresholds.
- **Implementation**:
  1. Update all imports to use TypeScript files.
  2. Run complete test suite.
  3. Perform manual testing in browser.
- **Test Command**: `npm test` for full test suite.

### Step 11: Documentation Update
- **Goal**: Update all project documentation to reflect TypeScript migration.
- **Test Plan**: Verify documentation completeness.
- **Assertions**:
  1. Every folder has updated README.md files.
  2. Migration process is documented.
- **Implementation**:
  1. Update all folder documentation.
  2. Complete migration documentation in this file.
- **Test Command**: Manual review of documentation.

### Test-First Checklist
1. **Setup Tests**: Verify TypeScript and build tool configuration (`npm run build`).
2. **Testing Framework Tests**: Confirm Jest works with TypeScript (`npm test`).
3. **Utility File Tests**: Test `cytoscape-graph.js` functionality before conversion (`npm test -- --bail tests/cytoscape-graph.test.ts`).
4. **Style File Tests**: Test style-related files before conversion (`npm test -- --bail tests/cytoscape-styles.test.ts`).
5. **Interaction Tests**: Test interaction files before conversion (`npm test -- --bail tests/cytoscape-interactions.test.ts`).
6. **Core Manager Tests**: Test `cytoscape-manager.js` functionality before conversion (`npm test -- --bail tests/cytoscape-manager.test.ts`).
7. **Main Logic Tests**: Test `main.js` before conversion (`npm test -- --bail tests/main.test.ts`).
8. **Remaining Files Tests**: Individual tests for remaining files (`npm test -- --bail tests/` for each).
9. **Integration Tests**: Full application testing after migration (`npm test`).
10. **Documentation Review**: Manual verification of updated documentation.

This plan follows absolute TDD principles, with no implementation allowed until corresponding tests are written and failing. Each step will be executed in isolation, with continuous verification through testing. Documentation will be maintained throughout the process.

### Rationale for Global Namespace Exports

During the TypeScript migration, we've maintained the pattern of exposing functions to the global window namespace (e.g., `window.CytoscapeNodeInteractions`, `window.CytoscapeEdgeStyles`) while also providing proper ES module exports. This dual approach serves several important purposes:

1. **Backward Compatibility**: The application has existing JavaScript code that relies on these global objects. Maintaining them ensures we don't break current functionality during the incremental migration.

2. **Legacy Integration Points**: Some third-party plugins or external scripts may depend on these global objects, particularly in a browser environment where module systems might not be fully utilized.

3. **Gradual Migration Path**: This approach allows us to migrate files one by one without updating all import/usage sites simultaneously. Files can be converted to TypeScript while maintaining their existing API surfaces.

4. **Testing Simplicity**: The current test suite is designed to test these globally available functions, making it easier to verify that our TypeScript implementations match the expected behavior.

As we progress further in the migration (Steps 7-10), we'll evaluate opportunities to transition to a purely module-based approach, potentially:

- Deprecating the global namespace pattern in favor of proper imports
- Creating a compatibility layer for legacy code if needed
- Updating documentation to guide usage toward the module pattern
- Refactoring tests to use imports rather than global objects

This strategy balances immediate test-passing requirements with the long-term goal of a cleaner, more modular TypeScript architecture.
