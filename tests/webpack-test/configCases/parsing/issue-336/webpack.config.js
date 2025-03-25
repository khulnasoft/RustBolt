var ProvidePlugin = require("@rustbolt/core").ProvidePlugin;
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new ProvidePlugin({
			aaa: "aaa"
		})
	]
};
