const ReactRefreshRustboltPlugin = require('../../../..');

/** @type {import('@rustbolt/core').Configuration} */
module.exports = {
  mode: 'development',
  target: 'web',
  context: __dirname,
  entry: './index.js',
  plugins: [new ReactRefreshRustboltPlugin({
    exclude: /file\.js/,
  })],
};
