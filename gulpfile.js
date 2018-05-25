var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
//var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
//делате последовательность
var runSequence = require('run-sequence');
const autoprefixer = require('gulp-autoprefixer');
var notify = require( 'gulp-notify' );
//main
let uglify = require('gulp-uglify-es').default;
var minify = require('gulp-minify');
var pump = require('pump');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
const googleCdn = require('gulp-google-cdn');//dont work
var mainBowerFiles = require('main-bower-files');
const babel = require('gulp-babel');
const webpack = require('webpack-stream'); // .pipe(webpack()) вставить и указать index.js файл в котором import все моудли
 

//gulp.task('default', () =>
//    gulp.src('app/test.html')
//        .pipe(googleCdn(require('./bower.json')))
//        .pipe(gulp.dest('dist'))
//);


//скопирует библиотеки из  bower  к нам в  dist/mainfiles
gulp.task('mainfiles', function() {
    return gulp.src(mainBowerFiles({
      "overrides": {
        "bootstrap": {
            "main": [
                "./dist/js/bootstrap.min.js",
                "./dist/css/bootstrap.min.css"
                ]
        },
           "jquery": {
            "main": [
                "./dist/jquery.min.js"
                ]
        }
          
    }}))
    .pipe(gulp.dest('dist/libs'))
  });


//оптимизация картинок и кэш
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(cache(imagemin({interlaced: true})))
  .pipe(gulp.dest('dist/images'))
});



gulp.task('code', function() {
  gulp.src('app/js/*.js')
    .pipe(babel({
            presets: ['env']
        }))
    .pipe(uglify())
    .pipe(minify({
        ext:{
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.min.js', '-min.js']
    }))
    .pipe(gulp.dest('dist/js'))
});



gulp.task('js_lib', function() {
  return gulp.src('app/js/lib/*.+(js|.min.js)')
    .pipe(gulp.dest('dist/js/lib'));
});



gulp.task('mhtml', function() {
  return gulp.src('app/*.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('dist'));
});



gulp.task('styles', function () {
    gulp.src('app/css/*.css')
        .pipe(cssmin())
//        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});



gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})



gulp.task('clean', function(callback){
  del(['dist/**/*', '!dist/images', '!dist/images/**/*'], callback)
});



gulp.task('sass', function(){
  return gulp.src('app/scss/styles.scss')
 .pipe(sass()).on( 'error', notify.onError(
      {
        message: "<%= error.message %>",
        title  : "Sass Error!"
      } ) )
   // Конвертируем Sass в CSS с помощью gulp-sass
 .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))    
 .pipe(gulp.dest('app/css'))
 .pipe(browserSync.reload({ stream: true}))
});



//перед watch,выполняется browserSync,  и sass (1 раз в начале)
gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']); //если в пути изменения > перезапустить ['sass']
   gulp.watch('app/*.html', browserSync.reload); 
    gulp.watch('app/js/**/*.js', browserSync.reload);
//    gulp.watch('app/images/**/*.+(png|jpg|gif|svg)', browserSync.reload);
  // другие ресурсы
});




gulp.task('browserSync', function() {
  browserSync({
 server: {
 baseDir: './app'
 },
       notify: false // Отключаем уведомления
  })
})



//gulp.task('build', function (callback) {
//  runSequence('clean:dist',   ['sass', 'useref', 'images', 'fonts'], callback)
//})
gulp.task('build', ['styles', 'code', 'js_lib', 'images', 'mhtml', 'fonts', 'mainfiles']);

//gulp.task('default', function (callback) {
//  runSequence(['sass','browserSync', 'watch'],
// callback
//  )
//});