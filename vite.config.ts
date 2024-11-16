import { defineConfig } from 'vite';
import vitePluginValidate from './vite-plugin-validate';

export default defineConfig({
  plugins: [vitePluginValidate()],
});
