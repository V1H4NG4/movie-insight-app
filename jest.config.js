module.exports = {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.js"],
  setupFiles: ["<rootDir>/tests/setupEnv.js"],
  setupFilesAfterEnv: ["<rootDir>/tests/setupJest.js"],
  // Transpile ESM route files so Jest can load them
  transform: {
    "^.+\\.[jt]sx?$": ["babel-jest", { presets: [["@babel/preset-env", { targets: { node: "current" } }]] }]
  },
  transformIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["js", "jsx", "json", "node"]
};
