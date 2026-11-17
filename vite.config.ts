import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    // Resolve figma:asset/ imports to actual files in src/assets/
    {
      name: 'figma-asset-resolver',
      resolveId(source) {
        const match = source.match(/^figma:asset\/(.+)$/);
        if (match) {
          return path.resolve(__dirname, 'src/assets', match[1]);
        }
      },
    },
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Use relative paths so the build works in subfolders (e.g. Neocities)
  base: './',

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
