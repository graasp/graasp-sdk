module.exports = {
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  testEnvironment: 'node',
  // added for jest to look for the dependencies
  modulePaths: ['src/'],
  setupFiles: ['./test/setupTests.ts'],
};
