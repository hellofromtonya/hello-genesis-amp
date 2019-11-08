/*eslint-env es6*/
( ( $, window ) => {
	'use strict';

	let $window;
	let $body;
	let $container;

	const init = () => {
		$window = $( window );
		$body = $( 'body' );
		initMenu();
	};

	function initMenu() {
		$container = $( '#menu-container' );
		_setContainerWidth();

		$( '#hamburger-menu--mobile' ).on( 'click', initClickHandler );
		$( '#hamburger-menu' ).on( 'click', initClickHandler );

		$window.resize( () => {
			_setContainerWidth();
		} );
	}

	function _setContainerWidth() {
		if ( window.innerWidth < 768 ) {
			return;
		}

		$container.css( 'width', window.innerWidth - $( '.sidebar--right' ).width() );
	}

	function initClickHandler() {
		if ( $body.hasClass( 'menu--open' ) ) {
			closeContainer();
		} else {
			openContainer();
		}
	}

	function closeContainer() {
		$container.removeClass( 'slideInRight' ).addClass( 'slideOutLeft' );

		setTimeout( () => {
			$body.removeClass( 'menu--open' );
		}, 400 );
	}

	function openContainer() {
		$body.addClass( 'menu--open' );
		$container.addClass( 'slideInRight' ).removeClass( 'slideOutLeft' );

		itemClickHandler();
	}

	function itemClickHandler() {
		$( '.menu--item a' ).on( 'click', () => {
			closeContainer();
		} );
	}

	init();

} )( jQuery ); // eslint-disable-line no-undef, padded-blocks
