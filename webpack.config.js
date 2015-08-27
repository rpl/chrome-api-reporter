"use strict";

module.exports = {
  entry: {
    "background-page": "./src/background-page.js",
    "content-script": "./src/content-script.js",
    "devtools-page": "./src/devtools-page.js",
    "devtools-panel": "./src/devtools-panel.js",
    "reporter-wizard-tab": "./src/reporter-wizard-tab.js"
  },
  output: {
    path: __dirname + '/build/', // eslint-disable-line no-path-concat
    filename: '[name].js',
  },

  module: {
    loaders: [{
      test: /\.(jsx|js)?$/,
      loader:  'babel-loader?stage=0',
      exclude: [
        'node_modules',
      ],
    }]
  },
};
