// @ts-check
import tseslint from "typescript-eslint"
// HACK: importing from /dist is a hack only locally. Be sure to REBUILD!
import config from "./dist/config.js"

// this is only used in *this* local project, not to be part of the published sharable config
const ignores = [
  "tests/junk.spec.ts",
  "example/node_modules/",
  "dist/**",
  "**/test-data/**",
]

// add ignores
const overrideIgnores = (c) => ({ ...c, ignores })

export default tseslint.config(config.map(overrideIgnores))
