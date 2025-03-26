const { DefinePlugin } = require("@rustbolt/core");

/**@type {import("@rustbolt/core").Configuration}*/
module.exports = {
	context: __dirname,

	optimization: {
		sideEffects: true
	},
	plugins: [
		new DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("production")
		})
	]
};
