var DefinePlugin = require("@rustbolt/core").DefinePlugin;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		environment: {
			bigIntLiteral: true
		}
	},
	plugins: [
		new DefinePlugin({
			BIGINT: BigInt("9007199254740993"),
			ZERO_BIGINT: BigInt(0)
		})
	]
};
