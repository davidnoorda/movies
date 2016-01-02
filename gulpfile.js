var gulp = require('gulp');

gulp.task('default', function() {
   gulp.src(['./bower_components/bootstrap/dist/css/bootstrap.min.css',
            './bower_components/angular/angular.min.js'])
   .pipe(gulp.dest('./app/lib'));
});
