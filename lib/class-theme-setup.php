<?php
/**
 * Theme Setup
 *
 * @package     Hello_From_Tonya\Hello_Genesis_AMP
 * @since       1.0.0
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

namespace Hello_From_Tonya\Hello_Genesis_AMP;

/**
 * Class Theme_Setup
 */
class Theme_Setup {

	/**
	 * Runtime Configuration parameters
	 *
	 * @var array
	 */
	protected $config;

	/*************************
	 * Instantiate & Init
	 ************************/

	/**
	 * Instantiate the plugin
	 *
	 * So all we want to do here is get the theme up and running by
	 * setting up the base properties and constants.
	 *
	 * @since 1.0.0
	 *
	 * @param array $config Theme configuration parameters.
	 */
	public function __construct( array $config ) {
		$this->config = $config;
	}

	/**
	 * Initialize the theme's setup.
	 */
	public function init() {
		$this->init_pre();
		$this->init_events();
	}

	/**
	 * Pre-initialization, meaning these tasks go first.
	 */
	protected function init_pre() {
		$this->task_loader( 'init_pre' );
	}

	/**
	 * Setup the hooks.
	 */
	protected function init_events() {
		add_action( 'genesis_setup', [ $this, 'setup' ], 15 );
		add_action( 'after_switch_theme', [ $this, 'update_theme_settings_defaults' ] );
	}

	/**
	 * Setup the theme.
	 */
	public function setup() {
		$this->task_loader( 'setup' );

		$this->unregister_genesis_callbacks();
	}

	/**********************
	 * Pre Tasks
	 *********************/

	/**
	 * Let's load up the favicon from the theme.
	 *
	 * @since 1.0.0
	 *
	 * @param string $favicon_url Favicon URL.
	 */
	protected function favicon( $favicon_url ) {
		add_filter(
			'genesis_pre_load_favicon',
			function() use ( $favicon_url ) {
				return $favicon_url;
			}
		);
	}

	/**********************
	 * Theme Setup Tasks
	 *********************/

	/**
	 * Sets the theme setting defaults.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function update_theme_settings_defaults() {

		if ( function_exists( 'genesis_update_settings' ) ) {
			genesis_update_settings( $this->config['theme_defaults'] );
		}

		update_option( 'posts_per_page', $this->config['theme_defaults']['blog_cat_num'] );
	}

	/**
	 * Add image sizes.
	 *
	 * @since 1.0.0
	 *
	 * @param array $config Image size configuration parameters.
	 *
	 * @return void
	 */
	protected function add_image_size( array $config ) {

		foreach ( $config as $name => $parameters ) {
			if ( ! is_array( $parameters ) ) {
				continue;
			}

			if ( ! isset( $parameters['width'] ) || ! isset( $parameters['height'] ) ) {
				continue;
			}

			$width  = (int) $parameters['width'];
			$height = (int) $parameters['height'];
			$crop   = isset( $parameters['crop'] ) ? $parameters['crop'] : false;

			add_image_size( $name, $width, $height, $crop );
		}
	}

	/**
	 * Add theme supports.
	 *
	 * @since 1.0.0
	 *
	 * @param array $config Configuration parameters.
	 */
	protected function add_theme_support( array $config ) {

		foreach ( $config as $feature => $parameters ) {
			if ( is_null( $parameters ) ) {
				add_theme_support( $feature );
			} else {
				add_theme_support( $feature, $parameters );
			}
		}
	}

	/**
	 * Unregister default Genesis layouts.
	 *
	 * @since 1.0.0
	 *
	 * @param array $config Configuration parameters.
	 */
	protected function genesis_unregister_layout( array $config ) {

		foreach ( $config as $layout ) {
			genesis_unregister_layout( $layout );
		}
	}

	/**
	 * Disable the edit link on the front-end (as it drives me crazy).
	 *
	 * @since 1.0.0
	 *
	 * @param bool $ok_to_disable_it When set to true, the `edit_post_link` is disabled.
	 */
	protected function disable_edit_link( $ok_to_disable_it = false ) {

		if ( ! $ok_to_disable_it ) {
			return;
		}

		add_filter( 'edit_post_link', '__return_empty_string' );
	}

	/**
	 * Remove Genesis Blog page template.
	 *
	 * @since 1.0.0
	 *
	 * @param array $page_templates Existing recognised page templates.
	 */
	protected function remove_page_templates( array $page_templates ) {
		add_filter(
			'theme_page_templates',
			function() use ( $page_templates ) {
				unset( $page_templates['page_blog.php'] );

				return $page_templates;
			}
		);
	}

	/**
	 * Register sidebars.
	 *
	 * @since 1.0.0
	 *
	 * @param array $config Configuration parameters.
	 */
	protected function register_sidebars( array $config ) {

		foreach ( $config as $sidebar ) {
			genesis_register_sidebar( $sidebar );
		}
	}

	/**
	 * Unregister sidebars.
	 *
	 * @since 1.0.0
	 *
	 * @param array $config Configuration parameters.
	 */
	protected function unregister_sidebars( array $config ) {

		foreach ( $config as $sidebar ) {
			unregister_sidebar( $sidebar );
		}
	}

	/**
	 * Enable shortcodes in the WordPress default text widget when configured.
	 *
	 * @since 1.0.0
	 *
	 * @param bool $is_enabled When true, shortcodes are enabled for the text widget.
	 *
	 * @return void
	 */
	protected function do_shortcodes_in_text_widget( $is_enabled = false ) {

		if ( ! $is_enabled ) {
			return;
		}

		add_filter( 'widget_text', 'do_shortcode' );
	}

	/**********************
	 * Helpers
	 *********************/

	/**
	 * Load up the tasks by calling each task method.
	 *
	 * @since 1.0.0
	 *
	 * @param string $config_key Task name as the configuration key.
	 * @param string $method_prefix Method prefix for this task.
	 *
	 * @return bool
	 */
	protected function task_loader( $config_key, $method_prefix = '' ) {

		if ( ! array_key_exists( $config_key, $this->config ) ) {
			return false;
		}

		foreach ( $this->config[ $config_key ] as $task => $task_config ) {
			$method_name = $method_prefix . $task;

			$this->{$method_name}( $task_config );
		}
	}

	/**
	 * Unregister Genesis callbacks.  We do this here because the child theme loads before Genesis.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	protected function unregister_genesis_callbacks() {

	}
}
