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

var bourbon = require("bourbon").includePaths,
 	neat    = require("bourbon-neat").includePaths;

// Import theme-specific configurations.
var themeConfig = require('./config/theme-config.js');

// Project paths
const paths = {
	config: {
		themeConfig: './config/theme-config.js'
	},
	mainStyle: {
		sass: './assets/scss/main/style.scss',
		src: './style.css',
		dest: './',
		sassMaps: './assets/css/maps'
	},
	auxStyles: {
		src: ['./assets/css/**/*.css', '!./assets/css/*.min.css'],
		dest: './assets/css',
		sass: ['./assets/scss/**/*.scss', '!./assets/scss/main/**/*.scss'],
		sassMaps: './assets/css/maps'
	},
	scripts: {
		src: ['assets/js/**/*.js'],
		min: 'assets/js/*.min.js',
		dest: './assets/js/'
	},
	images: {
		src: ['assets/images/**/*.{jpg,JPG,png,svg,gif,GIF}'],
		dest: 'assets/images/'
	},
	languages: {
		src: ['./**/*.php'],
		dest: './languages/' + themeConfig.theme.slug + '.pot'
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
	if (themeConfig.dev.browserSync.live) {
		server.init({
			proxy: themeConfig.dev.browserSync.proxyURL,
			port: themeConfig.dev.browserSync.bypassPort,
			liveReload: true
		});
	}
	done();
}

// Reload the live site:
function reload(done) {
	themeConfig = requireUncached('./config/theme-config.js');
	if (themeConfig.dev.browserSync.live) {
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
export function runSass(config) {
	return gulp.src(config.sass)
		.pipe(sourcemaps.init())
		// .pipe(sass().on('error', sass.logError))
		.pipe(sass({
			sourcemaps: true,
			includePaths: [bourbon, neat]
		}).on('error', sass.logError))
		.pipe(tabify(2, true))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.dest))
		.on('end', function(){ log("Ran 'runSass'"); });
}

/**
 * CSS via PostCSS + CSSNext (includes Autoprefixer by default).
 */
export function runStyles(config) {
	themeConfig = requireUncached('./config/theme-config.js');

	return gulp.src(config.src)
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
				browsers: themeConfig.dev.browserslist
			})
		]))
		.pipe(gulpif(!themeConfig.dev.debug.styles, cssnano()))
		.pipe(gulpif(!themeConfig.dev.debug.styles, rename({suffix: '.min'})))
		.pipe(gulp.dest(config.dest))
		.on('end', function(){ log("Ran 'runStyles'"); });
}


/**
 * JavaScript via Babel, ESlint, and uglify.
 */
export function scripts() {
	themeConfig = requireUncached('./config/theme-config.js');

	return gulp.src(paths.scripts.src)
		.pipe(newer(paths.scripts.dest))
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(babel())
		.pipe(gulpif(!themeConfig.dev.debug.scripts, uglify()))
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
 * Generate translation files.
 */
export function translate() {
	return gulp.src(paths.languages.src)
		.pipe(sort())
		.pipe(wppot({
			domain: themeConfig.theme.slug,
			package: themeConfig.theme.name,
			bugReport: themeConfig.theme.name,
			lastTranslator: themeConfig.theme.author
		}))
		.pipe(gulp.dest(paths.languages.dest));
}

/**
 * Let's watch everything by running: `gulp watch`.
 */
export function watch() {
	// The main stylesheet's Sass.
	gulp.watch(paths.mainStyle.sass, gulp.series(
		() => {
			return runSass(paths.mainStyle);
		},
		() => {
			return runStyles(paths.mainStyle)
		},
		reload
	));
	// The auxiliary Sass and CSS.
	gulp.watch(paths.auxStyles.sass, gulp.series(
		() => {
			return runSass(paths.auxStyles);
		},
		() => {
			return runStyles(paths.auxStyles)
		},
		reload
	));
	gulp.watch(paths.scripts.src, gulp.series(scripts, reload));
	gulp.watch(paths.scripts.min, gulp.series(jsMin, reload));
	gulp.watch(paths.images.src, gulp.series(images, reload));
}
