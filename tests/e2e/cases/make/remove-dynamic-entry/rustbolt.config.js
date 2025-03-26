const path = require("path")
const fs = require("fs");
const rustbolt = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: async () => {
		const context = path.resolve(__dirname, "src");
		const files = await fs.promises.readdir(context);
		let entries = files.filter(f => f.startsWith('index'));
		entries.sort();
		return entries.reduce((acc, e, i) => {
			acc[`index${i + 1}`] = path.resolve(context, e);
			return acc;
		}, {})
	},
	context: __dirname,
	mode: "development",
	plugins: [
		new rustbolt.HtmlRustboltPlugin(),
	],
	devServer: {
		hot: true
	},
};
