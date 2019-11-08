/*eslint-env es6*/
( ( $ ) => {
	'use strict';

	let $body;

	const init = () => {
		$body = $( 'html, body' );

		$( 'a[href^="#"]' ).on( 'click', ( event ) => {
			event.preventDefault();

			smoothScrollHandler( this.hash, event );
		} );
	};

	const smoothScrollHandler = ( target ) => {
		const $target = $( target );

		if ( typeof $target === 'undefined' || ! $target.length ) {
			return false;
		}

		$body.stop().animate( {
			scrollTop: $target.offset().top,
		}, 2000, 'swing' );
	};

	init();

} )( jQuery ); // eslint-disable-line no-undef, padded-blocks
