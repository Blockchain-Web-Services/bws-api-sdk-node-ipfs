
const config = {
  rootDir: './../',
  transform: {
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**.mjs'
  ],
  coverageThreshold: {
    "global": {
      "lines": 90
    }
  },
  coverageReporters: ["text", "text-summary"]
};

module.exports = config;