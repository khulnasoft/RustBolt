// eslint-disable-next-line node/no-unpublished-require
const { SharePlugin } = require("@rustbolt/core").sharing;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		uniqueName: "b"
	},
	plugins: [
		new SharePlugin({
			shared: ["package"]
		})
	]
};
