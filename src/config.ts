import eslint from "@eslint/js"
import tseslint, { type ConfigWithExtends } from "typescript-eslint"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import pluginJest from "eslint-plugin-jest"
import stylistic from "@stylistic/eslint-plugin"
import eslintPluginUnicorn from "eslint-plugin-unicorn"

const myJavaScriptAndTypeScriptRules: ConfigWithExtends = {
  // shouldn't need to specify files: https://eslint.org/docs/latest/use/configure/configuration-files#specifying-files-and-ignores
  files: ["**/*.{ts,mts,cts}", "**/*.{js,mjs,cjs}"],

  plugins: {
    "@stylistic": stylistic,
  },

  rules: {
    // https://eslint.style/guide/migration#approach-1-migrate-to-single-plugin
    // "With ESLint Stylistic, you only need one rule to handle both JavaScript and TypeScript:"
    "@stylistic/semi": ["error", "never"],

    complexity: [
      "warn",
      {
        max: 10,
      },
    ],

    "no-eval": ["error"],
    "no-implied-eval": ["error"],

    "no-magic-numbers": [
      "warn",
      {
        ignore: [0, 1],
      },
    ],

    "no-console": ["warn"],

    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
  },
}

const myTypeScriptOnlyRules: ConfigWithExtends = {
  // shouldn't need to specify files: https://eslint.org/docs/latest/use/configure/configuration-files#specifying-files-and-ignores
  files: ["**/*.{ts,mts,cts}"],

  plugins: {
    "@stylistic": stylistic,
  },

  rules: {
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
      },
    ],

    "@typescript-eslint/member-ordering": ["warn"],
    "@typescript-eslint/explicit-member-accessibility": ["error"],
  },
}

// handles js config files like jest.config.js
const configFileRules: ConfigWithExtends = {
  files: ["**/*.config.js"],

  rules: {
    "no-undef": "off",
    "suggestion/export": "off",
    "unicorn/prefer-module": "off",
  },
}

// jest test files:
const jestFileRules: ConfigWithExtends = {
  files: ["**/*.spec.ts"],
  extends: [myJavaScriptAndTypeScriptRules, myTypeScriptOnlyRules],

  plugins: { jest: pluginJest },
  languageOptions: {
    globals: pluginJest.environments.globals.globals,
  },

  rules: {
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "no-magic-numbers": ["off"],
    // because jest is stupid cjs
    "unicorn/prefer-module": ["off"],
  },
}

export default tseslint.config([
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  eslintPluginUnicorn.configs["flat/recommended"],

  myJavaScriptAndTypeScriptRules,
  myTypeScriptOnlyRules,

  configFileRules,

  jestFileRules,

  // add eslint-plugin-prettier/recommended as the LAST item in the configuration array in your eslint.config.js file so that eslint-config-prettier has the opportunity to override other configs:
  eslintPluginPrettierRecommended,
])
