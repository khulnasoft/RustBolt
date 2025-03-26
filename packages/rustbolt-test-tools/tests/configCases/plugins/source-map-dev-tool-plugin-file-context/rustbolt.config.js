const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	node: {
		__dirname: false,
		__filename: false
	},
	output: {
		filename: "[name].js"
	},
	plugins: [
		new rustbolt.SourceMapDevToolPlugin({
			filename: "sourcemaps/[file].map",
			fileContext: "assets",
			publicPath: "http://localhost:50505/"
		})
	]
};
