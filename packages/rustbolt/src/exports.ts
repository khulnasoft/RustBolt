import {
	version as _version,
	webpackVersion as _webpackVersion
	// @ts-ignore 'package.json' is not under 'rootDir'
} from "../package.json";

// this is a hack to be compatible with plugin which detect webpack's version
const rustboltVersion = _version as string;
const version = _webpackVersion as string;

export { rustboltVersion, version };

export type {
	Asset,
	AssetInfo,
	Assets,
	CompilationParams,
	LogEntry
} from "./Compilation";
export { Compilation } from "./Compilation";
export { Compiler } from "./Compiler";
export type {
	MultiCompilerOptions,
	MultiRustboltOptions
} from "./MultiCompiler";
export { MultiCompiler } from "./MultiCompiler";

import { RustboltOptionsApply } from "./rustboltOptionsApply";
export { RustboltOptionsApply, RustboltOptionsApply as WebpackOptionsApply };

export type { Chunk } from "./Chunk";
export type { ChunkGroup } from "./ChunkGroup";
export type { Module, ResolveData, ResourceDataWithData } from "./Module";
export { MultiStats } from "./MultiStats";
export { NormalModule } from "./NormalModule";
export { ContextModule } from "./ContextModule";
export { ConcatenatedModule } from "./ConcatenatedModule";
export { ExternalModule } from "./ExternalModule";
export type { NormalModuleFactory } from "./NormalModuleFactory";
export { RuntimeGlobals } from "./RuntimeGlobals";
export type {
	StatsAsset,
	StatsChunk,
	StatsCompilation,
	StatsError,
	StatsModule
} from "./Stats";
export { Stats } from "./Stats";
export { RuntimeModule } from "./RuntimeModule";
export {
	EntryDependency,
	Dependency,
	AsyncDependenciesBlock
} from "@rustbolt/binding";

// API extractor not working with some re-exports, see: https://github.com/microsoft/fluentui/issues/20694
import * as ModuleFilenameHelpers from "./lib/ModuleFilenameHelpers";
export { ModuleFilenameHelpers };

// API extractor not working with some re-exports, see: https://github.com/microsoft/fluentui/issues/20694
export { Template } from "./Template";

export const WebpackError = Error;

export type { Watching } from "./Watching";

import sources = require("webpack-sources");

export { sources };

import {
	applyRustboltOptionsDefaults,
	getNormalizedRustboltOptions
} from "./config";

// Explicitly define this type to avoid type inference and type expansion.
type Config = {
	getNormalizedRustboltOptions: typeof getNormalizedRustboltOptions;
	applyRustboltOptionsDefaults: typeof applyRustboltOptionsDefaults;
	getNormalizedWebpackOptions: typeof getNormalizedRustboltOptions;
	applyWebpackOptionsDefaults: typeof applyRustboltOptionsDefaults;
};
export const config: Config = {
	getNormalizedRustboltOptions,
	applyRustboltOptionsDefaults,
	getNormalizedWebpackOptions: getNormalizedRustboltOptions,
	applyWebpackOptionsDefaults: applyRustboltOptionsDefaults
};

export type * from "./config";

import { ValidationError } from "./util/validate";

export { ValidationError };

import { cachedCleverMerge as cleverMerge } from "./util/cleverMerge";
import { createHash } from "./util/createHash";

export const util = { createHash, cleverMerge };

export { default as EntryOptionPlugin } from "./lib/EntryOptionPlugin";
export type { OutputFileSystem } from "./util/fs";

///// Internal Plugins /////
export type { BannerPluginArgument } from "./builtin-plugin";
export type { ProvidePluginOptions } from "./builtin-plugin";
export type { DefinePluginOptions } from "./builtin-plugin";
export type { ProgressPluginArgument } from "./builtin-plugin";
export type { EntryOptions } from "./builtin-plugin";
export { BannerPlugin } from "./builtin-plugin";
export { IgnorePlugin, type IgnorePluginOptions } from "./builtin-plugin";
export { ProvidePlugin } from "./builtin-plugin";
export { DefinePlugin } from "./builtin-plugin";
export { ProgressPlugin } from "./builtin-plugin";
export { EntryPlugin } from "./builtin-plugin";
export { DynamicEntryPlugin } from "./builtin-plugin";
export { ExternalsPlugin } from "./builtin-plugin";
export { HotModuleReplacementPlugin } from "./builtin-plugin";
export { NoEmitOnErrorsPlugin } from "./builtin-plugin";
export { WarnCaseSensitiveModulesPlugin } from "./builtin-plugin";
export { RuntimePlugin } from "./builtin-plugin";
export { DllPlugin, type DllPluginOptions } from "./lib/DllPlugin";
export {
	DllReferencePlugin,
	type DllReferencePluginOptions,
	type DllReferencePluginOptionsSourceType,
	type DllReferencePluginOptionsContent,
	type DllReferencePluginOptionsManifest
} from "./lib/DllReferencePlugin";
export { EnvironmentPlugin } from "./lib/EnvironmentPlugin";
export { LoaderOptionsPlugin } from "./lib/LoaderOptionsPlugin";
export { LoaderTargetPlugin } from "./lib/LoaderTargetPlugin";
export { NormalModuleReplacementPlugin } from "./lib/NormalModuleReplacementPlugin";

