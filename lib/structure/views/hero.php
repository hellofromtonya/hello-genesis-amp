<div class="background--text-top"><?php echo esc_html( genesis_get_custom_field( '_hellofromtonya_hero_background_text' ) ); ?></div>
<div class="hero">
	<div class="section--hero wrap">
		<h1 class="entry-title"><?php echo esc_html( get_the_title() ); ?></h1>
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
<div class="intro--scroll">
	<svg id="mouse-scroller" class="mouse-scroller" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 25.166666 37.8704414" enable-background="new 0 0 25.166666 37.8704414" xml:space="preserve">
        <path class="mouse-scroller--stroke" fill="none" stroke="#c7c4b8" stroke-width="2.5" stroke-miterlimit="10" d="M12.5833445 36.6204414h-0.0000229C6.3499947 36.6204414 1.25 31.5204487 1.25 25.2871208V12.5833216C1.25 6.3499947 6.3499951 1.25 12.5833216 1.25h0.0000229c6.2333269 0 11.3333216 5.0999947 11.3333216 11.3333216v12.7037992C23.916666 31.5204487 18.8166714 36.6204414 12.5833445 36.6204414z"></path>
		<path class="mouse-scroller--scroller" fill="#c7c4b8" d="M13.0833359 19.2157116h-0.9192753c-1.0999985 0-1.9999971-0.8999996-1.9999971-1.9999981v-5.428606c0-1.0999994 0.8999987-1.9999981 1.9999971-1.9999981h0.9192753c1.0999985 0 1.9999981 0.8999987 1.9999981 1.9999981v5.428606C15.083334 18.315712 14.1833344 19.2157116 13.0833359 19.2157116z"></path>
    </svg>
</div>
