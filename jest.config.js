module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    "^@backend(.*)$": "<rootDir>/src/backend/$1",
    "^@mocks(.*)$": "<rootDir>/src/mocks/$1",
  }
};
