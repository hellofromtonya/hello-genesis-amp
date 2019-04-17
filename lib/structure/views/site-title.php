<?php
/**
 * Stop and say "Hello"
 *
 * @package     Hello_From_Tonya\Hello_Genesis_AMP
 * @since       1.0.0
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

namespace Hello_From_Tonya\Hello_Genesis_AMP\Structure;

use function Hello_From_Tonya\Hello_Genesis_AMP\get_theme_url;

?>
<p class="site-title">
	<a href="<?php echo esc_url( $url ); ?>" title="<?php echo esc_html( $site_title ); ?>">
		<svg version="1.1" id="hello-logo" class="site--hello-logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 198 93.6" style="enable-background:new 0 0 198 93.6;" xml:space="preserve">
			<g>
				<path class="hello-path" d="M40,86.1c-10.1,0-12.6-7.3-9-17.8c4-11.6,14.4-24.1,12.5-25.2c-1.7-1-14.8,7.2-21.7,18.6
			c-4.3,7.1-8.8,15.5-11.6,22.8c-0.5,1.1-1.3,1.3-2,0.5c-1.9-2.2-3-5.5-0.5-12.7c4.2-12,29.2-54.2,38.9-66.4c1.1-1.4,2.3-1.3,2.9,0.1
			c1.6,3.5,1.2,9.5-3.4,17c-2.9,4.8-9.2,14.5-14.4,22.6c4.9-4.8,11.2-8.8,14.4-8.4c4.1,0.5,7.8,6.5,4.7,12.6
			c-2.6,5.3-8.4,14-11.2,20.3c-3,7-2.4,12.6,2,12.4c4.9-0.2,11.5-8.9,15.2-16.6c0.5-1.1,1.7-1.1,2.2-0.1c0.6,1.3,0.6,3.8-1.2,7.4
			C54.4,80.1,47.1,86.1,40,86.1z"/>
				<path class="hello-path" d="M71.6,82.6c10,0.5,18.7-9.1,23.9-17c0.6-1,1.6-1,2,0.1c0.5,1,0.1,4.3-2,7.4c-5,7.3-14.3,12.8-23.5,13
			c-15.2,0.2-20.5-14.8-12.7-30.2c7.8-15.5,20-21.7,26-18.2c3,1.8,5.2,3.6,7.1,6.2c2.2,2.9,1.2,10.2-3.8,16.3
			c-5.9,7.2-13.9,10.3-22.3,3.5C62.4,74.7,65.2,82.2,71.6,82.6z M81.6,55c3.8-5,6.5-11.3,4.8-12.6c-2.5-2-12.5,5.2-18.1,16.6
			c-0.4,0.7-0.7,1.4-1,2C73.2,64.7,78.1,59.5,81.6,55z"/>
				<path class="hello-path" d="M104.6,82.3c5.8,0.5,14.2-8.2,18.8-17.4c0.8-1.6,2.2-1.7,2.6,0c0.6,1.9,0.1,4.6-1.2,7.4
			c-1.7,3.6-10.4,13.6-20,13.3c-8.3-0.2-12.7-6-10-19c4.4-20.9,18.1-42.6,30.4-55.3c1.8-1.9,3.5-2.2,5.2-0.6
			c3.5,3.1,4.2,7.6,2.8,13.2c-3.7,14.8-17.2,29.2-27.8,36.1C100.5,71.9,99.2,81.9,104.6,82.3z M129.1,21.5
			c-1.6-1-10.4,12.4-18.7,27.7c-1.1,1.9-2,3.8-2.9,5.8C123.9,41.7,130.6,22.5,129.1,21.5z"/>
				<path class="hello-path" d="M132.2,82.3c5.8,0.5,14.2-8.2,18.8-17.4c0.8-1.6,2.2-1.7,2.6,0c0.6,1.9,0.1,4.6-1.2,7.4
			c-1.7,3.6-10.4,13.6-20,13.3c-8.3-0.2-12.7-6-10-19c4.4-20.9,18.1-42.6,30.4-55.3c1.8-1.9,3.5-2.2,5.2-0.6
			c3.5,3.1,4.2,7.6,2.8,13.2c-3.7,14.8-17.2,29.2-27.8,36.1C128.1,71.9,126.8,81.9,132.2,82.3z M156.7,21.5
			c-1.6-1-10.4,12.4-18.7,27.7c-1.1,1.9-2,3.8-2.9,5.8C151.5,41.7,158.2,22.5,156.7,21.5z"/>
				<path class="hello-path" d="M186.6,59.9c-2.5,10.2-10.1,22.3-19,25.3c-4.3,1.4-10.3,1-15.1-5.3c-5.3-7-3.5-17.4,1.9-27
			c4.6-8.2,11.9-15.1,19.1-15.6c3.7-0.2,5.8,0.8,8.2,4.1c2.8,3.7,6.4,4.6,5.6,13.2c-0.1,1-0.1,1.8-0.2,2.8c0.7,0,1.4-0.2,2.4-0.2
			c0.8,0,0.8,0.6,0.4,1.2C189,59.3,187.8,59.8,186.6,59.9z M176.4,56.9c-2.5-1.9-5.4-6.1-5.5-10.6c-3.2,2.8-6.7,6.7-9.2,11.3
			c-5,9.1-6.8,20.2-3.7,22.8c3.4,2.8,10.7-1.4,16.6-12.5c1.8-3.4,3.2-6.7,4.2-9.6C177.8,58,177.1,57.5,176.4,56.9z M180.4,46.2
			c-0.6-3.8-3-3.1-3.6,0.4c-0.6,3.2,0.7,6.7,2.6,8.5C180.4,51.4,180.8,48.4,180.4,46.2z"/>
			</g>
		</svg>
		<img class="site-title--avatar" src="<?php echo get_theme_url(); ?>/assets/images/hellofromtonya.jpg" width="50" height="50" alt="<?php echo esc_html( $site_title ); ?>">
	</a>
</p>
