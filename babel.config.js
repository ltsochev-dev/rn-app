module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@src': './src',
        },
      },
    ],
    'nativewind/babel',

    'react-native-reanimated/plugin',
  ],
};
