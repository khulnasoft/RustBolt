/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		rules: [
			{
				test: /\.toml$/,
				type: "json",
				parser: {
					parse: () => ({ foo: "bar" })
				}
			}
		]
	}
};
