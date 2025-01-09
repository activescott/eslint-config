import { existsSync } from "fs"
import { resolve } from "path"

export function findESLintConfig(): string {
  const fileName = "config.js"
  const candidates = [
    // NOTE: we want to use only teh shared config so that it doesn't include the "ignores" config of the default dir config
    resolve(__dirname, "..", "dist", fileName),
  ]

  const found = candidates.filter((p) => existsSync(p))
  if (found.length < 1) {
    throw new Error(
      `Failed to locate ${fileName} in expected path. Checked: ` +
        candidates.join(", "),
    )
  }
  return found[0]
}
