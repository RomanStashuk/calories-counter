'use strict';

import gulp from 'gulp';

import path from '../config/paths.js';

// Plugins
import loadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

const gp = loadPlugins();

// Обробка шрифтів
export default () => {
  return gulp.src(path.fonts.src)
    .pipe(gp.plumber({
      errorHandler: gp.notify.onError(error => ({
        title: 'Fonts',
        message: error.message
      }))
    }))
    .pipe(gp.newer(path.fonts.dest))
    .pipe(gulp.dest(path.fonts.dest))
    .pipe(browserSync.stream());
};
