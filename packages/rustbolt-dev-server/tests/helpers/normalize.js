const path = require("node:path");

const CURRENT_CWD = process.cwd();
const ROOT = path.resolve(__dirname, "../../");

const CSS_LOADER = path.dirname(require.resolve("css-loader"));
const RELATIVE_CSS_LOADER = path.relative(
	path.dirname(
		path.resolve(__dirname, "../fixtures/reload-config/webpack.config"),
	),
	CSS_LOADER,
);
const RSPACK = path.dirname(require.resolve("@rustbolt/core/package.json"));

const rustbolt = require("@rustbolt/core");
const RSPACK_MODULE = require.cache[require.resolve("@rustbolt/core")];
const TAPABLE = path.dirname(
	RSPACK_MODULE.require.resolve("@rustbolt/lite-tapable"),
);

const normalize = (str) => {
	let normalizedStr = str.replace(/(\\)+/g, "/");

	normalizedStr = normalizedStr
		.split(RSPACK.replace(/(\\)+/g, "/"))
		.join("<rustbolt>");

	normalizedStr = normalizedStr
		.split(CSS_LOADER.replace(/(\\)+/g, "/"))
		.join("<cssloader>");

	normalizedStr = normalizedStr
		.split(RELATIVE_CSS_LOADER.replace(/(\\)+/g, "/"))
		.join("<cssloader>");

	normalizedStr = normalizedStr
		.split(RELATIVE_CSS_LOADER.replace(/(\\)+/g, "/"))
		.join("<cssloader>");

	normalizedStr = normalizedStr
		.split(TAPABLE.replace(/(\\)+/g, "/"))
		.join("<tapable>");

	normalizedStr = normalizedStr
		.split(ROOT.replace(/(\\)+/g, "/"))
		.join("<root>");

	normalizedStr = normalizedStr
		.split(CURRENT_CWD.replace(/(\\)+/g, "/"))
		.join("<cwd>");

	normalizedStr = normalizedStr.replace(/:\d+:\d+/g, ":<line>:<row>");
	normalizedStr = normalizedStr.replace(
		/@@ -\d+,\d+ \+\d+,\d+ @@/g,
		"@@ ... @@",
	);
	return normalizedStr;
};

expect.addSnapshotSerializer({
	test(value) {
		return typeof value === "string";
	},
	print(received) {
		return normalize(received);
	},
});
