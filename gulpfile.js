const { series } = require('gulp')
const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const postcss = require('gulp-postcss')
const imagemin = require('gulp-imagemin')

sass.compiler = require('node-sass')

function style() {
  return gulp
    .src(['./assets/scss/**/*.scss', './assets/css/src/tailwind.css'])
    .pipe(
      sass({
        outputStyle: 'compressed',
      })
    )
    .pipe(postcss([require('tailwindcss'), require('autoprefixer')]))
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream())
}

function image() {
  return gulp.src('./assets/css/images/*/*').pipe(imagemin()).pipe(gulp.dest('./build/images/'))
}

function browser_sync() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  })
  gulp.watch('./assets/scss/**/*.scss', style)
  gulp.watch('./assets/css/**/*.css', style)
  gulp.watch('./*.html').on('change', browserSync.reload)
}

var webfont_config = {
  types:'eot,woff2,woff,ttf,svg',
  ligatures: true
};


function fonts() {
  return gulp.src('./assets/webfonts/*')
    .pipe(gulp.dest('build/webfonts/'));
}

exports.default = series(style, fonts, image, browser_sync)
exports.style = style
