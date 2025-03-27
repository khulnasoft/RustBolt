const { DefinePlugin } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	node: {
		global: true
	},
	plugins: [
		new DefinePlugin({
			"global.test": "'test'"
		})
	]
};
