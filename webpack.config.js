"use strict";

module.exports = {
  entry: {
    background: "./src/background.js",
    contentScript: "./src/contentScript.js",
    devtoolsPage: "./src/devtoolsPage.js",
    devtoolsPanel: "./src/devtoolsPanel.js",
    reporterWizardPanel: "./src/reporterWizardPanel.js"
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
