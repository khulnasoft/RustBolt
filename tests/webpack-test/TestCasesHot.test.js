const { describeCases } = require("./TestCases.template");
const webpack = require("@rustbolt/core");

describe("TestCases", () => {
	describeCases({
		name: "hot",
		plugins: [new webpack.HotModuleReplacementPlugin()]
	});
});
