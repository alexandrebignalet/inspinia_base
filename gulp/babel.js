'use strict';

import gulp     from 'gulp'
import babel    from 'gulp-babel'
import conf     from './conf'
import path     from 'path'

gulp.task('babel', () =>
gulp.src(path.join(conf.paths.src, '/app/**/*.js'))
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('dist'))
);
