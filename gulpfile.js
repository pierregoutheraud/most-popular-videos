var gulp = require('gulp'),
    path = require('path'),
    $ = require('gulp-load-plugins')(),
    es = require('event-stream'),
    WebpackDevServer = require("webpack-dev-server"),
    webpack = require("webpack"),
    del = require("del"),
    webpackStream = require('webpack-stream'),
    runSequence = require('run-sequence'),
    browserify = require('browserify'),
    babelify = require('babelify')
    fs = require('fs'),
    gutil = require('gulp-util'),
    nodemon = require('nodemon');

// set variable via $ gulp --type prod --style games
var environment = $.util.env.t || $.util.env.type || 'dev';
// var style = $.util.env.style || 'games';
var cdnHostname = '//live-chat.dmcdn.net';
var livereloadPort = 35729;

// console.log('Environment: ' + environment);
var isProduction = environment === 'prod';

var port = $.util.env.port || 9999;
var app = 'app/';
var build = 'build/';
var server = 'server/';
var public = 'public/';

gulp.task("webpack-dev-server", function(callback) {

  var webpackConfig = require('./webpack.config.js').getConfig('dev', port);
  var compiler = webpack(webpackConfig);

  new WebpackDevServer(compiler, {
    contentBase: 'public/', // where index.html is
    publicPath: '/js/', // js bundle path
    historyApiFallback: true,
    hot: true,
    // proxy: {
    //   "*": "http://localhost:10000"
    // }
  }).listen(port, "localhost", function(err) {
      if(err) throw new gutil.PluginError("webpack-dev-server", err);
      // Server listening
      $.util.log("[webpack-dev-server]", "http://localhost:"+port+"/webpack-dev-server/index.html");
      // keep the server alive or continue?
      // callback();
  });

});

gulp.task('scripts', function(cb) {
  var webpackConfig = require('./webpack.config.js').getConfig('prod', port);
  return gulp.src("./app/scripts/DmChat.jsx")
    .pipe(webpackStream(webpackConfig))
    // .pipe($.uglify())
    .pipe($.size({ title : 'scripts' }))
    .pipe(gulp.dest(build + public + 'js/'));
});

gulp.task('serve', function() {
  $.connect.server({
    host: '0.0.0.0',
    root: build,
    port: port
  });
});

// copy html from app to dist
gulp.task('html', function(cb) {
  return gulp.src(public + 'index.html')
    .pipe($.size({ title : 'html' }))
    .pipe(gulp.dest(build));
});

gulp.task('copy', function(cb) {
  return gulp.src(public + '**/*')
    .pipe($.size({ title : 'copy' }))
    .pipe(gulp.dest(build + public));
});

gulp.task("server", function () {
  return gulp.src('server/**/*.js')
    .pipe($.babel())
    .pipe(gulp.dest(build + 'server/'));
});
gulp.task('watch-server', ['server'], function() {
  gulp.watch('server/**/*.js', ['server']);
  nodemon({ script: 'build/server/server.js' }).on('restart', function () {
    console.log('server.js restarted!')
  })
});

// clean dist
gulp.task('clean', function(cb) {
  return del([build + '*'], cb);
});

// gulp.task('dev', ['webpack-dev-server', 'styles', 'watch', 'images'])

// build as react component
gulp.task('dev', function(callback) {
  process.env.NODE_ENV = 'dev';
  runSequence(
    'clean',
    'copy',
    'watch-server',
    // 'webpack-dev-server',
    callback
  );
});

// waits until clean is finished then builds the project
gulp.task('build', function(callback){
  runSequence(
    'clean',
    [
      'copy',
      'scripts',
      'server',
      // 'html'
    ],
    callback
  );
});

gulp.task('build-serve', function(callback) {
  runSequence(
    'build',
    'serve',
    callback
  );
});
