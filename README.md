# @activescott/eslint-config

This is [@activescott's](https://github.com/activescott/) [sharable config](https://eslint.org/docs/developer-guide/shareable-configs) for ESLint. The Default config is for TypeScript. Multiple config may be added to this package in the future as described at https://eslint.org/docs/developer-guide/shareable-configs#sharing-multiple-configs

# Usage

Add the following dependencies to your project:

```
yarn add --dev eslint @activescott/eslint-config @typescript-eslint/eslint-plugin
```

Create a `.eslintrc.yaml` file in the root with the following content:

```
extends:
  - "@activescott/eslint-config"
```

See https://eslint.org/docs/user-guide/configuring for more information.

# Local Testing

You can also test your shareable config on your computer before publishing by linking your module globally. Type:

    yarn link

Then, in your project that wants to use your shareable config, type:

    yarn link @activescott/eslint-config

# Todo

- License: https://choosealicense.com/licenses/mit/
