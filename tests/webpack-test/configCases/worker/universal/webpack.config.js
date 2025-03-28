/** @type {import("@rustbolt/core").Configuration} */
module.exports = [
	{
		name: "web",
		target: ["web", "node"],
		output: {
			filename: "web-[name].mjs"
		},
		experiments: {
			outputModule: true
		}
	}
];
