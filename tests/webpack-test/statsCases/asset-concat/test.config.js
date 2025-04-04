const diffStats = require("../../helpers/diffStats");
const path = require("path");

module.exports = {
	validate(stats, error, actual) {

		expect(diffStats(actual, path.basename(__dirname)))
			.toMatchInlineSnapshot(`
			"- Expected
			+ Received

			@@ -7,1 +7,1 @@
			- ./index.js + XX modules XX KiB [code generated]
			+ ./index.js + XX modules XX KiB [built] [code generated]
			@@ -10,1 +10,1 @@
			- Rustbolt x.x.x compiled successfully in X.XX
			+ webpack x.x.x compiled successfully in X ms"
		`);

	}
};
