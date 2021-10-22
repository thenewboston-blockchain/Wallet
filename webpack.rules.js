/* eslint-disable @typescript-eslint/no-var-requires */
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const styledComponentsTransformer = createStyledComponentsTransformer();

const rules = [
  // Add support for native node modules
  {
    loader: 'node-loader',
    test: /\.node$/,
  },
  {
    exclude: /(bundle|node_modules)/,
    parser: {amd: false},
    test: /\.(m?js|node)$/,
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
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
        options: {
          presets: [['@babel/preset-env', {targets: 'defaults'}]],
        },
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
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
    type: 'asset/resource',
  },
];

module.exports = rules;
