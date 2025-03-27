import fs from "node:fs";
import path from "node:path";
import {
	BuiltinPluginName,
	type JsHtmlPluginTag,
	type RawHtmlRustboltPluginOptions
} from "@rustbolt/binding";

import type { Compilation } from "../../Compilation";
import type { Compiler } from "../../Compiler";
import { create } from "../base";
import {
	type HtmlRustboltPluginHooks,
	cleanPluginHooks,
	getPluginHooks
} from "./hooks";
import {
	type HtmlRustboltPluginOptions,
	cleanPluginOptions,
	getPluginOptions,
	setPluginOptions,
	validateHtmlPluginOptions
} from "./options";

type HtmlPluginTag = {
	tagName: string;
	attributes: Record<string, string>;
	voidTag: boolean;
	innerHTML?: string;
	toString?: () => string;
};

const HtmlRustboltPluginImpl = create(
	BuiltinPluginName.HtmlRustboltPlugin,
	function (
		this: Compiler,
		c: HtmlRustboltPluginOptions = {}
	): RawHtmlRustboltPluginOptions {
		validateHtmlPluginOptions(c);
		const meta: Record<string, Record<string, string>> = {};
		for (const key in c.meta) {
			const value = c.meta[key];
			if (typeof value === "string") {
				meta[key] = {
					name: key,
					content: value
				};
			} else {
				meta[key] = {
					name: key,
					...value
				};
			}
		}
		const scriptLoading = c.scriptLoading ?? "defer";
		const configInject = c.inject ?? true;
		const inject =
			configInject === true
				? scriptLoading === "blocking"
					? "body"
					: "head"
				: configInject === false
					? "false"
					: configInject;
		const base = typeof c.base === "string" ? { href: c.base } : c.base;
		const chunksSortMode = c.chunksSortMode ?? "auto";

		let compilation: Compilation | null = null;
		this.hooks.compilation.tap("HtmlRustboltPlugin", compilationInstance => {
			compilation = compilationInstance;
			setPluginOptions(compilation, c);
		});
		this.hooks.done.tap("HtmlRustboltPlugin", stats => {
			cleanPluginHooks(stats.compilation);
			cleanPluginOptions(stats.compilation);
		});

		function generateRenderData(data: string): Record<string, unknown> {
			const json = JSON.parse(data);
			if (typeof c.templateParameters !== "function") {
				json.compilation = compilation;
			}
			const renderTag = function (this: HtmlPluginTag) {
				return htmlTagObjectToString(this);
			};
			const renderTagList = function (this: HtmlPluginTag[]) {
				return this.join("");
			};
			if (Array.isArray(json.htmlRustboltPlugin?.tags?.headTags)) {
				for (const tag of json.htmlRustboltPlugin.tags.headTags) {
					tag.toString = renderTag;
				}
				json.htmlRustboltPlugin.tags.headTags.toString = renderTagList;
			}
			if (Array.isArray(json.htmlRustboltPlugin?.tags?.bodyTags)) {
				for (const tag of json.htmlRustboltPlugin.tags.bodyTags) {
					tag.toString = renderTag;
				}
				json.htmlRustboltPlugin.tags.bodyTags.toString = renderTagList;
			}
			return json;
		}

		let templateContent = c.templateContent;
		let templateFn = undefined;
		if (typeof templateContent === "function") {
			templateFn = async (data: string) => {
				try {
					const renderer = c.templateContent as (
						data: Record<string, unknown>
					) => Promise<string> | string;
					if (c.templateParameters === false) {
						return await renderer({});
					}
					return await renderer(generateRenderData(data));
				} catch (e) {
					const error = new Error(
						`HtmlRustboltPlugin: render template function failed, ${(e as Error).message}`
					);
					error.stack = (e as Error).stack;
					throw error;
				}
			};
			templateContent = "";
		} else if (c.template) {
			const filename = c.template.split("?")[0];
			if ([".js", ".cjs"].includes(path.extname(filename))) {
				templateFn = async (data: string) => {
					const context = this.options.context || process.cwd();
					const templateFilePath = path.resolve(context, filename);
					if (!fs.existsSync(templateFilePath)) {
						throw new Error(
							`HtmlRustboltPlugin: could not load file \`${filename}\` from \`${context}\``
						);
					}
					try {
						const renderer = require(templateFilePath) as (
							data: Record<string, unknown>
						) => Promise<string> | string;
						if (c.templateParameters === false) {
							return await renderer({});
						}
						return await renderer(generateRenderData(data));
					} catch (e) {
						const error = new Error(
							`HtmlRustboltPlugin: render template function failed, ${(e as Error).message}`
						);
						error.stack = (e as Error).stack;
						throw error;
					}
				};
			}
		}

		const rawTemplateParameters = c.templateParameters;
		let templateParameters:
			| boolean
			| Record<string, any>
			| ((params: string) => Promise<string>)
			| undefined;
		if (typeof rawTemplateParameters === "function") {
			templateParameters = async (data: string) => {
				const newData = await rawTemplateParameters(JSON.parse(data));
				return JSON.stringify(newData);
			};
		} else {
			templateParameters = rawTemplateParameters;
		}

		let filenames: Set<string> | undefined = undefined;
		if (typeof c.filename === "string") {
			filenames = new Set();
			if (c.filename.includes("[name]")) {
				if (typeof this.options.entry === "object") {
					for (const entryName of Object.keys(this.options.entry)) {
						filenames.add(c.filename.replace(/\[name\]/g, entryName));
					}
				} else {
					throw new Error(
						"HtmlRustboltPlugin: filename with `[name]` does not support function entry"
					);
				}
			} else {
				filenames.add(c.filename);
			}
		} else if (typeof c.filename === "function") {
			filenames = new Set();
			if (typeof this.options.entry === "object") {
				for (const entryName of Object.keys(this.options.entry)) {
					filenames.add(c.filename(entryName));
				}
			} else {
				throw new Error(
					"HtmlRustboltPlugin: function filename does not support function entry"
				);
			}
		}

		return {
			filename: filenames ? Array.from(filenames) : undefined,
			template: c.template,
			hash: c.hash,
			title: c.title,
			favicon: c.favicon,
			publicPath: c.publicPath,
			chunks: c.chunks,
			excludeChunks: c.excludeChunks,
			chunksSortMode,
			sri: c.sri,
			minify: c.minify,
			meta,
			scriptLoading,
			inject,
			base,
			templateFn,
			templateContent,
			templateParameters
		};
	}
);

