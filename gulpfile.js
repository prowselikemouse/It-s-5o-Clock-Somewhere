var src = {srcSCSS: './styles/**/*.scss', srcJS: './scripts/**/*.js'}
var dest = {destCSS: './public/styles/', destJS: './public/scripts/'}

var gulp = require('gulp'),
		browserSync = require('browser-sync'),
		reload = browserSync.reload,
		autoprefixer = require('gulp-autoprefixer'),
		concat = require('gulp-concat'),
		imageMin = require('gulp-imagemin'),
		minifyCSS = require('gulp-minify-css'),
		notify = require('gulp-notify'),
		plumber = require('gulp-plumber'),
		sass = require('gulp-sass'),
		sourcemaps = require('gulp-sourcemaps'),
		uglify = require('gulp-uglify');

gulp.task('bs', function() {
	browserSync.init({
		proxy: 'http://localhost:8888'
	});
});

gulp.task('styles', function() {
	return gulp.src(src.srcSCSS)
		.pipe(plumber({
		  errorHandler: notify.onError("Error: <%= error.message %>")
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(minifyCSS())
		.pipe(concat('style.css'))
		.pipe(autoprefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dest.destCSS))
		.pipe(reload({ stream: true }));
});

gulp.task('scripts', function () {
	return gulp.src(src.srcJS)
		.pipe(plumber({
		  errorHandler: notify.onError("Error: <%= error.message %>")
		}))
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dest.destJS))
		.pipe(reload({stream:true}));
});

gulp.task('images', function () {
	return gulp.src('./images/**/*')
		.pipe(imageMin())
		.pipe(gulp.dest('./images'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch('./js/**/*.js', ['scripts']);
	gulp.watch('./**/*.php', reload);
});

gulp.task('default', ['styles', 'scripts', 'images', 'bs', 'watch']);