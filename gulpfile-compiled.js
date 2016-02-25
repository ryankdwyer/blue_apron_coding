'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', function () {
  return gulp.src('js/*.js').pipe(babel({
    presets: ['es2015']
  })).pipe(gulp.dest('public/js'));
});

//# sourceMappingURL=gulpfile-compiled.js.map