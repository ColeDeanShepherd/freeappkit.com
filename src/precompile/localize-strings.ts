import * as ts from "typescript";
import * as path from "path";
import dotenv from 'dotenv';

import { getStringLiteralArguments, isTextFunctionCall, loadTranslations, loadTsConfig } from "../framework/precompile/precompileUtil";

dotenv.config();

//console.log(process.env.OPEN_AI_API_KEY);

let translations: Record<string, Record<string, string>>;

function isStringLiteralTranslated(literal: string): boolean {
  return Object.keys(translations).some(
    strId => {
      const strTranslationsObj = translations[strId];
      const locales = new Set(Object.keys(strTranslationsObj));
      return locales.has('en') && locales.has('es') && (strTranslationsObj['en'] == literal);
    }
  );
}

function traverseNode(node: ts.Node, sourceFile: ts.SourceFile) {
  if (isTextFunctionCall(node, sourceFile)) {
    const callExpression = node as ts.CallExpression;
    const stringLiterals = getStringLiteralArguments(callExpression);

    stringLiterals.forEach((literal) => {
      const isTranslated = isStringLiteralTranslated(literal);

      if (!isTranslated) {
        console.error(`Validation failed: "${literal}" is missing or lacks translations.`);
      }
    });
  }

  ts.forEachChild(node, (child) => traverseNode(child, sourceFile));
}

// Load and analyze source files
function analyzeFiles(files: string[], compilerOptions: ts.CompilerOptions) {
  const program = ts.createProgram(files, compilerOptions);
  const checker = program.getTypeChecker();

  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      //console.log(`Analyzing file: ${sourceFile.fileName}`);
      traverseNode(sourceFile, sourceFile);
    }
  }
}

// Main function
function main() {
  const configPath = path.resolve("tsconfig.json");
  const parsedCommandLine = loadTsConfig(configPath);

  const translationsFile = path.resolve("src/strings.ts");
  translations = loadTranslations(translationsFile);

  analyzeFiles(parsedCommandLine.fileNames, parsedCommandLine.options);
}

main();
