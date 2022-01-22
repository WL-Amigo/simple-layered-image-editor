import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  darkMode: 'class',
  extract: {
    include: ['index.html', 'src/**/*.{ts,tsx,vue}'],
    exclude: ['node_modules/**/*', '.git/**/*'],
  },
  plugins: [],
});
