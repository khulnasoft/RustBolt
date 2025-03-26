require("./index.css");
const fs = __non_webpack_require__("fs");
const path = __non_webpack_require__("path");

it("should rewrite the css url() with publicPath when dataUrlCondition.maxSize is hit", function () {
	const css = fs.readFileSync(path.resolve(__dirname, "css/main.css"), "utf-8");
	const a = /a: url\((.*)\);/.exec(css)[1];
	expect(a.startsWith("./")).toBe(false);
	expect(a.includes("./logo.png")).toBe(false);
	expect(a.startsWith("data:image/png;base64,")).toBe(true);
});
