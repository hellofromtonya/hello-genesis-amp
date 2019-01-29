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
 * Initialize the theme's constants.
 */
define( 'CHILD_THEME_DIR', get_stylesheet_directory() );
define( 'CHILD_THEME_URL', get_stylesheet_directory_uri() );

if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
	define( 'CHILD_THEME_VERSION', get_asset_version_number( CHILD_THEME_DIR . '/style.min.css' ) );
} else {
	define( 'CHILD_THEME_VERSION', ( wp_get_theme() )->get( 'Version' ) );
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

autoload();

$hello_genesis_amp_config = require_once CHILD_CONFIG_DIR . 'theme.php';
$hello_genesis_amp_setup  = new Theme_Setup( $hello_genesis_amp_config );
$hello_genesis_amp_setup->init();
