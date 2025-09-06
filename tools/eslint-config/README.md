# @hatech/eslint-config-ai

## 介绍

该包为整个 monorepo 项目的通用 eslint 配置包，包含:

- 基础 eslint 配置 `base.js`
- 基于 `base.js` 的 `vue.js` 的 `eslint` 配置
- 基于 `base.js` 的 `react.js` 的 `eslint` 配置

## 使用方法

- vue 项目

> eslint.config.mjs

```js
import { config as shared } from "@hatech/eslint-config-ai/vue";

/** @type {import("eslint").Linter.Config} */
export default [
  ...shared,
  {
    // 这个块里的设置会覆盖前面共享配置的同名规则
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "vue/no-v-html": "warn", // 把共享里的 off 改成 warn
    },
  },
];
```

- react 项目

> eslint.config.mjs

```js
import { config as shared } from "@hatech/eslint-config-ai/react";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...shared, // 继承共享 React 配置
  {
    // 针对当前子包的自定义规则
    rules: {
      "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }], // 强制 JSX 使用 TSX
      "react-hooks/rules-of-hooks": "error", // 强制 Hook 规则
      "react-hooks/exhaustive-deps": "warn", // effect 依赖检查
      "no-console": ["warn", { allow: ["warn", "error"] }], // 控制 console
    },
  },
  {
    // 针对特定文件或目录的规则覆盖
    files: ["**/*.test.{js,ts,tsx}"],
    rules: {
      "no-console": "off", // 测试文件允许 console
    },
  },
  {
    // 忽略生成目录或其他子包不需要 lint 的目录
    ignores: ["dist/**", "node_modules/**"],
  },
];
```
