"use strict";

const IgnorePlugin = require("@rustbolt/core").IgnorePlugin;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: "./test.js",
	plugins: [
		new IgnorePlugin({
			checkResource(resource, context) {
				return /ignored-module/.test(resource) && /folder-b/.test(context);
			}
		})
	]
};
