// eslint-disable-next-line node/no-unpublished-require
const { ConsumeSharedPlugin } = require("@rustbolt/core").sharing;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new ConsumeSharedPlugin({
			consumes: {
				shared: {
					import: false,
					strictVersion: true
				},
				shared2: {
					import: false
				}
			}
		})
	]
};
