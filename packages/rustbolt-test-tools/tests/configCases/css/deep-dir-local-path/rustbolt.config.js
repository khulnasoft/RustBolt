/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		generator: {
			"css/auto": {
				localIdentName: "[path][name]-[local]"
			}
		}
	},
	mode: "development",
	experiments: {
		css: true
	}
};
