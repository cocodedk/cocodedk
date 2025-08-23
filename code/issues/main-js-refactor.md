# Main.js Refactor Task

## Goal
Refactor main.js by extracting each function into its own file within a subfolder, then importing them back to main.js. Each migration must be confirmed before proceeding to the next.

## Functions to Migrate
Based on analysis of main.js, the following functions need to be extracted:

1. `toggleImplementation()` - Lines 73-82
2. `testCurrentVisualization()` - Lines 85-146
3. `testCytoscapeImplementation(outputElement)` - Lines 149-245
4. `testLegacyImplementation(outputElement)` - Lines 248-273
5. `setLanguage(lang)` - Lines 276-324
6. `handleLanguageKeydown(event, lang)` - Lines 327-350
7. `closeMenuOnEscape(e)` - Lines 353-362
8. `initializeCytoscape()` - Lines 365-579
9. `fallbackToLegacy()` - Lines 582-594
10. `showContactModal(nodeData)` - Lines 597-622
11. `showNodeDescriptionModal(nodeData)` - Lines 625-751
12. `closeNodeDescriptionModal(event)` - Lines 757-798
13. `addTitleParallaxEffect(modal)` - Lines 804-838
14. `runEndToEndTest()` - Lines 914-955

## Migration Strategy
- Create `/js/main/` subfolder
- Extract one function at a time into individual files
- Import each function back to main.js
- Test after each migration
- Wait for user confirmation before proceeding to next function

## Progress Checklist
- [x] Create subfolder structure
- [x] Migrate function 1: `toggleImplementation`
- [x] Migrate function 2: `testCurrentVisualization`
- [x] Migrate function 3: `testCytoscapeImplementation`
- [ ] Migrate function 4: `testLegacyImplementation`
- [ ] Migrate function 5: `setLanguage`
- [ ] Migrate function 6: `handleLanguageKeydown`
- [ ] Migrate function 7: `closeMenuOnEscape`
- [ ] Migrate function 8: `initializeCytoscape`
- [ ] Migrate function 9: `fallbackToLegacy`
- [ ] Migrate function 10: `showContactModal`
- [ ] Migrate function 11: `showNodeDescriptionModal`
- [ ] Migrate function 12: `closeNodeDescriptionModal`
- [ ] Migrate function 13: `addTitleParallaxEffect`
- [ ] Migrate function 14: `runEndToEndTest`

## Current Status
Ready to begin migration process.
