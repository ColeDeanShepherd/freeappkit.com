import * as ts from "typescript";
import * as fs from "fs";
import * as path from "path";

let translations: Record<string, Record<string, string>>;

// Load the tsconfig.json file
function loadTsConfig(configPath: string): ts.ParsedCommandLine {
  const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
  if (configFile.error) {
    throw new Error(
      `Error reading tsconfig.json: ${configFile.error.messageText}`
    );
  }

  const parsedCommandLine = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(configPath)
  );

  if (parsedCommandLine.errors.length > 0) {
    throw new Error(
      `Error parsing tsconfig.json: ${parsedCommandLine.errors
        .map((e) => e.messageText)
        .join(", ")}`
    );
  }

  return parsedCommandLine;
}

// Load and parse strings.ts
function loadTranslations(filePath: string): Record<string, Record<string, string>> {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);
  let translations: Record<string, Record<string, string>> = {};

  function traverseNode(node: ts.Node) {
      if (ts.isVariableDeclaration(node) && node.name.getText() === "strings") {
          const initializer = node.initializer;
          if (initializer && ts.isObjectLiteralExpression(initializer)) {
              translations = extractTranslations(initializer);
          }
      }
      ts.forEachChild(node, traverseNode);
  }

  function extractTranslations(objectLiteral: ts.ObjectLiteralExpression): Record<string, Record<string, string>> {
      const result: Record<string, Record<string, string>> = {};
      objectLiteral.properties.forEach((prop) => {
          if (ts.isPropertyAssignment(prop) && ts.isObjectLiteralExpression(prop.initializer)) {
              const key = prop.name.getText().replace(/["']/g, "");
              result[key] = {};
              prop.initializer.properties.forEach((innerProp) => {
                  if (ts.isPropertyAssignment(innerProp) && ts.isStringLiteral(innerProp.initializer)) {
                      const lang = innerProp.name.getText().replace(/["']/g, "");
                      result[key][lang] = innerProp.initializer.text;
                  }
              });
          }
      });
      return result;
  }

  traverseNode(sourceFile);
  return translations;
}

function isTextFunctionCall(node: ts.Node, sourceFile: ts.SourceFile): boolean {
  // Check if the node is a CallExpression and the function name is 'text'
  if (ts.isCallExpression(node)) {
      const functionName = node.expression.getText(sourceFile);
      return functionName === "text";
  }
  return false;
}

function getStringLiteralArguments(node: ts.CallExpression): string[] {
  // Extract and return all string literal arguments
  return node.arguments
      .filter(ts.isStringLiteral)
      .map((arg) => arg.text);
}

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
