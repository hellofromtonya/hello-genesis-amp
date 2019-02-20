;(function( $, window, document, undefined ) {
	"use strict";
	var $sections = $('.section--fullwindow');

	var init = function() {
// 		_setHeight();
		_setContentWidth();

		$(window).resize(function() {
// 			_setHeight();
			_setContentWidth();
		});
	}

	function _setHeight() {
		if ( window.innerWidth < 768) {
			return;
		}
		$sections.each(function(){
			$(this).css( 'height', window.innerHeight );
		});
	}

	function _setContentWidth() {
		if ( window.innerWidth > 1200 || window.innerWidth < 768) {
			$('.site--content .wrap').css('max-width', '');
			return;
		}

		var wt = window.innerWidth - $('.sidebar--right').width() - $('.background--text').width();
		if (wt > 1400) {
			return;
		}
		$('.site--content .wrap').css('max-width', wt);
	}

	init();

}( jQuery, window, document ) );