<?php
/**
 * Theme runtime configuration parameters.
 *
 * @package     Hello_From_Tonya\Hello_Genesis_AMP
 * @since       1.0.0
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

namespace Hello_From_Tonya\Hello_Genesis_AMP;

return [
	'theme_slug'          => 'hello-genesis-amp',
	'version'             => get_theme_version(),
	'load_min_stylesheet' => defined( 'WP_DEBUG' ) && WP_DEBUG,
	'theme_defaults'      => [
		'blog_cat_num'              => 10,
		'content_archive'           => 'full',
		'content_archive_limit'     => 250,
		'content_archive_thumbnail' => 0,
		'posts_nav'                 => 'numeric',
		'site_layout'               => 'content-sidebar',
	],
	'init_pre'            => [
		'favicon' => get_theme_url() . '/assets/images/favicon.jpg',
	],
	'setup'               => [
		'genesis_unregister_layout'    => [
			'content-sidebar-sidebar',
			'sidebar-content-sidebar',
			'sidebar-sidebar-content',
		],
		'add_theme_support'            => [
			'html5'                       => [
				'caption',
				'comment-form',
				'comment-list',
				'gallery',
				'search-form',
			],
			'genesis-responsive-viewport' => null,
			'genesis-menus'               => [
				'primary' => 'Main Nav',
				'footer'  => 'Footer Nav',
			],
			'genesis-structural-wraps'    => [
				'footer',
				'footer-widgets',
				'header',
				'site-inner',
			],
			'editor-styles'               => null,
			'align-wide'                  => null,
			'responsive-embeds'           => null,
			'editor-font-sizes'           => [
				[
					'name' => 'Small',
					'size' => 12,
					'slug' => 'small',
				],
				[
					'name' => 'Normal',
					'size' => 16,
					'slug' => 'normal',
				],
				[
					'name' => 'Large',
					'size' => 20,
					'slug' => 'large',
				],
				[
					'name' => 'Larger',
					'size' => 24,
					'slug' => 'larger',
				],
			],
			'editor-color-palette' => [
				[
					'name' => 'Light Gray',
					'slug' => 'light-gray',
					'color' => '#ebebeb',
				],
				[
					'name' => 'Green',
					'slug' => 'green',
					'color' => '#627f00',
				],
				[
					'name' => 'Neon',
					'slug' => 'neon',
					'color' => '#00b624',
				],
				[
					'name' => 'Orange',
					'slug' => 'orange',
					'color' => '#cb4b14',
				],
				[
					'name' => 'Blue',
					'slug' => 'blue',
					'color' => '#1c202c',
				],
				[
					'name' => 'Yellow',
					'slug' => 'yellow',
					'color' => '#ffc40d',
				],
			]
			// phpcs:ignore Squiz.PHP.CommentedOutCode.Found
			// 'genesis_footer-widgets'      => 4,
		],
		'register_sidebars'            => [
			[
				'id'          => 'inpost',
				'name'        => 'In Post',
				'description' => 'This is the inpost widget that displays right after the post content.',
			],
			[
				'id'          => 'adspot',
				'name'        => 'Adspot',
				'description' => 'This is the adspot widget to let me promote my stuff within articles.',
			],
		],
		'unregister_sidebars'          => [ 'header-right', 'sidebar', 'sidebar-alt' ],
		'disable_edit_link'            => true,
		'remove_page_templates'        => [ 'page_blog.php' ],
		'do_shortcodes_in_text_widget' => true,
	],
];
