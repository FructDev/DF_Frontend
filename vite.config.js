import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://fructdev.github.io/DF_Frontend/",
  plugins: [react()],
});
