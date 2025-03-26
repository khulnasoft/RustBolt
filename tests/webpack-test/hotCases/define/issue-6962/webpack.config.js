"use strict";

const webpack = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new webpack.DefinePlugin({
			DEFINE_PATH: JSON.stringify("./a")
		})
	]
};
