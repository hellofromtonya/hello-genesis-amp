<aside class="sidebar--right">
	<div id="hamburger-menu" class="hamburger--menu">
		<button class="hamburger-button" on="tap:menu-container"><i class="fa fa-bars" aria-hidden="true"><span class="screen-reader-text">Show Main Menu</span></i></button>
	</div>

	<div class="sidebar--wrapper">
		<nav class="nav--connect">
			<ul>
				<li>
					<a href="https://hellofromtonya.com/blog/">
						<i class="fa fa-home" aria-hidden="true"><span class="screen-reader-text">Home</span></i>
					</a>
				</li>
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
		</nav>

		<div class="scroll--container">
			<div class="scroll--line"></div>
			<?php if ( genesis_is_amp() ) : ?>
			<button id="scrollToTopButton" on="tap:top-of-page.scrollTo(duration=200)" class="scroll--up"></button>
			<?php else: ?>
				<div class="scroll--up animated"></div>
			<?php endif; ?>
			<div class="scroll--text"> Scroll</div>
		</div>
	</div>
</aside>
