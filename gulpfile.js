
var gulp = require('gulp');

/*
inject uses gulp-inject to splice the minified javascript (bookmarklet.min.js) into dest/index.html
configured to remove the tags and directly inject the javascript as a string
runs when ./src/index.html or ./dest/bookmarklet.min.js are changed
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
inject-css uses gulp-inject to splice the minified css (style.min.css) into dest/bookmarklet.js
configured to remove the tags and directly inject the style as a string
runs when ./dest/style.min.css or ./src/bookmarklet.js are changed
*/
gulp.task('inject-css', function () {
	var inject = require('gulp-inject');
	gulp.src('./src/bookmarklet.js').pipe(inject(gulp.src(['./dest/style.min.css']), {
    starttag: '/*inject:css*/',
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
configured to mangle the script by shortening variable names and function names.
runs whenever ./src/bookmarklet.js is changed
*/
gulp.task('compress', function () {
	var uglify = require('gulp-uglify');
	var rename = require('gulp-rename');
  return gulp.src('./dest/bookmarklet.js')
    .pipe(uglify({
			mangle: {
				toplevel: true
			},
			output: {
				quote_style: 3
			}
		}))
		.pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dest'));
});
/*
compress uses gulp-clean-css and gulp-rename to minify the style.css into style.min.css
runs whenever ./src/style.css is changed
*/
gulp.task('compress-css', function () {
	var cleanCSS = require('gulp-clean-css');
	var rename = require('gulp-rename');
  return gulp.src('./src/style.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dest'));
});


gulp.task('watch', function(){
	gulp.watch('./src/style.css', ['compress-css']); 
	gulp.watch('./dest/style.min.css', ['inject-css']); 
	gulp.watch('./src/bookmarklet.js', ['inject-css']); 
  gulp.watch('./src/index.html', ['inject']); 
	gulp.watch('./dest/bookmarklet.js', ['compress']);  
	gulp.watch('./dest/bookmarklet.min.js', ['inject']);  
});


gulp.task('default', ['compress-css', 'inject-css', 'compress', 'inject', 'watch']);

//if css changed, compress css, inject css
//if js changed, compress js, inject js
//if html is changed, inject js