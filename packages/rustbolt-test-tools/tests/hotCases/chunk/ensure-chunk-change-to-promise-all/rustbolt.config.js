/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	target: "web",
	optimization: {
		splitChunks: {
			minSize: 0
		}
	}
};
