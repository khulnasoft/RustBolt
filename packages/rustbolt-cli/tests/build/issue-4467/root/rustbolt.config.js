const { rustbolt } = require("@rustbolt/core");
const path = require("path");

const config = {
	entry: path.resolve(__dirname, "./index.js"),
	plugins: [
		new rustbolt.BannerPlugin({
			banner: ""
		})
	]
};

module.exports = config;
