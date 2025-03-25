/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "none",
	module: {
		rules: [
			{
				test: /a\.js$/,
				use: [{ loader: "./loader-b.js" }, { loader: "./loader-a.js" }]
			}
		]
	}
};
