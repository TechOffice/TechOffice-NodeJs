var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('script', function(){
	gulp.src('src/imageEditor.js')
		.pipe(browserify({
			insertGlobals : true,
			debug: !gulp.env.production
		}))
		.pipe(gulp.dest('./build'))
});
