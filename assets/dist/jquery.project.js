/*!
 * My Script Files
 *
 * @since       1.0.0
 * @author      hellofromTonya
 * @link        https://hellofromtonya.com
 * @license     GPL-2+
 */
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
/**
 * Checks if the element is in the viewport (i.e. on the viewing screen)
 *
 * @since       1.0.0
 * @author      hellofromTonya
 * @link        https://hellofromtonya.com
 * @license     GPL-2.0+
 */

;(function ($, window, document, undefined) {

	'use strict';

	var $window = $( window );

	$.fn.isOnScreen = function( options ) {
		var $element = $( this ),
			defaults = {
				percentX: 1.0,
				percentY: 1.0
			};

		// Makes variables public
		$element.vars = $.extend({}, defaults, options);

		var limits = {},
			viewport = {},
			width = this.outerWidth(),
			height = this.outerHeight();


		// Private methods
		var methods = {
			init: function() {
				methods.initViewport();
				methods.initLimits();
				return methods.checkState();
			},

			initViewport: function() {
				viewport = {
					width: $window.width(),
					height: $window.height(),
					top: $window.scrollTop(),
					left: $window.scrollLeft()
				};

				viewport.bottom = viewport.top + viewport.height;
				viewport.right = viewport.left + viewport.width;
			},

			/**
			 * Initialize the element's limits, which
			 * are where this element is in the window.
			 */
			initLimits: function() {
				limits = $element.offset();

				limits.right = limits.left + width;
				limits.bottom = limits.top + height;
			},

			/**
			 * Let's check if the element is in the viewport, i.e.
			 * meaning it's on the viewing screen.
			 *
			 * @returns {bool}
			 */
			checkState: function() {
				var isOnScreen = !
					( viewport.right < limits.left || 
					  viewport.left > limits.right || 
					  viewport.bottom < limits.top || 
					  viewport.top > limits.bottom );

				if ( ! isOnScreen ) {
					return false;
				}

				return methods.isPartiallyOnScreen();
			},

			/**
			 * Let's check if the element is in the viewport, i.e.
			 * meaning it's on the viewing screen.
			 *
			 * @returns {bool}
			 */
			isPartiallyOnScreen: function() {
				return methods.xIsPartiallyOnScreen() &&
				       methods.yIsPartiallyOnScreen();
			},

			/**
			 * Checks if the element is partially on the screen for the y-axis
			 *
			 * @returns {boolean}
			 */
			xIsPartiallyOnScreen: function() {
				var actuals = {
						left : Math.min( 1, ( limits.right - viewport.left ) / width ),
						right : Math.min( 1, ( viewport.right - limits.left ) / width )
					},
					actualPercentX = actuals.left * actuals.right;

				return actualPercentX >= $element.vars.percentX;
			},

			/**
			 * Checks if the element is partially on the screen for the y-axis
			 *
			 * @returns {boolean}
			 */
			yIsPartiallyOnScreen: function() {
				var actuals = {
						top : Math.min( 1, ( limits.bottom - viewport.top ) / height ),
						bottom : Math.min( 1, ( viewport.bottom - limits.top ) / height )
					},
					actualPercentY = actuals.top * actuals.bottom;
				return actualPercentY >= $element.vars.percentY;
			}

		} // end of private methods

		return methods.init();

	} // end of object

})(jQuery, window, document);
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
;(function() {
	console.log("Don't forget to be kind to someone today. Go Excel." );
})();
;(function ( $, window, document, undefined ) {
	'use strict'

	var $body;

	function init() {
		$body = $( 'html, body' );

		$( 'a[href^="#"]' ).on( 'click', function( event ) {
			event.preventDefault();

			smoothScrollHandler( this.hash, event );
		});
	}

	function smoothScrollHandler( target, event ) {
		var $target = $( target );

		if ( typeof $target == "undefined" || ! $target.length ) {
			return false;
		}

		$body.stop().animate({
			'scrollTop': $target.offset().top
		}, 2000, 'swing' );
	}

	init();

}( jQuery, window, document ));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9kaXN0LWRvY2Jsb2NrLmpzIiwianF1ZXJ5LmFkamVjdGl2ZXMuanMiLCJqcXVlcnkuZnVsbHBhZ2UtbmF2LmpzIiwianF1ZXJ5Lmlzb25zY3JlZW4uanMiLCJqcXVlcnkucGFnZS1iYWNrZ3JvdW5kLXRleHQuanMiLCJqcXVlcnkucGFnZS1zZXR1cC5qcyIsImpxdWVyeS5zY3JvbGwtdG8tdG9wLmpzIiwianF1ZXJ5LnNpZ25hdHVyZS5qcyIsImpxdWVyeS5zbW9vdGgtc2Nyb2xsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJqcXVlcnkucHJvamVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogTXkgU2NyaXB0IEZpbGVzXG4gKlxuICogQHNpbmNlICAgICAgIDEuMC4wXG4gKiBAYXV0aG9yICAgICAgaGVsbG9mcm9tVG9ueWFcbiAqIEBsaW5rICAgICAgICBodHRwczovL2hlbGxvZnJvbXRvbnlhLmNvbVxuICogQGxpY2Vuc2UgICAgIEdQTC0yK1xuICovIiwiOyhmdW5jdGlvbiggJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkICkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHQkLmZuLnRleHRXaWR0aCA9IGZ1bmN0aW9uKHRleHQsIGZvbnQpIHtcblx0XHRpZiAoICEgJC5mbi50ZXh0V2lkdGguZmFrZUVsKSB7XG5cdFx0XHQkLmZuLnRleHRXaWR0aC5mYWtlRWwgPSAkKCc8c3Bhbj4nKS5oaWRlKCkuYXBwZW5kVG8oZG9jdW1lbnQuYm9keSk7XG5cdFx0fVxuXHRcdCQuZm4udGV4dFdpZHRoLmZha2VFbC50ZXh0KHRleHQgfHwgdGhpcy52YWwoKSB8fCB0aGlzLnRleHQoKSkuY3NzKCdmb250JywgZm9udCB8fCB0aGlzLmNzcygnZm9udCcpKTtcblxuXHRcdHJldHVybiAkLmZuLnRleHRXaWR0aC5mYWtlRWwud2lkdGgoKTtcblx0fTtcblx0XG5cdHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyICRhZGplY3RpdmVzID0gJCgnLmFib3V0LS1hZGplY3RpdmUnKTtcblx0XHRpZiAoIHR5cGVvZiAkYWRqZWN0aXZlcyA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdCRhZGplY3RpdmVzLmVhY2goIGZ1bmN0aW9uKCl7XG5cdFx0XHRzZXRUZXh0V2lkdGgoICQodGhpcykgKTtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHNldFRleHRXaWR0aCggJGFkamVjdGl2ZSApIHtcblx0XHR2YXIgd2lkdGggPSAkYWRqZWN0aXZlLnRleHRXaWR0aCgpLFxuXHRcdFx0bGluZUhlaWdodCA9IDA7XG5cdFx0XG5cdFx0aWYgKCB3aWR0aCA+IDYwICkge1xuXHRcdFx0d2lkdGggKj0gMS4zO1xuXHRcdFx0bGluZUhlaWdodCA9IHdpZHRoIC0gMTA7XG5cdFx0fSBlbHNlIGlmICggd2lkdGggPiAzMCApIHtcblx0XHRcdHdpZHRoICo9IDEuNjtcblx0XHRcdGxpbmVIZWlnaHQgPSB3aWR0aCAtIDIwO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR3aWR0aCAqPSAyO1xuXHRcdFx0bGluZUhlaWdodCA9IHdpZHRoIC0gMzA7XG5cdFx0fVxuXG5cdFx0JGFkamVjdGl2ZS5jc3Moe1xuXHRcdFx0d2lkdGg6IHdpZHRoLFxuXHRcdFx0aGVpZ2h0OiB3aWR0aCxcblx0XHRcdGxpbmVIZWlnaHQ6IGxpbmVIZWlnaHQgKyAncHgnXG5cdFx0fSkuc2hvdygpO1xuXHR9XG5cdFxuXHRpbml0KCk7XG5cdFxufSggalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50ICkgKTsiLCI7KGZ1bmN0aW9uKCAkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQgKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdHZhciAkd2luZG93LFxuXHRcdCRib2R5LFxuXHRcdCRjb250YWluZXI7XG5cblx0dmFyIGluaXQgPSBmdW5jdGlvbigpIHtcblx0XHQkd2luZG93ID0gJCggd2luZG93ICk7XG5cdFx0JGJvZHkgPSAkKCdib2R5Jyk7XG5cdFx0aW5pdE1lbnUoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGluaXRNZW51KCkge1xuXHRcdCRjb250YWluZXIgPSAkKCcjbWVudS1jb250YWluZXInKTtcblx0XHRfc2V0Q29udGFpbmVyV2lkdGgoKTtcblxuXHRcdCQoJyNoYW1idXJnZXItbWVudS0tbW9iaWxlJykub24oJ2NsaWNrJywgaW5pdENsaWNrSGFuZGxlciApO1xuXHRcdCQoJyNoYW1idXJnZXItbWVudScpLm9uKCdjbGljaycsIGluaXRDbGlja0hhbmRsZXIgKTtcblxuXHRcdCQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XG5cdFx0XHRfc2V0Q29udGFpbmVyV2lkdGgoKTtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIF9zZXRDb250YWluZXJXaWR0aCgpIHtcblx0XHRpZiAoIHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdCRjb250YWluZXIuY3NzKCd3aWR0aCcsIHdpbmRvdy5pbm5lcldpZHRoIC0gJCgnLnNpZGViYXItLXJpZ2h0Jykud2lkdGgoKSk7XG5cdH1cblxuXHRmdW5jdGlvbiBpbml0Q2xpY2tIYW5kbGVyKCkge1xuXHRcdGlmICggJGJvZHkuaGFzQ2xhc3MoJ21lbnUtLW9wZW4nKSApIHtcblx0XHRcdGNsb3NlQ29udGFpbmVyKCk7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0b3BlbkNvbnRhaW5lcigpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGNsb3NlQ29udGFpbmVyKCkge1xuXG5cdFx0JGNvbnRhaW5lci5yZW1vdmVDbGFzcygnc2xpZGVJblJpZ2h0JykuYWRkQ2xhc3MoJ3NsaWRlT3V0TGVmdCcpO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0JGJvZHkucmVtb3ZlQ2xhc3MoJ21lbnUtLW9wZW4nKTtcblx0XHR9LCA0MDApO1xuXHR9XG5cblx0ZnVuY3Rpb24gb3BlbkNvbnRhaW5lcigpIHtcblx0XHQkYm9keS5hZGRDbGFzcygnbWVudS0tb3BlbicpO1xuXHRcdCRjb250YWluZXIuYWRkQ2xhc3MoJ3NsaWRlSW5SaWdodCcpLnJlbW92ZUNsYXNzKCdzbGlkZU91dExlZnQnKTtcblxuXHRcdGl0ZW1DbGlja0hhbmRsZXIoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGl0ZW1DbGlja0hhbmRsZXIoKSB7XG5cdFx0JCgnLm1lbnUtLWl0ZW0gYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0XHRjbG9zZUNvbnRhaW5lcigpO1xuXHRcdH0pO1xuXHR9XG5cblx0aW5pdCgpO1xuXG59KCBqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQgKSApOyIsIi8qKlxuICogQ2hlY2tzIGlmIHRoZSBlbGVtZW50IGlzIGluIHRoZSB2aWV3cG9ydCAoaS5lLiBvbiB0aGUgdmlld2luZyBzY3JlZW4pXG4gKlxuICogQHNpbmNlICAgICAgIDEuMC4wXG4gKiBAYXV0aG9yICAgICAgaGVsbG9mcm9tVG9ueWFcbiAqIEBsaW5rICAgICAgICBodHRwczovL2hlbGxvZnJvbXRvbnlhLmNvbVxuICogQGxpY2Vuc2UgICAgIEdQTC0yLjArXG4gKi9cblxuOyhmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciAkd2luZG93ID0gJCggd2luZG93ICk7XG5cblx0JC5mbi5pc09uU2NyZWVuID0gZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cdFx0dmFyICRlbGVtZW50ID0gJCggdGhpcyApLFxuXHRcdFx0ZGVmYXVsdHMgPSB7XG5cdFx0XHRcdHBlcmNlbnRYOiAxLjAsXG5cdFx0XHRcdHBlcmNlbnRZOiAxLjBcblx0XHRcdH07XG5cblx0XHQvLyBNYWtlcyB2YXJpYWJsZXMgcHVibGljXG5cdFx0JGVsZW1lbnQudmFycyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cblx0XHR2YXIgbGltaXRzID0ge30sXG5cdFx0XHR2aWV3cG9ydCA9IHt9LFxuXHRcdFx0d2lkdGggPSB0aGlzLm91dGVyV2lkdGgoKSxcblx0XHRcdGhlaWdodCA9IHRoaXMub3V0ZXJIZWlnaHQoKTtcblxuXG5cdFx0Ly8gUHJpdmF0ZSBtZXRob2RzXG5cdFx0dmFyIG1ldGhvZHMgPSB7XG5cdFx0XHRpbml0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0bWV0aG9kcy5pbml0Vmlld3BvcnQoKTtcblx0XHRcdFx0bWV0aG9kcy5pbml0TGltaXRzKCk7XG5cdFx0XHRcdHJldHVybiBtZXRob2RzLmNoZWNrU3RhdGUoKTtcblx0XHRcdH0sXG5cblx0XHRcdGluaXRWaWV3cG9ydDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZpZXdwb3J0ID0ge1xuXHRcdFx0XHRcdHdpZHRoOiAkd2luZG93LndpZHRoKCksXG5cdFx0XHRcdFx0aGVpZ2h0OiAkd2luZG93LmhlaWdodCgpLFxuXHRcdFx0XHRcdHRvcDogJHdpbmRvdy5zY3JvbGxUb3AoKSxcblx0XHRcdFx0XHRsZWZ0OiAkd2luZG93LnNjcm9sbExlZnQoKVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHZpZXdwb3J0LmJvdHRvbSA9IHZpZXdwb3J0LnRvcCArIHZpZXdwb3J0LmhlaWdodDtcblx0XHRcdFx0dmlld3BvcnQucmlnaHQgPSB2aWV3cG9ydC5sZWZ0ICsgdmlld3BvcnQud2lkdGg7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEluaXRpYWxpemUgdGhlIGVsZW1lbnQncyBsaW1pdHMsIHdoaWNoXG5cdFx0XHQgKiBhcmUgd2hlcmUgdGhpcyBlbGVtZW50IGlzIGluIHRoZSB3aW5kb3cuXG5cdFx0XHQgKi9cblx0XHRcdGluaXRMaW1pdHM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRsaW1pdHMgPSAkZWxlbWVudC5vZmZzZXQoKTtcblxuXHRcdFx0XHRsaW1pdHMucmlnaHQgPSBsaW1pdHMubGVmdCArIHdpZHRoO1xuXHRcdFx0XHRsaW1pdHMuYm90dG9tID0gbGltaXRzLnRvcCArIGhlaWdodDtcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogTGV0J3MgY2hlY2sgaWYgdGhlIGVsZW1lbnQgaXMgaW4gdGhlIHZpZXdwb3J0LCBpLmUuXG5cdFx0XHQgKiBtZWFuaW5nIGl0J3Mgb24gdGhlIHZpZXdpbmcgc2NyZWVuLlxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm5zIHtib29sfVxuXHRcdFx0ICovXG5cdFx0XHRjaGVja1N0YXRlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGlzT25TY3JlZW4gPSAhXG5cdFx0XHRcdFx0KCB2aWV3cG9ydC5yaWdodCA8IGxpbWl0cy5sZWZ0IHx8IFxuXHRcdFx0XHRcdCAgdmlld3BvcnQubGVmdCA+IGxpbWl0cy5yaWdodCB8fCBcblx0XHRcdFx0XHQgIHZpZXdwb3J0LmJvdHRvbSA8IGxpbWl0cy50b3AgfHwgXG5cdFx0XHRcdFx0ICB2aWV3cG9ydC50b3AgPiBsaW1pdHMuYm90dG9tICk7XG5cblx0XHRcdFx0aWYgKCAhIGlzT25TY3JlZW4gKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIG1ldGhvZHMuaXNQYXJ0aWFsbHlPblNjcmVlbigpO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBMZXQncyBjaGVjayBpZiB0aGUgZWxlbWVudCBpcyBpbiB0aGUgdmlld3BvcnQsIGkuZS5cblx0XHRcdCAqIG1lYW5pbmcgaXQncyBvbiB0aGUgdmlld2luZyBzY3JlZW4uXG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybnMge2Jvb2x9XG5cdFx0XHQgKi9cblx0XHRcdGlzUGFydGlhbGx5T25TY3JlZW46IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbWV0aG9kcy54SXNQYXJ0aWFsbHlPblNjcmVlbigpICYmXG5cdFx0XHRcdCAgICAgICBtZXRob2RzLnlJc1BhcnRpYWxseU9uU2NyZWVuKCk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIENoZWNrcyBpZiB0aGUgZWxlbWVudCBpcyBwYXJ0aWFsbHkgb24gdGhlIHNjcmVlbiBmb3IgdGhlIHktYXhpc1xuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHRcdFx0ICovXG5cdFx0XHR4SXNQYXJ0aWFsbHlPblNjcmVlbjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBhY3R1YWxzID0ge1xuXHRcdFx0XHRcdFx0bGVmdCA6IE1hdGgubWluKCAxLCAoIGxpbWl0cy5yaWdodCAtIHZpZXdwb3J0LmxlZnQgKSAvIHdpZHRoICksXG5cdFx0XHRcdFx0XHRyaWdodCA6IE1hdGgubWluKCAxLCAoIHZpZXdwb3J0LnJpZ2h0IC0gbGltaXRzLmxlZnQgKSAvIHdpZHRoIClcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGFjdHVhbFBlcmNlbnRYID0gYWN0dWFscy5sZWZ0ICogYWN0dWFscy5yaWdodDtcblxuXHRcdFx0XHRyZXR1cm4gYWN0dWFsUGVyY2VudFggPj0gJGVsZW1lbnQudmFycy5wZXJjZW50WDtcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQ2hlY2tzIGlmIHRoZSBlbGVtZW50IGlzIHBhcnRpYWxseSBvbiB0aGUgc2NyZWVuIGZvciB0aGUgeS1heGlzXG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdFx0XHQgKi9cblx0XHRcdHlJc1BhcnRpYWxseU9uU2NyZWVuOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGFjdHVhbHMgPSB7XG5cdFx0XHRcdFx0XHR0b3AgOiBNYXRoLm1pbiggMSwgKCBsaW1pdHMuYm90dG9tIC0gdmlld3BvcnQudG9wICkgLyBoZWlnaHQgKSxcblx0XHRcdFx0XHRcdGJvdHRvbSA6IE1hdGgubWluKCAxLCAoIHZpZXdwb3J0LmJvdHRvbSAtIGxpbWl0cy50b3AgKSAvIGhlaWdodCApXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRhY3R1YWxQZXJjZW50WSA9IGFjdHVhbHMudG9wICogYWN0dWFscy5ib3R0b207XG5cdFx0XHRcdHJldHVybiBhY3R1YWxQZXJjZW50WSA+PSAkZWxlbWVudC52YXJzLnBlcmNlbnRZO1xuXHRcdFx0fVxuXG5cdFx0fSAvLyBlbmQgb2YgcHJpdmF0ZSBtZXRob2RzXG5cblx0XHRyZXR1cm4gbWV0aG9kcy5pbml0KCk7XG5cblx0fSAvLyBlbmQgb2Ygb2JqZWN0XG5cbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCk7IiwiOyhmdW5jdGlvbiggJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkICkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHR2YXIgbGFzdFBvc2l0aW9uID0gMCxcblx0XHQkYmFja2dyb3VuZFRleHQsIGN1cnJlbnRTZWN0aW9uID0gMDtcblxuXHR2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmICggd2luZG93LmlubmVyV2lkdGggPCA3NjggKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0JGJhY2tncm91bmRUZXh0ID0gJCgnLmJhY2tncm91bmQtLXRleHQnKTtcblx0XHRpZiAodHlwZW9mICRiYWNrZ3JvdW5kVGV4dCA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdG1lc3NhZ2VIYW5kbGVyKCk7XG5cblx0XHRvblNjcm9sbCgpO1xuXHR9XG5cblx0ZnVuY3Rpb24gb25TY3JvbGwoKSB7XG5cblx0XHQkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgY3VycmVudFBvc2l0aW9uID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcblxuXHRcdFx0aWYgKCAhIGlzTW92ZW1lbnRMYXJnZUVub3VnaCggY3VycmVudFBvc2l0aW9uICkgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0bWVzc2FnZUhhbmRsZXIoKTtcblxuXHRcdFx0bGFzdFBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gaXNNb3ZlbWVudExhcmdlRW5vdWdoKCBjdXJyZW50UG9zaXRpb24gKSB7XG5cdFx0dmFyIG1vdmVtZW50ID0gTWF0aC5hYnMoIGxhc3RQb3NpdGlvbiAtIGN1cnJlbnRQb3NpdGlvbiApO1xuXG5cdFx0cmV0dXJuIG1vdmVtZW50ID4gNTA7XG5cdH1cblxuXHRmdW5jdGlvbiBtZXNzYWdlSGFuZGxlcigpIHtcblx0XHQkKCcuc2VjdGlvbicpLmVhY2goZnVuY3Rpb24oaW5kZXgpe1xuXHRcdFx0dmFyICRzZWN0aW9uID0gJCh0aGlzKTtcblxuXHRcdFx0aWYgKCB0eXBlb2YgJHNlY3Rpb24gIT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCAhICRzZWN0aW9uLmlzT25TY3JlZW4oe3BlcmNlbnRZOjAuM30pICkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBpbmRleCA9PSBjdXJyZW50U2VjdGlvbiApIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0c2V0TWVzc2FnZSgkc2VjdGlvbik7XG5cdFx0XHRjdXJyZW50U2VjdGlvbiA9IGluZGV4O1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2V0TWVzc2FnZSggJHNlY3Rpb24gKSB7XG5cdFx0dmFyIG1lc3NhZ2VUZXh0ID0gJHNlY3Rpb24uZGF0YSgnbWVzc2FnZScpO1xuXG5cdFx0aWYgKCB0eXBlb2YgbWVzc2FnZVRleHQgPT09IFwidW5kZWZpbmVkXCIgfHwgbWVzc2FnZVRleHQgPT0gbnVsbCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQkYmFja2dyb3VuZFRleHQuaHRtbChtZXNzYWdlVGV4dCk7XG5cdH1cblxuXHRpbml0KCk7XG5cblx0JCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcblx0XHRpbml0KCk7XG5cdH0pO1xuXG59KCBqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQgKSApOyIsIjsoZnVuY3Rpb24oICQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCApIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdHZhciAkc2VjdGlvbnMgPSAkKCcuc2VjdGlvbi0tZnVsbHdpbmRvdycpO1xuXG5cdHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XG4vLyBcdFx0X3NldEhlaWdodCgpO1xuXHRcdF9zZXRDb250ZW50V2lkdGgoKTtcblxuXHRcdCQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XG4vLyBcdFx0XHRfc2V0SGVpZ2h0KCk7XG5cdFx0XHRfc2V0Q29udGVudFdpZHRoKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBfc2V0SGVpZ2h0KCkge1xuXHRcdGlmICggd2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0JHNlY3Rpb25zLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdCQodGhpcykuY3NzKCAnaGVpZ2h0Jywgd2luZG93LmlubmVySGVpZ2h0ICk7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBfc2V0Q29udGVudFdpZHRoKCkge1xuXHRcdGlmICggd2luZG93LmlubmVyV2lkdGggPiAxMjAwIHx8IHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG5cdFx0XHQkKCcuc2l0ZS0tY29udGVudCAud3JhcCcpLmNzcygnbWF4LXdpZHRoJywgJycpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciB3dCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gJCgnLnNpZGViYXItLXJpZ2h0Jykud2lkdGgoKSAtICQoJy5iYWNrZ3JvdW5kLS10ZXh0Jykud2lkdGgoKTtcblx0XHRpZiAod3QgPiAxNDAwKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdCQoJy5zaXRlLS1jb250ZW50IC53cmFwJykuY3NzKCdtYXgtd2lkdGgnLCB3dCk7XG5cdH1cblxuXHRpbml0KCk7XG5cbn0oIGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCApICk7IiwiOyhmdW5jdGlvbiAoICQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCApIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciAkc2Nyb2xsVXA7XG5cblx0dmFyIGluaXQgPSBmdW5jdGlvbigpIHtcblx0XHQkc2Nyb2xsVXAgPSAkKCcuc2Nyb2xsLS11cCcpO1xuXG5cdFx0X3Njcm9sbHVwU2Nyb2xsSGFuZGxlcigpO1xuXHRcdCRzY3JvbGxVcC5vbignY2xpY2snLCBfc2Nyb2xsdXBDbGlja0hhbmRsZXIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gX3Njcm9sbHVwU2Nyb2xsSGFuZGxlcigpIHtcblx0XHR2YXIgaGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpIC8gMjtcblxuXHRcdCQoIHdpbmRvdyApLnNjcm9sbCggZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHBvc2l0aW9uID0gICQodGhpcykuc2Nyb2xsVG9wKCk7XG5cblx0XHRcdGlmICggcG9zaXRpb24gPiBoZWlnaHQgKSB7XG5cdFx0XHRcdCRzY3JvbGxVcC5hZGRDbGFzcygnc2xpZGVJblVwJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkc2Nyb2xsVXAucmVtb3ZlQ2xhc3MoJ3NsaWRlSW5VcCcpO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fVxuXHRmdW5jdGlvbiBfc2Nyb2xsdXBDbGlja0hhbmRsZXIoKSB7XG5cblx0XHQkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHtcblx0XHRcdHNjcm9sbFRvcDogMFxuXHRcdH0sIDIwMDApO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0aW5pdCgpO1xuXG59KCBqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQgKSk7IiwiOyhmdW5jdGlvbigpIHtcblx0Y29uc29sZS5sb2coXCJEb24ndCBmb3JnZXQgdG8gYmUga2luZCB0byBzb21lb25lIHRvZGF5LiBHbyBFeGNlbC5cIiApO1xufSkoKTsiLCI7KGZ1bmN0aW9uICggJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkICkge1xuXHQndXNlIHN0cmljdCdcblxuXHR2YXIgJGJvZHk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHQkYm9keSA9ICQoICdodG1sLCBib2R5JyApO1xuXG5cdFx0JCggJ2FbaHJlZl49XCIjXCJdJyApLm9uKCAnY2xpY2snLCBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRzbW9vdGhTY3JvbGxIYW5kbGVyKCB0aGlzLmhhc2gsIGV2ZW50ICk7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBzbW9vdGhTY3JvbGxIYW5kbGVyKCB0YXJnZXQsIGV2ZW50ICkge1xuXHRcdHZhciAkdGFyZ2V0ID0gJCggdGFyZ2V0ICk7XG5cblx0XHRpZiAoIHR5cGVvZiAkdGFyZ2V0ID09IFwidW5kZWZpbmVkXCIgfHwgISAkdGFyZ2V0Lmxlbmd0aCApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQkYm9keS5zdG9wKCkuYW5pbWF0ZSh7XG5cdFx0XHQnc2Nyb2xsVG9wJzogJHRhcmdldC5vZmZzZXQoKS50b3Bcblx0XHR9LCAyMDAwLCAnc3dpbmcnICk7XG5cdH1cblxuXHRpbml0KCk7XG5cbn0oIGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCApKTsiXX0=
