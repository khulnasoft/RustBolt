/** @type {import("@rustbolt/core").Configuration} */
module.exports = [
	{
		entry: "./not-supports-const.js",
		output: {
			environment: {
				const: false
			}
		}
	},
	{
		entry: "./supports-const.js",
		output: {
			environment: {
				const: true
			}
		}
	}
];
