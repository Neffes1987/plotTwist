module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    //['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          src: './src',
          backend: './src/app/',
        },
      },
    ],
  ],
};
