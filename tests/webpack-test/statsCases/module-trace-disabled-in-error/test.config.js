const diffStats = require("../../helpers/diffStats");
const path = require("path");

module.exports = {
	validate(stats, error, actual) {

		expect(diffStats(actual, path.basename(__dirname)))
			.toMatchInlineSnapshot(`
			"- Expected
			+ Received

			@@ -1,4 +1,1 @@
			- asset main.js XX KiB [emitted] (name: main)
			- modules with errors XX bytes [errors]
			- ./not-existing.js XX bytes [built] [code generated] [XX error]
			- ./parse-error.js XX bytes [built] [code generated] [XX error]
			+ assets by status XX KiB [cached] XX asset
			@@ -7,7 +4,2 @@
			-
			- ERROR in ./not-existing.js
			- × Module not found: Can't resolve 'does-not-exist' in 'Xdir/module-trace-disabled-in-error'
			- ╭────
			- XX │ require('does-not-exist')
			- · ─────────────────────────
			- ╰────
			+ ./not-existing.js XX bytes [built] [code generated]
			+ ./parse-error.js XX bytes [built] [code generated] [XX error]
			@@ -15,11 +7,2 @@
			- ERROR in ./parse-error.js
			- × Module parse failed:
			- ╰─▶   × JavaScript parsing error: Expression expected
			- ╭─[XX:XX]
			- XX │ Here
			- XX │ could
			- XX │ be :)
			- ·     ─
			- XX │ your
			- XX │ code
			- ╰────
			+ ERROR in ./not-existing.js XX:XX-XX
			+ Module not found: Error: Can't resolve 'does-not-exist' in 'Xdir/module-trace-disabled-in-error'
			@@ -27,2 +10,8 @@
			- help:
			- You may need an appropriate loader to handle this file type.
			+ ERROR in ./parse-error.js XX:XX
			+ Module parse failed: Unexpected token (XX:XX)
			+ You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
			+ | Here
			+ | could
			+ > be :)
			+ | your
			+ | code
			@@ -30,1 +19,1 @@
			- Rustbolt x.x.x compiled with XX errors in X.XX
			+ webpack x.x.x compiled with XX errors in X ms"
		`);

	}
};
