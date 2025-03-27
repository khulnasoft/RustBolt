const { rustbolt } = require("@rustbolt/core");
/**@type {import("@rustbolt/cli").Configuration} */
const config = {
	builtins: {
		treeShaking: false
	},
	plugins: [
		new rustbolt.DefinePlugin({
      'process.env.NODE_ENV': "'development'",
		})
	]
};
module.exports = config;
