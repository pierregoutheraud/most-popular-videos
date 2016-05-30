module.exports.getConfig = function(port) {

  port = (typeof port === 'undefined' || !port) ? 9001 : port;

  console.log('webpack config port:'+port);

  var webpack = require('webpack');
  var path = require('path');
  var autoprefixer = require('autoprefixer');

  var config = {
    entry: {
      app: [
        // 'webpack-hot-middleware/client?path=http://localhost:'+port,
        // 'webpack-dev-server/client?http://localhost:'+port, // WebpackDevServer host and port
        // 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        'webpack-hot-middleware/client',
        "webpack/hot/dev-server",
        "./app/scripts/App.jsx"
      ]
    },
    output: {
      // path: path.join(__dirname + '/build/public'),
      path: '/',
      publicPath: 'http://localhost:10000/js/',
      filename: 'bundle.js',
    },
    resolve: {
      modulesDirectories: [
        path.join(__dirname + '/app/scripts/'),
        'node_modules'
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery"
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader!postcss-loader'
        },
        {
          test: /\.scss$/,
          include: [
            path.join(__dirname, 'app')
          ],
          loader: 'style-loader!css-loader!postcss-loader!sass-loader'
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loaders: ['file-loader']
        },
        {
          test: /\.jsx?$/,
          include: [
            path.join(__dirname, 'app/scripts')
          ],
          loaders: ['react-hot','babel-loader']
        }
      ]
    },
    postcss: function () {
      return [autoprefixer];
    },
    devtool: 'eval',
    debug : true,
  };

  return config

}
