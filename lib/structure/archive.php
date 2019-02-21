<?php
/**
 * Archive structure customization.
 *
 * @package     Hello_From_Tonya\Hello_Genesis_AMP\Structure
 * @since       1.0.0
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

namespace Hello_From_Tonya\Hello_Genesis_AMP\Structure;

remove_action( 'genesis_before_loop', 'genesis_do_taxonomy_title_description', 15 );

add_action( 'genesis_before_loop', __NAMESPACE__ . '\render_archive_top_background_text', 1 );
/**
 * Add the first category as the background top text (accent feature).
 *
 * @since 1.0.0
 *
 * @return void
 */
function render_archive_top_background_text() {
	if ( ! is_category() && ! is_tag() && ! is_tax() ) {
		return;
	}

	global $wp_query;

	$term = is_tax()
		? get_term_by( 'slug', get_query_var( 'term' ), get_query_var( 'taxonomy' ) )
		: $wp_query->get_queried_object();

	if ( ! $term ) {
		return;
	}

	$category_name = $term->name;

	include __DIR__ . '/views/category-top-text.php';
}
