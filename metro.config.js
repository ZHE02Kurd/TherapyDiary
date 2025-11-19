const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Point to the frontend directory where the actual app lives
const projectRoot = path.resolve(__dirname, 'frontend');
const config = getDefaultConfig(projectRoot);

// Add resolver configuration for better handling of web dependencies
config.resolver = {
  ...config.resolver,
  sourceExts: [...config.resolver.sourceExts, 'cjs'],
};

// Set the project root to frontend
config.projectRoot = projectRoot;
config.watchFolders = [__dirname];

module.exports = config;
