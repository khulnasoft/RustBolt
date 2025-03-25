const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	node: {
		__dirname: false,
		__filename: false
	},
	devtool: "eval-source-map",
	externals: ["source-map"],
	externalsType: "commonjs",
	optimization: {
		moduleIds: 'named'
	},
	plugins: [
		new rustbolt.DefinePlugin({
			CONTEXT: JSON.stringify(__dirname)
		})
	]
};
