/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "production",
	entry: "./index",
	stats: {
		hash: false,
		moduleTrace: true,
		errorDetails: false
	}
};
