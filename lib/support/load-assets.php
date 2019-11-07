<?php

/**
 * Enqueue assets
 *
 * @since       1.0.0
 * @package     Hello_From_Tonya\Hello_Genesis_AMP\Support
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

namespace Hello_From_Tonya\Hello_Genesis_AMP\Support;

use function Hello_From_Tonya\Hello_Genesis_AMP\get_theme_version;
use function Hello_From_Tonya\Hello_Genesis_AMP\is_in_debug;
use function Hello_From_Tonya\Hello_Genesis_AMP\get_theme_dir;
use function Hello_From_Tonya\Hello_Genesis_AMP\get_theme_url;

add_filter( 'stylesheet_uri', __NAMESPACE__ . '\change_stylesheet_uri_to_min' );
/**
 * Change the stylesheet to the minified version.
 *
 * @since 1.0.0
 *
 * @param string $stylesheet_uri Stylesheet URI for the current theme/child theme.
 *
 * @return string When not in debug, returns the minified stylesheet's URI.
 */
function change_stylesheet_uri_to_min( $stylesheet_uri ) {
	if ( is_in_debug() ) {
		return $stylesheet_uri;
	}

	return get_theme_url() . '/style.min.css';
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_assets' );
/**
 * Enqueue assets.
 *
 * @since 1.1.0
 *
 * @return void Bails out when AMP endpoint.
 */
function enqueue_assets() {
	enqueue_fonts();

	wp_enqueue_style( 'fontawesome-css', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.2/css/font-awesome.min.css', [], '4.6.2' );

	if ( genesis_is_amp() ) {
		return;
	}

	wp_enqueue_script(
		'hello_smooth_scroll',
		get_theme_url() . '/assets/js/jquery.project.min.js',
		[ 'jquery' ],
		get_theme_version(),
		true
	);
}

/**
 * Load fonts.
 *
 * @since 1.0.0
 */
function enqueue_fonts() {
	$config = require_once get_theme_dir() . '/config/fonts.php';
	$fonts  = get_fonts_url( $config );

	wp_enqueue_style( $config['handle'], $fonts, [], null );
}

/**
 * Build Google fonts URL.
 *
 * @since  1.0.0
 *
 * @param array $config Array of fonts.
 *
 * @return string Returns the Google font's URL.
 */
function get_fonts_url( array $config ) {
	$query_args = [
		'family' => implode( '|', $config['font_families'] ),
		'subset' => $config['encode_subset'],
	];

	$fonts_url = add_query_arg( $query_args, '//fonts.googleapis.com/css' );

	return $fonts_url;
}
