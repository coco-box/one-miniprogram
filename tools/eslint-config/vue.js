import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
// https://eslint.vuejs.org/user-guide/
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import { config as baseConfig } from "./base.js";

/**
 * 仓库中使用 Vue3 的库的 ESLint 配置.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"], // Vue3 官方推荐配置
  {
    languageOptions: {
      sourceType: "module",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".vue"],
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
  },
  {
    rules: {
      // Vue3 常见自定义规则
      "vue/multi-word-component-names": "off", // 允许单词组件名
      "vue/no-v-html": "off", // 有时项目需要使用 v-html
    },
  },
];