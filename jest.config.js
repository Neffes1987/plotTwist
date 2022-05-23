module.exports = {
  preset: 'react-native',
  testRegex: ".*.test.(ts|tsx)$",
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    "^@backend(.*)$": "<rootDir>/src/backend/$1",
    "^@mocks(.*)$": "<rootDir>/src/mocks/$1",
    "\\.svg": "<rootDir>/src/mocks/svgMock.js"
  }
};
