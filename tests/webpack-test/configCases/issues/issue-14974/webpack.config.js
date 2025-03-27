const { HotModuleReplacementPlugin } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	devtool: false,
	experiments: { topLevelAwait: true },
	optimization: { usedExports: false, sideEffects: false },
	plugins: [new HotModuleReplacementPlugin()]
};
