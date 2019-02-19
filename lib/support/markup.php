<?php
/**
 * Description
 *
 * @package     Hello_From_Tonya\Hello_Genesis_AMP\Support
 * @since       1.0.0
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

namespace Hello_From_Tonya\Hello_Genesis_AMP\Support;

add_filter( 'genesis_attr_taxonomy-archive-description', __NAMESPACE__ . '\add_fullpage_title_to_attributes', 20 );
add_filter( 'genesis_attr_entry-title', __NAMESPACE__ . '\add_fullpage_title_to_attributes', 20 );
/**
 * Add the `fullpage-title` class attribute
 *
 * @since 1.0.0
 *
 * @param array $attributes Existing attributes.
 *
 * @return array Amended attributes.
 */
function add_fullpage_title_to_attributes( array $attributes ) {
	if ( doing_filter( 'genesis_attr_entry-title' ) && ! is_singular() ) {
		return $attributes;
	}

	$attributes['class'] .= ' fullpage-title';

	return $attributes;
}
