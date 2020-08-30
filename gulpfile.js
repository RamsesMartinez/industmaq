const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

function style() {
  return gulp.src('./assets/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      versions: ['last 2 browsers']
    }))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
}

function browser_sync () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./assets/scss/**/*.scss', style);
  gulp.watch('./*.html').on('change', browserSync.reload);
}

exports.default = browser_sync
exports.style = style