var DefinePlugin = require("@rustbolt/core").DefinePlugin;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new DefinePlugin({
			"foo.bar.baz": '"test"'
		})
	]
};
