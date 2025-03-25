const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new rustbolt.IgnorePlugin({
			resourceRegExp: /^\.\/b$/
		}),
		new rustbolt.IgnorePlugin({
			resourceRegExp: /^\.\/c$/,
			contextRegExp: /moment$/
		}),
		new rustbolt.IgnorePlugin({
			resourceRegExp: /^\.\/d$/,
			contextRegExp: /test-ignore$/
		})
	]
};
