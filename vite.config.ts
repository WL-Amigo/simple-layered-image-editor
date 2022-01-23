import { defineConfig } from 'vite';
import { resolve as pathResolve } from 'path';
import { LicenseGeneratorPlugin } from './vite-plugins/LicenseGenerator';
import WindiCSS from 'vite-plugin-windicss';
import Solid from 'vite-plugin-solid';
import Icon from 'unplugin-icons/vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': pathResolve(__dirname, '/src'),
    },
  },
  plugins: [Solid(), WindiCSS(), Icon({ compiler: 'solid' }), LicenseGeneratorPlugin()],
});
