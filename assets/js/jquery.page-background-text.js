;(function( $, window, document, undefined ) {
	"use strict";

	var lastPosition = 0,
		$backgroundText, currentSection = 0;

	var init = function() {
		if ( window.innerWidth < 768 ) {
			return;
		}

		$backgroundText = $('.background--text');
		if (typeof $backgroundText === "undefined") {
			return;
		}

		messageHandler();

		onScroll();
	}

	function onScroll() {

		$(window).scroll(function(){
			var currentPosition = $(this).scrollTop();

			if ( ! isMovementLargeEnough( currentPosition ) ) {
				return;
			}

			messageHandler();

			lastPosition = currentPosition;
		});
	}

	function isMovementLargeEnough( currentPosition ) {
		var movement = Math.abs( lastPosition - currentPosition );

		return movement > 50;
	}

	function messageHandler() {
		$('.section').each(function(index){
			var $section = $(this);

			if ( typeof $section !== 'object') {
				return false;
			}

			if ( ! $section.isOnScreen({percentY:0.3}) ) {
				return true;
			}

			if ( index == currentSection ) {
				return false;
			}
			setMessage($section);
			currentSection = index;
			return false;
		});
	}

	function setMessage( $section ) {
		var messageText = $section.data('message');

		if ( typeof messageText === "undefined" || messageText == null ) {
			return;
		}

		$backgroundText.html(messageText);
	}

	init();

	$(window).resize(function() {
		init();
	});

}( jQuery, window, document ) );