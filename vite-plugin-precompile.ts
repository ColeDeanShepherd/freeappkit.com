import * as ts from 'typescript';
import { Plugin } from 'vite';

function vitePluginPrecompile(): Plugin {
  return {
    name: 'vite-plugin-precompile',
    async transform(code, id) {
      // Only process TypeScript files
      if (!id.endsWith('.ts') && !id.endsWith('.tsx')) {
        return null;
      }

      // Use TypeScript Compiler API to transform the code
      const result = ts.transpileModule(code, {
        compilerOptions: {
          target: ts.ScriptTarget.ESNext,
          module: ts.ModuleKind.ESNext,
        },
      });

      // Return the transformed code
      return {
        code: result.outputText,
        map: result.sourceMapText || null,
      };
    },
  };
}

export default vitePluginPrecompile;
