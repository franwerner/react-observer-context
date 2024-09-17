import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import dts from 'vite-plugin-dts'

export default defineConfig( () => {



  return {
    plugins: [
      react(),
      dts({
        exclude: ["src/App.tsx", "src/main.tsx"],
      }),
    ],
    resolve: {
      alias: {
        "@" : path.resolve(__dirname,"src")
      }
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

