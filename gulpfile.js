const { series } = require('gulp')
const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const postcss = require('gulp-postcss')
const webp = require('gulp-webp')
const purgecss = require('gulp-purgecss')

sass.compiler = require('node-sass')

function style() {
  return gulp
    .src(['./assets/scss/**/*.scss', './assets/css/src/tailwind.css'])
    .pipe(sass())
    .pipe(purgecss({content: ['./**/*.html']}))
    .pipe(postcss([require('tailwindcss'), require('autoprefixer')]))
    .pipe(
      sass({
        outputStyle: 'compressed',
      })
    )
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream())
}

function imageConvertTask() {
  return gulp
    .src([
      './assets/css/images/*',
      './assets/css/images/*/*',
    ])
    .pipe(webp())
    .pipe(gulp.dest('./build/images/'))
}

function browserSyncTask() {
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
  types: 'eot,woff2,woff,ttf,svg',
  ligatures: true,
}

function fonts() {
  return gulp.src('./assets/webfonts/*').pipe(gulp.dest('build/webfonts/'))
}

exports.default = series(style, fonts, imageConvertTask, browserSyncTask)
exports.style = series(style, fonts, imageConvertTask)
