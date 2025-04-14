# Different Behaviour in Built and Non-Built Versions of Website

## Description

The website exhibits different behavior in its built and non-built versions.

## Plan

1. **Investigate Webpack Configuration for Bundling Issues**
   - **Goal**: Determine if the Webpack configuration is affecting the language selector functionality by altering script execution order or excluding necessary code.
   - **Test Assertion**: Verify that all necessary JavaScript files related to language selection are included in the bundle and that the execution order is preserved or appropriately managed.
   - **Action**: Read the `webpack.config.js` file to check entry points, output settings, and any plugins or optimizations that might affect bundling.
   - **Test Command**: N/A (initial investigation step, no test command yet).

2. **Inspect `bundle.js` for Language Selector Code**
   - **Goal**: Confirm that the language selector functionality is present and correctly implemented in the bundled JavaScript file.
   - **Test Assertion**: Ensure that functions like `setLanguage()` and related event listeners are defined and operational within `bundle.js`.
   - **Action**: Search `bundle.js` for keywords related to language selection (e.g., `setLanguage`, `langToggle`) to verify their presence and logic.
   - **Test Command**: N/A (manual inspection of minified code, potential use of source maps if available).

3. **Compare Console Logs Between Built and Non-Built Versions on Mobile**
   - **Goal**: Identify any errors or warnings in the browser console that might indicate issues with the language selector in the built version.
   - **Test Assertion**: Check for JavaScript errors related to language selection or DOM manipulation that are unique to the built version on mobile.
   - **Action**: Use browser developer tools to capture console logs when accessing the site on a mobile device or emulator for both versions.
   - **Test Command**: N/A (manual testing via browser tools, potential automation if a testing framework is in place).

4. **Test Language Selector Functionality in Built Version on Mobile**
   - **Goal**: Create a targeted test to validate the language selector's behavior in the built version under mobile conditions.
   - **Test Assertion**: The language selector should change the site's language and update the UI accordingly when a new language is selected on a mobile viewport.
   - **Action**: Write a test script (if not already present) to simulate language selection on a mobile-emulated browser environment.
   - **Test Command**: To be determined after checking for existing test frameworks; tentatively, `npm test -- --bail tests/language-selector-mobile.test.js` (assuming a test file is created).

5. **Investigate HTTP vs HTTPS Behavior Difference**
   - **Goal**: Determine if the protocol (HTTP vs HTTPS) affects the language selector or other site behaviors due to security policies or resource loading.
   - **Test Assertion**: Verify if there are mixed content issues or security restrictions on HTTPS that prevent certain scripts or resources from loading.
   - **Action**: Compare resource loading and console errors between HTTP and HTTPS access using browser developer tools.
   - **Test Command**: N/A (manual comparison, potential use of network analysis tools).

6. **Update Task Documentation with Findings**
   - **Goal**: Document all findings, test results, and progress in the task file to maintain a clear record of the investigation and resolution process.
   - **Test Assertion**: Ensure documentation reflects the current state of the issue, including any identified causes and proposed fixes.
   - **Action**: Update `issues/different-behaviour-in-built-and-non-built-versions-of-website.md` with detailed notes on each step's outcome.
   - **Test Command**: N/A (documentation update).

7. **Propose and Implement Fix for Language Selector in Built Version**
   - **Goal**: Based on findings, implement a minimal change to resolve the language selector issue in the built version on mobile.
   - **Test Assertion**: After implementation, the language selector must work identically in both built and non-built versions on mobile devices.
   - **Action**: Adjust Webpack configuration, script loading, or specific code in `bundle.js` as needed, following TDD principles (test first, then implement).
   - **Test Command**: To be determined based on the specific fix; likely a repeat of the test in step 4.

8. **Run Comprehensive Tests to Ensure No Regressions**
   - **Goal**: Verify that the fix does not introduce new issues and that all site functionalities work as expected in the built version.
   - **Test Assertion**: All existing tests pass, and new tests for the language selector confirm the fix across different environments.
   - **Action**: Run the full test suite, including any new tests for mobile language selection.
   - **Test Command**: `npm test -- --bail tests` (assuming a comprehensive test suite exists).

site is accessible on:
http://localhost:8000/
https://www.cocode.dk/
http://www.cocode.dk/
