'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 10000;

var webpackConfig = require(__dirname + "/../../webpack.dev.config.js").getConfig(port);

var app = (0, _express2.default)(),
    router = _express2.default.Router();

var publicFolderPath = _path2.default.resolve(__dirname + '/../public/');

app.use(_express2.default.static(publicFolderPath));

if (process.env.NODE_ENV === 'dev') {
  var compiler = (0, _webpack2.default)(webpackConfig);
  app.use((0, _webpackDevMiddleware2.default)(compiler, {
    // contentBase: 'public/', // where index.html is
    contentBase: publicFolderPath + '/',
    publicPath: webpackConfig.output.publicPath, // js bundle path
    historyApiFallback: true,
    hot: true,
    stats: { colors: true }
  }));
  app.use((0, _webpackHotMiddleware2.default)(compiler, {
    // log: console.log
  }));
}

// let db = new Database()
app.get('*', function (req, res) {
  var indexPath = _path2.default.resolve(publicFolderPath + '/index.html');
  res.sendFile(indexPath);
});

// let server_host = process.env.YOUR_HOST || '0.0.0.0'
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at ' + host + ':' + port);
});