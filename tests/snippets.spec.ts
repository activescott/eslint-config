import { readdirSync, Dirent } from "fs"
import { join, relative, resolve } from "path"
import { ESLint } from "eslint"
import { findESLintConfig } from "./helper"

/**
 * gets snippet files
 * @param dir the path to get all snippets in recursively.
 * @param basePath Specify a basepath if you want the returned paths to be relative to this path
 */
function getSnippetFiles(dir: string = __dirname, basePath = ""): string[] {
  const entries: Dirent[] = readdirSync(dir, { withFileTypes: true })
  let snippetPaths: string[] = []
  for (const entry of entries) {
    if (entry.isFile()) {
      const fullPath = join(dir, entry.name)
      const relativePath = basePath ? relative(basePath, fullPath) : fullPath
      snippetPaths.push(relativePath)
    } else if (entry.isDirectory()) {
      const kids: string[] = getSnippetFiles(join(dir, entry.name), basePath)
      snippetPaths = snippetPaths.concat(kids)
    } else {
      // eslint-disable-next-line no-console
      console.warn("unexpected file type in snapshots:", entry)
    }
  }
  return snippetPaths
}

const snippetBase = join(__dirname, "..", "test-data", "snippets")

test.each(getSnippetFiles(join(snippetBase, "should-error"), snippetBase))(
  "should error %s",
  async (snippetFile) => {
    const { warnings, errors } = await lint(snippetFile)
    expect(errors).toHaveLength(1)
    expect(warnings).toHaveLength(0)
  },
)

test.each(getSnippetFiles(join(snippetBase, "should-warn"), snippetBase))(
  "should warn %s",
  async (snippetFile) => {
    const { warnings, errors } = await lint(snippetFile)
    expect(errors).toHaveLength(0)
    expect(warnings).toHaveLength(1)
  },
)

test.each(getSnippetFiles(join(snippetBase, "should-pass"), snippetBase))(
  "should pass %s",
  async (snippetFile) => {
    const { warnings, errors } = await lint(snippetFile)
    expect(errors).toHaveLength(0)
    expect(warnings).toHaveLength(0)
  },
)

async function lint(snippetFile: string): Promise<{
  all: ESLint.LintResult[]
  warnings: ESLint.LintResult[]
  errors: ESLint.LintResult[]
}> {
  // https://eslint.org/docs/latest/integrate/nodejs-api#parameters
  const lint = new ESLint({
    cwd: resolve(__dirname, ".."),
    overrideConfigFile: findESLintConfig(),
    cache: false,
  })

  const fullPath = join(snippetBase, snippetFile)

  if (await lint.isPathIgnored(fullPath)) {
    throw new Error("path ignored")
  }

  const report = await lint.lintFiles([fullPath])

  const all = removeFilePaths(report)
  const warnings = all.filter((r) => r.warningCount > 0)
  const errors = all.filter((r) => r.errorCount > 0)
  return { all, warnings, errors }
}

function removeFilePaths(report: ESLint.LintResult[]): ESLint.LintResult[] {
  report.forEach((p) => (p.filePath = relative(snippetBase, p.filePath)))
  return report
}
