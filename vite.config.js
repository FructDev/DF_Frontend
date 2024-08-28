import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  return {
    base: mode === "production" ? "/DF_Frontend/" : "/",
    plugins: [react()],
  };
});
