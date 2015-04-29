var gulp = require("gulp"),
	connect = require("gulp-connect"),
	jade = require("gulp-jade"),
	sass = require("gulp-sass"),
	opn = require("opn"),
	wiredep = require('wiredep').stream;


gulp.task('make', function () {
    var assets = useref.assets();
    
    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});



gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port: 8848
  });
});
 

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('jade', function () {
  gulp.src('./app/layouts.jade/index.jade')
    .pipe(jade({
    	pretty: true
    }))
    .pipe(wiredep({
      direcory: "app/bower"
    }))
    .pipe(gulp.dest('./app'))
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  gulp.src('./app/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./app/css'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./app/layouts.jade/**/*.jade'], ['jade']);
  gulp.watch(['./app/scss/*.scss'], ['sass']);
  gulp.watch(['bower.json'], ['bower'])
});
 

gulp.task('default', ['connect', 'watch']);


gulp.task('bower', function () {
  gulp.src('./app/*.html')
    .pipe(wiredep({
      direcory: "app/bower"
    }))
    .pipe(gulp.dest('./app'));
});