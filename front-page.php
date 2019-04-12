<?php

/**
 * Front Page template
 *
 * @package     Hello_From_Tonya\Hello_Genesis_AMP
 * @since       1.0.0
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

namespace Hello_From_Tonya\Hello_Genesis_AMP;

use function Hello_From_Tonya\Hello_Genesis_AMP\Structure\render_hero;

remove_action( 'genesis_entry_header', 'genesis_do_post_title' );

render_hero();

add_shortcode( 'latest_from_my_blog', __NAMESPACE__ . '\build_latest_from_my_blog_shortcode' );
function build_latest_from_my_blog_shortcode( $attributes ) {
	$defaults   = [
		'post_type'      => 'post',
		'posts_per_page' => 4,
	];
	$attributes = shortcode_atts( $defaults, $attributes, 'latest_from_my_blog' );

	remove_filter( 'genesis_attr_entry-header', 'Hello_From_Tonya\Hello_Genesis_AMP\Structure\add_hero_section_attribute' );
	add_action( 'genesis_entry_header', 'genesis_do_post_title' );
	remove_action( 'genesis_entry_header', 'Hello_From_Tonya\Hello_Genesis_AMP\Structure\render_hero_content' );
	add_filter( 'genesis_post_title_output', __NAMESPACE__ . '\change_post_title_to_h3' );
	function change_post_title_to_h3( $html ) {

		$html = str_replace( '<h2', '<h3', $html );

		return str_replace( '</h2>', '</h3>', $html );
	}
	remove_action( 'genesis_after_endwhile', 'genesis_posts_nav' );

	ob_start();
	genesis_custom_loop( $attributes );
	$html = ob_get_clean();

	// Reset it all back.
	add_action( 'genesis_after_endwhile', 'genesis_posts_nav' );
	remove_filter( 'genesis_post_title_output', __NAMESPACE__ . '\change_post_title_to_h3' );

	return $html;
}

genesis();
