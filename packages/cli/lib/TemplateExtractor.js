const gulp = require('gulp');
const ejs = require('gulp-ejs');
const merge = require('lodash/merge');
const path = require('path');

const defaults = {
  gulpDest: {
    overwrite: true
  },
  ejs: {}
};

class TemplateExtractor {
  extractTemplate(context, files, dest, data, options) {
    options = merge({}, defaults, options);
    return new Promise((resolve, reject) => {
      const src = path.resolve(context, files);
      gulp.src(src, { base: context })
        .pipe(ejs(data, options.ejs))
        .pipe(gulp.dest(dest, options.gulpDest))
        .on('error', reject)
        .on('end', resolve);
    });
  }
}

module.exports = TemplateExtractor;
