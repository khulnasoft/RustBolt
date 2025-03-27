/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		rules: [
			{
				test: /\.a\.js$/,
				use: ["loader1"]
			}
		]
	}
};
