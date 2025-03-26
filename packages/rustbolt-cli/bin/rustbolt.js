#!/usr/bin/env node
const nodeModule = require("node:module");

// enable on-disk code caching of all modules loaded by Node.js
// requires Nodejs >= 22.8.0
const { enableCompileCache } = nodeModule;
if (enableCompileCache) {
	try {
		enableCompileCache();
	} catch {
		// ignore errors
	}
}

// make it easier to identify the process via activity monitor or other tools
process.title = "rustbolt-node";

const { RustboltCLI } = require("../dist/index");

async function runCLI() {
	const cli = new RustboltCLI();
	await cli.run(process.argv);
}

runCLI();
