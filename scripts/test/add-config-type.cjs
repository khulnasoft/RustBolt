const glob = require("glob");
const fs = require("node:fs");
const path = require("node:path");

for (const { root, match, comment } of [
	{
		root: path.resolve(__dirname, "../../packages/rustbolt-test-tools/tests"),
		match: "**/webpack.config.js",
		comment: `/** @type {import("webpack").Configuration} */`
	},
	{
		root: path.resolve(__dirname, "../../packages/rustbolt-test-tools/tests"),
		match: "**/rustbolt.config.js",
		comment: `/** @type {import("@rustbolt/core").Configuration} */`
	},
	{
		root: path.resolve(
			__dirname,
			"../../packages/rustbolt-test-tools/tests/configCases"
		),
		match: "**/test.config.js",
		comment: `/** @type {import("../../../..").TConfigCaseConfig} */`
	},
	{
		root: path.resolve(
			__dirname,
			"../../packages/rustbolt-test-tools/tests/compilerCases"
		),
		match: "*.js",
		comment: `/** @type {import('../../').TCompilerCaseConfig} */`
	},
	{
		root: path.resolve(
			__dirname,
			"../../packages/rustbolt-test-tools/tests/defaultsCases"
		),
		match: "*/*.js",
		comment: `/** @type {import('../../..').TDefaultsCaseConfig} */`
	},
	{
		root: path.resolve(
			__dirname,
			"../../packages/rustbolt-test-tools/tests/errorCases"
		),
		match: "*.js",
		comment: `/** @type {import('../..').TErrorCaseConfig} */`
	},
	{
		root: path.resolve(
			__dirname,
			"../../packages/rustbolt-test-tools/tests/hashCases"
		),
		match: "**/test.config.js",
		comment: `/** @type {import('../../..').THashCaseConfig} */`
	},
	{
		root: path.resolve(
			__dirname,
			"../../packages/rustbolt-test-tools/tests/hookCases"
		),
		match: "**/test.js",
		comment: `/** @type {import("../../../..").THookCaseConfig} */`
	},
	{
		root: path.resolve(
			__dirname,
			"../../packages/rustbolt-test-tools/tests/runtimeDiffCases"
		),
		match: "**/test.config.js",
		comment: `/** @type {import("../../..").TDiffCaseConfig} */`
	},
	{
		root: path.resolve(
			__dirname,
			"../../packages/rustbolt-test-tools/tests/statsAPICases"
		),
		match: "*.js",
		comment: `/** @type {import('../..').TStatsAPICaseConfig} */`
	}
]) {
	const files = glob.sync(match, { cwd: root });
	for (const file of files) {
		const absolutePath = path.resolve(root, file);
		let content = fs.readFileSync(absolutePath, "utf-8");
		if (content.includes("@type")) {
			continue;
		}
		if (!content.includes("module.exports = {")) {
			continue;
		}
		const index = content.indexOf("module.exports = {");
		if (index === 0) {
			content = `${comment}\n${content}`;
		} else if (content[index - 1] === "\n") {
			let prevLineStart = index - 2;
			while (content[prevLineStart] !== "\n" && prevLineStart > 0) {
				prevLineStart--;
			}
			const line = content.slice(prevLineStart, index - 1);
			if (line.includes("*/")) {
				continue;
			}
			content = `${content.slice(0, index - 1)}\n${comment}\n${content.slice(index)}`;
		}
		fs.writeFileSync(absolutePath, content, "utf-8");
	}
}
