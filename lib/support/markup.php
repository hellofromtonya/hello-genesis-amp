<?php
/**
 * Markup customizations.
 *
 * @since       1.0.0
 * @package     Hello_From_Tonya\Hello_Genesis_AMP\Support
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

namespace Hello_From_Tonya\Hello_Genesis_AMP\Support;

add_filter(
	'genesis_attr_site-container',
	/**
	 * Add ID attribute to the `site-container` element for the AMP scroll to the top target.
	 *
	 * @since 1.0.0
	 *
	 * @param array $attributes Existing attributes.
	 *
	 * @return array amended attributes.
	 */
	function( array $attributes ) {
		$attributes['id'] = 'top-of-page';

		return $attributes;
	}
);

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
