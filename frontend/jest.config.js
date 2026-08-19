module.exports = {
  displayName: 'unit-tests',
  testEnvironment: 'jsdom',
  verbose: true,
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', {
      presets: [
        '@babel/preset-env',
        ['@babel/preset-react', { runtime: 'automatic' }]
      ]
    }]
  },
  moduleFileExtensions: ['js', 'jsx'],
  transformIgnorePatterns: [
    'node_modules/(?!(@testing-library)/)'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/node_modules/@testing-library/jest-dom'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js',
    '!src/**/*.d.ts',
    '!src/setupTests.js'
  ],
  coverageThreshold: {
    global: {
      statements: 90,
      lines: 90,
      functions: 90,
      branches: 75
    }
  },
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html']
};