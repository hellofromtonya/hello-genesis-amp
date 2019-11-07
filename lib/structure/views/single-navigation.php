<?php
/**
 * Single navigation's view file.
 *
 * @package     Hello_From_Tonya\Hello_Genesis_AMP\Structure
 * @since       1.0.0
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

?>
<nav class="pagination__entry">
	<?php if ( is_object( $previous ) ) : ?>
		<div class="pagination__previous">
			<a href="<?php echo esc_url( get_permalink( $previous ) ); ?>" class="button">
				&#x000AB; Previous
			</a>
			<div class="pagination__post-title"><?php echo esc_html( $previous->post_title ); ?></div>
		</div>
	<?php endif; ?>
	<?php if ( is_object( $next ) ) : ?>
		<div class="pagination__next">
			<a href="<?php echo esc_url( get_permalink( $next ) ); ?>" class="button">
				Next &#x000BB;
			</a>
			<div class="pagination__post-title"><?php echo esc_html( $next->post_title ); ?></div>
		</div>
	<?php endif; ?>
</nav>
