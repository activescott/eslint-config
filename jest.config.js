export default {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: [],
  transform: {
    "^.+.spec.ts?$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
  },
  collectCoverageFrom: ["src/**/*.ts"],
  testPathIgnorePatterns: ["/node_modules/"],
}
