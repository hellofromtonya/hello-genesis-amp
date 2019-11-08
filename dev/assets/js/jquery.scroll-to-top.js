/*eslint-env es6*/
( ( $, window ) => {
	'use strict';

	let $scrollUp;

	const init = () => {
		$scrollUp = $( '.scroll--up' );

		_scrollupScrollHandler();
		$scrollUp.on( 'click', _scrollupClickHandler );
	};

	function _scrollupScrollHandler() {
		const height = $( window ).height() / 2;

		$( window ).scroll( () => {
			const position = $( this ).scrollTop();

			if ( position > height ) {
				$scrollUp.addClass( 'slideInUp' );
			} else {
				$scrollUp.removeClass( 'slideInUp' );
			}
		} );
	}

	function _scrollupClickHandler() {
		$( 'html, body' ).animate( {
			scrollTop: 0,
		}, 2000 );

		return false;
	}

	init();

} )( jQuery ); // eslint-disable-line no-undef, padded-blocks
