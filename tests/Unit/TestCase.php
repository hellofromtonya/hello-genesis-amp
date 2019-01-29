<?php
/**
 * Unit Tests' test case.
 *
 * @package     Hello_From_Tonya\Hello_Genesis_AMP\Tests
 * @since       1.0.0
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

namespace Hello_From_Tonya\Hello_Genesis_AMP\Tests\Unit;

use Brain\Monkey;
use Brain\Monkey\Functions;
use Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;
use Hello_From_Tonya\Hello_Genesis_AMP\Tests\TestCaseTrait;

/**
 * Abstract base class for all unit test case implementations.
 */
abstract class TestCase extends \PHPUnit\Framework\TestCase {
	use MockeryPHPUnitIntegration;
	use TestCaseTrait;

	/**
	 * Prepares the test environment before each test.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function setUp() {
		parent::setUp();
		Monkey\setUp();

		$this->setup_common_wp_stubs();
	}

	/**
	 * Cleans up the test environment after each test.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function tearDown() {
		Monkey\tearDown();
		parent::tearDown();
	}

	/**
	 * Set up the stubs for the common WordPress escaping and internationalization functions.
	 */
	protected function setup_common_wp_stubs() {
		// Common escaping functions.
		Functions\stubs(
			[
				'esc_attr',
				'esc_html',
				'esc_textarea',
				'esc_url',
				'wp_kses_post',
			]
		);

		// Common internationalization functions.
		Functions\stubs(
			[
				'__',
				'esc_html__',
				'esc_html_x',
				'esc_attr_x',
			]
		);

		foreach ( [ 'esc_attr_e', 'esc_html_e', '_e' ] as $wp_function ) {
			Functions\when( $wp_function )->echoArg();
		}
	}
}
