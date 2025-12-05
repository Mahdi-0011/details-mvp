import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Lägg till egna regler här
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // <--- stänger av klagomål på any
    },
  },
]);

export default eslintConfig;
