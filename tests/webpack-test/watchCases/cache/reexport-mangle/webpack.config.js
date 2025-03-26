/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "production",
	cache: {
		type: "memory"
	},
	output: {
		pathinfo: true
	},
	optimization: {
		minimize: false,
		concatenateModules: false
	}
};
