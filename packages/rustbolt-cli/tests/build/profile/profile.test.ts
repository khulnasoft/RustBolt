import fs from "fs";
import { resolve } from "path";
import { run } from "../../utils/test-utils";

const defaultTracePath = "./trace.json";
const defaultJSCPUPath = "./jscpuprofile.json";
const defaultLoggingPath = "./logging.json";
const customTracePath = "./custom/trace";
const customJSCPUPath = "./custom/jscpuprofile";
const customLoggingPath = "./custom/logging";

function findDefaultOutputDirname() {
	const files = fs.readdirSync(__dirname);
	const file = files.filter(file => file.startsWith(".rustbolt-profile"));
	expect(file.length).toBe(1);
	return resolve(__dirname, file[0]);
}

describe("profile", () => {
	afterEach(() => {
		const dirname = findDefaultOutputDirname();
		[
			dirname,
			resolve(__dirname, customTracePath),
			resolve(__dirname, customJSCPUPath),
			resolve(__dirname, customLoggingPath)
		].forEach(p => {
			if (fs.existsSync(p)) {
				fs.rmSync(p, { recursive: true });
			}
		});
	});

	it("should store all profile files when RUSTBOLT_PROFILE=ALL enabled", async () => {
		const { exitCode } = await run(
			__dirname,
			[],
			{},
			{ RUSTBOLT_PROFILE: "ALL" }
		);
		expect(exitCode).toBe(0);
		const dirname = findDefaultOutputDirname();
		console.log(
			resolve(dirname, defaultTracePath),
			fs.existsSync(resolve(dirname, defaultTracePath))
		);
		expect(fs.existsSync(resolve(dirname, defaultTracePath))).toBeTruthy();
		expect(fs.existsSync(resolve(dirname, defaultJSCPUPath))).toBeTruthy();
		expect(fs.existsSync(resolve(dirname, defaultLoggingPath))).toBeTruthy();
	});

	it("should store js cpu profile file when RUSTBOLT_PROFILE=JSCPU enabled", async () => {
		const { exitCode } = await run(
			__dirname,
			[],
			{},
			{ RUSTBOLT_PROFILE: "JSCPU" }
		);
		expect(exitCode).toBe(0);
		const dirname = findDefaultOutputDirname();
		expect(fs.existsSync(resolve(dirname, defaultJSCPUPath))).toBeTruthy();
	});

	it("should store rust trace file when RUSTBOLT_PROFILE=TRACE enabled", async () => {
		const { exitCode } = await run(
			__dirname,
			[],
			{},
			{ RUSTBOLT_PROFILE: "TRACE" }
		);
		expect(exitCode).toBe(0);
		const dirname = findDefaultOutputDirname();
		expect(fs.existsSync(resolve(dirname, defaultTracePath))).toBeTruthy();
	});

	it("should store logging file when RUSTBOLT_PROFILE=LOGGING enabled", async () => {
		const { exitCode } = await run(
			__dirname,
			[],
			{},
			{ RUSTBOLT_PROFILE: "LOGGING" }
		);
		expect(exitCode).toBe(0);
		const dirname = findDefaultOutputDirname();
		expect(fs.existsSync(resolve(dirname, defaultLoggingPath))).toBeTruthy();
	});

	it("should filter trace event when use RUSTBOLT_PROFILE=[crate1,crate2]", async () => {
		const { exitCode } = await run(
			__dirname,
			[],
			{},
			{ RUSTBOLT_PROFILE: "[rustbolt_core]" }
		);
		expect(exitCode).toBe(0);
		const dirname = findDefaultOutputDirname();
		const trace = resolve(dirname, defaultTracePath);
		expect(fs.existsSync(trace)).toBeTruthy();
		const out: { cat?: string }[] = JSON.parse(fs.readFileSync(trace, "utf-8"));
		expect(
			out
				.filter(line => line.cat)
				.every(line => line.cat!.startsWith("rustbolt_core"))
		).toBe(true);
	});

	it("should be able to customize output path", async () => {
		const { exitCode } = await run(
			__dirname,
			[],
			{},
			{
				RUSTBOLT_PROFILE: `TRACE=output=${customTracePath}|JSCPU=output=${customJSCPUPath}|LOGGING=output=${customLoggingPath}`
			}
		);
		expect(exitCode).toBe(0);
		expect(fs.existsSync(resolve(__dirname, customTracePath))).toBeTruthy();
		expect(fs.existsSync(resolve(__dirname, customJSCPUPath))).toBeTruthy();
		expect(fs.existsSync(resolve(__dirname, customLoggingPath))).toBeTruthy();
	});

	it("should be able to use logger trace layer and default output should be stdout", async () => {
		const { exitCode, stdout } = await run(
			__dirname,
			[],
			{},
			{ RUSTBOLT_PROFILE: `TRACE=layer=logger&filter=rustbolt_core::compiler` }
		);
		expect(exitCode).toBe(0);
		expect(stdout.includes("rustbolt_core::compiler")).toBe(true);
	});
});
