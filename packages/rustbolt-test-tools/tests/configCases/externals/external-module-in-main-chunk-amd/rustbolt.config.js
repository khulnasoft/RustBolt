const { rustbolt } = require("@rustbolt/core");
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		libraryTarget: "amd"
	},
	externals: {
		external: "external"
	},
	plugins: [
		new rustbolt.BannerPlugin({
			raw: true,
			banner: "function define(deps, fn) { fn(); }\n"
		})
	]
};
