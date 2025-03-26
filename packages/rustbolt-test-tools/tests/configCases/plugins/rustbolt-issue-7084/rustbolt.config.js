const { rustbolt } = require("@rustbolt/core");
/**
 * @type {import("@rustbolt/core").Configuration}
 */
module.exports = {
	plugins: [
		new rustbolt.DefinePlugin({
			"typeof window": JSON.stringify("undefined")
		})
	]
};
