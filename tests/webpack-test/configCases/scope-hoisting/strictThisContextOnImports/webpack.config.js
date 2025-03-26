var webpack = require("@rustbolt/core");
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		strictThisContextOnImports: true
	},
	optimization: {
		concatenateModules: true
	}
};
