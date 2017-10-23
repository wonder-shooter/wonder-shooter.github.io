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

const SRC = {
  css: 'src/assets/_scss/**/*.scss',
  html: 'src/**/*.pug',
  data: 'src/_data/'
};

const DEST = {
  css: 'htdocs/assets/css/',
  html: 'htdocs/'
};


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

  watch(SRC.css, () => {
    gulp.start(['css','html']);
  });
});

gulp.task('release', () => {
  gulp.start(['cssrelease']);

});

