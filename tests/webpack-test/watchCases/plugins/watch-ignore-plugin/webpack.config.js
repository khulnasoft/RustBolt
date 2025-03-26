var webpack = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [new webpack.WatchIgnorePlugin({ paths: [/file\.js$/, /foo$/] })]
};
