const MySucceedModulePlugin = require("./plugins/MySucceedModulePlugin");

/** @type {import("@rustbolt/core").Configuration} */
const config = {
	context: __dirname,
	mode: "development",
	entry: {
		main: "./src/index.js"
	},
	plugins: [new MySucceedModulePlugin()]
};

module.exports = config;
