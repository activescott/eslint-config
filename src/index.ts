import yaml from "js-yaml"
import { readFileSync, existsSync } from "fs"
import { join } from "path"

const config = yaml.load(readFileSync(getPath(), "utf8"))
export = config

function getPath(): string {
  const candidates = [
    // if we running from /dist/es or dist/cjs
    join(__dirname, "..", "..", ".eslintrc.yaml"),
    // if we're running from the /src directory directly
    join(__dirname, "..", ".eslintrc.yaml"),
  ]

  const found = candidates.filter((p) => existsSync(p))
  if (found.length < 1) {
    throw new Error("Failed to locate .eslintrc.yaml in expected path")
  }
  return found[0]
}
