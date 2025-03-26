const { rustbolt } = require("@rustbolt/core");

module.exports = {
	optimization: {
		nodeEnv: "development"
	},
	plugins: [
		new rustbolt.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("production")
		})
	]
};
