;(function ( $, window, document, undefined ) {
	'use strict';

	var $scrollUp;

	var init = function() {
		$scrollUp = $('.scroll--up');

		_scrollupScrollHandler();
		$scrollUp.on('click', _scrollupClickHandler);
	}

	function _scrollupScrollHandler() {
		var height = $(window).height() / 2;

		$( window ).scroll( function () {
			var position =  $(this).scrollTop();

			if ( position > height ) {
				$scrollUp.addClass('slideInUp');
			} else {
				$scrollUp.removeClass('slideInUp');
			}
		} );
	}
	function _scrollupClickHandler() {

		$("html, body").animate({
			scrollTop: 0
		}, 2000);

		return false;
	}

	init();

}( jQuery, window, document ));