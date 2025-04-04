const diffStats = require("../../helpers/diffStats");
const path = require("path");

module.exports = {
	validate(stats, error, actual) {

		expect(diffStats(actual, path.basename(__dirname)))
			.toMatchInlineSnapshot(`
			"- Expected
			+ Received

			@@ -3,1 +3,1 @@
			- Rustbolt x.x.x compiled <CLR=XX,BOLD>successfully</CLR> in X s
			+ webpack x.x.x compiled <CLR=XX,BOLD>successfully</CLR> in X ms"
		`);

	}
};
