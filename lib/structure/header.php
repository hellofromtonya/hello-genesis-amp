<?php

/**
 * Header structure customization.
 *
 * Put your header structure customization stuff in here.
 *
 * @package     Hello_From_Tonya\Hello_Genesis_AMP\Structure
 * @since       1.0.0
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

namespace Hello_From_Tonya\Hello_Genesis_AMP\Structure;

remove_action( 'genesis_site_title', 'genesis_seo_site_title' );

add_action( 'genesis_before', __NAMESPACE__ . '\render_fullpage_menu_container' );
/**
 * Render the full page menu container right after the `<body>` tag.
 *
 * @since 1.0.0
 *
 * @return void
 */
function render_fullpage_menu_container() {
	include __DIR__ . '/views/fullpage-menu-container.php';
}

add_action( 'genesis_site_title', __NAMESPACE__ . '\render_site_title_area' );
/**
 * Render out the site title area HTML.
 *
 * @since 1.0.0
 *
 * @return void
 */
function render_site_title_area() {
	$url        = trailingslashit( home_url() );
	$site_title = get_bloginfo( 'name' );

	include __DIR__ . '/views/site-title.php';
}

add_action( 'genesis_header', __NAMESPACE__ . '\render_fullpage_menu_toggle', 11 );
/**
 * Render the fullpage menu toggle (hamburger menu).
 *
 * @since 1.0.0
 */
function render_fullpage_menu_toggle() {
	include __DIR__ . '/views/fullpage-menu-toggle.html';
}
