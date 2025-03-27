"use strict";

const HTMLGeneratorPlugin = require("../../helpers/html-generator-plugin");

/**
 * @type {import('@rustbolt/core').RustboltOptions}
 */
const config = {
	mode: "development",
	context: __dirname,
	stats: "none",
	entry: "./foo.js",
	output: {
		path: "/"
	},
	node: false,
	infrastructureLogging: {
		level: "info",
		stream: {
			write: () => {}
		}
	},
	plugins: [new HTMLGeneratorPlugin()]
};

module.exports = config;
