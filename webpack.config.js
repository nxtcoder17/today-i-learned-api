const path = require('path');
const webpack = require('webpack');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const DotEnv = require('dotenv-webpack');
require('babel-polyfill');

module.exports = (env = {}) => {
  const isProduction = 'isProduction' in env || false;

  console.log(
    `Build Environment set to ${isProduction ? 'production' : 'development'}`
  );

  const productionOnly = {
    mode: 'production',
    optimization: {
      minimize: false,
    },
  };

  const developmentOnly = {
    mode: 'development',
    devtool: 'source-map',
    externals: [nodeExternals()],
  };

  return {
    target: 'node',
    entry: './index.js',
    ...(isProduction ? productionOnly : developmentOnly),

    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index.js',
    },

    resolve: {
      extensions: ['.js'],
      alias: {
        '@app': path.resolve(__dirname, 'src', 'app.js'),
        '@commons': path.resolve(__dirname, 'src', 'commons'),
        '@modules': path.resolve(__dirname, 'src', 'modules'),
      },
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward',
            },
          },
        },
      ],
    },

    plugins: [
      new NodemonPlugin(),
      new DotEnv({
        path: isProduction ? './env/production.env' : './env/development.env',
      }),
      new webpack.ContextReplacementPlugin(
        /(express\/lib|any-promise|fastest-validator|typeorm|app-root-path)/,
        'node_modules'
      ),
    ],
  };
};
