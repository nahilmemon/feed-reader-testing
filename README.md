# Feed Reader Testing

## Table of Contents

* [Description](#description)
* [How to Run the Web App](#how-to-run-the-web-app)
* [Minimum Requirements](#minimum-requirements)
* [Resources Used](#resources-used)

## Description

An incomplete [web-based application which reads RSS feeds with a testing framework](https://github.com/udacity/frontend-nanodegree-feedreader) was given. The original developer of this application started to implement browser-based testing using the [Jasmine JavaScript testing library](http://jasmine.github.io/), but had to leave the company after writing one test, leaving the test suite implementation incomplete. In this project, I used Jasmine to write the remaining tests desired. The test results can be viewed at the bottom of the web page.

## How to Run the Web App

### Option A

Go [here](https://nahilmemon.github.io/feed-reader-testing/) to run the app in your web browser.

### Option B

Download the repository and open index.html to load the web app.

## Minimum Requirements

The minimum requirements of this project involved implementing the following test suites and tests:
* RSS Feeds' test suite:
  * test that the feeds' URLs in allFeeds are defined and not empty
  * test that the feeds' names in allFeeds are defined and not empty
* The menu test suite:
  * test that the menu is hidden by default
  * test that the menu's visibility gets toggled upon each click of the menu icon
* Initial Entries test suite:
  * test that the initial entries array isn't empty after the loadFeed function (an asynchronous function) finishes executing
* New Feed Selection test suite:
  * test that the new feed's contents actually change after each execution of the loadFeed function (an asynchronous function)

## Resources Used

* [Jasmine Library](https://jasmine.github.io/2.1/introduction.html)