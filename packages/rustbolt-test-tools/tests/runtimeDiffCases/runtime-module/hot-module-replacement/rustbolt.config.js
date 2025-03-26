const webpack = require("@rustbolt/core");
const hmr = new webpack.HotModuleReplacementPlugin();
hmr.apply = hmr.apply.bind(hmr);

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [hmr]
};
