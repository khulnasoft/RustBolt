const { rustbolt } = require("@rustbolt/core");
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		library: "NamedLibrary",
		libraryTarget: "amd"
	},
	plugins: [
		new rustbolt.BannerPlugin({
			raw: true,
			banner: "function define(name, deps, fn) { fn(); }\n"
		})
	]
};
