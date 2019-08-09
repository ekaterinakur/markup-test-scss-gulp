'use strict';

const gulp = require('gulp');
const clean = require('gulp-clean');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');

const distDirectory = 'public';
const htmlBlob = 'src/*.html';
const imagesBlob = 'src/images/**';
const stylesBlob = 'src/*.scss';
const jsBlob = 'src/*.js';

const { series, parallel } = gulp;

gulp.task('cleanDist', function() {
  return gulp.src(distDirectory, { read: false, allowEmpty: true })
    .pipe(clean());
});

gulp.task('processHtml', function() {
  return gulp.src(htmlBlob)
    .pipe(gulp.dest(distDirectory));
});

gulp.task('processImages', function() {
  return gulp.src(imagesBlob)
    .pipe(gulp.dest(`${distDirectory}/images/`));
});

gulp.task('processStyles', function() {
  return gulp.src(stylesBlob)
    .pipe(sass())
    .pipe(gcmq())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(`${distDirectory}/styles`))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('processJs', function() {
  return gulp.src(jsBlob)
    .pipe(gulp.dest(`${distDirectory}/scripts/`));
});

gulp.task('build', series(
  'cleanDist',
  parallel(
    'processStyles',
    'processHtml',
    'processImages',
    'processJs',
  )
));

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: distDirectory,
    },
    port: 8080,
  });

  gulp.watch(htmlBlob, series('processHtml'))
    .on('change', browserSync.reload);

  gulp.watch(imagesBlob, series('processImages'))
    .on('change', browserSync.reload);

  gulp.watch(stylesBlob, series('processStyles'));

  gulp.watch(jsBlob, series('processJs'))
    .on('change', browserSync.reload);
});

gulp.task('default', series('build', 'serve'));
