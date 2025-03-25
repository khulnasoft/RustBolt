const { NormalModuleReplacementPlugin } = require("@rustbolt/core");

module.exports = /** @type {import("@rustbolt/core").Configuration} */ ({
	entry: {
		main: {
			import: "./index.js",
			layer: "test"
		}
	},
	plugins: [
		new NormalModuleReplacementPlugin(/request.v1(\.|$)/, args => {
			expect(args.request).toBe("./request.v1");
			expect(args.contextInfo.issuer).toBe("test");
			expect(args.contextInfo.issuerLayer.endsWith("index.js")).toBe(true);
			args.request = args.request.replace(/request\.v1(\.|$)/, "request.v2$1");
		})
	],
	experiments: {
		layers: true
	}
});
