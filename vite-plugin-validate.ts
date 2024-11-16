import * as ts from 'typescript';
import { Plugin } from 'vite';

function vitePluginValidate(): Plugin {
  let tsConfigPath: string | undefined;
  let parsedConfig: ts.ParsedCommandLine;

  return {
    name: 'vite-plugin-validate',
    configResolved(config) {
      // Find the tsconfig.json path
      tsConfigPath = ts.findConfigFile(
        './',
        ts.sys.fileExists,
        'tsconfig.json'
      );
      if (!tsConfigPath) {
        throw new Error("Could not find 'tsconfig.json'.");
      }

      // Parse tsconfig.json
      const configFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile);
      if (configFile.error) {
        throw new Error(
          `Error reading tsconfig.json: ${ts.flattenDiagnosticMessageText(
            configFile.error.messageText,
            '\n'
          )}`
        );
      }
      parsedConfig = ts.parseJsonConfigFileContent(
        configFile.config,
        ts.sys,
        './'
      );
    },
    async buildStart() {
      // Create a program with all included files from tsconfig.json
      const program = ts.createProgram(
        parsedConfig.fileNames,
        parsedConfig.options
      );

      // Get diagnostics (errors/warnings)
      const diagnostics = [
        ...program.getGlobalDiagnostics(),
        ...program.getOptionsDiagnostics(),
        ...program.getSyntacticDiagnostics(),
        ...program.getSemanticDiagnostics(),
      ];

      // Output errors
      if (diagnostics.length > 0) {
        const formattedDiagnostics = diagnostics.map((diag) => {
          const message = ts.flattenDiagnosticMessageText(
            diag.messageText,
            '\n'
          );
          const filePath = diag.file
            ? `${diag.file.fileName} (${diag.start}): `
            : '';
          return `${filePath}${message}`;
        });

        // Output errors to the terminal
        console.error('\nTypeScript Validation Errors:\n');
        console.error(formattedDiagnostics.join('\n'));
      }
    },
  };
}

export default vitePluginValidate;
