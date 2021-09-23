/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const sass = require('sass');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const styledComponentsTransformer = createStyledComponentsTransformer();

const rules = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    exclude: /(bundle|node_modules)/,
    parser: {amd: false},
    test: /\.(m?js|node)$/,
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    include: /node_modules/,
    test: /\.(js|jsx|tsx|ts)?$/,
    use: ['react-hot-loader/webpack'],
  },
  {
    exclude: /(bundle|node_modules)/,
    test: /\.tsx?$/,
    use: [
      {
        loader: 'babel-loader',
      },
      {
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({before: [styledComponentsTransformer]}),
          transpileOnly: true,
        },
      },
    ],
  },
  {
    test: /\.(scss|css)$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {implementation: sass, includePaths: [path.join(__dirname, 'src/renderer')], indentWidth: 2},
        },
      },
    ],
  },
  {
    loader: 'file-loader',
    options: {
      name: '[path][name].[ext]',
    },
    test: /\.(svg|ico|icns)$/,
  },
  {
    loader: 'url-loader',
    options: {
      name: '[path][name].[ext]',
    },
    test: /\.(jpg|png|woff|woff2|eot|ttf)$/,
  },
];

module.exports = rules;
