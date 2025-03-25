const { rustbolt } = require("@rustbolt/core");
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		libraryTarget: "amd"
	},
	plugins: [
		new rustbolt.BannerPlugin({
			raw: true,
			banner: "function define(fn) { fn(); }\n"
		})
	]
};
