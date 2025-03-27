const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: {
		main: ["./index.js"]
	},
	plugins: [
		new rustbolt.ProvidePlugin({
			aaa: "./aaa",
			"bbb.ccc": "./bbbccc",
			dddeeefff: ["./ddd", "eee", "3-f"],
			aa1: ["./a", "c", "cube"],
			es2015_aUsed: ["./esm2", "aUsed"],
			"process.env.NODE_ENV": "./env",
			es2015: "./esm",
			es2015_name: ["./esm", "default"],
			es2015_alias: ["./esm", "alias"],
			es2015_year: ["./esm", "year"],
			"this.aaa": "./aaa",
			str: "./str.js",
			process: "./process.js"
		})
	]
};
