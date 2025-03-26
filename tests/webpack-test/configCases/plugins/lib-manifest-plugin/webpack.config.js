var path = require("path");
var LibManifestPlugin = require("@rustbolt/core").LibManifestPlugin;

/** @type {function(any, any): import("@rustbolt/core").Configuration} */
module.exports = (env, { testPath }) => ({
	entry: {
		bundle0: ["./"]
	},
	plugins: [
		new LibManifestPlugin({
			path: path.resolve(testPath, "[name]-manifest.json"),
			name: "[name]_[fullhash]"
		})
	],
	node: {
		__dirname: false
	}
});
