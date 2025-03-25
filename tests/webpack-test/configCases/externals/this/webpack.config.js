/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	optimization: {
		concatenateModules: true
	},
	externals: {
		external: "this EXTERNAL_TEST_GLOBAL"
	}
};
