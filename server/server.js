import express from 'express'
import path from 'path'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'

let port = process.env.PORT || 10000

var webpackConfig = require(__dirname + "/../../webpack.dev.config.js").getConfig(port)

let app = express(),
    router = express.Router()

var publicFolderPath = path.resolve(__dirname + '/../public/')

app.use(express.static(publicFolderPath))

if (process.env.NODE_ENV === 'dev') {
  var compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, {
    // contentBase: 'public/', // where index.html is
    contentBase: publicFolderPath + '/',
    publicPath: webpackConfig.output.publicPath, // js bundle path
    historyApiFallback: true,
    hot: true,
    stats: {colors: true}
  }))
  app.use(webpackHotMiddleware(compiler, {
      // log: console.log
  }))
}

// let db = new Database()
app.get('*', function(req, res){
  var indexPath = path.resolve(publicFolderPath + '/index.html')
  res.sendFile(indexPath)
})

// let server_host = process.env.YOUR_HOST || '0.0.0.0'
let server = app.listen(port, function () {
  let host = server.address().address
  let port = server.address().port
  console.log(`Listening at ${host}:${port}`)
})
