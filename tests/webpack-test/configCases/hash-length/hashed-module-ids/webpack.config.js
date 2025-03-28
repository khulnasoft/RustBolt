var webpack = require("@rustbolt/core");
/** @type {import("@rustbolt/core").Configuration[]} */
module.exports = [
	{
		optimization: {
			moduleIds: false
		},
		plugins: [
			new webpack.ids.HashedModuleIdsPlugin({
				hashDigestLength: 2
			})
		]
	},
	{
		optimization: {
			moduleIds: false
		},
		plugins: [
			new webpack.ids.HashedModuleIdsPlugin({
				hashDigest: "hex",
				hashDigestLength: 2
			})
		]
	},
	{
		optimization: {
			moduleIds: false
		},
		plugins: [
			new webpack.ids.HashedModuleIdsPlugin({
				hashFunction: "sha1",
				hashDigestLength: 3
			})
		]
	}
];
