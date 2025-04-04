require('./index.css');
const fs = require("fs");
const path = require("path");

const htmlPath = path.join(__dirname, "./index.html");
const htmlContent = fs.readFileSync(htmlPath, "utf-8");

it("should inject title", () => {
	expect(htmlContent).toContain("<title>i am title</title>");
});

it("should have only one title", () => {
	expect(htmlContent.split("<title>").length - 1).toBe(1);
});

it("should inject htmlRustboltPlugin.tags.headTags", () => {
	expect(htmlContent).toContain(`<title>i am title</title><meta content="meta-value" name="meta-name"><link href="http://cdn.com/favicon.ico" rel="icon"><script defer src="http://cdn.com/bundle0.js"></script><link href="http://cdn.com/main.css" rel="stylesheet">`);
});

it("should inject filtered htmlRustboltPlugin.tags.headTags", () => {
	expect(htmlContent.split(`<script defer src="http://cdn.com/bundle0.js"></script>`).length - 1).toBe(2);
});

it("should inject htmlRustboltPlugin.files.publicPath", () => {
	expect(htmlContent).toContain(`publicpath: "http://cdn.com/"`);
});

it("should inject htmlRustboltPlugin.files.favicon", () => {
	expect(htmlContent).toContain(`favicon: "http://cdn.com/favicon.ico"`);
});

it("should inject htmlRustboltPlugin.files.js", () => {
	expect(htmlContent).toContain(`scripts: "http://cdn.com/bundle0.js"`);
});

it("should inject htmlRustboltPlugin.files.css", () => {
	expect(htmlContent).toContain(`styles: "http://cdn.com/main.css"`);
});

it("should inject htmlRustboltPlugin.options.title", () => {
	expect(htmlContent).toContain(`config title: "i am title"`);
});

it("should inject rustboltConfig.mode", () => {
	expect(htmlContent).toContain(`rustbolt config mode: "production"`);
});

it("should inject rustboltConfig.output.publicPath", () => {
	expect(htmlContent).toContain(`rustbolt config publicpath: "http://cdn.com/"`);
});

it("should inject rustboltConfig.output.crossOriginLoading", () => {
	expect(htmlContent).toContain(`rustbolt config cross origin loading: "anonymous"`);
});