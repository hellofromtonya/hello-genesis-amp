<?php
/**
 * Missing plugin function helpers.
 *
 * This child theme uses multiple plugins to create the unique experience
 * for our website.  If these plugins are not installed, for example, you
 * are using this on a different website, then this helper file recreates
 * the dependent functions.
 *
 * @package     HelloFromTonya\HelloMinimal\Support
 * @since       1.0.0
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedFunctionFound

if ( ! function_exists( 'get_asset_version_number' ) ) {
	/**
	 * Get the version number for an asset file using the file's timestamp.
	 *
	 * @since 1.0.0
	 *
	 * @param string $asset_file Absolute path to the asset file.
	 *
	 * @return bool|int
	 */
	function get_asset_version_number( $asset_file ) {
		return filemtime( $asset_file );
	}
}

if ( ! function_exists( 'fulcrum_is_dev_environment' ) ) {
	/**
	 * If Fulcrum is not loaded, then return the value of WP_DEBUG.
	 * When it's `true`, then we assume you are in the development
	 * environment.
	 *
	 * @since 1.4.9
	 *
	 * @return bool
	 */
	function fulcrum_is_dev_environment() {
		return WP_DEBUG === true;
	}
}

if ( ! function_exists( 'fulcrum_load_login_form_styling' ) ) {
	/**
	 * If Fulcrum is missing, then this dummy function does nothing,
	 * except prevent the theme from tossing a fatal error.
	 *
	 * @since 1.4.9
	 *
	 * @param string $stylesheet Login form's stylesheet.
	 *
	 * @return void
	 */
	function fulcrum_load_login_form_styling( $stylesheet ) {
		// do nothing.
	}
}
