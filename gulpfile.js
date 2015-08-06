var gulp = require("gulp");

var uglify = require("gulp-uglify"),
		rename = require("gulp-rename"),
		clean = require("gulp-clean"),
		imagemin = require("gulp-imagemin"),
		watch = require("gulp-watch"),
		concat = require("gulp-concat");

// js压缩与合并
gulp.task('javascripts', function() {
	gulp.src("./js/jsqrcode/*.js")
			.pipe(concat('main.js'))
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
	gulp.run("javascripts", "imagemin");
});

gulp.task("default", ["clean"], function() {
	gulp.run("develop");
});