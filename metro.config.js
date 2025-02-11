// metro.config.js
const { getDefaultConfig } = require('@react-native/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // Add any custom Metro configurations here
  return config;
})();