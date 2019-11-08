/*eslint-env es6*/
( ( $, window ) => {
	'use strict';

	let lastPosition = 0,
		$backgroundText,
		currentSection = 0;

	const init = () => {
		if ( window.innerWidth < 768 ) {
			return;
		}

		$backgroundText = $( '.background--text' );
		if ( typeof $backgroundText === 'undefined' ) {
			return;
		}

		messageHandler();

		onScroll();
	};

	function onScroll() {
		$( window ).scroll( () => {
			const currentPosition = $( this ).scrollTop();

			if ( ! isMovementLargeEnough( currentPosition ) ) {
				return;
			}

			messageHandler();

			lastPosition = currentPosition;
		} );
	}

	function isMovementLargeEnough( currentPosition ) {
		const movement = Math.abs( lastPosition - currentPosition );

		return movement > 50;
	}

	function messageHandler() {
		$( '.section' ).each( function( index ) {
			const $section = $( this );

			if ( typeof $section !== 'object' ) {
				return false;
			}

			if ( ! $section.isOnScreen( { percentY: 0.3 } ) ) {
				return true;
			}

			if ( index === currentSection ) {
				return false;
			}
			setMessage( $section );
			currentSection = index;

			return false;
		} );
	}

	function setMessage( $section ) {
		const messageText = $section.data( 'message' );

		if ( typeof messageText === 'undefined' || messageText === null ) {
			return;
		}

		$backgroundText.html( messageText );
	}

	init();

	$( window ).resize( () => {
		init();
	} );

} )( jQuery, window ); // eslint-disable-line no-undef, padded-blocks
