/** @type {import("@rustbolt/core").Configuration} */
module.exports = [
	{
		entry: "./a",
		target: "web",
		output: {
			filename: "a.js",
			chunkLoadTimeout: 1234000
		}
	},
	{
		entry: "./index"
	}
];
