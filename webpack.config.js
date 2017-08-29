const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env) {
  return {
    context: path.join(__dirname, 'src'),
    entry: {
      index: './index.js',
    },
    output: {
      path: path.join(__dirname, 'www'),
      filename: 'lib/[name].js',
    },
    devtool: 'sourcemap',
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: getCssLoader(env),
        },
        {
          test: /\.html$/,
          use: getHtmlLoader(env),
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: getBabelLoader(env),
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
    ],
  };
};

function getCssLoader () {
  return [ 'style-loader', 'css-loader' ];
}

function getHtmlLoader () {
  return 'html-loader';
}

function getBabelLoader () {
  let plugins = [
    // 'syntax-dynamic-import',
    // require.resolve('babel-plugin-transform-async-to-generator'),
    // [ require.resolve('babel-plugin-__coverage__'), { 'ignore': 'node_modules' } ],
    // require.resolve('babel-plugin-syntax-dynamic-import'),
    // require.resolve('babel-plugin-istanbul')
  ];

  let presets = [
    // require.resolve('babel-preset-es2015'),
    // require.resolve('babel-preset-stage-3'),
  ];

  return {
    loader: 'babel-loader',
    options: {
      babelrc: false,
      plugins,
      presets,
      cacheDirectory: true,
    },
  };
}
