/** @type {import("@rustbolt/core").Configuration} */
const config = {
	entry: {
		main: "./index.js"
	},
	resolve: {
		mainFields: ["custom", "..."]
	}
};
module.exports = config;
