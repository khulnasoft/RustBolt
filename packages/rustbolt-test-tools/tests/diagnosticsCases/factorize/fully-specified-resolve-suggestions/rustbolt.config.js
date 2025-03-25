/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				resolve: {
					fullySpecified: true
				},
				type: "javascript/esm"
			}
		]
	}
};
