import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import dts from 'vite-plugin-dts'

const loadAliasConfig = async () => {
  let load = null
  try {
    const module = await import("../../alias.config.js")
    load = module.default
  } catch (error) {

  }
  return load
}
export default defineConfig(async ({ command }) => {
  const alias = await loadAliasConfig();

  const isBuild = command === "build" || !alias
    ? { "@react-observer-context": path.resolve(__dirname, "src") }
    : alias;

  return {
    plugins: [
      react(),
      dts({
        tsconfigPath: "./ts/tsconfig.build.json",
        exclude: ["src/App.tsx", "src/main.tsx"],
      }),
    ],
    resolve: {
      alias: isBuild,
    },
    build: {
      outDir: "dist",
      lib: {
        entry: path.resolve(__dirname, "lib/index.ts"),
        name: "index",
        formats: ["es", "umd"],
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        external: ["react", "react-dom", "framer-motion"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "framer-motion": "FramerMotion",
          },
        },
      },
    },
  };
});

