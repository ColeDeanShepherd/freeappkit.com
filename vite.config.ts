import { defineConfig } from 'vite';
import vitePluginPrecompile from './vite-plugin-precompile';

export default defineConfig({
  plugins: [vitePluginPrecompile()],
});
