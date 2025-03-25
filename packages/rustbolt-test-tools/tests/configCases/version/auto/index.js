it("should inject version when use __rustbolt_version__", () => {
	expect(__rustbolt_version__).toBe(require("../../../../package.json").version);
});
