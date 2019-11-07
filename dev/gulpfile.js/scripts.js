/* eslint-env es6 */
'use strict';

const gulp = require('gulp');

const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const log = require('fancy-log'); // Writes messages out to the console.
const rename = require('gulp-rename'); // Renames .js to .min.js.

const config = require('./config.js');

/**
 * Optimize the script(s) by transpiling via Babel and minifying via uglify.
 */
function optimizeScripts() {
	return gulp.src(config.scripts.src)
		// Transpile newer JS for cross-browser support.
		// Babel uses .browserlistrc.
		.pipe(babel({
			"presets": ["@babel/preset-env"]
		}))
		// Minify the script(s).
		.pipe(uglify())
		// Rename the .js to .min.js.
		.pipe(rename({suffix: '.min'}))
		// Write out the script to the configured <filename>.min.js destination.
		.pipe(gulp.dest(config.scripts.dest))
		// When done, print out a message to the console.
		.on('end', () =>{
			log(config.scripts.messages.optimize);
		});
}

/**
 * Lint the scripts using ESLint + WordPress' coding standards.
 */
function lintScripts() {
	return gulp.src(config.scripts.src)
		// eslint() attaches the lint output to the "eslint" property
		// of the file object so it can be used by other modules.
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failAfterError last.
		.pipe(eslint.failAfterError())
		// When done, print out a message to the console.
		.on('end', () =>{
			log(config.scripts.messages.lint);
		});
}

/**
 * Run the style tasks once by typing: `gulp scripts`.
 */
module.exports.scripts = gulp.series(
	() => {
		return optimizeScripts()
	},
	() => {
		return lintScripts()
	}
);

/**
 * Run the script tasks once by typing: `gulp lintScripts`.
 */
module.exports.lintScripts = gulp.series(
	() => {
		return lintScripts()
	}
);
