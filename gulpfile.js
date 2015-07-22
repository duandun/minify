var gulp = require("gulp");

var uglify = require("gulp-uglify"),
		rename = require("gulp-rename"),
		clean = require("gulp-clean"),
		imagemin = require("gulp-imagemin");

// js压缩
gulp.task('javascripts', function() {
	gulp.src("./js/**/*.js")
			.pipe(rename({suffix: '.min'}))
			.pipe(uglify())
			.pipe(gulp.dest("./dest"));
});

// image压缩
gulp.task("imagemin", function() {
	return gulp.src("./img/**/*")
						.pipe(imagemin())
						.pipe(gulp.dest("./dest/img"));
});

gulp.task("clean", function() {
	return gulp.src(["./dest"], {read: false})
						.pipe(clean({force: true}));
});

gulp.task("develop", function() {
	gulp.run("javascripts");
});

gulp.task("default", ["clean"], function() {
	gulp.run("develop");
});