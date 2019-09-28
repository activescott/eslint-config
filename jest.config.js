module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: [],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.cjs.json"
    }
  },
  collectCoverageFrom: ["src/**/*.ts"],
  testPathIgnorePatterns: ["/node_modules/"]
}
