"use strict";

module.exports = {
  entry: {
    "background-page": "./src/background-page",
    "content-script": "./src/content-script.js",
    "devtools-page": "./src/devtools-page.js",
    "devtools-panel": "./src/devtools-panel.js",
    "report-wizard-tab": "./src/report-wizard-tab"
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
