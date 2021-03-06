<?php
/**
 * Formatting
 *
 * @since       1.0.0
 * @package     Hello_From_Tonya\Hello_Genesis_AMP\Support
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

namespace Hello_From_Tonya\Hello_Genesis_AMP\Support;

use function Hello_From_Tonya\Hello_Genesis_AMP\get_theme_dir;

// phpcs:ignore Squiz.PHP.CommentedOutCode.Found, Squiz.Commenting.InlineComment.InvalidEndChar
// add_filter( 'get_the_content_more_link', __NAMESPACE__ . '\modify_the_content_more_link', 10, 2 );
/**
 * Modify the content more_link.
 *
 * @since 1.0.0
 *
 * @param string $html           Read more HTML.
 * @param string $more_link_text Read more text.
 *
 * @return string amended HTML.
 */
function modify_the_content_more_link( $html, $more_link_text ) {
	$html = str_replace( '&#x02026; ', '<p>', $html );
	$html = str_replace( '</a>', '</a></p>', $html );
	$html = str_replace( $more_link_text, 'Learn more', $html );

	return $html;
}

/**
 * Render the category's top background title onto the page.
 *
 * @since 1.0.2
 */
function render_category_top_background_title() {
	$category = get_the_category();
	if ( ! $category || is_wp_error( $category ) ) {
		return;
	}

	$category_name = $category[0]->name;
	include get_theme_dir() . '/lib/views/background-text-top.php';
}
