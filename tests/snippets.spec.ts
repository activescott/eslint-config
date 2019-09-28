import { readdirSync, Dirent } from "fs"
import { join } from "path"
import { CLIEngine } from "eslint"
import myConfig from "../src/index"

function getSnippetFiles(dir: string = __dirname): string[] {
  const entries: Dirent[] = readdirSync(dir, { withFileTypes: true })
  let snippetPaths: string[] = []
  for (const entry of entries) {
    if (entry.isFile()) {
      snippetPaths.push(join(dir, entry.name))
    } else if (entry.isDirectory()) {
      const kids: string[] = getSnippetFiles(join(dir, entry.name))
      snippetPaths = snippetPaths.concat(kids)
    } else {
      //console.warn("unexpected file type in snapshots:", entry)
    }
  }
  return snippetPaths
}

const snippetBase = join(__dirname, "..", "test-data", "snippets")

test.each(getSnippetFiles(join(snippetBase, "should-error")))(
  "should error %s",
  snippetFile => {
    const result = lint(snippetFile)
    expect(result.errorCount).toBeGreaterThan(0)
    expect(result.warningCount).toEqual(0)
    expect(result).toMatchSnapshot(snippetFile)
  }
)

test.each(getSnippetFiles(join(snippetBase, "should-warn")))(
  "should error %s",
  snippetFile => {
    const result = lint(snippetFile)
    expect(result.errorCount).toEqual(0)
    expect(result.warningCount).toBeGreaterThan(0)
    expect(result).toMatchSnapshot(snippetFile)
  }
)

test.each(getSnippetFiles(join(snippetBase, "should-pass")))(
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
  return cli.executeOnFiles([snippetFile])
}
