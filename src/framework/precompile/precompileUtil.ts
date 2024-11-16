import * as ts from "typescript";
import * as fs from "fs";
import * as path from "path";

export function loadTsConfig(configPath: string): ts.ParsedCommandLine {
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

export function loadTranslations(filePath: string): Record<string, Record<string, string>> {
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

export function isTextFunctionCall(node: ts.Node, sourceFile: ts.SourceFile): boolean {
  // Check if the node is a CallExpression and the function name is 'text'
  if (ts.isCallExpression(node)) {
    const functionName = node.expression.getText(sourceFile);
    return functionName === "text";
  }
  return false;
}

export function getStringLiteralArguments(node: ts.CallExpression): string[] {
  // Extract and return all string literal arguments
  return node.arguments
    .filter(ts.isStringLiteral)
    .map((arg) => arg.text);
}