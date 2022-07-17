import vue from '@vitejs/plugin-vue';
import { resolve } from "path";
import { defineConfig, UserConfig } from "vite";

export default defineConfig(({ command, mode }) => {
  let env = 'beta';
  let config: UserConfig = {
    root: "./src",
    resolve: {
      alias: {
        "CONFIG": resolve('./', "config"),
        "UTILS": resolve('./', "utils"),
      }
    },
    plugins: [vue()]
  };
  if (command === 'serve') {
    config.server = {
      host: '0.0.0.0',
      port: 9000,
      hmr: true
    };
  } else if (command === 'build') {
    env = "prod";
    config.build = {
      outDir: "../dist"
    };
  }
  config.define = {
    'process.env': {
      ENV: env
    }
  };
  return config;
})

