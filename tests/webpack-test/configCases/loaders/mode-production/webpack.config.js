/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "production",
	module: {
		rules: [
			{
				test: /a\.js$/,
				use: "./loader"
			}
		]
	}
};
