module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: true,
        allowUndefined: true,
      },
    ],
    // [
    //   'module-resolver',
    //   {
    //     extensions: ['.tsx', '.ts', '.js', '.json'],
    //   },
    // ],
    'react-native-reanimated/plugin',
  ],
};
