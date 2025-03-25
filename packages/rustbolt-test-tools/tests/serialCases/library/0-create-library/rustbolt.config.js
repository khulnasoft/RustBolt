const { rustbolt } = require("@rustbolt/core");
const path = require("path");
/** @type {function(any, any): import("@rustbolt/core").Configuration[]} */
module.exports = (env, { testPath }) => [
	{
		entry: {
			main: "./modern-module-non-entry-module-export/index.js"
		},
		output: {
			module: true,
			chunkFormat: "module",
			filename: "modern-module-non-entry-module-export/[name].js",
			library: {
				type: "modern-module"
			}
		},
		optimization: {
			concatenateModules: true,
			avoidEntryIife: true
		},
		experiments: {
			outputModule: true
		}
	}
];
