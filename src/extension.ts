import * as vscode from 'vscode';

let importLadderOutputChannel: vscode.OutputChannel;

export function activate(context: vscode.ExtensionContext) {
	importLadderOutputChannel = vscode.window.createOutputChannel("Import Ladder");
	importLadderOutputChannel.appendLine("Import Ladder extension activated");

	const ladderDisposable = vscode.commands.registerCommand('importladder.ladder', () => {
		collectAndSortImports(importLadderOutputChannel);
	});

	context.subscriptions.push(ladderDisposable);
}

function collectAndSortImports(outputChannel: vscode.OutputChannel) {
	try {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			throw new Error("No active editor found");
		}

		const document = editor.document;
		const importLines: string[] = [];
		let importBlockStart = -1;
		let importBlockEnd = -1;
		let emptyLinesAfterImports = 0;

		for (let i = 0; i < document.lineCount; i++) {
			const line = document.lineAt(i).text;
			if (line.trim().startsWith('import')) {
				if (importBlockStart === -1) {
					importBlockStart = i;
				}
				importBlockEnd = i;
				emptyLinesAfterImports = 0;
			} else if (importBlockStart !== -1) {
				if (line.trim() === '') {
					emptyLinesAfterImports++;
				} else {
					break;
				}
			}
		}

		if (importBlockStart === -1) {
			throw new Error("No import statements found");
		}

		for (let i = importBlockStart; i <= importBlockEnd; i++) {
			importLines.push(document.lineAt(i).text);
		}

		const uniqueImports = Array.from(new Set(importLines));
		const sortedImports = uniqueImports.sort((a, b) => a.trim().length - b.trim().length);
		const formattedImports = sortedImports.join('\n') + '\n'.repeat(emptyLinesAfterImports);

		const startPos = new vscode.Position(importBlockStart, 0);
		const endPos = new vscode.Position(importBlockEnd + emptyLinesAfterImports + 1, 0);
		const importRange = new vscode.Range(startPos, endPos);

		return editor.edit(editBuilder => {
			editBuilder.replace(importRange, formattedImports);
		}).then(success => {
			if (success) {
				vscode.window.showInformationMessage("Imports collected and sorted successfully!");
				outputChannel.appendLine("Collection and sorting completed");
			} else {
				throw new Error("Failed to apply edit");
			}
		});
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		outputChannel.appendLine(`Error: ${errorMessage}`);
		vscode.window.showErrorMessage(`Import collection and sorting failed: ${errorMessage}`);
		return Promise.reject(error);
	}
}

export function deactivate() {}
