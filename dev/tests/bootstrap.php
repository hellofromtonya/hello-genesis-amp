<?php
/**
 * Bootstraps the test suite.
 *
 * @package     Hello_From_Tonya\Hello_Genesis_AMP\Tests
 * @since       1.0.0
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

namespace Hello_From_Tonya\Hello_Genesis_AMP\Tests;

use Brain\Monkey;
use Brain\Monkey\Functions;

/**
 * Bootstrap unit, integration and system tests.
 *
 * Check for a `--testsuite system` arg when calling `phpunit`, and use it to conditionally load up WordPress.
 *
 * @since 1.0.0
 */
function bootstrap_tests() {
	define( 'WP_CONTENT_DIR', dirname( dirname( dirname( __DIR__ ) ) ) ); // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedConstantFound
	define( 'CHILD_THEME_ROOT_DIR', dirname( __DIR__ ) ); // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedConstantFound

	// Require patchwork early so that functions can be monkey patched in Unit tests.
	require dirname( __DIR__ ) . '/vendor/antecedent/patchwork/Patchwork.php';

	$phpunit_argv = $GLOBALS['argv'];
	$phpunit_key  = array_search( '--testsuite', $phpunit_argv, true );

	if ( $phpunit_key && 'system' === $phpunit_argv[ $phpunit_key + 1 ] ) {
		bootstrap_systems_tests();
	} else {
		bootstrap_unit_integration();
	}
}

/**
 * Set up and run WordPress testing environment.
 *
 * @since 0.1.0
 */
function bootstrap_systems_tests() {
	$hello_genesis_amp_wp_tests_dir = getenv( 'WP_TESTS_DIR' );
	if ( ! $hello_genesis_amp_wp_tests_dir ) {
		$hello_genesis_amp_wp_tests_dir = '/tmp/wordpress-tests-lib';
	}

	// Give access to tests_add_filter() function.
	require_once $hello_genesis_amp_wp_tests_dir . '/includes/functions.php';

	tests_add_filter(
		'setup_theme',
		function() {
			register_theme_directory( CHILD_THEME_ROOT_DIR );
			switch_theme( basename( CHILD_THEME_ROOT_DIR ) );
		}
	);
}

/**
 * Setup non-WordPress environment for unit testing.
 *
 * @since 0.1.0
 */
function bootstrap_unit_integration() {
	// Load Brain Monkey, etc.
	require CHILD_THEME_ROOT_DIR . '/vendor/autoload.php';

	// Define some WP functions with Brain Monkey.
	Monkey\setUp();
	Functions\when( 'trailingslashit' )->alias(
		function( $string ) {
			return rtrim( $string, '/\\' ) . '/';
		}
	);
}

bootstrap_tests();
