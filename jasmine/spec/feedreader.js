/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All of the tests are placed within the $() function,
 * since some of these tests may require DOM elements. This
 * ensures that the tests don't run until the DOM is ready.
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

  /* Test suite: test that the new feed's contents actually change after
   * the loadFeed function finishes executing. */
  describe('New Feed Selection', function() {
    let CONTAINER = document.querySelector('.feed');
    let firstFeedContent,
      secondFeedContent;

    /* Make an asynchronous request for loadFeed() to execute and finish
     * twice before testing the different contents. */
    beforeEach(function(done) {
      /* Call the loadFeed function twice, and save the contents of the
       * .feed container div after each execution completes. */
      loadFeed(1, function() {
        firstFeedContent = CONTAINER.innerHTML;
        loadFeed(0, function() {
          secondFeedContent = CONTAINER.innerHTML;
          done();
        });
      });
    });

    /* Test: After loadFeed() finishes executing twice, check if the contents
     * of the .feed container div from the first execution of loadFeed is not
     * equal to the second execution of the loadFeed function. */
    it('changes content when the loadFeed function finishes executing', function(done) {
      expect(firstFeedContent).not.toEqual(secondFeedContent);
      done();
    });
  });

  /* Test suite: test that all the links on the page have text in them,
   * or an aria-label. This is necessary for users using screen readers
   * to be able to navigate the page smoothly. */
  describe('Links', function() {
    /* Given an array of links, check if each link in the array
     * actually has an text inside of it. */
    function checkIfLinksInArrayHaveInnerText(arrayOfLinks) {
      for (link of arrayOfLinks) {
        // Make sure that the link's text exists
        expect(link.innerText).toBeDefined();
        // Make sure that the link's text is more than 0 characters long
        expect(link.innerText.length).toBeGreaterThan(0);
        // Make sure that the link's text isn't just a space
        expect(link.innerText).not.toBe(' ');
        // If there is no inner text in the link, then check for an aria-label
        if (link.innerText === null ||
          link.innerText.length <= 0 ||
          link.innerText === ' ') {
            expect(link.getAttribute('aria-label')).not.toBe(null);
        }
      };
    }

    /* Test: Make sure that the links in the header have text in them. */
    it('in the header have text', function() {
      const HEADER_LINKS = document.querySelector('.header').querySelectorAll('a');
      checkIfLinksInArrayHaveInnerText(HEADER_LINKS);
    });

    /* Test: Make sure that the links in the side menu have text in them. */
    it('in the slide menu have text', function() {
      const SLIDE_MENU_LINKS = document.querySelector('.slide-menu').querySelectorAll('a');
      checkIfLinksInArrayHaveInnerText(SLIDE_MENU_LINKS);
    });

    /* Test: Make sure that the links in the feed have text in them. */
    it('in the feed have text', function() {
      const FEED_LINKS = document.querySelector('.feed').querySelectorAll('a');
      checkIfLinksInArrayHaveInnerText(FEED_LINKS);
    });
  });

  /* Test suite: test the color contrast between the text and the
   * background according to web accessibility standards. Guidelines and
   * formulae taken from https://www.w3.org/TR/WCAG20 */
  describe('Color contrast', function() {
    // Determine the luminance of a given color
    function determineLuminance(red, green, blue) {
      let r = red/255;
      let g = green/255;
      let b = blue/255;
      if (r <= 0.03928) {
        r = r/12.92;
      } else {
        r = Math.pow(((r + 0.055)/1.055), 2.4);
      }
      if (g <= 0.03928) {
        g = g/12.92;
      } else {
        g = Math.pow(((g + 0.055)/1.055), 2.4);
      }
      if (b <= 0.03928) {
        b = b/12.92;
      } else {
        b = Math.pow(((b + 0.055)/1.055), 2.4);
      }
      let luminance = 0.2126*r + 0.7152*g + 0.0722*b;
      return luminance;
    }

    // Determine the contrast between two colors
    function determineColorContrast(rgb1, rgb2) {
      const LUMIINANCE1 = determineLuminance(rgb1[0], rgb1[1], rgb1[2]);
      const LUMIINANCE2 = determineLuminance(rgb2[0], rgb2[1], rgb2[2]);
      let colorContrast;
      // The numerator should contain the lighter color
      if (LUMIINANCE1 > LUMIINANCE2) {
        colorContrast = (LUMIINANCE1 + 0.05)/(LUMIINANCE2 + 0.05);
      } else {
        colorContrast = (LUMIINANCE2 + 0.05)/(LUMIINANCE1 + 0.05);
      }
      return colorContrast;
    }

    // Convert string from rgb(xx, xx, xx) to [xx, xx, xx] format
    function convertRGBStringToArray(string) {
      // From 'rgb(xx, xx, xx)' to 'xx', 'xx', 'xx'
      string = string.slice(string.indexOf('(') + 1, string.indexOf(')'));
      // From 'xx', 'xx', 'xx' to ['xx', 'xx', 'xx']
      let array = string.split(',');
      // From ['xx', 'xx', 'xx'] to [xx, xx, xx]
      for (let i=0; i<array.length; i++) {
        array[i] = parseInt(array[i]);
      }
      // If the color is transparent, then convert it to white
      if (array.length == 4) {
        if (array[3] == 0) {
          for (let i=0; i<array.length-1; i++) {
            array[i] = 255;
          }
        }
      }
      return array;
    }

    // Given two elements, get the color contrast between these element's
    // text and background colors and determine whether it's sufficient
    function isColorContrastAcceptable(element1, element2) {
      // Get the color and background colors to compare
      let color = window.getComputedStyle(element1, null).getPropertyValue('color');
      let backgroundColor = window.getComputedStyle(element2, null).getPropertyValue('background-color');
      // Convert these colors to arrays
      color = convertRGBStringToArray(color);
      backgroundColor = convertRGBStringToArray(backgroundColor);

      // Get the font size and weight and convert them to numbers
      let fontSize = window.getComputedStyle(element1, null).getPropertyValue('font-size');
      let fontWeight = window.getComputedStyle(element1, null).getPropertyValue('font-weight');
      fontSize = parseInt(fontSize, 10);
      fontWeight = parseInt(fontWeight, 10);

      // Determine the color contrast between the two colors
      const COLOR_CONTRAST = determineColorContrast(color, backgroundColor);

      // Determine whether the color contrast is sufficient based on WCAG 2.0 guidelines
      let contrastAcceptable = false;
      if (((fontSize >= 18 || (fontSize >= 14 && fontWeight > 400)) &&
        COLOR_CONTRAST >= 3) ||
        COLOR_CONTRAST >= 4.5)  {
        contrastAcceptable = true;
      }
      return contrastAcceptable;
    }

    /* Test: Make sure that the color contrast in the header is
     * high enough. */
    it('in the header is sufficient', function() {
      const HEADER = document.querySelector('.header');
      expect(isColorContrastAcceptable(HEADER, HEADER)).toBe(true);
    });

    /* Test: Make sure that the color contrast in the menu icon is
     * high enough. */
    it('in the menu icon is sufficient', function() {
      const HEADER = document.querySelector('.header');
      const ICON = document.querySelector('.icon-list');
      expect(isColorContrastAcceptable(ICON, HEADER)).toBe(true);
    });

    /* Test: Make sure that the color contrast in the slide menu is
     * high enough. */
    it('in the slide menu is sufficient', function() {
      const SLIDE_MENU = document.querySelector('.slide-menu');
      const SLIDE_MENU_LINKS = document.querySelectorAll('.slide-menu li a');
      for (const LINK of SLIDE_MENU_LINKS) {
        expect(isColorContrastAcceptable(LINK, SLIDE_MENU)).toBe(true);
      }
    });

    /* Test: Make sure that the color contrast in the feed is
     * high enough. */
    it('in the feed is sufficient', function() {
      const FEED = document.querySelector('.feed');
      expect(isColorContrastAcceptable(FEED, FEED)).toBe(true);
    });
  });
}());
