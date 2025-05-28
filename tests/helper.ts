/* eslint-disable unicorn/prefer-module */
import { existsSync } from "node:fs"
import path from "node:path"

export function findESLintConfig(): string {
  const fileName = "config.js"
  const candidates = [
    // NOTE: we want to use only teh shared config so that it doesn't include the "ignores" config of the default dir config
    path.resolve(__dirname, "..", "dist", fileName),
  ]

  const found = candidates.filter((p) => existsSync(p))
  if (found.length === 0) {
    throw new Error(
      `Failed to locate ${fileName} in expected path. Checked: ` +
        candidates.join(", "),
    )
  }
  return found[0]
}
