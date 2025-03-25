var webpack = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),
		new webpack.LoaderOptionsPlugin({
			test: /\.js$/,
			jsfile: true
		})
	]
};
