<?php
/**
 * Menu structure customization.
 *
 * @package     Hello_From_Tonya\Hello_Genesis_AMP\Structure
 * @since       1.0.0
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

namespace Hello_From_Tonya\Hello_Genesis_AMP\Structure;

remove_action( 'genesis_after_header', 'genesis_do_nav' );

add_action( 'genesis_header', __NAMESPACE__ . '\render_mobile_nav' );
/**
 * Render the mobile nav.
 *
 * @since 1.0.0
 *
 * @return void
 */
function render_mobile_nav() {
	include __DIR__ . '/views/mobile-nav.php';
}
