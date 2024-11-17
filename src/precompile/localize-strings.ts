import * as ts from "typescript";
import * as path from "path";
import dotenv from 'dotenv';
import OpenAI from 'openai';

import { addTranslationObjsAndSave, getStringLiteralArguments, isTextFunctionCall, loadTranslations, loadTsConfig } from "../framework/precompile/precompileUtil";
import { getOpenAiApiKey } from "../config";
import { isWhitespace } from "../framework/textUtil";

dotenv.config();

let translations: Record<string, Record<string, string>>;
let locales: Set<string> = new Set(["en", "es"]);

let openAiClient: OpenAI;

function isStringLiteralTranslated(literal: string): boolean {
  return Object.keys(translations).some(
    strId => {
      const strTranslationsObj = translations[strId];
      const locales = new Set(Object.keys(strTranslationsObj));
      return locales.has('en') && locales.has('es') && (strTranslationsObj['en'] == literal);
    }
  );
}

const relativeFilePathsToTranslateAllStringsFor = new Set<string>([
  'src/commands.ts',
]);
const absoluteFilePathsToTranslateAllStringsFor =
  new Set<string>(Array.from(relativeFilePathsToTranslateAllStringsFor).map(p => path.resolve(p).replace(/\\/g, '/')));

function isTranslatableString(str: string) {
  return (str.length > 0) && !isWhitespace(str);
}

function traverseNode(node: ts.Node, sourceFile: ts.SourceFile, stringsToTranslate: Set<string>) {
  if (ts.isImportDeclaration(node)) {
    return;
  }

  if (isTextFunctionCall(node, sourceFile)) {
    const callExpression = node as ts.CallExpression;
    const stringLiterals = getStringLiteralArguments(callExpression);

    for (const literal of stringLiterals) {
      const isTranslated = isStringLiteralTranslated(literal);

      if (!isTranslated && isTranslatableString(literal)) {
        stringsToTranslate.add(literal);
      }
    }
  } else if (ts.isStringLiteral(node)) {
    if (absoluteFilePathsToTranslateAllStringsFor.has(sourceFile.fileName)) {
      const literal = node.text;
      const isTranslated = isStringLiteralTranslated(literal);
  
      if (!isTranslated && isTranslatableString(literal)) {
        stringsToTranslate.add(literal);
      }
    } else {
      //console.log(`Skipping string literal "${node.text}" in file "${sourceFile.fileName}"`);
    }
  }

  const children: readonly ts.Node[] = node.getChildren(sourceFile);

  for (const child of children) {
    traverseNode(child, sourceFile, stringsToTranslate);
  }
}

async function translateStrings(stringsToTranslate: Set<string>): Promise<object[]> {
  const newTranslations: object[] = [];

  for (const literal of stringsToTranslate) {
    console.log(`Generating translations for: "${literal}"`);
    const translations = await autoTranslate(literal)
    newTranslations.push(translations);
    console.log(`Translations for "${literal}": ${JSON.stringify(translations)}`);
  }

  return newTranslations;
}

// Load and analyze source files
async function analyzeFiles(files: string[], compilerOptions: ts.CompilerOptions) {
  const program = ts.createProgram(files, compilerOptions);
  //const checker = program.getTypeChecker();

  const stringsToTranslate = new Set<string>();

  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      console.log(`Analyzing file: ${sourceFile.fileName}`);
      traverseNode(sourceFile, sourceFile, stringsToTranslate);
    }
  }

  // console.log(`Strings to translate: ${stringsToTranslate.size}`);
  // for (const str of stringsToTranslate) {
  //   console.log(`"${str}"`);
  // }

  const newTranslations = await translateStrings(stringsToTranslate);
  addTranslationObjsAndSave(path.resolve("src/strings.ts"), newTranslations);
}

async function autoTranslate(text: string) {
  ensureOpenAiClientInitialized();
  
  const escapedText = text.replace(/"/g, '\\"');

  const localizedStrObj = await attemptNTimes(3, async () => {
    const chatCompletion = await openAiClient.chat.completions.create({
      messages: [{
        role: 'user',
        content: `Please generate a JSON object (and nothing else) containing English and Spanish translations of the string "${escapedText}" in the following format:

                  \`\`\`
                  {
                    "en": "English translation here",
                    "es": "Spanish translation here"
                  }
                  \`\`\``
      }],
      model: 'gpt-4o'
    });

    const responseText = chatCompletion.choices[0].message.content;
    if (responseText === null) {
      throw new Error('Failed to get response from OpenAI ChatGPT.');
    }

    const jsonObj = extractJsonObjFromChatGptResponse(responseText);
    if (jsonObj === undefined) {
      throw new Error('Failed to extract JSON object string from OpenAI ChatGPT response.');
    }

    if (!jsonObj.hasOwnProperty('en') || !jsonObj.hasOwnProperty('es')) {
      throw new Error('OpenAI ChatGPT response does not contain the expected JSON object.');
    }

    return jsonObj;
  });

  return localizedStrObj;
}

function attemptNTimes<T>(n: number, fn: () => Promise<T>): Promise<T> {
  return fn().catch((err) => {
    if (n === 1) {
      throw err;
    }

    return attemptNTimes(n - 1, fn);
  });
}

function extractJsonObjFromChatGptResponse(responseText: string): object | undefined {
  const firstLeftCurlyBraceIndex = responseText.indexOf('{');
  if (firstLeftCurlyBraceIndex === -1) {
    return undefined;
  }

  const lastRightCurlyBraceIndex = responseText.lastIndexOf('}');
  if (lastRightCurlyBraceIndex === -1) {
    return undefined;
  }
  
  const jsonObjStr = responseText.substring(firstLeftCurlyBraceIndex, lastRightCurlyBraceIndex + 1);
  const jsonObj = JSON.parse(jsonObjStr);

  return jsonObj;
}

function ensureOpenAiClientInitialized() {
  if (!openAiClient) {
    const apiKey = getOpenAiApiKey();

    if (!apiKey) {
      throw new Error('OpenAI API key not found in environment variables.');
    }

    openAiClient = new OpenAI({
      apiKey: apiKey
    });
  }
}

// Main function
async function main() {
  console.log("Loading tsconfig.json...");
  const configPath = path.resolve("tsconfig.json");
  const parsedCommandLine = loadTsConfig(configPath);

  console.log("Loading translations...");
  const translationsFile = path.resolve("src/strings.ts");
  translations = loadTranslations(translationsFile);

  console.log("Analyzing files...");
  await analyzeFiles(parsedCommandLine.fileNames, parsedCommandLine.options);
}

await main();
