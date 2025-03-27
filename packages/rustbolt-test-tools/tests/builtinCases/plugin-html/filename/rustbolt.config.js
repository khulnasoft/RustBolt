/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	builtins: {
		html: [
			{
				filename: "[name].[contenthash].html"
			},
			{
				template: "./index.html",
				filename: "[name].[contenthash].html"
			}
		]
	}
};
