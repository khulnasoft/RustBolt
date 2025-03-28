/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "development",
	target: "web",
	module: {
		generator: {
			"css/auto": {
				exportsOnly: false
			}
		}
	},
	experiments: {
		css: true
	}
};
