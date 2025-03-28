"use strict";

var NoEmitOnErrorsPlugin = require("@rustbolt/core").NoEmitOnErrorsPlugin;
var TestChildCompilationFailurePlugin = require("./TestChildCompilationFailurePlugin");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: "./index",
	output: {
		filename: "bundle.js"
	},
	plugins: [
		new NoEmitOnErrorsPlugin(),
		new TestChildCompilationFailurePlugin({
			filename: "child.js"
		})
	]
};
