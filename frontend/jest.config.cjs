module.exports = {
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/src/styleMock.js",
  },
};
