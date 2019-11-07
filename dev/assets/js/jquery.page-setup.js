/*eslint-env es6*/
( ( $, window ) => {
	'use strict';

	const $sections = $( '.section--fullwindow' );

	const init = () => {
		// _setHeight();
		_setContentWidth();

		$( window ).resize( () => {
			// _setHeight();
			_setContentWidth();
		} );
	};

	function _setHeight() { // eslint-disable-line no-unused-vars
		if ( window.innerWidth < 768 ) {
			return;
		}
		$sections.each( () => {
			$( this ).css( 'height', window.innerHeight );
		} );
	}

	function _setContentWidth() {
		if ( window.innerWidth > 1200 || window.innerWidth < 768 ) {
			$( '.site--content .wrap' ).css( 'max-width', '' );
			return;
		}

		const wt = window.innerWidth - $( '.sidebar--right' ).width() - $( '.background--text' ).width();
		if ( wt > 1400 ) {
			return;
		}
		$( '.site--content .wrap' ).css( 'max-width', wt );
	}

	init();

} )( jQuery ); // eslint-disable-line no-undef, padded-blocks
