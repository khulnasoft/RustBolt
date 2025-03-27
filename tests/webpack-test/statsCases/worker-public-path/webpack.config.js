/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "production",
	entry: "./index.js",
	output: {
		filename: "[name]-[contenthash].js"
	}
};
