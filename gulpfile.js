
var gulp = require('gulp');

/*
inject uses gulp-inject to splice the minified javascript (bookmarklet.min.js) into our src in place of the starttag and endtag.
It is configured to remove the tags and directly inject the javascript as a string
It runs whenever the ./src/index.html or ./dest/bookmarklet.min.js are changed
*/
gulp.task('inject', function () {
	var inject = require('gulp-inject');
	gulp.src('./src/index.html').pipe(inject(gulp.src(['./dest/bookmarklet.min.js']), {
    starttag: '/*inject:bookmarklet*/',
	  endtag: '/*endinject*/',
		removeTags: true,
    transform: function (filePath, file) {
      return file.contents.toString('utf8')
    }
  }))
  .pipe(gulp.dest('./dest'));
});

/*
compress uses gulp-uglify and gulp-rename to minify the bookmarklet.js into bookmarklet.min.js
It is configured to mangle the script by shortening variable names and function names.
It runs whenever ./src/bookmarklet.js is changed
*/
gulp.task('compress', function () {
	var uglify = require('gulp-uglify');
	var rename = require('gulp-rename');
  return gulp.src('./src/bookmarklet.js')
    .pipe(uglify({ mangle: { toplevel: true } }))
		.pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dest'));
});


gulp.task('watch', function(){
	gulp.watch('./src/bookmarklet.js', ['compress']); 
  gulp.watch('./src/index.html', ['inject']); 
	gulp.watch('./dest/bookmarklet.min.js', ['inject']);  
});


gulp.task('default', ['compress', 'inject', 'watch']);