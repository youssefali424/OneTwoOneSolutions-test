module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        root: ['./src'],
        extensions: ['.js', '.ios.js', '.android.js'],
        alias: {
          _screens: './src/screens',
          _molecules: './src/molecules',
          _navigation: './src/navigation',
          _styles: './src/styles',
          _components: './src/components',
          _network: './src/network',
        },
      },
    ],
  ],
};
