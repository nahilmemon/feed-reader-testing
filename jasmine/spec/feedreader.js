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

  /* Test suite: test the menu's visibility. */
  describe('The menu', function() {
    /* Test: Make sure that the menu is hidden by default. */
    it('is hidden by default', function() {
      const BODY = document.querySelector('body');
      expect(BODY.classList.contains('menu-hidden')).toBe(true);
    });

    /* Test: Make sure that the menu changes visibility when
     * the menu icon is clicked upon.
     */
    it('toggles visibility when the menu icon is clicked upon', function() {
      const BODY = document.querySelector('body');
      const MENU_ICON = document.querySelector('.menu-icon-link');
      // Trigger the first click - the menu is currently hidden and
      // the click should make the menu appear
      MENU_ICON.click();
      expect(BODY.classList.contains('menu-hidden')).toBe(false);
      // Trigger the second click - the menu is currently visible and
      // the click should make the menu disappear
      MENU_ICON.click();
      expect(BODY.classList.contains('menu-hidden')).toBe(true);
    });
  });

  /* Test suite: test that the initial entries array isn't empty
   * after the loadFeed() function finishes executing. */
  describe('Initial Entries', function() {
    /* Make an asynchronous request for loadFeed() to execute and finish
     * before testing its contents. */
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    /* Test: After loadFeed() finishes executing, there is at least one
     * .entry element within the .feed container div. */
    it('contains at least one entry after loadFeed() finishes executing', function(done) {
      const CONTAINER = document.querySelector('.feed');
      expect(CONTAINER.querySelectorAll('.entry').length).toBeGreaterThan(0);
      done();
    });
  });

  /* Test suite: test that the new feed's contain actually changes after
   * the loadFeed function finishes executing. */
  describe('New Feed Selection', function() {
    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
  });
}());
