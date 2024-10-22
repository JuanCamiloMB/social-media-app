import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['<rootDir>/tests'],  // Points to the tests directory
  testRegex: '.*\\.test\\.ts$', // Regex to match test files
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',  // Use ts-jest to transform TypeScript files
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',  // Collect coverage from all JS and TS files
  ],
  coverageDirectory: './coverage',  // Coverage output directory
  testEnvironment: 'node',  // Set environment to node for Express apps

};

export default config;