import {
	FetchCompileAsyncWasmPlugin,
	SubresourceIntegrityPlugin,
	lazyCompilationMiddleware
} from "./builtin-plugin";
interface Web {
	FetchCompileAsyncWasmPlugin: typeof FetchCompileAsyncWasmPlugin;
}

export const web: Web = {
	FetchCompileAsyncWasmPlugin
};

import { NodeTargetPlugin } from "./builtin-plugin";
import NodeEnvironmentPlugin from "./node/NodeEnvironmentPlugin";
import NodeTemplatePlugin from "./node/NodeTemplatePlugin";

interface Node {
	NodeTargetPlugin: typeof NodeTargetPlugin;
	NodeTemplatePlugin: typeof NodeTemplatePlugin;
	NodeEnvironmentPlugin: typeof NodeEnvironmentPlugin;
}

export const node: Node = {
	NodeTargetPlugin,
	NodeTemplatePlugin,
	NodeEnvironmentPlugin
};

import { ElectronTargetPlugin } from "./builtin-plugin";

interface Electron {
	ElectronTargetPlugin: typeof ElectronTargetPlugin;
}

export const electron: Electron = { ElectronTargetPlugin };

import { EnableLibraryPlugin } from "./builtin-plugin";

interface Library {
	EnableLibraryPlugin: typeof EnableLibraryPlugin;
}

export const library: Library = { EnableLibraryPlugin };

import { EnableWasmLoadingPlugin } from "./builtin-plugin";

interface Wasm {
	EnableWasmLoadingPlugin: typeof EnableWasmLoadingPlugin;
}

export const wasm: Wasm = { EnableWasmLoadingPlugin };

import {
	EnableChunkLoadingPlugin,
	JavascriptModulesPlugin
} from "./builtin-plugin";

interface JavaScript {
	EnableChunkLoadingPlugin: typeof EnableChunkLoadingPlugin;
	JavascriptModulesPlugin: typeof JavascriptModulesPlugin;
}

export const javascript: JavaScript = {
	EnableChunkLoadingPlugin,
	JavascriptModulesPlugin
};

import { WebWorkerTemplatePlugin } from "./builtin-plugin";

interface Webworker {
	WebWorkerTemplatePlugin: typeof WebWorkerTemplatePlugin;
}

export const webworker: Webworker = { WebWorkerTemplatePlugin };

import { LimitChunkCountPlugin } from "./builtin-plugin";
import { RuntimeChunkPlugin } from "./builtin-plugin";
import { SplitChunksPlugin } from "./builtin-plugin";
import { RemoveDuplicateModulesPlugin } from "./builtin-plugin";
import { RsdoctorPlugin } from "./builtin-plugin";

interface Optimize {
	LimitChunkCountPlugin: typeof LimitChunkCountPlugin;
	RuntimeChunkPlugin: typeof RuntimeChunkPlugin;
	SplitChunksPlugin: typeof SplitChunksPlugin;
}

export const optimize: Optimize = {
	LimitChunkCountPlugin,
	RuntimeChunkPlugin,
	SplitChunksPlugin
};

import { ModuleFederationPlugin } from "./container/ModuleFederationPlugin";

export type { ModuleFederationPluginOptions } from "./container/ModuleFederationPlugin";
import { ModuleFederationPluginV1 } from "./container/ModuleFederationPluginV1";

export type { ModuleFederationPluginV1Options } from "./container/ModuleFederationPluginV1";
import { ContainerPlugin } from "./container/ContainerPlugin";
import { ContainerReferencePlugin } from "./container/ContainerReferencePlugin";

export type {
	ContainerPluginOptions,
	Exposes,
	ExposesConfig,
	ExposesItem,
	ExposesItems,
	ExposesObject
} from "./container/ContainerPlugin";
export type {
	ContainerReferencePluginOptions,
	Remotes,
	RemotesConfig,
	RemotesItem,
	RemotesItems,
	RemotesObject
} from "./container/ContainerReferencePlugin";
export const container = {
	ContainerPlugin,
	ContainerReferencePlugin,
	ModuleFederationPlugin,
	ModuleFederationPluginV1
};

