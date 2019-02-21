<div class="background--text-top"><?php echo esc_html( genesis_get_custom_field( '_hellofromtonya_hero_background_text' ) ); ?></div>
<!-- Hero area -->
<div class="hero ">
	<div class="wrap">
		<h1 class="hero-title"><?php echo esc_html( get_the_title() ); ?></h1>
		<?php if ( $quote )  : ?>
		<div class="quote--intro">
			<p><?php echo wp_kses_post( $quote ); ?></p>
		</div>
		<?php elseif ( $subtitle1 ): ?>
			<h2><?php echo wp_kses_post( $subtitle1 ); ?></h2>
			<?php if ( $subtitle2 ) : ?>
				<h3><?php echo wp_kses_post( $subtitle2 ); ?></h3>
			<?php endif; ?>
		<?php endif; ?>
	</div>
</div>
