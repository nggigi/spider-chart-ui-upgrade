const esModules = [
  '@angular',
  '@ngx-translate/core',
  '@ngx-translate/http-loader',
  'primeng',
  'moment',
  '@ionic/angular',
  '@stencil/core',
  '@ionic/core',
  'ngx-image-compress',
  'ng-otp-input',
  'emoji-picker-element',
  'ngx-bootstrap/utils',
  'ngx-mask',
].join('|');

const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/projects/ngx-spider-chart/src/'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: ['./setupJest.ts'],
  collectCoverage: true,
  coverageReporters: ['html'],
  coverageDirectory: './coverage/my-app',
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
        useESM: true,
      },
    ],
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'mjs'],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  extensionsToTreatAsEsm: ['.ts'],
  testTimeout: 1000,
};
