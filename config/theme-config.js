'use strict';

module.exports = {
	theme: {
		slug: 'hello-genesis-amp',
		name: 'Genesis+AMP powered child theme brought to you by hellofromtonya',
		author: 'Tonya Mork'
	},
	dev: {
		browserSync: {
			live: true,
			proxyURL: 'hellofromtonya.test:8888',
			bypassPort: '8181'
		},
		browserslist: [ // See https://github.com/browserslist/browserslist
			'> 1%',
			'last 2 versions'
		],
		debug: {
			styles: false, // Render verbose CSS for debugging.
			scripts: false // Render verbose JS for debugging.
		}
	},
	export: {
		compress: true
	}
};
