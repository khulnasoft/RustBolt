/**@type {import("@rustbolt/core").Configuration}*/
module.exports = {
	mode: "production",
	context: __dirname,
	optimization: {
		moduleIds: "named",
		minimize: false
	},
	externalsPresets: {
		node: true
	}
};
