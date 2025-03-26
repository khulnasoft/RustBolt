const { rustbolt } = require("@rustbolt/core");

/** @type {import('@rustbolt/core').Configuration} */
module.exports = {
	plugins: [
		new rustbolt.DefinePlugin({
			DEFINE_VAR: "1 2 3"
		})
	],
	optimization: {
		concatenateModules: true
	}
};
