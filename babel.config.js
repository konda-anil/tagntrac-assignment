module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        "root": ["."],
        "alias": {
          "@assets": "./src/assets",
          "@core": "./src/core",
          "@components": "./src/components/index",
          "@screens": "./src/screens/index",
          "@utils": "./src/utils/index",
          "@services": "./src/services/index",
          "@hooks": "./src/hooks/index",
          "@config": "./src/config/index",
        }
      }
    ]
  ]
};
