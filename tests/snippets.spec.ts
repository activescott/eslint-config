import { readdirSync, Dirent } from "fs"
import { join, relative } from "path"
import { CLIEngine } from "eslint"
import myConfig from "../src/index"

/**
 * gets snippet files
 * @param dir the path to get all snippets in recursively.
 * @param basePath Specify a basepath if you want the returned paths to be relative to this path
 */
function getSnippetFiles(
  dir: string = __dirname,
  basePath: string = ""
): string[] {
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
      //console.warn("unexpected file type in snapshots:", entry)
    }
  }
  return snippetPaths
}

const snippetBase = join(__dirname, "..", "test-data", "snippets")

test.each(getSnippetFiles(join(snippetBase, "should-error"), snippetBase))(
  "should error %s",
  snippetFile => {
    const result = lint(snippetFile)
    expect(result.errorCount).toBeGreaterThan(0)
    expect(result.warningCount).toEqual(0)
    expect(result).toMatchSnapshot(snippetFile)
  }
)

test.each(getSnippetFiles(join(snippetBase, "should-warn"), snippetBase))(
  "should error %s",
  snippetFile => {
    const result = lint(snippetFile)
    expect(result.errorCount).toEqual(0)
    expect(result.warningCount).toBeGreaterThan(0)
    expect(result).toMatchSnapshot(snippetFile)
  }
)

test.each(getSnippetFiles(join(snippetBase, "should-pass"), snippetBase))(
  "should error %s",
  snippetFile => {
    const result = lint(snippetFile)
    // result.results.forEach(r => console.log("result:", r))
    expect(result.errorCount).toEqual(0)
    expect(result.warningCount).toEqual(0)
    expect(result).toMatchSnapshot(snippetFile)
  }
)

function lint(snippetFile): CLIEngine.LintReport {
  const cli = new CLIEngine({
    useEslintrc: false,
    ignore: false,
    baseConfig: myConfig
  })
  const fullPath = join(snippetBase, snippetFile)
  const report = cli.executeOnFiles([fullPath])
  return removeFilePaths(report)
}

function removeFilePaths(report: CLIEngine.LintReport): CLIEngine.LintReport {
  report.results.forEach(p => (p.filePath = relative(snippetBase, p.filePath)))
  return report
}
