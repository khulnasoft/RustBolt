import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const NodePlatformArchToAbi: Record<
	string,
	Record<string, string | Record<string, string>>
> = {
	android: {
		arm64: "",
		arm: "eabi"
	},
	win32: {
		x64: "msvc",
		ia32: "msvc",
		arm64: "msvc"
	},
	darwin: {
		x64: "",
		arm64: ""
	},
	freebsd: {
		x64: ""
	},
	linux: {
		x64: {
			musl: "musl",
			gnu: "gnu"
		},
		arm64: {
			musl: "musl",
			gnu: "gnu"
		},
		arm: "gnueabihf"
	}
};

function isMusl() {
	// For Node 10
	if (!process.report || typeof process.report.getReport !== "function") {
		try {
			const lddPath = require("node:child_process")
				.execSync("which ldd")
				.toString()
				.trim();
			return readFileSync(lddPath, "utf8").includes("musl");
		} catch (e) {
			return true;
		}
	} else {
		// @ts-expect-error getReport returns an object containing header object
		const { glibcVersionRuntime } = process.report.getReport().header;
		return !glibcVersionRuntime;
	}
}

const BINDING_VERSION = require("@rustbolt/binding/package.json").version;
const CORE_VERSION = require("../../package.json").version;

const getAddonPlatformArchAbi = () => {
	const { platform, arch } = process;
	let binding = "";
	binding += platform;

	const abi = NodePlatformArchToAbi[platform][arch];
	if (abi === undefined) return new Error(`unsupported cpu arch: ${arch}`);
	binding += `-${arch}`;

	if (typeof abi === "string") {
		binding += abi.length ? `-${abi}` : "";
	} else if (typeof abi === "object") {
		binding += `-${abi[isMusl() ? "musl" : "gnu"]}`;
	} else {
		return new Error(`unsupported abi: ${abi}`);
	}

	return binding;
};

/**
 * Error: version checked with error
 * null: version checked without any error
 * undefined: version to be checked
 */
let result: Error | undefined | null;

/**
 * Check if these version matches:
 * `@rustbolt/core`, `@rustbolt/binding`, `@rustbolt/binding-<platform>-<arch>-<abi>`
 */
export const checkVersion = () => {
	if (result !== undefined) {
		return result;
	}

	const platformArchAbi = getAddonPlatformArchAbi();
	if (platformArchAbi instanceof Error) {
		return (result = platformArchAbi);
	}

	let ADDON_VERSION: string;
	try {
		const BINDING_PKG_DIR = path.dirname(
			require.resolve("@rustbolt/binding/package.json")
		);

		const isLocal = readdirSync(BINDING_PKG_DIR).some(
			item => item === `rustbolt.${platformArchAbi}.node`
		);

		if (isLocal) {
			// Treat addon version the same as binding version if running locally
			ADDON_VERSION = BINDING_VERSION;
		} else {
			// Fetch addon package if installed from remote
			ADDON_VERSION = require(
				require.resolve(`@rustbolt/binding-${platformArchAbi}/package.json`, {
					paths: [BINDING_PKG_DIR]
				})
			).version;
		}
	} catch (error: any) {
		if (error instanceof Error) {
			return (result = new Error(
				`${error.toString()}. Maybe you forget to install the correct addon package ${`@rustbolt/binding-${platformArchAbi}`} or forget to build binding locally?`
			));
		}
		return (result = new Error(error));
	}

	const isMatch = [CORE_VERSION, BINDING_VERSION, ADDON_VERSION].every(
		(v, _, arr) => v === arr[0]
	);

	if (!isMatch) {
		return (result = new Error(
			`Unmatched version @rustbolt/core@${CORE_VERSION}, @rustbolt/binding@${BINDING_VERSION}, @rustbolt/binding-${platformArchAbi}@${ADDON_VERSION}.\nRustbolt requires these versions to be the same or you may have installed the wrong version. Otherwise, Rustbolt may not work properly.`
		));
	}

	return (result = null);
};
