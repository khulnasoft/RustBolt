// @ts-nocheck
describe("warmup", () => {
	it("should warmup webpack", done => {
		let webpack = require("@rustbolt/core");
		const END = new Error("end warmup");
		webpack(
			{
				entry: "data:text/javascript,import 'data:text/javascript,'",
				plugins: [
					c =>
						c.hooks.emit.tap("Warmup", () => {
							throw END;
						})
				]
			},
			err => {
				webpack = undefined;
				try {
					// CHANGE: rustbolt will format error into diagnostic.
					expect(err.message).toContain("end warmup");
					done();
				} catch (e) {
					done(e);
				}
			}
		);
	}, 300000);
});
