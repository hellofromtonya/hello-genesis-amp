<?php
/**
 * Fullpage menu container's view file.
 *
 * @package     Hello_From_Tonya\Hello_Genesis_AMP\Structure
 * @since       1.0.0
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

?>
<amp-lightbox id="fullpage-menu-container" class="fullpage-menu-container" layout="nodisplay" scrollable>
	<div class="wrap">
		<!-- Close button -->
		<button class="fullpage-menu--close" on="tap:fullpage-menu-container.close" aria-labelledby="fullpage-menu-close"><span id="fullpage-menu-close" class="screen-reader-text">Hide Full Page Menu</span>X</button>

		<!-- Menus  -->
		<a href="https://hellofromtonya.com" class="menu--item menu--item--home"><i class="fa fa-home" aria-hidden="true"><span class="screen-reader-text">Home</span></i> Home</a>
		<h2>More about me:</h2>
		<p>
			<a href="https://hellofromtonya.com/manifesto" class="menu--item">My Manifesto<span class="">what I believe in and value</span></a>
		</p>
		<p>
			<a href="https://hellofromtonya.com/about" class="menu--item">About Me<span class="">a wee bit about me</span></a>
		</p>
		<h2>I write and teach here:</h2>
		<p>
			<a href="https://hellofromtonya.com/blog" class="menu--item">My Blog <span class="">I write about engineering, leadership, & life</span></a>
			<a href="https://leanpub.com/u/hellofromtonya" class="menu--item">My Books <span class="">my books on Leanpub to help you be more awesome</span></a>
			<a href="https://knowthecode.io" class="menu--item">Know the Code<span class="">teaching professional web development and programming</span></a>
		</p>
		<footer class="menu--container-social">
			<h2>Connect with me:</h2>
			<ul>
				<li>
					<a href="https://twitter.com/hellofromtonya">
						<i class="fa fa-twitter" aria-hidden="true"><span class="screen-reader-text">Follow me on twitter</span></i>
					</a>
				</li>
				<li>
					<a href="https://github.com/hellofromtonya">
						<i class="fa fa-github-alt" aria-hidden="true"><span class="screen-reader-text">GitHub</span></i>
					</a>
				</li>
				<li>
					<a href="https://www.linkedin.com/in/hellofromtonya">
						<i class="fa fa-linkedin" aria-hidden="true"><span class="screen-reader-text">Check me out on LinkedIn</span></i>
					</a>
				</li>
				<li>
					<a href="https://codepen.io/hellofromtonya/">
						<i class="fa fa-codepen" aria-hidden="true"><span class="screen-reader-text">CodePen</span></i>
					</a>
				</li>
			</ul>
		</footer>
	</div>
</amp-lightbox>
