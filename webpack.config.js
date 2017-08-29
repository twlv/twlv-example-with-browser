const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env = 'dev') {
  console.info('env', env);
  return {
    context: path.join(__dirname, 'src'),
    entry: {
      index: './index.js',
    },
    output: {
      path: path.join(__dirname, 'www'),
      filename: 'lib/[name].js',
    },
    devtool: env === 'dev' ? 'inline-source-map' : 'sourcemap',
    module: {
      rules: getRules(env),
    },
    plugins: getPlugins(env),
  };
};

function getRules (env) {
  let rules = [
    {
      test: /\.s?css$/,
      use: getCssLoader(env),
    },
    {
      test: /\.html$/,
      use: getHtmlLoader(env),
    },
  ];

  if (env === 'prod') {
    rules.push({
      test: /\.js$/,
      use: getBabelLoader(env),
    });
  } else {
    rules.push({
      test: /\.js$/,
      exclude: /node_modules/,
      use: getBabelLoader(env),
    });
  }

  return rules;
}

function getPlugins (env) {
  return [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ];
}

function getCssLoader () {
  return [ 'style-loader', 'css-loader' ];
}

function getHtmlLoader () {
  return 'html-loader';
}

function getBabelLoader (env) {
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

  if (env === 'prod') {
    presets.push(require.resolve('babel-preset-minify'));
  }

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
