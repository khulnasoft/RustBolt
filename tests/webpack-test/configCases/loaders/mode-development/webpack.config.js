/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "development",
	module: {
		rules: [
			{
				test: /a\.js$/,
				use: "./loader"
			}
		]
	}
};
