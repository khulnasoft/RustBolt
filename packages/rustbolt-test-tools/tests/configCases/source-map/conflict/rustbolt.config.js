/**
 * @type {import('webpack').Configuration | import('@rustbolt/cli').Configuration}
 */
module.exports = {
	mode: "development",
	devtool: "source-map",
	externals: ["source-map"],
	entry: "./index.js"
};
