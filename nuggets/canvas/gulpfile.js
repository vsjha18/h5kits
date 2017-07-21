var gulp = require('gulp');
connect = require('gulp-connect');
//
// gulp.task('reload', function(){
//     console.log("reloading since few changes were detected ....");
//     connect.reload();
// });


gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['*.html', '*.js', '*.css'], ['html']);
});

gulp.task('serve', function() {
  connect.server({
      root: '.',
      livereload: true,
      port: 5000
  });
});

gulp.task('default', ['serve', 'watch']);
