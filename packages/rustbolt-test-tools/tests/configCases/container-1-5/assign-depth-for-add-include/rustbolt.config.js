const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new rustbolt.sharing.ProvideSharedPlugin({
			provides: ["./a/index.js"]
		})
	]
};