function htmlTagObjectToString(tag: {
	tagName: string;
	attributes: Record<string, string>;
	voidTag: boolean;
	innerHTML?: string;
}) {
	const attributes = Object.keys(tag.attributes || {})
		.filter(
			attributeName =>
				tag.attributes[attributeName] === "" || tag.attributes[attributeName]
		)
		.map(attributeName => {
			if (tag.attributes[attributeName] === "true") {
				return attributeName;
			}
			return `${attributeName}="${tag.attributes[attributeName]}"`;
		});
	const res = `<${[tag.tagName].concat(attributes).join(" ")}${tag.voidTag && !tag.innerHTML ? "/" : ""}>${tag.innerHTML || ""}${tag.voidTag && !tag.innerHTML ? "" : `</${tag.tagName}>`}`;
	return res;
}

const HtmlRustboltPlugin =
	HtmlRustboltPluginImpl as typeof HtmlRustboltPluginImpl & {
		/**
		 * @deprecated Use `getCompilationHooks` instead.
		 */
		getHooks: (compilation: Compilation) => HtmlRustboltPluginHooks;
		getCompilationHooks: (compilation: Compilation) => HtmlRustboltPluginHooks;
		getCompilationOptions: (
			compilation: Compilation
		) => HtmlRustboltPluginOptions | void;
		createHtmlTagObject: (
			tagName: string,
			attributes?: Record<string, string | boolean>,
			innerHTML?: string | undefined
		) => JsHtmlPluginTag;
		version: number;
	};

const voidTags = [
	"area",
	"base",
	"br",
	"col",
	"embed",
	"hr",
	"img",
	"input",
	"keygen",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr"
];

HtmlRustboltPlugin.createHtmlTagObject = (
	tagName: string,
	attributes?: Record<string, string | boolean>,
	innerHTML?: string | undefined
): JsHtmlPluginTag => {
	return {
		tagName,
		voidTag: voidTags.includes(tagName),
		attributes: attributes || {},
		innerHTML
	};
};

HtmlRustboltPlugin.getCompilationOptions = getPluginOptions;
HtmlRustboltPlugin.getHooks = HtmlRustboltPlugin.getCompilationHooks =
	getPluginHooks;
HtmlRustboltPlugin.version = 5;

export { HtmlRustboltPlugin };
