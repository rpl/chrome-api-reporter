chrome-api-reporter
===================

**chrome-api-reporter** is a small add-on which scans the available add-on
contexts (background page, extension tab, devtools page, devtools panel etc.)
and reports the available chrome APIs.

Usage
=====

Clone the repository:

```
$ git clone https://github.com/rpl/chrome-api-reporter
```

Install the npm devDependencies and build the addon sources with webpack:

```
$ npm install
...
$ npm run build
```

Load the addon in a Chrome/Blink based browser:

- Go to the "chrome://extensions" settings page
- Enable the "Developer Mode"
- Load the extension folder using the "Load unpacked extension..." button

![Load unpacked extension...](https://raw.githubusercontent.com/rpl/chrome-api-reporter/master/docs/screenshots/chrome-api-reporter-0.png)

Once the extension is installed / enabled, its background page will scan itself
the it will open two tabs:

- one used to scan the content script context and it is auto-closed once loaded
- one with the tab context (which scan itself and render the html report in the tab)

![API Reporting UI](https://raw.githubusercontent.com/rpl/chrome-api-reporter/master/docs/screenshots/chrome-api-reporter-1.png)

To scan the other context, you need to activate them:
- if you open the Devtools it will scan the devtool page context and update the report in the tab

![DevTools Page API Reporting](https://raw.githubusercontent.com/rpl/chrome-api-reporter/master/docs/screenshots/chrome-api-reporter-2.png)

- if you select the fake devtool panel it will scan and report its api as well.

![DevTools Panel API Reporting](https://raw.githubusercontent.com/rpl/chrome-api-reporter/master/docs/screenshots/chrome-api-reporter-3.png)
