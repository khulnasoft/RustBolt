/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		rules: [
			{
				test: /[ab]\.js$/,
				use: function (data) {
					return {
						loader: "./loader",
						options: {
							resource: data.resource.replace(/^.*[\\/]/g, ""),
							resourceQuery: data.resourceQuery,
							issuer: data.issuer.replace(/^.*[\\/]/g, "")
						}
					};
				}
			}
		]
	}
};
