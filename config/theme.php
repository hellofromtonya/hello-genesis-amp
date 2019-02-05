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
				'primary' => __( 'Main Nav', 'hello-genesis-amp' ),
				'footer'  => __( 'Footer Nav', 'hello-genesis-amp' ),
			],
			'genesis-structural-wraps'    => [
				'footer',
				'footer-widgets',
				'header',
				'site-inner',
			],
			// phpcs:ignore Squiz.PHP.CommentedOutCode.Found
			// 'genesis_footer-widgets'      => 4,
		],
		'register_sidebars'            => [
			[
				'id'          => 'inpost',
				'name'        => __( 'In Post', 'hello-genesis-amp' ),
				'description' => __( 'This is the inpost widget that displays right after the post content.', 'hello-genesis-amp' ),
			],
			[
				'id'          => 'adspot',
				'name'        => __( 'Adspot', 'hello-genesis-amp' ),
				'description' => __( 'This is the adspot widget to let me promote my stuff within articles.', 'hello-genesis-amp' ),
			],
		],
		'unregister_sidebars'          => [ 'sidebar-alt' ],
		'disable_edit_link'            => true,
		'remove_page_templates'        => [ 'page_blog.php' ],
		'do_shortcodes_in_text_widget' => true,
	],
];
