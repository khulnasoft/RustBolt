import type { DevServer } from "@rustbolt/core";
import type { Colorette } from "colorette";

import type { RustboltCLI } from "./cli";
export type { Configuration } from "@rustbolt/core";

export interface IRustboltCLI {
	runRustbolt(): Promise<void>;
}
export type LogHandler = (value: any) => void;
export interface RustboltCLIColors extends Colorette {
	isColorSupported: boolean;
}
export interface RustboltCLILogger {
	error: LogHandler;
	warn: LogHandler;
	info: LogHandler;
	success: LogHandler;
	log: LogHandler;
	raw: LogHandler;
}

export interface RustboltCLIOptions {
	config?: string;
	argv?: Record<string, any>;
	configName?: string[];
	configLoader?: string;
	nodeEnv?: string;
}

export interface RustboltBuildCLIOptions extends RustboltCLIOptions {
	entry?: string[];
	devtool?: boolean;
	mode?: string;
	watch?: boolean;
	analyze?: boolean;
	profile?: boolean;
	env?: Record<string, any>;
	outputPath?: string;
}

export interface RustboltPreviewCLIOptions extends RustboltCLIOptions {
	dir?: string;
	port?: number;
	host?: string;
	open?: boolean;
	server?: string;
	publicPath?: string;
}
export interface RustboltCommand {
	apply(cli: RustboltCLI): Promise<void>;
}
export type RustboltDevServerOptions = DevServer;
