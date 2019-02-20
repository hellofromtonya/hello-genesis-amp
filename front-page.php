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

add_action( 'wp_enqueue_scripts', function() {
	wp_enqueue_style( 'hellofromtonya-front-page-css', get_theme_url() . '/assets/css/front-page.min.css', [], '2.0.0' );
});

render_hero();

genesis();
