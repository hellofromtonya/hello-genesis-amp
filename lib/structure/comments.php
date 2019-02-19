<?php
/**
 * Comments structure customization.
 *
 * @package     Hello_From_Tonya\Hello_Genesis_AMP\Structure
 * @since       1.0.0
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

namespace Hello_From_Tonya\Hello_Genesis_AMP\Structure;

add_action( 'genesis_after_entry', __NAMESPACE__ . '\render_comments_background_text_top', 9 );
function render_comments_background_text_top() {
	if ( ! is_single() ) {
		return;
	}

	include __DIR__ . '/views/comments-background-text-top.php';
}

add_filter( 'comment_form_defaults', __NAMESPACE__ . '\customize_comments_form_defaults' );
/**
 * Modify the comment form default arguments.
 *
 * @since 1.0.0
 *
 * @param array $parameters
 *
 * @return mixed
 */
function customize_comments_form_defaults( array $parameters ) {
	$parameters['title_reply'] = __( 'What do you think?', 'UpTechLabs\HelloMinimal' );

	return $parameters;
}
