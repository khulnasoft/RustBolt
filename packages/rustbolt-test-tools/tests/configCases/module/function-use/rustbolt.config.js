/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	target: "web",
	node: false,
	module: {
		rules: [
			{
				test: /\.less$/,
				use: ({ resource, realResource, resourceQuery, issuer, compiler }) => {
					if (
						!resource.includes("index.less") ||
						!issuer.includes("index.js") ||
						!realResource.includes("index.less")
					)
						return [];
					if (resourceQuery === "?test")
						return ["less-loader", require.resolve("./loader.js")];
					else return ["less-loader"];
				},
				type: "css",
				generator: {
					exportsOnly: false
				}
			}
		]
	}
};
