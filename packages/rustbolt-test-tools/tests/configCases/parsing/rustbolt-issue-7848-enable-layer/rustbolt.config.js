const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: {
		bundle0: {
			import: "./index.js",
			layer: "main"
		}
	},
	experiments: {
		layers: true
	},
	plugins: [
		new rustbolt.DefinePlugin({
			__RUNTIME_TYPE__: "__webpack_layer__"
		})
	]
};
