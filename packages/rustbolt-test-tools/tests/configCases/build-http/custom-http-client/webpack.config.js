const path = require("node:path");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: "./index.js",
	experiments: {
		buildHttp: {
			// Test both string and regex patterns for allowedUris
			allowedUris: [
				// Allow a specific path with a string (should allow allowed-module.js)
				"http://test.rustbolt.dev/allowed",

				// Allow paths matching a regex pattern (should match regex-module.js)
				/^http:\/\/test\.rustbolt\.dev\/regex.*/

				// Intentionally not including restricted-module.js to test blocking behavior
			],
			cacheLocation: path.join(__dirname, "rustbolt-http-cache"),
			lockfileLocation: path.join(__dirname, "rustbolt-http-lockfile.json"),
			httpClient: require("./custom-http-client")
		},
		css: false
	}
};
