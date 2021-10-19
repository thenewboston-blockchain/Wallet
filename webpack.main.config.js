/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable sort-keys */

const path = require('path');
const rules = require('./webpack.rules');

function srcPaths(...paths) {
  return path.join(__dirname, ...paths);
}

const mode = process.env.NODE_ENVIRONMENT;

module.exports = {
  devtool: 'source-map',
  entry: './src/main/index.ts',
  mode,
  module: {
    rules,
  },
  output: {
    path: srcPaths('bundle', 'main'),
  },
  resolve: {
    alias: {
      '@main': srcPaths('src', 'main'),
      '@renderer': srcPaths('src', 'renderer'),
      '@shared': srcPaths('src', 'shared'),
      react: srcPaths('node_modules', 'react'),
      'react-dom': srcPaths('node_modules', 'react-dom'),
      'react-hot-loader': srcPaths('node_modules', 'react-hot-loader'),
    },
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
  },
  target: 'electron-main',
};
