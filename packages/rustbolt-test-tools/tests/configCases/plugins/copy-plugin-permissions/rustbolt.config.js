const { CopyRustboltPlugin } = require("@rustbolt/core");
const path = require("path");

module.exports = {
	entry: "./index.js",
	target: "node",
	plugins: [
		new CopyRustboltPlugin({
			patterns: [
				{
					from: path.join(__dirname, "src", "test.txt"),
					copyPermissions: true
				}
			]
		})
	]
};
