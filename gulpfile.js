var 
  gulp          = require("gulp"),
  
  // локальный сервер
	connect       = require("gulp-connect"),
  
  // компилятор файлов jade в html
	gulpjade      = require("gulp-jade"),
  
  // компилятор файлов scss в css
	sass          = require("gulp-sass"),
  
  // добавление префиксов к свойсвам css
  autoprefixer  = require('gulp-autoprefixer'),
  
  // склеивает js и css заключенные в специальные комментарии в html
  useref        = require('gulp-useref'),
  
  // фильтрует подключенные в файле html файлы js и css
  gulpif        = require('gulp-if'),
  
  // минифицирует js
  uglify        = require('gulp-uglify'),
  
  // минифицирует CSS
  minifyCss     = require('gulp-minify-css'),

  // открытие окна браузера
	opn           = require("opn"),

  // расставляет красивые отступы в файле html
  prettify      = require('gulp-prettify'),
  
  // очистка папки
  clean         = require('gulp-clean'),

  // фильтр по файлам
  filter         = require('gulp-filter'),

  // фильтр по файлам
  size         = require('gulp-size'),

  // автоматичесткое добавление плагинов и библиотек из bower
	wiredep       = require('wiredep').stream;






// task по умолчанию
gulp.task('default', ['jade', 'sass', 'connect', 'watch']);

// следим за файлами и запускаем при их редактировании нужный task
gulp.task('watch', function () {
  gulp.watch(['./app/layouts/**/*.jade'], ['jade']);
  gulp.watch(['./app/scss/*.scss'], ['sass']);
  gulp.watch(['bower.json'], ['jade']);
});


// склеиваем, сжимаем все подлюченные скрипты и переносим вместе с файлами html в папку dist
gulp.task('useref', function () {
    var assets = useref.assets();
    
    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

// очищаем папку
gulp.task('clean', function(){
  gulp.src('dist')
    .pipe(clean());
});

// перенос шрифтов в папку dist
gulp.task('fonts', function(){
  gulp.src('app/css/fonts/*')
    .pipe(filter(['*.eot','*.svg','*.ttf','*.woff','*.woff2',]))
    .pipe(gulp.dest('dist/css/fonts/'));
});

// перенос картинок в папку dist
gulp.task('images', function(){
  gulp.src('app/img/**/*')
    .pipe(filter(['*.jpg','*.gif','*.png','*.jpeg']))
    .pipe(gulp.dest('dist/img'));
});

// функция вывода текста с ошибкой в консоли
function log(error) {
    console.log([
        '',
        "----------ERROR MESSAGE START----------",
        ("[" + error.name + " in " + error.plugin + "]"),
        error.message,
        "----------ERROR MESSAGE END----------",
        ''
    ].join('\n'));
    this.end();
}

// запуск локального сервера
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port: 8848
  });
  opn('http://localhost:8848');
});
 
// компилируем jade в html
gulp.task('jade', function () {
  gulp.src('./app/layouts/index.jade')
    .pipe(gulpjade())
    .pipe(wiredep({
      direcory: "app/bower",
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(prettify({indent_size: 2}))
    .on('error', log)
    .pipe(gulp.dest('./app'));
});

// компилируем sass в css
gulp.task('sass', function () {
  gulp.src('./app/scss/*.scss')
    .pipe(sass())
    .on('error', log)
    .pipe(autoprefixer({
              browsers: ['last 30 version', 'ie > 7'],
              cascade: true
          }))
    .pipe(gulp.dest('./app/css'))
    .pipe(connect.reload());
});


// скрипт сборки в папку dist
gulp.task('dist',['useref','images','fonts'], function(){
  return gulp.src('dist/**/*').pipe(size({title: 'build'}));
});

gulp.task('build',['clean','jade','sass'], function(){
  gulp.start('dist');
});

gulp.task('connect-dist', function() {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 8838
  });
  opn('http://localhost:8838');
});