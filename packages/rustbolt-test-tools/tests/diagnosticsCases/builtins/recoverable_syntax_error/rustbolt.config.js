/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: "./index.tsx",
	module: {
		rules: [
			{
				test: /\.tsx$/,
				use: {
					loader: "builtin:swc-loader"
				}
			}
		]
	}
};
