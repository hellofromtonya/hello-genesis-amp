/*eslint-env es6*/
( ( $, window, document ) => {
	'use strict';

	$.fn.textWidth = ( text, font ) => {
		if ( ! $.fn.textWidth.fakeEl ) {
			$.fn.textWidth.fakeEl = $( '<span>' ).hide().appendTo( document.body );
		}
		$.fn.textWidth.fakeEl.text( text || this.val() || this.text() ).css( 'font', font || this.css( 'font' ) );

		return $.fn.textWidth.fakeEl.width();
	};

	const init = () => {
		const $adjectives = $( '.about--adjective' );
		if ( typeof $adjectives === 'undefined' ) {
			return;
		}

		$adjectives.each( function() {
			setTextWidth( $( this ) );
		} );
	};

	function setTextWidth( $adjective ) {
		let widthDim = $adjective.textWidth();
		let lineHeight = 0;

		if ( widthDim > 60 ) {
			widthDim *= 1.3;
			lineHeight = widthDim - 10;
		} else if ( widthDim > 30 ) {
			widthDim *= 1.6;
			lineHeight = widthDim - 20;
		} else {
			widthDim *= 2;
			lineHeight = widthDim - 30;
		}

		$adjective.css( {
			width: widthDim,
			height: widthDim,
			lineHeight: lineHeight + 'px',
		} ).show();
	}

	init();

} )( jQuery, window, document ); // eslint-disable-line no-undef, padded-blocks
