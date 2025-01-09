# @activescott/eslint-config

[![npm version](https://badge.fury.io/js/%40activescott%2Feslint-config.svg)](https://www.npmjs.com/package/@activescott/eslint-config)
[![Build Status](https://github.com/activescott/eslint-config/workflows/main/badge.svg)](https://github.com/activescott/eslint-config/actions)

This is [@activescott's](https://github.com/activescott/) [sharable config](https://eslint.org/docs/developer-guide/shareable-configs) for ESLint. The default is optimized for TypeScript. It does prettify other files too including JavaScript, Markdown, etc.

Multiple config may be added to this package in the future as described at https://eslint.org/docs/developer-guide/shareable-configs#sharing-multiple-configs

## Usage

**Step 1**: Add the following dependencies to your project:

```sh
npm add -D @activescott/eslint-config@3 typescript-eslint@8.19.1 eslint-plugin-prettier@5.2.1 eslint-plugin-jest@28.10.0 @stylistic/eslint-plugin@2.12.1 eslint-config-prettier@9.1.0 eslint-plugin-unicorn@56.0.1
```

**Step 2**: Enter the following to create a `eslint.config.js`, `.prettierrc`, and `.prettierignore` in the root with the right content:

```sh
printf 'import config from "@activescott/eslint-config"

// add local project ignores here and they will be applied to all rules
const ignores = []

const configs = config.map((c) => ({
  ignores: [...(c.ignores ?? []), ...ignores],
  ...c,
}))

export default [...configs]
' > eslint.config.js
printf "semi: false\n" > .prettierrc
printf "node_modules/\n/dist/\n/.next/\n.nyc_output/\ncoverage/\n" | tee .prettierignore
```

**Step 3** (optional): Add the following scripts to `package.json`:

```json
{
  "scripts": {
    "lint": "eslint",
    "lint-fix": "eslint --fix"
  }
}
```

See https://eslint.org/docs/user-guide/configuring for more information.

## Notes

### React

When using React add `plugin:react/recommended` from package `eslint-plugin-react`:

```
extends:
  - ...
  - "plugin:react/recommended"
```

## Local Testing

You can also test your shareable config on your computer before publishing by linking your module globally. Type:

    npm link

Then, in your project that wants to use your shareable config, type:

    npm link @activescott/eslint-config

## Release Process (Deploying to NPM) 🚀

We use [semantic-release](https://github.com/semantic-release/semantic-release) to consistently release [semver](https://semver.org/)-compatible versions. This project deploys to multiple [npm distribution tags](https://docs.npmjs.com/cli/dist-tag). Each of the below branches correspond to the following npm distribution tags:

| branch | npm distribution tag |
| ------ | -------------------- |
| master | latest               |
| beta   | beta                 |

To trigger a release use a Conventional Commit following [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines) on one of the above branches.

## Notes to self

References:

- https://eslint.org/docs/latest/use/configure/configuration-files
- https://eslint.org/docs/latest/use/configure/parser#configure-a-custom-parser
- https://typescript-eslint.io/getting-started
- https://prettier.io/docs/en/integrating-with-linters.html
- https://github.com/prettier/eslint-plugin-prettier
- https://eslint.org/docs/latest/extend/shareable-configs
