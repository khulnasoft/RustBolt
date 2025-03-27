/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: {
		index: {
			import: ["./index.js"]
		}
	},
	optimization: {
		providedExports: true,
		usedExports: "global"
	}
};
