/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				parser: {
					requireJs: true
				}
			}
		]
	}
};
