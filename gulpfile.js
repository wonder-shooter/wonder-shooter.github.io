"use strict"

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass =require('gulp-sass');
const postcss =require('gulp-postcss');
const autoprefixer =require('autoprefixer');
const watch = require('gulp-watch');
const cssmqpacker = require('css-mqpacker');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const pug = require('gulp-pug');
const fs = require('fs');
const notify = require("gulp-notify");
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");

const VENDOR = {
  bootstrap: 'src/assets/_scss/_bootstrap/',
  simplelineicons: 'src/assets/_scss/_simple-line-icons/',
  fontawesome: 'src/assets/_scss/_font-awesome/'
};

const SRC = {
  css: 'src/assets/_scss/*.scss',
  html: 'src/*.pug',
  data: 'src/_data/'
};

const WATCH = {
  css: 'src/assets/_scss/**/*.scss',
  html: 'src/**/*.pug',
  data: 'src/_data/*'
};

const DEST = {
  css: 'htdocs/assets/css/',
  fonts: 'htdocs/assets/fonts/',
  html: 'htdocs/'
};

gulp.task('copy', function() {
  gulp.src([
      'node_modules/bootstrap/dist/**/*',
      '!**/npm.js',
      '!**/bootstrap-theme.*',
      '!**/*.map'
    ])
    .pipe(gulp.dest(VENDOR.bootstrap))
  gulp.src(['node_modules/simple-line-icons/**/*'])
    .pipe(gulp.dest(VENDOR.simplelineicons))
  gulp.src(['node_modules/simple-line-icons/fonts/*'])
    .pipe(gulp.dest(DEST.fonts))
  gulp.src([
      'node_modules/font-awesome/**',
      '!node_modules/font-awesome/**/*.map',
      '!node_modules/font-awesome/.npmignore',
      '!node_modules/font-awesome/*.txt',
      '!node_modules/font-awesome/*.md',
      '!node_modules/font-awesome/*.json'
    ])
    .pipe(gulp.dest(VENDOR.fontawesome))
  gulp.src(['node_modules/font-awesome/fonts/*'])
    .pipe(gulp.dest(DEST.fonts))
})

gulp.task('html', () => {
  // JSONファイルの読み込み。
  var locals = {
    'site': JSON.parse(fs.readFileSync(SRC.data + 'site.json'))
  };
  gulp
    .src([SRC.html])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(pug({
      locals: locals,
      basedir: 'src',
      pretty: true
    }))
    .pipe(gulp.dest(DEST.html));
});


gulp.task('css', () => {

  const processors = [
    autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'iOS >= 9', 'Android >= 4.4']}),
    cssmqpacker
  ];

  gulp
    .src([SRC.css])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(DEST.css));
});

gulp.task('cssrelease', () => {

  const processors = [
    autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'iOS >= 9', 'Android >= 4.4']}),
    cssmqpacker,
    cssnano
  ];

  gulp
    .src([SRC.css])
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(gulp.dest(DEST.css));
});

gulp.task('default', () => {
  gulp.start(['css','html']);

  watch([WATCH.css,WATCH.html], () => {
    gulp.start(['css','html']);
  });
});

gulp.task('release', () => {
  gulp.start(['cssrelease']);

});

