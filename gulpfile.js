const { series } = require('gulp')
const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const postcss = require('gulp-postcss')
const imagemin = require('gulp-imagemin')
const rename = require('gulp-rename')
const imagesConvert = require('gulp-images-convert')

sass.compiler = require('node-sass')

function style() {
  return gulp
    .src(['./assets/scss/**/*.scss', './assets/css/src/tailwind.css'])
    .pipe(sass())
    .pipe(postcss([require('tailwindcss'), require('autoprefixer')]))
    .pipe(
      sass({
        outputStyle: 'compressed',
      })
    )
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream())
}

function imageMinTask() {
  return gulp
    .src('./assets/css/images/*/*')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest('./build/images/'))
}

function imageConvertTask() {
  return gulp
    .src('./build/images/*/*.png')
    .pipe(imagesConvert({ targetType: 'jpg' }))
    .pipe(rename({ extname: '.jpeg' }))
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

exports.default = series(
  style,
  fonts,
  imageMinTask,
  imageConvertTask,
  browserSyncTask
)
exports.style = series(
  style,
  fonts,
  imageMinTask,
  imageConvertTask
)
