<?php
/**
 * Stop and say "Hello"
 *
 * @package     Hello_From_Tonya\Hello_Genesis_AMP
 * @since       1.0.0
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

namespace Hello_From_Tonya\Hello_Genesis_AMP;

/**
 * Get the absolute path to the root directory of the child theme.
 *
 * @since 1.0.0
 *
 * @return string returns the directory path.
 */
function get_theme_dir() {
	return __DIR__;
}

/**
 * Get the URL to the root of the child theme.
 *
 * @since 1.0.0
 *
 * @return string returns the URL to the root of the child theme.
 */
function get_theme_url() {
	static $url = '';

	if ( ! empty( $url ) ) {
		$url = get_stylesheet_directory_uri();
	}

	return $url;
}

/**
 * Get the theme's version.
 *
 * @since 1.0.0
 *
 * @return string returns the theme's version.
 */
function get_theme_version() {
	static $version = null;

	if ( null !== $version ) {
		return $version;
	}

	if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
		$version = filemtime( CHILD_THEME_DIR . '/style.min.css' );
	} else {
		$version = ( wp_get_theme() )->get( 'Version' );
	}

	return $version;
}

/**
 * Load the theme's files.
 *
 * @since 1.0.0
 */
function autoload() {
	$filenames = array(
		'/support/dependencies-helpers.php',
		'class-theme-setup.php',
		'support/formatting.php',
		'support/load-assets.php',
		'support/markup.php',
		'structure/archive.php',
		'structure/comments.php',
		'structure/footer.php',
		'structure/header.php',
		'structure/nav.php',
		'structure/post.php',
	);

	$folder_root = __DIR__ . '/lib/';

	foreach ( $filenames as $filename ) {
		require_once $folder_root . $filename;
	}
}

/**
 * Sets up the theme.
 *
 * @since 1.0.0
 *
 * @return Theme_Setup returns the theme setup instance.
 */
function setup_theme() {
	static $theme_setup = null;

	if ( null === $theme_setup ) {
		$theme_setup  = new Theme_Setup( require_once __DIR__ . '/config/theme.php' );
		$theme_setup->init();
	}

	return $theme_setup;
}

autoload();
setup_theme();
