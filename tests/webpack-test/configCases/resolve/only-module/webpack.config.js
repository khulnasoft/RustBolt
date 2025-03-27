const path = require("path");
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	resolve: {
		alias: [
			{
				alias: path.resolve(__dirname, "a/1.js"),
				name: "./b",
				onlyModule: true
			}
		]
	}
};
