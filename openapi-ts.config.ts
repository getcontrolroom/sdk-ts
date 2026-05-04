import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "../spec/openapi.yaml",
  output: {
    path: "./src/generated",
    format: "prettier",
  },
  plugins: [
    {
      name: "@hey-api/client-fetch",
      runtimeConfigPath: "../client.ts",
    },
    "@hey-api/schemas",
    "@hey-api/sdk",
    "@hey-api/typescript",
  ],
});
