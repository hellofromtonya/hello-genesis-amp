<?php
/**
 * Footer structure customization.
 *
 * @package     Hello_From_Tonya\Hello_Genesis_AMP\Structure
 * @since       1.0.0
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

namespace Hello_From_Tonya\Hello_Genesis_AMP\Structure;

remove_all_actions( 'genesis_footer' );

add_action( 'genesis_footer', __NAMESPACE__ . '\render_site_footer' );
/**
 * Change the footer text.
 *
 * @since  1.0.0
 *
 * @return void
 */
function render_site_footer() {
	$copyright = do_shortcode( '[footer_copyright first="2017"]' );

	include __DIR__ . '/views/site-footer.php';

	include __DIR__ . '/views/scroll.html';

	if ( genesis_is_amp() ) {
		require __DIR__ . '/views/scroll-to-target.html';
	}
}
