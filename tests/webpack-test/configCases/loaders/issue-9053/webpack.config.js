/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		rules: [
			{
				test: /c\.js$/,
				use: ["loader2"]
			},
			{
				test: /d\.js$/,
				use: ["loader3"]
			}
		]
	}
};
