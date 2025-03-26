var webpack = require("@rustbolt/core");
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [new webpack.AutomaticPrefetchPlugin()]
};
