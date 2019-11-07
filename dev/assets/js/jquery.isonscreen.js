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