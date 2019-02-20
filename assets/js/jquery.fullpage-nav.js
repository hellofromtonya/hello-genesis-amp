;(function( $, window, document, undefined ) {
	"use strict";

	var $window,
		$body,
		$container;

	var init = function() {
		$window = $( window );
		$body = $('body');
		initMenu();
	}

	function initMenu() {
		$container = $('#menu-container');
		_setContainerWidth();

		$('#hamburger-menu--mobile').on('click', initClickHandler );
		$('#hamburger-menu').on('click', initClickHandler );

		$(window).resize(function() {
			_setContainerWidth();
		});
	}

	function _setContainerWidth() {
		if ( window.innerWidth < 768 ) {
			return;
		}

		$container.css('width', window.innerWidth - $('.sidebar--right').width());
	}

	function initClickHandler() {
		if ( $body.hasClass('menu--open') ) {
			closeContainer();

		} else {
			openContainer();
		}
	}

	function closeContainer() {

		$container.removeClass('slideInRight').addClass('slideOutLeft');

		setTimeout(function(){
			$body.removeClass('menu--open');
		}, 400);
	}

	function openContainer() {
		$body.addClass('menu--open');
		$container.addClass('slideInRight').removeClass('slideOutLeft');

		itemClickHandler();
	}

	function itemClickHandler() {
		$('.menu--item a').on('click', function(){
			closeContainer();
		});
	}

	init();

}( jQuery, window, document ) );