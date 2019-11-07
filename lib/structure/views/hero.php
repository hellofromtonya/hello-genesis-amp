<?php
/**
 * Hero's view file.
 *
 * @package     Hello_From_Tonya\Hello_Genesis_AMP\Structure
 * @since       1.0.0
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

?>
<div class="background--text-top"><?php echo esc_html( genesis_get_custom_field( '_hellofromtonya_hero_background_text', $post_id ) ); ?></div>

<div class="hero ">
	<div class="wrap">
		<h1 class="hero-title"><?php echo esc_html( $page_title ); ?></h1>
		<?php if ( $quote ) : ?>
		<!-- Hero Intro Quoted -->
		<div class="hero-intro --quote">
			<p><?php echo wp_kses_post( $quote ); ?></p>
		</div>
		<?php elseif ( $subtitle1 ) : ?>
		<!-- Hero Intro -->
		<div class="hero-intro">
			<h2><?php echo wp_kses_post( $subtitle1 ); ?></h2>
			<?php if ( $subtitle2 ) : ?>
				<h3><?php echo wp_kses_post( $subtitle2 ); ?></h3>
			<?php endif; ?>
		</div>
		<?php endif; ?>
	</div>
</div>
