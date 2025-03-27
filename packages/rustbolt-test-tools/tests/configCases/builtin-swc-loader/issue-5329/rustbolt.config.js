/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "builtin:swc-loader",
				options: {
					rustboltExperiments: {
						import: [
							{
								libraryName: "./lib",
								customName: "./lib/{{ unregisteredCase member }}"
							}
						]
					}
				}
			}
		]
	}
};
