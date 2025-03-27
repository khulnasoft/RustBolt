const { SharePlugin } = require("@rustbolt/core").sharing;

/** @type {import("../../../../").Configuration} */
module.exports = {
  context: `${__dirname}/cjs`,
  plugins: [
    new SharePlugin({
      shared: {
        lib: {},
        transitive_lib: {},
      },
    }),
  ],
};
