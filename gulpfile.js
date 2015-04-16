var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var less = require('gulp-less');

var srcFolder = './src/';
var assetsFolder = srcFolder + 'assets/';

var buildFolder = './build/';
var buildJsFolder = buildFolder + 'js/';
var buildCssFolder = buildFolder + 'css/';
var buildFontsFolder = buildFolder + 'fonts/';


// browserify task
gulp.task('browserify', function() {
  gulp
    .src([srcFolder + 'app.js'])
    .pipe(browserify({
      //insertGlobals: true,
      debug: true,
      transform: ['html2js-browserify']
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(buildJsFolder));
});

gulp.task('worker', function() {
  gulp
    .src(srcFolder + 'worker/*.js')
    .pipe(gulp.dest(buildJsFolder));
});

// less task
gulp.task('less', function() {
  gulp
    .src(assetsFolder + '**/*.less')
    .pipe(less())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(buildCssFolder));
});

// less task
gulp.task('assets', function() {
  gulp
    .src('./node_modules/bootstrap/fonts/*')
    .pipe(gulp.dest(buildFontsFolder));
});

// watch dog
gulp.task('watch', ['build'], function() {
  gulp
    .watch([
      srcFolder + '**/*.js',
      srcFolder + '**/*.html',
      srcFolder + '**/*.less'
    ], [
      'browserify',
      'worker',
      'less'
    ]);
});

gulp.task('build', ['browserify', 'worker', 'less', 'assets']);
