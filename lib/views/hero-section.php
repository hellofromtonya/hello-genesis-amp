<?php
/**
 * Hero section's view file.
 *
 * @package     Hello_From_Tonya\Hello_Genesis_AMP
 * @since       1.0.0
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

use function Hello_From_Tonya\Hello_Genesis_AMP\Structure\render_hero_content;

?>

<header class="section--hero section--fullwindow section">
	<?php render_hero_content( $post_id, $page_for_posts->post_content ); ?>
</header>
