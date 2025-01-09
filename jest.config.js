export default {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: [],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.jest.json",
    },
  },
  collectCoverageFrom: ["src/**/*.ts"],
  testPathIgnorePatterns: ["/node_modules/"],
}
