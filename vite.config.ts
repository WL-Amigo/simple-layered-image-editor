import { defineConfig } from 'vite';
import { resolve as pathResolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueSvgPlugin from 'vite-plugin-vue-svg';
import { LicenseGeneratorPlugin } from './vite-plugins/LicenseGenerator';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': pathResolve(__dirname, '/src'),
    },
  },
  plugins: [
    vue(),
    vueSvgPlugin({
      defaultExport: 'component',
    }),
    LicenseGeneratorPlugin(),
  ],
});
