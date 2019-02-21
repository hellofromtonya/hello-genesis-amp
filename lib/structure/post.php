<?php
/**
 * Post structure customization.
 *
 * @package     Hello_From_Tonya\Hello_Genesis_AMP\Structure
 * @since       1.0.0
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

namespace Hello_From_Tonya\Hello_Genesis_AMP\Structure;

remove_all_actions( 'genesis_entry_footer' );

add_action(
	'genesis_before_entry_content',
	/**
	 * Render the scroll to top target HTML when AMP endpoint.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	function() {
		if ( ! genesis_is_amp() ) {
			return;
		}

		require __DIR__ . '/views/scroll-to-target.html';
	}
);

add_action( 'genesis_entry_header', __NAMESPACE__ . '\render_single_top_background_text', 1 );
/**
 * Add the first category as the background top text (accent feature).
 *
 * @since 1.0.0
 *
 * @return void
 */
function render_single_top_background_text() {
	if ( ! is_single() ) {
		return;
	}
	$category = get_the_category();
	if ( ! $category || is_wp_error( $category ) ) {
		return;
	}
	$category_name = $category[0]->name;
	include __DIR__ . '/views/background-text-top.php';
}

add_filter( 'genesis_post_info', __NAMESPACE__ . '\date_only_for_post_info' );
/**
 * Change the post info to only display the little ole date.
 *
 * @since 1.0.0
 *
 * @return string
 */
function date_only_for_post_info() {
	return '[post_date] | [post_categories before=""]';
}

add_filter( 'the_content_more_link', __NAMESPACE__ . '\change_the_read_more_link' );
add_filter( 'get_the_content_more_link', __NAMESPACE__ . '\change_the_read_more_link' );
/**
 * Change the Read More Link HTML Markup and content.
 *
 * @since 1.0.0
 *
 * @param string $html
 *
 * @return string
 */
function change_the_read_more_link( $html ) {
	$html = change_read_more_text( $html, 'Continue reading' );

	if ( doing_filter( 'get_the_content_more_link' ) ) {
		$html = strip_off_read_more_opening_dots( $html );

		return '</p><p>' . $html;
	}

	return sprintf( '<p>%s</p>', $html );
}

/**
 * Strips off the read more link's opening dot pattern.
 *
 * @since 1.0.0
 *
 * @param string $html
 * @param string $dots Dots pattern to strip off
 *
 * @return string
 */
function strip_off_read_more_opening_dots( $html, $dots = '&#x02026; ' ) {
	return substr( $html, strlen( $dots ) );
}

/**
 * Replace the read more text from the Genesis default text of '[Read more...]' to
 * the new specified replacement text.
 *
 * @since 1.0.0
 *
 * @param string $html             Read more link HTML
 * @param string $replacement_text Replacement text
 *
 * @return string
 */
function change_read_more_text( $html, $replacement_text ) {
	return str_replace( '[Read more...]', $replacement_text, $html );
}

add_action( 'genesis_after_entry', __NAMESPACE__ . '\add_post_prev_next_to_singles', 8 );
/**
 * Add Prev/Next to bottom of the singles.
 *
 * @since 1.0.0
 *
 * @return void
 */
function add_post_prev_next_to_singles() {
	if ( ! is_single() ) {
		return;
	}

	$previous = get_previous_post();
	$next     = get_next_post();

	include 'views/single-navigation.php';
}

add_action( 'genesis_after_entry', __NAMESPACE__ . '\render_inpost_widget_area', 7 );
/**
 * Description.
 *
 * @since 1.0.0
 *
 * @return void
 */
function render_inpost_widget_area() {
	if ( ! is_single() ) {
		return;
	}

	genesis_widget_area( 'adspot', array(
		'before' => '<div class="adspot"><div class="wrap">',
		'after'  => '</div></div>',
	) );

	genesis_widget_area( 'inpost', array(
		'before' => '<div class="inpost"><div class="wrap">',
		'after'  => '</div></div>',
	) );
}

/**
 * Render the hero area.
 *
 * @since 1.0.0
 */
function render_hero() {
	/**
	 * Adds class attributes to the hero section.
	 *
	 * @since 1.0.0
	 *
	 * @param array $attributes Array of attributes.
	 *
	 * @return array Amended attributes for `entry-header` element.
	 */
	add_filter( 'genesis_attr_entry-header', function( array $attributes ) {
		$attributes['class'] = 'section--hero  section--fullwindow section';

		return $attributes;
	} );

	remove_action( 'genesis_entry_header', 'genesis_do_post_title' );
	/**
	 * Render the hero content.
	 *
	 * @since 1.0.0
	 */
	add_action( 'genesis_entry_header', function() {
		$quote = $subtitle1 = genesis_get_custom_field( '_hellofromtonya_hero_quote' );
		if ( ! $quote ) {
			$subtitle1 = genesis_get_custom_field( '_hellofromtonya_hero_subtitle1' );
			$subtitle2 = genesis_get_custom_field( '_hellofromtonya_hero_subtitle2' );
		}

		include __DIR__ . '/views/hero.php';

		$nav_id = genesis_get_custom_field( '_hellofromtonya_hero_nav' );
		if ( $nav_id ) {
			wp_nav_menu( [
				'fallback_cb'     => '',
				'container'       => 'nav',
				'container_class' => 'hero--nav',
				'menu_class'      => 'hero--nav-menu',
				'menu'            => wp_get_nav_menu_object( $nav_id ),
			] );
		}
	} );

}
