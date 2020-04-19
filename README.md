# @activescott/eslint-config

[![npm version](https://badge.fury.io/js/%40activescott%2Feslint-config.svg)](https://www.npmjs.com/package/@activescott/eslint-config)
[![Build Status](https://github.com/activescott/eslint-config/workflows/main/badge.svg)](https://github.com/activescott/eslint-config/actions)

This is [@activescott's](https://github.com/activescott/) [sharable config](https://eslint.org/docs/developer-guide/shareable-configs) for ESLint. The default is optimized for TypeScript. It does prettify other files too including JavaScript, Markdown, etc.

Multiple config may be added to this package in the future as described at https://eslint.org/docs/developer-guide/shareable-configs#sharing-multiple-configs

## Usage

**Step 1**: Add the following dependencies to your project:

```sh
yarn add --dev @activescott/eslint-config @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier prettier
```

**Step 2**: Enter the following to create a `.eslintrc.yaml` file in the root with the right content:

```sh
printf "extends:\n  - \"@activescott/eslint-config\"\n" > .eslintrc.yaml
printf "semi: false\n" > .prettierrc
printf "node_modules/\n/dist/\n/.next/\n.nyc_output/\ncoverage/\n" | tee .eslintignore .prettierignore
```

**Step 3** (optional): Add the following scripts to `package.json`:

```json
{
  "scripts": {
    "eslint": "./node_modules/.bin/eslint . --ext ts,tsx,js,jsx",
    "lint": "./node_modules/.bin/prettier -l \"{,!(node_modules)/**/}*.{ts,tsx,md,yml,json,html}\" && yarn run eslint",
    "lint-fix": "./node_modules/.bin/prettier --write \"{,!(node_modules)/**/}*.{ts,tsx,md,yml,json,html}\" && yarn run eslint --fix"
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

    yarn link

Then, in your project that wants to use your shareable config, type:

    yarn link @activescott/eslint-config

## Release Process (Deploying to NPM) 🚀

We use [semantic-release](https://github.com/semantic-release/semantic-release) to consistently release [semver](https://semver.org/)-compatible versions. This project deploys to multiple [npm distribution tags](https://docs.npmjs.com/cli/dist-tag). Each of the below branches correspond to the following npm distribution tags:

| branch | npm distribution tag |
| ------ | -------------------- |
| master | latest               |
| beta   | beta                 |

To trigger a release use a Conventional Commit following [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines) on one of the above branches.
