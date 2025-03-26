// eslint-disable-next-line node/no-unpublished-require
const { ProvideSharedPlugin } = require("@rustbolt/core").sharing;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new ProvideSharedPlugin({
			provides: ["shared"]
		})
	]
};
