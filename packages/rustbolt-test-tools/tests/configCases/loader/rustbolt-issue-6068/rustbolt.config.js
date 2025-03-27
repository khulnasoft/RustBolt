/**
 * @type {import('@rustbolt/core').RustboltOptions}
 */
module.exports = {
	module: {
		rules: [
			{
				test: /a\.js$/,
				use: () => {
					return [
						{
							loader: "./loader1"
						}
					];
				}
			},
			{
				test: /a\.js$/,
				use: () => {
					return [
						{
							loader: "./loader2"
						}
					];
				},
				enforce: "pre"
			},
			{
				test: /a\.js$/,
				use: () => {
					return [
						{
							loader: "./loader3"
						}
					];
				},
				enforce: "post"
			}
		]
	}
};
