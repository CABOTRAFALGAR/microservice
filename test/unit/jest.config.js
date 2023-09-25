const path = require('path');

const rootDir = path.resolve(__dirname, '..', '..');

module.exports = {
  rootDir,
  collectCoverage: true,
  coverageDirectory: path.resolve(rootDir, 'coverage'),
  coveragePathIgnorePatterns: [ '/test/', '/node_modules/' ],
  testMatch: [ `**/test/unit/**/*.spec.ts`, `**/test/integration/**/*.spec.ts` ],
  moduleFileExtensions: [ 'js', 'ts', 'json' ],
  transform: {
    '^.+\\.ts$': [ 'ts-jest', { tsconfig: path.resolve(rootDir, 'tsconfig.json') } ]
  }
};
