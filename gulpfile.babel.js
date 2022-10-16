import gulp from 'gulp'
import del from 'del'
import path from 'path'
import postcss from 'gulp-postcss'
import webpack from 'webpack-stream'
import {create as bsCreate} from 'browser-sync';

const browserSync = bsCreate();
const dir = {
  'src': 'src',
  'dest': 'dist'
}

function start(cd) {

  browserSync.init({
    server: {
        baseDir: "./dist"
    }
  })

  gulp.watch(dir.src+'/css/*.css', gulp.series(css))
  gulp.watch(dir.src+'/js/*.js', gulp.series(js))
  gulp.watch(dir.src+'/*.html', gulp.series(html, browserSync.reload))

  cd()
}
exports.start = start


function css(cd) {
  del.sync(dir.dest+'/css')
  return gulp.src((dir.src+'/css/style.css'))
    .pipe(postcss())
    .pipe(gulp.dest(dir.dest+'/css'))
    .pipe(browserSync.stream())
  cd()
}
exports.css = css


function js(cd) {
  del.sync(dir.dest+'/js')
  return gulp.src((dir.src+'/js/app.js'))
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(dir.dest+'/js'))
    .pipe(browserSync.stream())
  cd()
}
exports.js = js


function html(cd) {
  del.sync([
    dir.dest+'/*.html',
    dir.dest+'/**/*.html'
  ])
  return gulp.src((dir.src+'/**/*.html'))
    .pipe(gulp.dest(dir.dest))
  cd()
}
exports.html = html