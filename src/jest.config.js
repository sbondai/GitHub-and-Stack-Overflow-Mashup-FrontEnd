module.exports = {
  setupFiles: ["<rootDir>/setupJest.js"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
