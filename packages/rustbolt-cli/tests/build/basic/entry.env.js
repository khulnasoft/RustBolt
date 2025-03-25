module.exports = function (env) {
	console.log(
		["RUSTBOLT_BUNDLE", "RUSTBOLT_BUILD", "RUSTBOLT_WATCH"]
			.map(key => `${key}=${env[key]}`)
			.join("\n")
	);
	return {
		mode: "development",
		entry: "./src/entry.js"
	};
};
