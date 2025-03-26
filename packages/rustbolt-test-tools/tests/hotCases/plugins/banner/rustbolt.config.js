const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new rustbolt.BannerPlugin({
			banner:
				"global.bannerIndex = typeof global.bannerIndex === 'number' ? global.bannerIndex + 1 : 0;",
			raw: true
		})
	]
};
