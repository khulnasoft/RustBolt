var webpack = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "production",
	entry: "./entry.js",
	output: {
		filename: "bundle.js"
	},
	plugins: [
		new webpack.DllReferencePlugin({
			manifest: __dirname + "/blank-manifest.json",
			name: "blank-manifest"
		})
	]
};
