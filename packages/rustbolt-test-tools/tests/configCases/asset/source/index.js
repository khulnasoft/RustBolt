import data from "./data.txt";

it("should return the raw data if `rule.type` is sat to `asset/source`", () => {
	expect(data).toBe("- Isn't Rustbolt a gamechanging bundler?\n  - Hella yeah!");
});
