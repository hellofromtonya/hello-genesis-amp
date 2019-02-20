;(function( $, window, document, undefined ) {
	"use strict";

	$.fn.textWidth = function(text, font) {
		if ( ! $.fn.textWidth.fakeEl) {
			$.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
		}
		$.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));

		return $.fn.textWidth.fakeEl.width();
	};
	
	var init = function() {
		var $adjectives = $('.about--adjective');
		if ( typeof $adjectives === "undefined") {
			return;
		}

		$adjectives.each( function(){
			setTextWidth( $(this) );
		});
	}

	function setTextWidth( $adjective ) {
		var width = $adjective.textWidth(),
			lineHeight = 0;
		
		if ( width > 60 ) {
			width *= 1.3;
			lineHeight = width - 10;
		} else if ( width > 30 ) {
			width *= 1.6;
			lineHeight = width - 20;
		} else {
			width *= 2;
			lineHeight = width - 30;
		}

		$adjective.css({
			width: width,
			height: width,
			lineHeight: lineHeight + 'px'
		}).show();
	}
	
	init();
	
}( jQuery, window, document ) );