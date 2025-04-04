const { EntryPlugin } = require("@rustbolt/core");
const path = require("path");
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new EntryPlugin(__dirname, path.resolve(__dirname, "./index.js"), {
			name: "HtmlWebpackPlugin_0-C:\\userCode\\x-project\\node_modules\\html-webpack-plugin\\lib\\loader.js!C:\\userCode\\x-project\\index.html",
			filename: "index.js"
		})
	]
};
