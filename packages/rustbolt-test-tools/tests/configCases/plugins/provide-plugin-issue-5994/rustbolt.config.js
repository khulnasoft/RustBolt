const { ProvidePlugin } = require("@rustbolt/core");
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new ProvidePlugin({
			Mod: ["./esm", "default"],
			Def: ["./esm", "default"]
		})
	]
};
