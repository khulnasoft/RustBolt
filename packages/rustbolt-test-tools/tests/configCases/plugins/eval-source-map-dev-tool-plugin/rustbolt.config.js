const path = require("path");
const { rustbolt } = require("@rustbolt/core");

/**
 * @type {import("@rustbolt/core").Configuration}
 */
module.exports = {
	node: {
		__dirname: false,
		__filename: false
	},
	output: {
		filename: "[name].js"
	},
	plugins: [
		new rustbolt.EvalSourceMapDevToolPlugin({
			sourceRoot: path.join(__dirname, "folder") + "/"
		}),
		new rustbolt.DefinePlugin({
			CONTEXT: JSON.stringify(__dirname)
		})
	]
};
