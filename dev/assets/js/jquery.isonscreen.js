/* eslint-env es6 */
/**
 * Checks if the element is in the viewport (i.e. on the viewing screen)
 *
 * @since       1.0.0
 * @author      hellofromTonya
 * @license     GPL-2.0+
 */

( ( $, window ) => {
	'use strict';

	const $window = $( window );

	$.fn.isOnScreen = ( options ) => {
		const $element = $( this );
		const defaults = {
			percentX: 1.0,
			percentY: 1.0,
		};

		// Makes variables public.
		$element.vars = $.extend( {}, defaults, options );

		let limits = {},
			viewport = {};
		const width = this.outerWidth();
		const height = this.outerHeight();

		// Private methods.
		const methods = {
			init: () => {
				methods.initViewport();
				methods.initLimits();
				return methods.checkState();
			},

			initViewport: () => {
				viewport = {
					width: $window.width(),
					height: $window.height(),
					top: $window.scrollTop(),
					left: $window.scrollLeft(),
				};

				viewport.bottom = viewport.top + viewport.height;
				viewport.right = viewport.left + viewport.width;
			},

			/**
			 * Initialize the element's limits, which
			 * are where this element is in the window.
			 */
			initLimits: () => {
				limits = $element.offset();

				limits.right = limits.left + width;
				limits.bottom = limits.top + height;
			},

			/**
			 * Let's check if the element is in the viewport, i.e.
			 * meaning it's on the viewing screen.
			 *
			 * @return {boolean} Trues true when on screen; else, false.
			 */
			checkState: () => {
				const isOnScreen = ! (
					viewport.right < limits.left ||
					viewport.left > limits.right ||
					viewport.bottom < limits.top ||
					viewport.top > limits.bottom
				);

				if ( ! isOnScreen ) {
					return false;
				}

				return methods.isPartiallyOnScreen();
			},

			/**
			 * Let's check if the element is in the viewport, i.e.
			 * meaning it's on the viewing screen.
			 *
			 * @return {boolean} Returns true when partially on screen; else returns false.
			 */
			isPartiallyOnScreen: () => {
				return methods.xIsPartiallyOnScreen() &&
					methods.yIsPartiallyOnScreen();
			},

			/**
			 * Checks if the element is partially on the screen for the y-axis
			 *
			 * @return {boolean} Returns true when X partially on screen; else returns false.
			 */
			xIsPartiallyOnScreen: () => {
				const actuals = {
					left: Math.min( 1, ( limits.right - viewport.left ) / width ),
					right: Math.min( 1, ( viewport.right - limits.left ) / width ),
				};
				const actualPercentX = actuals.left * actuals.right;

				return actualPercentX >= $element.vars.percentX;
			},

			/**
			 * Checks if the element is partially on the screen for the y-axis
			 *
			 * @return {boolean} Returns true when Y is partially on screen; else returns false.
			 */
			yIsPartiallyOnScreen: () => {
				const actuals = {
					top: Math.min( 1, ( limits.bottom - viewport.top ) / height ),
					bottom: Math.min( 1, ( viewport.bottom - limits.top ) / height ),
				};
				const actualPercentY = actuals.top * actuals.bottom;

				return actualPercentY >= $element.vars.percentY;
			},

		}; // end of private methods

		return methods.init();
	}; // end of object
} )( jQuery ); // eslint-disable-line no-undef
