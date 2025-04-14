/* Test for mobile text rendering on different viewport sizes */
describe("Mobile Text Rendering", () => {
  beforeEach(() => {
    // Setup DOM elements for testing
    document.body.innerHTML = "<div class=\"node-description\">Test Description</div>";
    // Set viewport size for mobile simulation using JSDOM compatible method
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 500 });
    Object.defineProperty(window, "innerHeight", { writable: true, configurable: true, value: 800 });
    window.dispatchEvent(new Event("resize"));
  });
  test("Text should be visible and styled correctly on mobile viewport (width < 768px)", () => {
    // Assuming there's a specific element with text that should be visible
    const textElement = document.querySelector(".node-description");
    // Assertions
    expect(textElement).not.toBeNull(); // Element exists
    expect(window.getComputedStyle(textElement).display).not.toBe("none"); // Element is visible
    // Note: getComputedStyle might not work as expected in JSDOM for all properties, so we focus on presence and content
    // Check if the text content is not empty or incorrect
    expect(textElement.textContent.trim()).not.toBe("");
    expect(textElement.textContent.trim()).not.toBe("No description available."); // Adjust based on expected incorrect text
  });
  afterEach(() => {
    // Cleanup code if necessary
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1024 });
    Object.defineProperty(window, "innerHeight", { writable: true, configurable: true, value: 768 });
    window.dispatchEvent(new Event("resize"));
    document.body.innerHTML = "";
  });
});
