"use strict";
var gulp = require('gulp');
var concat = require('gulp-concat');
var CacheBuster = require('gulp-cachebust');
var cbust = new CacheBuster();
var paths = {
  code: ['app/app.js', 'app/new/new.js', 'app/change/change.js', 'app/list/list.js', 'app/help/help.js'],
  all: ['app/app.js', 'app/new/new.js', 'app/change/change.js', 'app/list/list.js', 'app/help/help.js', 'app/*.html', 'app/*/*.html', 'app/app.css'],
};

gulp.task('deps', async function() {
    gulp.src(['app/bower_components/**/*.min.js'])
      .pipe(concat('app/dist_components.js'))
      .pipe(gulp.dest('dist'));

    gulp.src(['app/bower_components/bootstrap/dist/css/bootstrap.min.css', 'app/bower_components/angular-ui-select/dist/select.min.css', 'app/bower_components/angucomplete-alt/angucomplete-alt.css'])
      .pipe(concat('dist.css'))
      .pipe(gulp.dest('dist'));
});

gulp.task('js', async function() {
    return gulp.src(paths.code)
      .pipe(concat('app/dist.js'))
      .pipe(cbust.resources())
      .pipe(gulp.dest('dist'));
});

gulp.task('css', async function() {
    gulp.src('app/app.css')
      .pipe(concat('app.css'))
      .pipe(gulp.dest('dist'));
});

gulp.task('html', gulp.series('js', 'css'), async function() {
    return gulp.src(['./app/index.html', './app/*/*.html', './app/*.php'], { base: './' })
      .pipe(cbust.references())
      .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch(paths.all, gulp.series('html'));
});

gulp.task('default', gulp.series('watch', 'js', 'html', 'css'));
