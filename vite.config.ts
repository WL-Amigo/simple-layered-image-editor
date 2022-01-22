import { defineConfig } from 'vite';
import { resolve as pathResolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueSvgPlugin from 'vite-plugin-vue-svg';
import { LicenseGeneratorPlugin } from './vite-plugins/LicenseGenerator';
import WindiCSS from 'vite-plugin-windicss';

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
    WindiCSS(),
    LicenseGeneratorPlugin(),
  ],
});
