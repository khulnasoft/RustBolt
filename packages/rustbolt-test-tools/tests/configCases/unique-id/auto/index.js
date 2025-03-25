it("should inject version when use __rustbolt_unique_id__", () => {
	const version = require("../../../../package.json").version;
	expect(__rustbolt_unique_id__).toBe("bundler=rustbolt@" + version);
});
