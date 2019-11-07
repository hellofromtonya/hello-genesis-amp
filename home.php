<?php
/**
 * Posts Page template
 *
 * I'm doing a template here because I want to grab the contents from the page and display
 * it at the top as a greeting to welcome visitors.
 *
 * @since       1.0.0
 * @package     Hello_From_Tonya\Hello_Genesis_AMP
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

namespace Hello_From_Tonya\Hello_Genesis_AMP;

use function Hello_From_Tonya\Hello_Genesis_AMP\Structure\render_hero_content;

add_action( 'genesis_before_content_sidebar_wrap', __NAMESPACE__ . '\render_contents' );
/**
 * Render the contents out to the browser.
 *
 * @since 1.0.0
 */
function render_contents() {
	$post_id        = get_option( 'page_for_posts' );
	$page_for_posts = get_post( $post_id );

	if ( ! $page_for_posts ) {
		return;
	}

	include __DIR__ . '/lib/views/hero-section.php';
}

genesis();
