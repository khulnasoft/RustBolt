import { normalizeDiff } from "./expect/diff";
import { normalizeDignostics, normalizeError } from "./expect/error";
import { normalizePlaceholder } from "./expect/placeholder";
import { normalizeStats } from "./expect/rustbolt";
import { toBeTypeOf } from "./expect/to-be-typeof";
import { toEndWith } from "./expect/to-end-with";
import { toMatchFileSnapshot } from "./expect/to-match-file-snapshot";

expect.extend({
	// CHANGE: new test matcher for `rustbolt-test-tools`
	// @ts-ignore
	toMatchFileSnapshot,
	toBeTypeOf,
	toEndWith
});

expect.addSnapshotSerializer({
	test(received) {
		return typeof received === "string";
	},
	print(received) {
		return normalizePlaceholder((received as string).trim());
	}
});

// for diff
expect.addSnapshotSerializer({
	test(received) {
		return received?.constructor?.name === "RustboltTestDiff";
	},
	print(received, next) {
		return next(normalizeDiff(received as { value: string }));
	}
});

// for errors
expect.addSnapshotSerializer({
	test(received) {
		return received?.constructor?.name === "RustboltStatsDiagnostics";
	},
	print(received, next) {
		return next(
			normalizeDignostics(received as { errors: Error[]; warnings: Error[] })
		);
	}
});

expect.addSnapshotSerializer({
	test(received) {
		return typeof received?.message === "string";
	},
	print(received, next) {
		return next(normalizeError(received as Error));
	}
});

// for stats
expect.addSnapshotSerializer({
	test(received) {
		return received?.constructor?.name === "RustboltStats";
	},
	print(received, next) {
		return next(normalizeStats(received as { value: string }));
	}
});
