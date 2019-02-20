<?php

/**
 * Enqueue assets
 *
 * @package     Hello_From_Tonya\Hello_Genesis_AMP\Support
 * @since       1.0.0
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

namespace Hello_From_Tonya\Hello_Genesis_AMP\Support;

use function Hello_From_Tonya\Hello_Genesis_AMP\is_in_debug;
use function Hello_From_Tonya\Hello_Genesis_AMP\get_theme_dir;
use function Hello_From_Tonya\Hello_Genesis_AMP\get_theme_url;

add_filter( 'stylesheet_uri', __NAMESPACE__ . '\change_stylesheet_uri_to_min' );
/**
 * Change the stylesheet to the minified version.
 *
 * @since 1.0.0
 *
 * @param string $stylesheet_uri
 *
 * @return string
 */
function change_stylesheet_uri_to_min( $stylesheet_uri ) {
	if ( is_in_debug() ) {
		return $stylesheet_uri;
	}

	return get_theme_url() . '/style.min.css';
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_fonts' );
/**
 * Load fonts.
 *
 * @since 1.0.0
 *
 * @return void
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
 * @return string
 */
function get_fonts_url( array $config ) {
	$query_args = [
		'family' => implode( '|', $config['font_families'] ),
		'subset' => $config['encode_subset'],
	];

	$fonts_url = add_query_arg( $query_args, '//fonts.googleapis.com/css' );

	return $fonts_url;
}
