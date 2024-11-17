import * as ts from "typescript";
import * as path from "path";
import dotenv from 'dotenv';
import OpenAI from 'openai';

import { addTranslationObjsAndSave, getStringLiteralArguments, isTextFunctionCall, loadTranslations, loadTsConfig } from "../framework/precompile/precompileUtil";
import { getOpenAiApiKey } from "../config";

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

async function traverseNode(node: ts.Node, sourceFile: ts.SourceFile, newTranslations: object[]) {
  if (isTextFunctionCall(node, sourceFile)) {
    const callExpression = node as ts.CallExpression;
    const stringLiterals = getStringLiteralArguments(callExpression);

    for (const literal of stringLiterals) {
      const isTranslated = isStringLiteralTranslated(literal);

      if (!isTranslated) {
        console.log(`Generating translations for: "${literal}"`);
        const translations = await autoTranslate(literal)
        newTranslations.push(translations);
        console.log(`Translations for "${literal}": ${JSON.stringify(translations)}`);

        //console.error(`Validation failed: "${literal}" is missing or lacks translations.`);
      }
    }
  }

  const children: readonly ts.Node[] = node.getChildren(sourceFile);

  for (const child of children) {
    await traverseNode(child, sourceFile, newTranslations);
  }
}

// Load and analyze source files
async function analyzeFiles(files: string[], compilerOptions: ts.CompilerOptions) {
  const program = ts.createProgram(files, compilerOptions);
  //const checker = program.getTypeChecker();

  const newTranslations: object[] = [];

  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      //console.log(`Analyzing file: ${sourceFile.fileName}`);
      await traverseNode(sourceFile, sourceFile, newTranslations);
    }
  }

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
  const configPath = path.resolve("tsconfig.json");
  const parsedCommandLine = loadTsConfig(configPath);

  const translationsFile = path.resolve("src/strings.ts");
  translations = loadTranslations(translationsFile);

  await analyzeFiles(parsedCommandLine.fileNames, parsedCommandLine.options);
}

await main();
