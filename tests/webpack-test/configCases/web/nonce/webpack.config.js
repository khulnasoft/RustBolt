const webpack = require("@rustbolt/core");
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	target: "web",
	// plugin that intercepts __webpack_require__
	plugins: [new webpack.HotModuleReplacementPlugin()]
};
