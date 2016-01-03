var gulp = require('gulp');

gulp.task('default', function() {
   gulp.src(['./bower_components/bootstrap/dist/css/bootstrap.min.css',
            './bower_components/jquery/dist/jquery.min.js',
            './bower_components/bootstrap/dist/js/bootstrap.min.js',
            './bower_components/angular/angular.min.js',
            './bower_components/angular-route/angular-route.min.js'])
   .pipe(gulp.dest('./app/lib'));
});
