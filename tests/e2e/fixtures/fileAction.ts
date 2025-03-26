import path from "node:path";
import fs from "fs-extra";
import type { Fixtures } from "@playwright/test";
import type { RustboltFixtures } from "./rustbolt";

type FileAction = {
	updateFile(relativePath: string, fn: (content: string) => string): void;
	deleteFile(relativePath: string): void;
};

type FileActionFixtures = {
	fileAction: FileAction;
};

export const fileActionFixtures: Fixtures<
	FileActionFixtures,
	{},
	RustboltFixtures
> = {
	fileAction: async ({ rustbolt }, use) => {
		// null means this file needs to be deleted
		const fileOriginContent: Record<string, string | null> = {};

		await use({
			updateFile(relativePath, fn) {
				const filePath = path.resolve(rustbolt.projectDir, relativePath);
				const fileExists = fs.existsSync(filePath);
				const content = fileExists ? fs.readFileSync(filePath).toString() : "";

				if (fileOriginContent[filePath] === undefined) {
					fileOriginContent[filePath] = fileExists ? content : null;
				}

				fs.writeFileSync(filePath, fn(content));
			},
			deleteFile(relativePath) {
				const filePath = path.resolve(rustbolt.projectDir, relativePath);
				const fileExists = fs.existsSync(filePath);
				if (!fileExists) {
					return;
				}

				if (fileOriginContent[filePath] === undefined) {
					fileOriginContent[filePath] = fs.readFileSync(filePath).toString();
				}

				fs.unlinkSync(filePath);
			}
		});

		for (const [filePath, content] of Object.entries(fileOriginContent)) {
			if (content === null) {
				fs.unlinkSync(filePath);
			} else {
				fs.writeFileSync(filePath, content);
			}
		}
		if (Object.keys(fileOriginContent).length) {
			// has recovery file
			await rustbolt.waitingForBuild();
		}
	}
};