import { ConsumeSharedPlugin } from "./sharing/ConsumeSharedPlugin";
import { ProvideSharedPlugin } from "./sharing/ProvideSharedPlugin";
import { SharePlugin } from "./sharing/SharePlugin";

export type {
	Consumes,
	ConsumesConfig,
	ConsumeSharedPluginOptions,
	ConsumesItem,
	ConsumesObject
} from "./sharing/ConsumeSharedPlugin";
export type {
	Provides,
	ProvidesConfig,
	ProvideSharedPluginOptions,
	ProvidesItem,
	ProvidesObject
} from "./sharing/ProvideSharedPlugin";
export type {
	Shared,
	SharedConfig,
	SharedItem,
	SharedObject,
	SharePluginOptions
} from "./sharing/SharePlugin";
export const sharing = {
	ProvideSharedPlugin,
	ConsumeSharedPlugin,
	SharePlugin
};

///// Rustbolt Postfixed Internal Plugins /////
export type { RsdoctorPluginData, RsdoctorPluginHooks } from "./builtin-plugin";
export type { HtmlRustboltPluginOptions } from "./builtin-plugin";
export type { SwcJsMinimizerRustboltPluginOptions } from "./builtin-plugin";
export type { LightningCssMinimizerRustboltPluginOptions } from "./builtin-plugin";
export type { CircularDependencyRustboltPluginOptions } from "./builtin-plugin";
export type { CopyRustboltPluginOptions } from "./builtin-plugin";
export type { SourceMapDevToolPluginOptions } from "./builtin-plugin";
export type { EvalDevToolModulePluginOptions } from "./builtin-plugin";
export type {
	CssExtractRustboltLoaderOptions,
	CssExtractRustboltPluginOptions
} from "./builtin-plugin";
export { HtmlRustboltPlugin } from "./builtin-plugin";
export { SwcJsMinimizerRustboltPlugin } from "./builtin-plugin";
export { LightningCssMinimizerRustboltPlugin } from "./builtin-plugin";
export { CircularDependencyRustboltPlugin } from "./builtin-plugin";
export { CopyRustboltPlugin } from "./builtin-plugin";
export { SourceMapDevToolPlugin } from "./builtin-plugin";
export { EvalSourceMapDevToolPlugin } from "./builtin-plugin";
export { EvalDevToolModulePlugin } from "./builtin-plugin";
export { CssExtractRustboltPlugin } from "./builtin-plugin";
export { ContextReplacementPlugin } from "./builtin-plugin";

///// Rustbolt Postfixed Internal Loaders /////
export type {
	SwcLoaderEnvConfig,
	SwcLoaderEsParserConfig,
	SwcLoaderJscConfig,
	SwcLoaderModuleConfig,
	SwcLoaderOptions,
	SwcLoaderParserConfig,
	SwcLoaderTransformConfig,
	SwcLoaderTsParserConfig
} from "./builtin-loader/swc/index";

export type {
	LoaderOptions as LightningcssLoaderOptions,
	FeatureOptions as LightningcssFeatureOptions
} from "./builtin-loader/lightningcss/index";

export type { SubresourceIntegrityPluginOptions } from "./builtin-plugin";

///// Experiments Stuff /////
import { cleanupGlobalTrace, registerGlobalTrace } from "@rustbolt/binding";

interface Experiments {
	globalTrace: {
		register: (
			filter: string,
			layer: "chrome" | "logger" | "otel",
			output: string
		) => Promise<void>;
		cleanup: () => Promise<void>;
	};
	RemoveDuplicateModulesPlugin: typeof RemoveDuplicateModulesPlugin;
	RsdoctorPlugin: typeof RsdoctorPlugin;
	SubresourceIntegrityPlugin: typeof SubresourceIntegrityPlugin;
	lazyCompilationMiddleware: typeof lazyCompilationMiddleware;
}

export const experiments: Experiments = {
	globalTrace: {
		async register(filter, layer, output) {
			registerGlobalTrace(filter, layer, output);
			if (layer === "otel") {
				try {
					const { initOpenTelemetry } = await import("@rustbolt/tracing");
					await initOpenTelemetry();
				} catch (error) {
					console.error(
						"Failed to import `@rustbolt/tracing` package. Please install `@rustbolt/tracing` to enable OpenTelemetry tracing.",
						error
					);
				}
			}
		},
		async cleanup() {
			cleanupGlobalTrace();
			try {
				const { shutdownOpenTelemetry } = await import("@rustbolt/tracing");
				await shutdownOpenTelemetry();
			} catch (error) {
				// ignore cleanup tracing error
			}
		}
	},
	RemoveDuplicateModulesPlugin,
	/**
	 * Note: This plugin is unstable yet
	 *
	 * @internal
	 */
	RsdoctorPlugin,
	SubresourceIntegrityPlugin,
	lazyCompilationMiddleware
};
