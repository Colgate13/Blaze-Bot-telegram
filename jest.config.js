module.exports = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        './src/modules/**/services/*.ts'
    ],
    coverageDirectory: 'coverage',
    coverageProvider: "v8",
    coverageReporters: [
        "text-summary",
        "lcov",

    ],
    preset: 'ts-jest',
    testEnvironment: "node",
    testMatch: [
        "**/*.spec.ts",
        "**/*.test.ts",
    ],
};