/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* Test suite: test the RSS feeds definitions, i.e. the
   *  allFeeds variable in the application.
   */
  describe('RSS Feeds\'', function() {
    /* Test: Make sure that the allFeeds variable has been
     * defined and that it is not empty.
     */
    it('feeds are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Test: Make sure that each feed in the allFeeds variable
     * has a defined URL and that this URL is not empty.
     */
    it('URLs are defined', function() {
      for (const FEED of allFeeds) {
        expect(FEED['url']).toBeDefined();
        expect(FEED['url'].length).not.toBe(0);
      }
    });

    /* Test: Make sure that each feed in the allFeeds variable
     * has a defined name and that this name is not empty.
     */
    it('names are defined', function() {
      for (const FEED of allFeeds) {
        expect(FEED['name']).toBeDefined();
        expect(FEED['name'].length).not.toBe(0);
      }
    });
  });

  /* Test suite: test the menu's visibility.
   */
  describe('The menu', function() {
    /* TODO: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    /* Test: Make sure that the menu is hidden by default. */
    it('is hidden by default', function() {
      const BODY = document.querySelector('body');
      expect(BODY.classList.contains('menu-hidden')).toBe(true);
    });

     /* TODO: Write a test that ensures the menu changes
      * visibility when the menu icon is clicked. This test
      * should have two expectations: does the menu display when
      * clicked and does it hide when clicked again.
      */
  });

  /* TODO: Write a new test suite named "Initial Entries" */

    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */

  /* TODO: Write a new test suite named "New Feed Selection" */

    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
}());
