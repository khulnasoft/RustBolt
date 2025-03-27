const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
const common = {
	target: "web",
	node: {
		__dirname: false,
		__filename: false
	},
	module: {
		generator: {
			"css/auto": {
				localIdentName: "[path][name]-[local]",
				exportsOnly: false
			}
		}
	},
	optimization: {
		minimize: true,
		minimizer: [new rustbolt.LightningCssMinimizerRustboltPlugin()]
	},
	experiments: {
		css: true
	}
};

module.exports = [
	{
		...common,
		plugins: [
			new rustbolt.DefinePlugin({
				EXPORTS_ONLY: false
			})
		]
	},
	{
		...common,
		plugins: [
			new rustbolt.DefinePlugin({
				EXPORTS_ONLY: true
			})
		],
		module: {
			generator: {
				"css/auto": {
					localIdentName: "[path][name]-[local]",
					exportsOnly: true
				}
			}
		},
		optimization: {
			minimize: true,
			concatenateModules: true,
			minimizer: [new rustbolt.LightningCssMinimizerRustboltPlugin()]
		}
	}
];
