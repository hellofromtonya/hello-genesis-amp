/* eslint-env es6 */
'use strict';

/**
 * To start theme building process, define the theme name below,
 * then run "gulp" in command line.
 */

import gulp from 'gulp';
import browserSync from 'browser-sync';
import cssnano from 'gulp-cssnano';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import log from 'fancy-log';
import gulpif from 'gulp-if';
import image from 'gulp-image';
import newer from 'gulp-newer';
import postcssPresetEnv from 'postcss-preset-env';
import phpcs from 'gulp-phpcs';
import postcss from 'gulp-postcss';
import print from 'gulp-print';
import requireUncached from 'require-uncached';
var rename = require("gulp-rename");
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import sort from 'gulp-sort';
import tabify from 'gulp-tabify';
import uglify from 'gulp-uglify';
import wppot from 'gulp-wp-pot';

// Import theme-specific configurations.
var config = require('./config/theme-config.js');

// Project paths
const paths = {
	config: {
		themeConfig: './config/theme-config.js'
	},
	styles: {
		src: ['./assets/css/**/*.css', './assets/dist/css/*.css', '!./assets/dist/css/*.min.css'],
		dest: './assets/dist/css',
		sass: ['./assets/scss/*.scss'],
		sassMaps: './assets/dist/css/maps'
	},
	scripts: {
		src: ['assets/js/**/*.js'],
		min: 'assets/dist/js/*.min.js',
		dest: './assets/dist/js/'
	},
	images: {
		src: ['assets/images/**/*.{jpg,JPG,png,svg,gif,GIF}'],
		dest: 'assets/dist/images/'
	},
	languages: {
		src: ['./**/*.php'],
		dest: './languages/' + config.theme.slug + '.pot'
	}
};

/**
 * Conditionally set up BrowserSync.
 * Only run BrowserSync if config.browserSync.live = true.
 */

// Create a BrowserSync instance:
const server = browserSync.create();

// Initialize the BrowserSync server conditionally:
function serve(done) {
	if (config.dev.browserSync.live) {
		server.init({
			proxy: config.dev.browserSync.proxyURL,
			port: config.dev.browserSync.bypassPort,
			liveReload: true
		});
	}
	done();
}

// Reload the live site:
function reload(done) {
	config = requireUncached('./config/theme-config.js');
	if (config.dev.browserSync.live) {
		if (server.paused) {
			server.resume();
		}
		server.reload();
	} else {
		server.pause();
	}
	done();
}

/**
 * Convert Sass into CSS.
 */
export function sassStyles() {
	return gulp.src(paths.styles.sass)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(tabify(2, true))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./assets/dist/css'));
}

/**
 * CSS via PostCSS + CSSNext (includes Autoprefixer by default).
 */
export function styles() {
	config = requireUncached('./config/theme-config.js');

	return gulp.src(paths.styles.src)
		.pipe(print())
		.pipe(phpcs({
			bin: 'vendor/bin/phpcs',
			standard: 'WordPress',
			warningSeverity: 0
		}))
		// Log all problems that was found
		.pipe(phpcs.reporter('log'))
		.pipe(postcss([
			postcssPresetEnv({
				stage: 3,
				browsers: config.dev.browserslist
			})
		]))
		.pipe(gulpif(!config.dev.debug.styles, cssnano()))
		.pipe(gulpif(!config.dev.debug.styles, rename({suffix: '.min'})))
		.pipe(gulp.dest(paths.styles.dest));
}


/**
 * JavaScript via Babel, ESlint, and uglify.
 */
export function scripts() {
	config = requireUncached('./config/theme-config.js');

	return gulp.src(paths.scripts.src)
		.pipe(newer(paths.scripts.dest))
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(babel())
		.pipe(gulpif(!config.dev.debug.scripts, uglify()))
		.pipe(gulp.dest(paths.scripts.dest));
}


/**
 * Copy minified JS files without touching them.
 */
export function jsMin() {
	return gulp.src(paths.scripts.min)
		.pipe(newer(paths.scripts.dest))
		.pipe(gulp.dest(paths.scripts.dest));
}

/**
 * Optimize images.
 */
export function images() {
	return gulp.src(paths.images.src)
		.pipe(newer(paths.images.dest))
		.pipe(image())
		.pipe(gulp.dest(paths.images.dest));
}


/**
 * Watch everything
 */
export function watch() {
	// gulp.watch(paths.styles.sass, gulp.series(sassStyles, styles, reload));
	gulp.watch(paths.styles.sass, sassStyles);
	gulp.watch(paths.styles.src, gulp.series(styles, reload));
	gulp.watch(paths.scripts.src, gulp.series(scripts, reload));
	gulp.watch(paths.scripts.min, gulp.series(jsMin, reload));
	gulp.watch(paths.images.src, gulp.series(images, reload));
}

/**
 * Generate translation files.
 */
export function translate() {
	return gulp.src(paths.languages.src)
		.pipe(sort())
		.pipe(wppot({
			domain: config.theme.slug,
			package: config.theme.name,
			bugReport: config.theme.name,
			lastTranslator: config.theme.author
		}))
		.pipe(gulp.dest(paths.languages.dest));
}
