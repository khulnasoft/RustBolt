// eslint-disable-next-line node/no-unpublished-require
const { SharePlugin } = require("@rustbolt/core").sharing;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new SharePlugin({
			shared: {
				"my-middleware": {
					singleton: true
					// import: false
				},
				"my-module/a": {
					singleton: true,
					version: "1.2.3"
					// import: false
				},
				"my-module/b": {
					singleton: true,
					version: "1.2.3"
					// import: false
				}
			}
		})
	]
};
