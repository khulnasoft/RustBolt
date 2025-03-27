const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: {
		bundle0: "./index.js"
	},
	experiments: {
		layers: false
	},
	plugins: [
		new rustbolt.DefinePlugin({
			__RUNTIME_TYPE__: "__webpack_layer__"
		})
	]
};
