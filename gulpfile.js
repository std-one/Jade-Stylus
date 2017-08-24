var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/
});

var paths = {
	jade    : ["sources/jade/**/*.jade", "!sources/jade/**/_*.jade", "!sources/jade/**/_**/*.jade"],
	stylus  : ["sources/stylus/**/*.styl", "!sources/stylus/**/_*.styl", "!sources/stylus/_**/*.styl"],
	dist    : 'dist'
};

gulp.task('jade', function() {
	gulp.src(paths.jade)
		.pipe($.plumber())
		.pipe($.jade({
			pretty: '\t'
		}))
		.pipe(gulp.dest(paths.dist))
		.pipe(browser.reload({
			stream: true
		}));
});

gulp.task('stylus', function () {
	gulp.src(paths.stylus)
		.pipe($.plumber())
		.pipe($.stylus())
		.pipe($.pleeease({
			autoprefixer: ['last 2 versions', 'android 4.0'],
			mqpacker: false,
			minifier: false
		}))
		.pipe($.csscomb())
		.pipe(gulp.dest(paths.dist + '/assets/css'))
		.pipe(browser.reload({
			stream: true
		}));
});

var browser = require("browser-sync");

gulp.task("server", function () {
	browser({
		online: true,
		open: "external",
		server: {
			baseDir: "dist/",
		}
	});
});

gulp.task('html-reload', function () {
	browser.reload();
});

gulp.task("default", ["server"], function () {
	gulp.watch([paths.jade, 'sources/jade/*.jade', 'sources/jade/_tmpl/*.jade'], ['jade']);
	gulp.watch([paths.stylus, 'sources/stylus/**/_*.styl'], ['stylus']);
	gulp.watch('*html', ['html-reload']);
});
