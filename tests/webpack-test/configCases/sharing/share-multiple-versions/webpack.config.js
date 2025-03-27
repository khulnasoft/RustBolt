// eslint-disable-next-line node/no-unpublished-require
const { SharePlugin } = require("@rustbolt/core").sharing;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	optimization: {
	},
	plugins: [
		new SharePlugin({
			shared: ["shared"]
		})
	]
};
