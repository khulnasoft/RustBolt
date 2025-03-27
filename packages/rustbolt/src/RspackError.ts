import type * as binding from "@rustbolt/binding";
import { concatErrorMsgAndStack } from "./util";

export type RustboltError = binding.JsRustboltError;

export class JsRustboltDiagnostic {
	static __to_binding(
		error: Error | RustboltError,
		severity: binding.JsRustboltSeverity
	): binding.JsRustboltDiagnostic {
		return {
			error: concatErrorMsgAndStack(error),
			severity
		};
	}
}

export class NonErrorEmittedError extends Error {
	constructor(error: Error) {
		super();
		this.name = "NonErrorEmittedError";
		this.message = `(Emitted value instead of an instance of Error) ${error}`;
	}
}
