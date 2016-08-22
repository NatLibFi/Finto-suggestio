var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function() {
    gulp.src(['app/bower_components/**/*.min.js'])
      .pipe(concat('app/dist_components.js'))
      .pipe(gulp.dest('.'))

    gulp.src(['app/app.js', 'app/new/new.js', 'app/change/change.js', 'app/list/list.js'])
      .pipe(concat('app/dist.js'))
      .pipe(gulp.dest('.'))
    
    gulp.src(['app/bower_components/bootstrap/dist/css/bootstrap.min.css', 'app/bower_components/angular-ui-select/dist/select.min.css', 'app/bower_components/angucomplete-alt/angucomplete-alt.css'])
      .pipe(concat('app/dist.css'))
      .pipe(gulp.dest('.'))
});

gulp.task('js', function() {
    gulp.src(['app/app.js', 'app/new/new.js', 'app/change/change.js', 'app/list/list.js'])
      .pipe(concat('app/dist.js'))
      .pipe(gulp.dest('.'))
});

gulp.task('css', function() {
    gulp.src(['app/bower_components/bootstrap/dist/css/bootstrap.min.css', 'app/bower_components/angular-ui-select/dist/select.min.css', 'app/bower_components/angucomplete-alt/angucomplete-alt.css'])
      .pipe(concat('app/dist.css'))
      .pipe(gulp.dest('.'))
});
